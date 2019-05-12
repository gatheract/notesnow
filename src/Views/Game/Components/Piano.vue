<template>
  <div class="svgCont">
    <object id="piano" class="imgResponsive" type="image/svg+xml" :data="imgPath"/>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { PitchesCollection } from '@/Notation/Pitches'
const pianoModule = namespace('Piano')
const gameModule = namespace('Game')
import { GAME_TYPE, STAFF_SELECTED } from '@/Store/Modules/Settings/Getters'
import {  GET_BLUR_UNNECESARY, GET_MARK_OCTAVE,
  GET_HIGH_CORRECT, GET_HIGH_ATTEMPT_CORRECT} from '@/Store/Modules/Piano/Getters'
import { GET_NATURAL_PITCHES, GET_ACTIVE_PITCH } from '@/Store/Modules/Game/Getters'
import { GameType, GameStaff } from '@/Store/Modules/Settings/Types'
const pianoSVG = require('@/assets/images/piano.svg2')
import {  EventBus, EVENT_PIANO_KEY_PRESSED,
  EVENT_PIANO_KEY_RELEASED, EVENT_GUESS_RESULT,
  EVENT_MIDI_DEV_KEY_RELEASED} from '@/EventBus'

import GameStore from '@/Game/GameStore'
import Game from '@/Game/Game'
import { EDefaultPianoLayouts, PianoLayouts } from '@/Piano/PianoLayouts'
import { INotePitch } from '../../../Notation/NoteData'

@Component
export default class Piano extends Vue {

  get imgPath(): string {
    return pianoSVG
  }
  protected svgDoc: Document
  protected keys: HTMLCollectionOf<SVGRectElement>
  protected midiKeys: SVGRectElement[] = []
  protected posEvents = ['mousedown', 'touchstart']
  protected offEvents = ['mouseup', 'mouseout', 'touchleave', 'touchend', 'touchcancel']
  protected readonly WRONG_KEY_CLASS = 'incorrect'
  protected readonly CORRECT_KEY_CLASS = 'correct'
  protected readonly DISABLED_KEY_CLASS = 'disabled'
  protected readonly HIGH_CORRECT_KEY_CLASS = 'highCorrect'
  protected readonly MARK_OCTAVE_COLOR = '#e67e22'
  protected ignorePitch: boolean = false
  protected octaveStartLine: SVGLineElement
  protected octaveEndLine: SVGLineElement
  protected highlightedKey: SVGRectElement

  @gameModule.Getter(GET_NATURAL_PITCHES) protected notes: PitchesCollection
  @gameModule.Getter(GET_ACTIVE_PITCH) protected activePitch: INotePitch | null
  @pianoModule.Getter(GET_BLUR_UNNECESARY) protected blur: boolean
  @pianoModule.Getter(GET_MARK_OCTAVE) protected markOctave: boolean
  @pianoModule.Getter(GET_HIGH_CORRECT) protected highCorrect: boolean
  @pianoModule.Getter(GET_HIGH_ATTEMPT_CORRECT) protected highCorrectAttempt: boolean

  @Watch('activePitch')
  public onPropertyChanged() {
    this.markOctaveHandler()
    this.highCorrectHandler()
  }

  public beforeDestroy() {
    this.$off(EVENT_GUESS_RESULT)
    this.$off(EVENT_MIDI_DEV_KEY_RELEASED)
  }

  protected highCorrectHandler() {
    const pitch = this.activePitch

    if (this.highlightedKey) {
      this.highlightedKey.classList.remove(this.HIGH_CORRECT_KEY_CLASS)
    }
    if (this.highCorrect && pitch && this.midiKeys[pitch.midiValue]) {
      this.highlightedKey = this.midiKeys[pitch.midiValue]
      this.highlightedKey.classList.add(this.HIGH_CORRECT_KEY_CLASS)
    }
  }

