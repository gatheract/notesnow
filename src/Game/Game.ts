import ProgressMeter from '@/GameElements/ProgressMeter'
import {
  EventBus, EVENT_PIANO_KEY_PRESSED, EVENT_PIANO_KEY_RELEASED,
  EVENT_MIDI_DEV_KEY_PRESSED, EVENT_MIDI_DEV_KEY_RELEASED, EVENT_GUESS_RESULT
} from '@/EventBus'
import { GameType } from '@/Store/Modules/Settings/Types'
import GameStore from '@/Game/GameStore'
import PianoArea from '@/Drawing/PianoArea'
import StaffArea from '@/Drawing/StaffArea'
import ProgressArea from '@/Drawing/ProgressArea'
import { INotePitch } from '@/Notation/NoteData'

export default class Game {
  public static getInstance() {
    if (!this.instance) {
      this.instance = new this()
    }
    return this.instance
  }

  private static instance: Game

  private lastTime: number
  private animFrame: number
  private running: boolean

  private levelRunning: boolean
  private progressMeter: ProgressMeter
  private speed: number

  private gameType: GameType

  private keyUpListener: any
  private keyDownListener: any
  private level = 0
  private progressArea: ProgressArea
  private staffArea: StaffArea
  private pianoArea: PianoArea

  private constructor() { }

  /**
   *
   * Let the games begin
   *
   */
  public start() {
    GameStore.setClearStats()
    GameStore.initializeNotes()

    this.gameType = GameStore.getGameType()
    this.speed = GameStore.getSpeed()
    this.addKeyListeners()
    this.running = true
    this.fillScreen()

    if (this.gameType === GameType.game) {
      this.newLevel()
    } else {
      this.levelRunning = true
    }

    this.mainLoop(0)
  }

  /**
   * Finisih the game
   */
  public stop() {
    this.running = false
    this.removeKeyListeners()
    this.staffArea.destroy()
  }

  public setPaused(paused: boolean) {
    this.running = paused
  }

  public updateSpeed() {
    this.speed = GameStore.getSpeed()
  }

  /**
   * Populate the svg drawing with all the necesary things of the game, staff, keyboard, etc
   */
  private fillScreen() {
    this.drawStaff()
    this.drawProgressMeter()
  }

  /**
   * Attach keyboard listeners
   */
  private addKeyListeners() {
    document.addEventListener('keydown', this.keyDownListener, false)
    document.addEventListener('keyup', this.keyUpListener, false)
    EventBus.$on(EVENT_PIANO_KEY_PRESSED, this.handleNotePress.bind(this))
    EventBus.$on(EVENT_MIDI_DEV_KEY_PRESSED, this.handleMidiNotePress.bind(this))
  }

  /**
   * Remove the keyboard listeners for overhead
   */
  private removeKeyListeners() {
    EventBus.$off(EVENT_PIANO_KEY_PRESSED)
    EventBus.$off(EVENT_PIANO_KEY_RELEASED)
    EventBus.$off(EVENT_MIDI_DEV_KEY_PRESSED)
    EventBus.$off(EVENT_MIDI_DEV_KEY_RELEASED)
  }

  /**
   * Use the note pressed (by keyboard/touch/click)
   * to display wrong/right guess result
   */
  private handleNotePress(midiVal: number, ignorePitch: boolean) {
    const notes = GameStore.getNaturalPitches()
    const note = Object.values(notes).find((i) => i.midiValue === midiVal)
    if (note) {
      const correct = this.staffArea.getActiveNote()
        ? this.checkCorrectGuess(note, ignorePitch) : false

      EventBus.$emit(EVENT_GUESS_RESULT, midiVal, correct)
    } else {
      /**
       * Don't throw an error, midi keyboards can be configured in an octave to high or low
       * and out of the piano range 
       */

      EventBus.$emit(EVENT_GUESS_RESULT, midiVal, false)
      console.error('Note not found', midiVal)
    }
  }

  private handleMidiNotePress(midiValue: number, velocity: number) {
    this.handleNotePress(midiValue, false)
  }

  /**
   * Return wheter or not the keypress corresponds to the active note
   * Ignore pitch indicates whether the current note has to match the octave
   * or not (used with the mini keyboard)
   */
  private checkCorrectGuess(noteGuess: INotePitch, ignorePitch: boolean) {

    const an = this.staffArea.getActiveNote()
    if (an) {
      if (ignorePitch) {
        return noteGuess.key === an.getNoteRepresentation().key
      } else {
        return noteGuess.midiValue === an.getNoteRepresentation().midiValue
      }
    }
    return false
  }

  /**
   * Go to the next level and show a banner
   */
  private newLevel() {
    this.level++
    this.levelRunning = false
    this.levelRunning = true
  }

  /**
   * Main logic of the game, it gets called by the @see this.mainLoop
   * every frame
   *
   * @param dt
   */
  private handleGameLogic(dt: number) {

    if (this.levelRunning) {
      const activeNote = this.staffArea.getActiveNote()
      if (activeNote) {
        activeNote.moveX(this.speed)
      } else {
        this.staffArea.addNewNote()
      }
      this.staffArea.checkActiveNote()
    }
  }

  /**
   * Main loop of the game, it calls recursevely upon itself
   * to stop/start there's a flag @see this.running
   * @param ms
   */
  private mainLoop(ms: number) {
    if (this.running) {
      if (this.lastTime) {
        this.handleGameLogic((ms - this.lastTime) / 1000)
      }
    }

    this.lastTime = ms
    this.animFrame = requestAnimationFrame(this.mainLoop.bind(this))
  }

  /**
   * Draws the sheet staff
   */
  private drawStaff() {
    this.staffArea = new StaffArea()
    this.staffArea.draw()
  }

  /**
   * Draws a progress meter whe  practice mode is not on
   */
  private drawProgressMeter() {
    this.progressArea = new ProgressArea()
    if (this.gameType === GameType.game) {
      this.progressMeter = new ProgressMeter(this.progressArea)
      this.progressMeter.draw(this.progressArea.WINDOW_WIDTH / 2, 0)
    }
  }

}
