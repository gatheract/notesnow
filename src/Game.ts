import DrawingArea from './DrawingArea'
import Staff from './MusicElements/Staff'
import Note from './MusicElements/Note'
import PianoKeys from './PianoOctave'
import KeyboardHelper from './KeyboardHelper'
import {PianoKey} from './Notation/NoteConstants'
import { NOTES_INFO } from './Notation/NotesInfo'
import NotesGenerator from './Notation/NotesGenerator'
import { EventBus, EVENT_PIANO_KEY_PRESSED, EVENT_PIANO_KEY_RELEASED } from '@/EventBus'
import { AllNotes } from './Notation/NoteData'
const PIANO_PRESSED_EVENT = 'pianopressed'
const PIANO_RELEASED_EVENT = 'pianoreleased'

export default class Game {
  protected lastTime: number
  protected animFrame: number
  protected running: boolean
  protected activeNote?: Note
  protected staff: Staff
  protected pianoKeys: PianoKeys
  protected levelRunning: boolean
  private readonly GUESSES_PER_LEVEL = 2
  private readonly NOTE_BASE_SPEED = 2
  private readonly NOTE_SPEED_INCREMENT = 0.5

  private stats: {
    right: number
    wrong: number
  } = {
      right: 0,
      wrong: 0
    }
  private level = 0  

  private notesKeyEquivalents: { [key: string]: PianoKey } = {
    Z: PianoKey.C,
    S: PianoKey.C_MOD,
    X: PianoKey.D,
    D: PianoKey.D_MOD,
    C: PianoKey.E,
    V: PianoKey.F,
    G: PianoKey.F_MOD,
    B: PianoKey.G,
    H: PianoKey.G_MOD,
    N: PianoKey.A,
    J: PianoKey.A_MOD,
    M: PianoKey.B
  }

  /**
   *
   * Let the games begin
   *
   */
  public start() {
    this.addKeyListeners()
    this.running = true
    this.fillScreen()
    this.newLevel()
    this.mainLoop(0)
  }

  /**
   * Finisih the game
   */
  public stop() {
    this.running = false
    this.removeKeyListeners()
  }

  /**
   * Populate the svg drawing with all the necesary things of the game, staff, keyboard, etc
   */
  private fillScreen() {
    const dArea = DrawingArea.Instance
    this.staff = new Staff()
    this.pianoKeys = new PianoKeys()
    this.staff.draw(0, 100, dArea.WINDOW_WIDTH, Note.NOTE_HEIGHT)
    this.pianoKeys.draw(
      dArea.WINDOW_WIDTH / 2 - this.pianoKeys.width / 2,
      dArea.WINDOW_HEIGHT - this.pianoKeys.height,
      1
    )
  }

  /**
   * Attach keyboard listeners
   */
  private addKeyListeners() {
    document.addEventListener('keydown', (this.handleKeyDown.bind(this)), false)
    document.addEventListener('keyup', this.handleKeyUp.bind(this), false)
    EventBus.$on(EVENT_PIANO_KEY_PRESSED, this.handleNotePress.bind(this))
    EventBus.$on(EVENT_PIANO_KEY_RELEASED, this.handleNoteRelease.bind(this))
  }

  /**
   * Remove the keyboard listeners for overhead
   */
  private removeKeyListeners() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this), false)
    document.removeEventListener('keyup', this.handleKeyUp.bind(this), false)
  }
  
  /**
   * Grab the release of the key, mostly to update the drawing of the piano keyboard
   * @param event
   */
  private handleKeyUp(event: KeyboardEvent) {
    const note = this.notesKeyEquivalents[event.key.toUpperCase()]
    this.handleNoteRelease(note)
  }

  /**
   * Grab the keypress and check if the note is right or wrong
   * @param event
   */
  private handleKeyDown(event: KeyboardEvent) {
    const note = this.notesKeyEquivalents[event.key.toUpperCase()]
    this.handleNotePress(note)
  }

  /**
   * Use the note pressed (by keyboard/touch/click)
   * to display wrong/right guess behaviour
   * @param note
   */
  private handleNotePress(note: PianoKey) {
    const correct = this.checkCorrectGuess(note)
    this.pianoKeys.keyPress(note, correct)

    correct ? this.rightGuess() : this.wrongGuess()

    this.checkCurrentLevel()
  }

  private handleNoteRelease(note: PianoKey) {
    this.pianoKeys.keyRelease(note)
  }

  /**
   * Return wheter or not the keypress corresponds to the active note
   * @param noteGuess
   */
  private checkCorrectGuess(noteGuess: PianoKey) {
    return noteGuess === this.activeNote!.getNoteRepresentation.key
  }



  /**
   * After enough right guesses go to a new level
   */
  private checkCurrentLevel() {
    if (!((this.stats.right) % (this.GUESSES_PER_LEVEL * this.level)) && this.stats.right) {
      this.newLevel()
    }
  }

  /**
   * Show a text with the current level
   */
  private showLevelBanner() {
    const width = 400
    const height = 150

    const text = DrawingArea.Instance.area
      .text('Level ' + this.level)
      .font({ family: 'Arial', size: 70, leading: '1.5em' })
      .opacity(0)
    text.x(DrawingArea.Instance.WINDOW_WIDTH / 2 - text.bbox().w / 2)
    text.y(DrawingArea.Instance.WINDOW_HEIGHT / 2 - text.bbox().h / 2)

    text.animate().attr({ opacity: 1 })
    return text.animate().attr({ opacity: 0 })
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

  /**
   * Correct try removes the note
   */
  private rightGuess() {
    this.stats.right++
    this.removeCurrentNote()
  }

  /**
   * Wrong guess or when the note exits the staff
   */
  private wrongGuess() {
    this.stats.wrong++
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
      
      // kconsole.log(this.activeNote.width, this.staff.xEnd)
      if (
        (!this.activeNote.fadingOut) 
        && (this.activeNote.x() > this.staff.xEnd - (this.activeNote.width * 3))) {
          this.activeNote.fadeOutNote()
      }
      
      if (this.activeNote.x() + this.activeNote.width > this.staff.xEnd) {
        this.wrongGuess()
        this.removeCurrentNote()
      }
    }
  }

  
  /**
   * Adds a note to the staff
   */
  private addNewNote() {
    let note: PianoKey
      
    let noteData = this.staff.getRandomNote()
    this.activeNote = new Note(AllNotes[noteData.allNotesIndex])   
    
    this.activeNote.draw(
      30,
      noteData.yPosition,
      0.45,
    )
    
    console.log(this.activeNote.width, AllNotes[noteData.allNotesIndex].pitch)
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
        this.activeNote.moveX((this.level * this.NOTE_SPEED_INCREMENT) + this.NOTE_BASE_SPEED)
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
}
