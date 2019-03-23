import DrawingArea from '../Drawing/DrawingArea'
import StaffFactory from '../MusicElements/Staffs/StaffFactory'
import AbstractStaff from '../MusicElements/Staffs/AbstractStaff'
import ProgressMeter from '@/GameElements/ProgressMeter'
import LevelBanner from '@/GameElements/LevelBanner'
import Note from '../MusicElements/Notes/AbstractNote'
import PianoKeys from '../MusicElements/PianoOctave'
import {PianoKey} from '../Notation/NoteConstants'
import { EventBus, EVENT_PIANO_KEY_PRESSED, EVENT_PIANO_KEY_RELEASED,
  EVENT_MIDI_DEV_KEY_PRESSED, EVENT_MIDI_DEV_KEY_RELEASED
} from '@/EventBus'
import AllNotes from '../Notation/AllNotes'
import { GameStaff, GameType } from '@/Store/Modules/Settings/Types'
import GameStore from '@/Game/GameStore'
import NoteFactory from '@/MusicElements/Notes/NoteFactory'

export default class Game  {
  private lastTime: number
  private animFrame: number
  private running: boolean
  private activeNote?: Note
  private staff: AbstractStaff
  private pianoKeys: PianoKeys
  private levelRunning: boolean
  private progressMeter: ProgressMeter    
  private baseSpeed: number
  private speedIncrement: number
  private gameType: GameType
  private gameStaff: GameStaff  
  private keyUpListener: any
  private keyDownListener: any    
  private level = 0  
  
  public constructor() {
    this.gameStaff = GameStore.getStaffSelected()
    this.gameType = GameStore.getGameType()
    this.baseSpeed = GameStore.getBaseSpeed()
    this.speedIncrement = GameStore.getSpeedIncrement()
  }
  
  /**
   *
   * Let the games begin
   *
   */
  public start() {    
    DrawingArea.Instance.initialize()
    GameStore.setClearStats()
    AllNotes.getInstance().initialize(GameStore.getKeySignature())
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
    DrawingArea.Instance.destroy()
  }

  /**
   * Populate the svg drawing with all the necesary things of the game, staff, keyboard, etc
   */
  private fillScreen() {    
    this.drawStaff()
    this.drawPiano()
    this.drawProgressMeter()
  }

