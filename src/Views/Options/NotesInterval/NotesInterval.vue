<template>
  <MainContainer>
    <div class="contentContainer">
      <div class="titleContainer">
        <h1>{{$t("NotesInterval.title")}}</h1>
      </div>
      <div class="svgCont">
        <object id="piano" class="imgResponsive" type="image/svg+xml" :data="imgPath"/>
      </div>
      <el-button v-on:click="restore" size="small" class="restoreDefault">
        <i class="uil uil-refresh"></i>
        {{$t('NotesInterval.restore')}}
      </el-button>
    </div>
    <div class="buttonContainer">
      <el-button v-on:click="goBack" size="large" type="primary">
        <i class="uil uil-left-arrow-from-left"></i>
        {{$t("Site.back")}}
      </el-button>
    </div>
  </MainContainer>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { STAFF_SELECTED, STAFF_INTERVALS } from '@/Store/Modules/Settings/Getters'
import { GET_NATURAL_PITCHES } from '@/Store/Modules/Game/Getters'
import { SET_STAFF_SELECTED_INTERVAL, RESTORE_STAFF_SELECTED_INTERVAL } from '@/Store/Modules/Settings/Actions'
import { namespace } from 'vuex-class'
import MainContainer from '@/Components/Template/MainContainer.vue'
import { INotePitch } from '../../../Notation/NoteData'
const pianoSVG = require('@/assets/images/piano.svg2')
const settingsModule = namespace('Settings')
const gameModule = namespace('Game')
import { EDefaultPianoLayouts, PianoLayouts } from '@/Piano/PianoLayouts'
import { GameStaff, StaffInterval } from '../../../Store/Modules/Settings/Types'
import { Alterations } from '../../../Notation/NoteConstants'
import { PitchesCollection } from '@/Notation/Pitches'

@Component({
  components: {
    MainContainer
  }
})
export default class NotesInvterval extends Vue {
  private svgDoc: Document
  private keys: HTMLCollectionOf<SVGRectElement>
  private posEvents = ['mousedown', 'touchstart']
  private readonly SELECTED_KEY_CLASS = 'selected'
  private pianoBeginNote: INotePitch

  get imgPath(): string {
    return pianoSVG
  }
  @settingsModule.Getter(STAFF_SELECTED)
  private staffSelected: GameStaff

  @settingsModule.Getter(STAFF_INTERVALS)
  private staffIntervals: StaffInterval

  @settingsModule.Action(SET_STAFF_SELECTED_INTERVAL)
  private setStaffSelectedInterval: any

  @settingsModule.Action(RESTORE_STAFF_SELECTED_INTERVAL)
  private restoreStaffSelectedInterval: any

  @gameModule.Getter(GET_NATURAL_PITCHES)
  private notesUnfiltered: PitchesCollection

  private notes: PitchesCollection

  private restore() {
    this.restoreStaffSelectedInterval()
    this.markKeysSelected()
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

  private handlePosEvent(event: Event) {
    const keyElement = event.target as HTMLElement
    const midiVal = Number(keyElement.getAttribute('midi-val'))
    const note = Object.values(this.notes).find((i) => i.midiValue === midiVal)
    if (!note) {
      throw new Error('Clicked note doesnt have the correct midivalue')
    }

    if (midiVal >= this.endNote.midiValue) {
      this.setStaffSelectedInterval({ start: this.startNote.pitch, end: note.pitch })
    } else if (midiVal <= this.startNote.midiValue) {
      this.setStaffSelectedInterval({ start: note.pitch, end: this.endNote.pitch })
    } else {
      if (midiVal - this.startNote.midiValue > (this.endNote.midiValue - this.startNote.midiValue) / 2) {
        this.setStaffSelectedInterval({ start: this.startNote.pitch, end: note.pitch })
      } else {
        this.setStaffSelectedInterval({ start: note.pitch, end: this.endNote.pitch })
      }
    }

    this.markKeysSelected()
  }

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

  private goBack() {
    this.$router.replace('/options')
  }

}
</script>

<style scoped lang="scss">
.svgCont {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.restoreDefault {
  margin-top: 10px;
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
</style>
