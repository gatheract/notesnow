<template>
  <div class="svgCont">
    <object id="piano" class="imgResponsive" type="image/svg+xml" :data="imgPath"/>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { PitchesCollection } from '@/Notation/Pitches'
const settingsModule = namespace('Settings')
const gameModule = namespace('Game')
import { GAME_TYPE, STAFF_SELECTED } from '@/Store/Modules/Settings/Getters'
import { NATURAL_PITCHES } from '@/Store/Modules/Game/Getters'
import { GameType, GameStaff } from '@/Store/Modules/Settings/Types'
const pianoSVG = require('@/assets/images/piano.svg2')
import {  EventBus, EVENT_PIANO_KEY_PRESSED,
  EVENT_PIANO_KEY_RELEASED, EVENT_GUESS_RESULT, EVENT_MIDI_DEV_KEY_RELEASED} from '@/EventBus'

import GameStore from '@/Game/GameStore'
import Game from '@/Game/Game'
import { EDefaultPianoLayouts, PianoLayouts } from '@/Piano/PianoLayouts'

@Component
export default class Piano extends Vue {
  protected svgDoc: Document
  protected keys: HTMLCollectionOf<SVGRectElement>
  protected midiKeys: SVGRectElement[] = []
  protected posEvents = ['mousedown', 'touchstart']
  protected offEvents = ['mouseup', 'mouseout', 'touchleave', 'touchend', 'touchcancel']
  protected readonly WRONG_KEY_CLASS = 'incorrect'
  protected readonly CORRECT_KEY_CLASS = 'correct'
  protected ignorePitch: boolean = false

  @gameModule.Getter(NATURAL_PITCHES)
  protected notes: PitchesCollection

  get imgPath(): string {
    return pianoSVG
  }
  protected mounted() {
    const pianoDOM = document.getElementById('piano') as HTMLObjectElement

    EventBus.$on(EVENT_GUESS_RESULT, this.guessResult.bind(this))
    EventBus.$on(EVENT_MIDI_DEV_KEY_RELEASED, this.keyOff.bind(this))

    if (pianoDOM) {
      pianoDOM.addEventListener('load', () => {
        this.svgDoc = pianoDOM.contentDocument as Document
        this.keys = this.svgDoc.getElementsByTagName('rect') as any
        this.addKeyListeners()
      }, false)
    }
  }

  /**
   * Piano key events for the mouse/touch interface
   * While traversing the keys remove the ones outside the preferences values.
   * Each key has a data-key attribute (they are unordered in the svg)
   * So add it to the starting 88 key (A0) midi value 
   * and if it's outside the bounds hide it 
   */
  protected addKeyListeners() {
    const self = this

    const pianoBeginNote = this.notes[PianoLayouts[EDefaultPianoLayouts.keys88].startPitch]
    const settingsBeginNote = this.notes[GameStore.getStartPitch()]
    const settingsEndNote = this.notes[GameStore.getEndPitch()]

    const setBegVal = settingsBeginNote.midiValue
    const setEndVal = settingsEndNote.midiValue
    const piaBegVal = pianoBeginNote.midiValue

    let midiVal: number

    for (const key of this.keys) {
      midiVal = piaBegVal + Number(key.getAttribute('data-key'))
      this.midiKeys[midiVal] = key
      if (midiVal < setBegVal || midiVal > setEndVal) {
        key.style.display = 'none'
      } else {
        key.setAttribute('midi-val', midiVal.toString())
        this.posEvents.map((ev) => key.addEventListener(ev, self.handlePosEvent.bind(self)))
        this.offEvents.map((ev) => key.addEventListener(ev, self.handleOffEvent.bind(self)))
      }
    }
    this.centerPiano()
  }

  /**
   * When a piano key is pressed emit an event to be handled by the game
   */
  protected handlePosEvent(event: Event) {
    const keyElement = event.target as HTMLElement
    const midiVal = Number(keyElement.getAttribute('midi-val'))

    EventBus.$emit(EVENT_PIANO_KEY_PRESSED, midiVal, this.ignorePitch)
  }

  /**
   * When a piano key is relased, trigger the event only if the
   * key has been trigger by a guess
   */
  protected handleOffEvent(event: Event) {
    const keyElement = event.target as HTMLElement
    if (keyElement.getAttribute('class')) {
      const midiVal = Number(keyElement.getAttribute('midi-val'))
      this.keyOff(midiVal)
    }
  }

  /**
   * Receive the result of a guess and paint the key
   */
  protected guessResult(midiVal: number, correct: boolean) {
    this.midiKeys[midiVal].setAttribute('class',
      correct ? this.CORRECT_KEY_CLASS : this.WRONG_KEY_CLASS)
  }

  /**
   * Remove the guess result color from a key
   */
  protected keyOff(midiVal: number) {
    this.midiKeys[midiVal].setAttribute('class', '')
  }

  /**
   * After the unnecesary keys are removed, the main layer has a new width but
   * also has a left offset from the beggining of the canvas.
   * So first move the layer to the beginning and then
   * change the viewbox to match the new size so it will take
   * advantage of the free'd visual space (svg is not responsive like that)
   * @todo remove the hard coded height value
   */
  protected centerPiano() {
    const pianoLayer = this.svgDoc.getElementById('pianoLayer') as any
    if (pianoLayer) {
      const boxWidth = pianoLayer.getBBox().width
      const svgDoc = this.svgDoc.children[0] as any
      const translate = svgDoc.createSVGTransform()

      translate.setTranslate(-pianoLayer.getBBox().x, 0)
      pianoLayer.transform.baseVal.appendItem(translate)
      svgDoc.setAttribute('viewBox', '0 0 ' + (boxWidth) + ' 186.32299')

      /**
       * Firefox bug
       */
      const s = this.svgDoc as any
      s.rootElement.style.display = 'none'
      setTimeout(() => { s.rootElement.style.display = 'block' }, 100)
    }
  }

  protected beforeDestroy() {
    this.$off(EVENT_GUESS_RESULT)
    this.$off(EVENT_MIDI_DEV_KEY_RELEASED)
  }
}
</script>
<style lang="scss" scoped>
.svgCont {
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  height: 100%;
  overflow: hidden;
  #piano {
    @include media(">=tablet") {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
}

.imgResponsive {
  user-select: none;
  height: auto;
  width: 100vw;
  max-width: 900px;
  max-height: 200px;
}
</style>