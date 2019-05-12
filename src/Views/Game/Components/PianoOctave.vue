<template>
  <div class="svgCont">
    <object id="piano" class="imgResponsive" type="image/svg+xml" :data="imgPath"/>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const settingsModule = namespace('Settings')
import { GAME_TYPE, STAFF_SELECTED } from '@/Store/Modules/Settings/Getters'
import { GameType, GameStaff } from '@/Store/Modules/Settings/Types'
const pianoSVG = require('@/assets/images/piano_octave.svg2')
import {  EventBus, EVENT_PIANO_KEY_PRESSED,
  EVENT_PIANO_KEY_RELEASED, EVENT_GUESS_RESULT} from '@/EventBus'
const gameModule = namespace('Game')
const pianoModule = namespace('Piano')
import { GET_NATURAL_PITCHES } from '@/Store/Modules/Game/Getters'
import { GET_SHOW_KEY_NAMES } from '@/Store/Modules/Piano/Getters'
import { PitchesCollection } from '@/Notation/Pitches'
import GameStore from '@/Game/GameStore'
import Game from '@/Game/Game'
import { PianoLayouts } from '@/Piano/PianoLayouts'
import PianoComponent from './Piano.vue'
import { PianoKey } from '../../../Notation/NoteConstants'
@Component
export default class PianoOctave extends PianoComponent {
  protected ignorePitch: boolean = true
  @gameModule.Getter(GET_NATURAL_PITCHES) protected notes: PitchesCollection
  @pianoModule.Getter(GET_SHOW_KEY_NAMES) protected showKeyNames: boolean
  protected readonly KEY_NAME_ATTR = 'key-name'
  protected pianoKeys: SVGRectElement[] = []
  get imgPath(): string {
    return pianoSVG
  }

  @Watch('activePitch')
  public onPropertyChanged() {
    this.highCorrectHandler()
  }
  protected highCorrectHandler() {
    const pitch = this.activePitch

    if (this.highlightedKey) {
      this.highlightedKey.classList.remove(this.HIGH_CORRECT_KEY_CLASS)
    }
    if (this.highCorrect && pitch && this.pianoKeys[pitch.key]) {
      this.highlightedKey = this.pianoKeys[pitch.key]
      this.highlightedKey.classList.add(this.HIGH_CORRECT_KEY_CLASS)
    }
  }

  protected initializePiano() {
    const self = this
    let midiVal: number

    const notesArray = Object.values(this.notes)
    const pianoBeginNote = this.notes.C4 // boom
    const startMidiVal = pianoBeginNote.midiValue

    for (const key of this.keys) {

      midiVal = startMidiVal + Number(key.getAttribute('data-key'))
      const keyData = notesArray.find((i) => i.midiValue === midiVal)
      if (keyData) {
        this.pianoKeys[keyData.key] = key
      }

      this.midiKeys[midiVal] = key

      if (this.showKeyNames) {
        this.drawKeyName(key)
      }

      key.setAttribute('midi-val', midiVal.toString())
      this.posEvents.map((ev) => key.addEventListener(ev, self.handlePosEvent.bind(self)))
      this.offEvents.map((ev) => key.addEventListener(ev, self.handleOffEvent.bind(self)))
      midiVal++
    }
    this.highCorrectHandler()
  }

  protected drawKeyName(key: SVGRectElement) {
    const keyName = key.getAttribute(this.KEY_NAME_ATTR)
    if (keyName) {
      const box = key.getBBox()
      const svgns = 'http://www.w3.org/2000/svg'
      const text = document.createElementNS(svgns, 'text')
      const y = (box.y + box.height - 20).toString()
      const x = (box.x + (box.width / 3)).toString()
      text.setAttributeNS(null, 'x', x)
      text.setAttributeNS(null, 'y', y)
      text.setAttributeNS(null, 'font-size', '30')
      text.innerHTML = keyName
      if (key.parentNode) {
        key.parentNode.appendChild(text)
      }
    }
  }

}
</script>
<style lang="scss">
</style>