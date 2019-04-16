<template>
  <div class="svgCont">
    <object id="piano" class="imgResponsive" type="image/svg+xml" :data="imgPath"/>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const settingsModule = namespace('Settings')
import { GAME_TYPE, STAFF_SELECTED } from '@/Store/Modules/Settings/Getters'
import { GameType, GameStaff } from '@/Store/Modules/Settings/Types'
const pianoSVG = require('@/assets/images/piano_octave.svg2')
import { EventBus, EVENT_PIANO_KEY_PRESSED, EVENT_PIANO_KEY_RELEASED, EVENT_GUESS_RESULT } from '@/EventBus'
const gameModule = namespace('Game')
import { GET_NATURAL_PITCHES } from '@/Store/Modules/Game/Getters'
import { PitchesCollection } from '@/Notation/Pitches'
import GameStore from '@/Game/GameStore'
import Game from '@/Game/Game'
import { PianoLayouts } from '@/Piano/PianoLayouts'
import PianoComponent from './Piano.vue'
@Component
export default class PianoOctave extends PianoComponent {
  protected ignorePitch: boolean = true
  @gameModule.Getter(GET_NATURAL_PITCHES)
  protected notes: PitchesCollection

  get imgPath(): string {
    return pianoSVG
  }

  protected addKeyListeners() {
    const self = this
    let midiVal: number

    const pianoBeginNote = this.notes.C4 // boom
    const startMidiVal = pianoBeginNote.midiValue

    for (const key of this.keys) {
      midiVal = startMidiVal + Number(key.getAttribute('data-key'))
      this.midiKeys[midiVal] = key
      key.setAttribute('midi-val', midiVal.toString())
      this.posEvents.map((ev) => key.addEventListener(ev, self.handlePosEvent.bind(self)))
      this.offEvents.map((ev) => key.addEventListener(ev, self.handleOffEvent.bind(self)))
      midiVal++
    }
    this.centerPiano()
  }

}
</script>
<style lang="scss">
</style>