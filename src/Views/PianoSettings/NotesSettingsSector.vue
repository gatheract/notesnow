<template>
  <div class="cont">
    <StaffSel></StaffSel>
    <div class="pitchCont">
      <div class="option optionLeft">
        <div>
          <el-select
            @change="setStartPitch"
            :value="this.staffInterval.startPitch"
            filterable
            placeholder="Start"
            :no-match-text="$t('NotesInterval.noteNotFound')"
          >
            <el-option
              v-for="item in notesSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="option optionRight">
        <div>
          <el-select
            @change="setEndPitch"
            :value="this.staffInterval.endPitch"
            filterable
            placeholder="End"
            :no-match-text="$t('NotesInterval.noteNotFound')"
          >
            <el-option
              v-for="item in notesSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="svgCont">
      <object id="piano" class="imgResponsive" type="image/svg+xml" :data="imgPath"/>
    </div>
    <el-button v-on:click="restore" size="small" class="restoreDefault">
      <i class="uil uil-refresh"></i>
      {{$t('NotesInterval.restore')}}
    </el-button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { STAFF_SELECTED, STAFF_INTERVALS } from '@/Store/Modules/Settings/Getters'
import { GET_NATURAL_PITCHES } from '@/Store/Modules/Game/Getters'
import { SET_STAFF_SELECTED_INTERVAL, RESTORE_STAFF_SELECTED_INTERVAL } from '@/Store/Modules/Settings/Actions'
import { namespace } from 'vuex-class'
import MainContainer from '@/Components/Template/MainContainer.vue'
import { INotePitch } from '@/Notation/NoteData'
const pianoSVG = require('@/assets/images/piano.svg2')
const settingsModule = namespace('Settings')
const gameModule = namespace('Game')
import { EDefaultPianoLayouts, PianoLayouts } from '@/Piano/PianoLayouts'
import { GameStaff, StaffInterval } from '@/Store/Modules/Settings/Types'
import { Alterations } from '@/Notation/NoteConstants'
import { PitchesCollection } from '@/Notation/Pitches'
import StaffSel from '@/Views/Options/Components/StaffSel.vue'

interface SelectData {
  value: string, label: string
}

@Component({
  components: {
    MainContainer,
    StaffSel
  }
})
export default class NotesSettingsSector extends Vue {
  private get imgPath(): string {
    return pianoSVG
  }
  private get staffInterval() {
    return this.staffIntervals[this.staffSelected]
  }
  private get startNote() {
    return this.notesUnfiltered[this.staffInterval.startPitch]
  }
  private get endNote() {
    return this.notesUnfiltered[this.staffInterval.endPitch]
  }
  private svgDoc: Document
  private keys: HTMLCollectionOf<SVGRectElement>
  private posEvents = ['mousedown', 'touchstart']
  private readonly SELECTED_KEY_CLASS = 'selected'
  private pianoBeginNote: INotePitch
  private notes: PitchesCollection
  private notesSelect: SelectData[] = []

  @settingsModule.Getter(STAFF_SELECTED) private staffSelected: GameStaff
  @settingsModule.Getter(STAFF_INTERVALS) private staffIntervals: StaffInterval
  @settingsModule.Action(SET_STAFF_SELECTED_INTERVAL) private setStaffSelectedInterval: any
  @settingsModule.Action(RESTORE_STAFF_SELECTED_INTERVAL) private restoreStaffSelectedInterval: any
  @gameModule.Getter(GET_NATURAL_PITCHES) private notesUnfiltered: PitchesCollection

  @Watch('staffSelected')
  private watchStaff() {
    this.markKeysSelected()
  }

  private beforeMount() {
    this.generateNotesSelect()
  }

  private setEndPitch(val: string) {
    this.saveEndPitch(val)
    if (this.notesUnfiltered[val].midiValue <= this.startNote.midiValue) {
      this.saveStartPitch(PianoLayouts[EDefaultPianoLayouts.keys88].startPitch)
    }
  }

  private setStartPitch(val: string) {
    this.saveStartPitch(val)
    if (this.notesUnfiltered[val].midiValue >= this.endNote.midiValue) {
      this.saveEndPitch(PianoLayouts[EDefaultPianoLayouts.keys88].endPitch)
    }
  }
  /**
   * Add the pitches to the selects
   */
  private generateNotesSelect() {
    let add = false
    for (const a of Object.keys(this.notesUnfiltered)) {
      const note = this.notesUnfiltered[a]

      if (PianoLayouts[EDefaultPianoLayouts.keys88].startPitch === a) {
        add = true
      }
      if (add) {
        if (!this.notesUnfiltered[a].natEnharmonic && (this.notesUnfiltered[a].alt !== Alterations.FLAT)) {
          this.notesSelect.push({ value: a, label: a })
        }
      }
      if (PianoLayouts[EDefaultPianoLayouts.keys88].endPitch === a) {
        add = false
      }
    }
  }