  /**
   * Attach keyboard listeners
   */
  private addKeyListeners() {
    document.addEventListener('keydown', this.keyDownListener, false)
    document.addEventListener('keyup', this.keyUpListener, false)
    EventBus.$on(EVENT_PIANO_KEY_PRESSED, this.handleNotePress.bind(this))
    EventBus.$on(EVENT_PIANO_KEY_RELEASED, this.handleNoteRelease.bind(this))
    EventBus.$on(EVENT_MIDI_DEV_KEY_PRESSED, this.handleMidiNotePress.bind(this))
    EventBus.$on(EVENT_MIDI_DEV_KEY_RELEASED, this.handleMidiNoteRelease.bind(this))
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
   * to display wrong/right guess behaviour
   * @param note
   */
  private handleNotePress(note: PianoKey) {
    if (this.activeNote) {
      const correct = this.checkCorrectGuess(note)
      this.pianoKeys.keyPress(note, correct)
  
      this.newGuess(correct)  
    }
    
  }

  private handleNoteRelease(note: PianoKey) {
    this.pianoKeys.keyRelease(note)
  }
  
  private handleMidiNotePress(midiValue: number, velocity: number) {
    for (const note of AllNotes.getInstance().notes) {
      if (note.midiValue === midiValue) {
        this.handleNotePress(note.key)   
        return
      }
    }    
    /**
     * @todo create data structure
     */
    throw new Error('Invalid note from the midi controller')
  }
  
  private handleMidiNoteRelease(midiValue: number) {
    for (const note of AllNotes.getInstance().notes) {
      if (note.midiValue === midiValue) {
        this.handleNoteRelease(note.key)   
        return
      }
    }
    throw new Error('Invalid note from the midi controller')  
  }

  /**
   * Return wheter or not the keypress corresponds to the active note
   * @param noteGuess
   */
  private checkCorrectGuess(noteGuess: PianoKey) {
    return noteGuess === this.activeNote!.getNoteRepresentation().key
  }

  /**
   * Show a text with the current level
   */
  private showLevelBanner() {
    return LevelBanner.draw(
      this.level, 
      DrawingArea.Instance.WINDOW_WIDTH / 2, 
      DrawingArea.Instance.WINDOW_HEIGHT / 2
      )
  }

  /**
   * Go to the next level and show a banner
   */
  private newLevel() {
    this.level++
    this.levelRunning = false
    return this.showLevelBanner().after(() => {
      this.levelRunning = true
    })
  }
  
  private newGuess(correct: boolean) {
    if (correct) {
      this.removeCurrentNote()
    } 
    GameStore.setNewGuess(correct)
  }

  /**
   * Deletes from screen the current note
   */
  private removeCurrentNote() {
    if (this.activeNote) {
      this.activeNote.destroy()
      this.activeNote = undefined
    }
  }

  /**
   * Check the boundaries of the staff for the current active note
   * if its
   */
  private checkActiveNote() {    
    if (this.activeNote) {
            
      const xPos = this.activeNote.getX()
      const xPosFade = xPos + this.activeNote.getNotePlusAlterationWidth() * 1.8
      if (
        (!this.activeNote.getFadingOut()) && 
        (this.staff.noteOutsideStaff(xPosFade))
      ) {
          this.activeNote.fadeOutNote()
      }
      if (this.staff.noteOutsideStaff(xPos)) {
        this.newGuess(false)
        this.removeCurrentNote()
      }
    }
  }
  
  /**
   * Adds a note to the staff
   */
  private addNewNote() {
    const NOTE_SIZE_RATIO = 0.45
    const notes = AllNotes.getInstance().notes
    const noteData = this.staff.getRandomNote()
    this.activeNote = NoteFactory.createNote(notes[noteData.allNotesIndex], this.staff)    
    this.activeNote.draw(this.staff.getPlayableArea(), noteData.yPosition, NOTE_SIZE_RATIO)
    this.activeNote.fadeIn(500)
  }

  /**
   * Main logic of the game, it gets called by the @see this.mainLoop
   * every frame
   *
   * @param dt
   */
  private handleGameLogic(dt: number) {
    if (this.levelRunning) {
      if (this.activeNote) {
        this.activeNote.moveX((this.level * this.speedIncrement) + this.baseSpeed)
      } else {
        this.addNewNote()
      }
      this.checkActiveNote()
    }
  }

  /**
   * Main loop of the game, it calls recursevely upon itself
   * to stop/start there's a flag @see this.running
   * @param ms
   */
  private mainLoop(ms: number) {
    if (!this.running) {
      return
    }

    if (this.lastTime) {
      this.handleGameLogic((ms - this.lastTime) / 1000)
    }

    this.lastTime = ms
    this.animFrame = requestAnimationFrame(this.mainLoop.bind(this))
  }  
  
  /**
   * Draws the piano keys on the bottom on the screen
   */
  private drawPiano() {
    this.pianoKeys = new PianoKeys()
    this.pianoKeys.draw(
      DrawingArea.Instance.WINDOW_WIDTH / 2 - this.pianoKeys.getWidth() / 2,
      DrawingArea.Instance.WINDOW_HEIGHT - this.pianoKeys.getHeight(),
      1
    )
  }
  
  /**
   * Draws the sheet staff
   */
  private drawStaff() {
    const Y_START = 150
    const X_START = 0
    this.staff = StaffFactory.createStaff(this.gameStaff)
    this.staff.draw(X_START, Y_START, DrawingArea.Instance.WINDOW_WIDTH, Note.NOTE_HEIGHT)    
  }
  
  /**
   * Draws a progress meter whe  practice mode is not on
   */
  private drawProgressMeter() {
    if (this.gameType === GameType.game) {
      this.progressMeter = new ProgressMeter()
      this.progressMeter.draw(DrawingArea.Instance.WINDOW_WIDTH / 2, 0)
    }
  }
}