  /**
   * Mark the start and end of the octave of the current note with a vertical line
   */
  protected markOctaveHandler() {
    const pitch = this.activePitch
    if (this.markOctave && pitch) {
      if (this.midiKeys[pitch.midiValue]) {
        const layout = EDefaultPianoLayouts.keys88
        const octave = 12
        const startOctave = this.notes[PianoLayouts[layout].startPitch].midiValue
        const endOctave = this.notes[PianoLayouts[layout].endPitch].midiValue

        const startSubs = pitch.midiValue - pitch.key
        const endSubs = pitch.midiValue + (octave - pitch.key - 1) + 1

        const startIndex = startSubs >= startOctave ? startSubs : startOctave
        const endIndex = endSubs <= endOctave ? endSubs : endOctave
        if (this.octaveStartLine) {
          this.octaveStartLine.remove()
        }
        if (this.octaveEndLine) {
          this.octaveEndLine.remove()
        }
        this.octaveStartLine = this.createOctaveLine(this.midiKeys[startIndex])
        this.octaveEndLine = this.createOctaveLine(this.midiKeys[endIndex])
      }
    }
  }

  protected mounted() {
    const pianoDOM = document.getElementById('piano') as HTMLObjectElement

    EventBus.$on(EVENT_GUESS_RESULT, this.guessResult.bind(this))
    EventBus.$on(EVENT_MIDI_DEV_KEY_RELEASED, this.keyOff.bind(this))

    if (pianoDOM) {
      pianoDOM.addEventListener('load', () => {
        this.svgDoc = pianoDOM.contentDocument as Document
        this.keys = this.svgDoc.getElementsByTagName('rect') as any
        this.initializePiano()
        // this.centerPiano()
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
  protected initializePiano() {
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
      key.setAttribute('midi-val', midiVal.toString())

      /**
       * Blur non relevant keys
       */
      if (this.blur) {
        if (midiVal < setBegVal || midiVal > setEndVal) {
          key.classList.add(this.DISABLED_KEY_CLASS)
        }
      }

      this.posEvents.map((ev) => key.addEventListener(ev, self.handlePosEvent.bind(self)))
      this.offEvents.map((ev) => key.addEventListener(ev, self.handleOffEvent.bind(self)))
    }
    this.markOctaveHandler()
    this.highCorrectHandler()
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
      EventBus.$emit(EVENT_PIANO_KEY_RELEASED, midiVal, this.ignorePitch)
    }
  }

  /**
   * Receive the result of a guess and paint the key
   */
  protected guessResult(midiVal: number, correct: boolean) {

    this.midiKeys[midiVal].classList.add(
      correct ? this.CORRECT_KEY_CLASS : this.WRONG_KEY_CLASS
    )
    this.highlightAttempt(correct)
  }

  protected highlightAttempt(correct: boolean) {
    if (this.highCorrectAttempt) {
      const pitch = this.activePitch
      if (correct) {
        if (this.highlightedKey) {
          this.highlightedKey.classList.remove(this.HIGH_CORRECT_KEY_CLASS)
        }
      } else {
        if (pitch && this.midiKeys[pitch.midiValue]) {
          this.highlightedKey = this.midiKeys[pitch.midiValue]
          this.highlightedKey.classList.add(this.HIGH_CORRECT_KEY_CLASS)
        }
      }
    }
  }

  /**
   * Remove the guess result color from a key
   */
  protected keyOff(midiVal: number) {
    this.midiKeys[midiVal].classList.remove(this.CORRECT_KEY_CLASS)
    this.midiKeys[midiVal].classList.remove(this.WRONG_KEY_CLASS)
  }

  /**
   * Creates a vertical line from the beginning coordinates of a key
   */
  protected createOctaveLine(key: SVGRectElement) {
    const x = key.getBBox().x
    const svgns = 'http://www.w3.org/2000/svg'
    const line = document.createElementNS(svgns, 'line')

    line.setAttributeNS(null, 'x1', x.toString())
    line.setAttributeNS(null, 'x2', x.toString())
    line.setAttributeNS(null, 'y1', '-50')
    line.setAttributeNS(null, 'y2', '500')
    line.setAttributeNS(null, 'stroke', this.MARK_OCTAVE_COLOR)
    line.setAttributeNS(null, 'stroke-width', '13px')
    if (key.parentNode) {
      key.parentNode.appendChild(line)
    }

    return line
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