  /**
   * Restores the piches to the default ones
   */
  private restore() {
    this.restoreStaffSelectedInterval()
    this.markKeysSelected()
  }

  private mounted() {
    const notes: PitchesCollection = {}
    for (const a of Object.keys(this.notesUnfiltered)) {
      const note = this.notesUnfiltered[a]
      if (!this.notesUnfiltered[a].natEnharmonic) {
        notes[a] = note
      }
    }
    this.notes = notes
    this.pianoBeginNote = this.notes[PianoLayouts[EDefaultPianoLayouts.keys88].startPitch]
    const pianoDOM = document.getElementById('piano') as HTMLObjectElement

    if (pianoDOM) {
      pianoDOM.addEventListener('load', () => {
        this.svgDoc = pianoDOM.contentDocument as Document
        this.keys = this.svgDoc.getElementsByTagName('rect') as any
        this.addKeyListeners()
      }, false)
    }
  }

  /**
   * Traverse the svg and set the click listeners
   */
  private addKeyListeners() {
    const self = this

    const startMidiVal = this.startNote.midiValue
    const endMidiVal = this.endNote.midiValue
    const piaBegVal = this.pianoBeginNote.midiValue
    let midiVal: number

    for (const key of this.keys) {
      midiVal = piaBegVal + Number(key.getAttribute('data-key'))
      key.setAttribute('midi-val', midiVal.toString())
      if (midiVal >= startMidiVal && midiVal <= endMidiVal) {
        key.setAttribute('class', this.SELECTED_KEY_CLASS)
      }
      this.posEvents.map((ev) => key.addEventListener(ev, self.handlePosEvent.bind(self)))
    }
  }

  /**
   * Whenever the user clicks on a note if its higher than the last note in the interval
   * set the last note higher, if its lower set it lower
   * if it's in the middle then divide by two the interval and set it left or right
   */
  private handlePosEvent(event: Event) {
    const keyElement = event.target as HTMLElement
    const midiVal = Number(keyElement.getAttribute('midi-val'))
    const note = Object.values(this.notes).find((i) => i.midiValue === midiVal)

    if (!note) {
      throw new Error('Clicked note doesnt have the correct midivalue')
    }

    if (midiVal >= this.endNote.midiValue) {
      this.saveEndPitch(note.pitch)
    } else if (midiVal <= this.startNote.midiValue) {
      this.saveStartPitch(note.pitch)
    } else {
      if (midiVal - this.startNote.midiValue > (this.endNote.midiValue - this.startNote.midiValue) / 2) {
        this.saveEndPitch(note.pitch)
      } else {
        this.saveStartPitch(note.pitch)
      }
    }
  }

  /**
   * Color the keys that are inside the selected interval
   */
  private markKeysSelected() {
    const startMidiVal = this.startNote.midiValue
    const endMidiVal = this.endNote.midiValue
    const piaBegVal = this.pianoBeginNote.midiValue
    let midiVal: number
    for (const key of this.keys) {
      midiVal = piaBegVal + Number(key.getAttribute('data-key'))
      if (midiVal >= startMidiVal && midiVal <= endMidiVal) {
        key.setAttribute('class', this.SELECTED_KEY_CLASS)
      } else {
        key.setAttribute('class', '')
      }
    }
  }

  private saveEndPitch(pitch: string) {
    this.setStaffSelectedInterval({ start: this.startNote.pitch, end: pitch })
    this.markKeysSelected()
  }

  private saveStartPitch(pitch: string) {
    this.setStaffSelectedInterval({ start: pitch, end: this.endNote.pitch })
    this.markKeysSelected()
  }
}
</script>

<style scoped lang="scss">
.cont {
  margin-top: 20px;
}
.svgCont {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.restoreDefault {
  margin-top: 20px;
  cursor: pointer;
  font-size: 14px;

  font-weight: 500;
  text-align: right;
  float: right;
  margin-right: 10px;
}

@include media("<tablet") {
  .mainContainer {
    padding-left: 5px;
    padding-right: 5px;
  }
}

.pitchCont {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  .option {
    max-width: 100px;
  }
  .optionLeft {
    text-align: left;
  }
  .optionRight {
    text-align: right;
  }
}
</style>
