import AbstractDrawingArea from './AbstractDrawingArea'
import AbstractStaff from '../MusicElements/Staffs/AbstractStaff'
import StaffFactory from '../MusicElements/Staffs/StaffFactory'
import GameStore from '@/Game/GameStore'
import { GameStaff, GameType } from '@/Store/Modules/Settings/Types'
import Note from '../MusicElements/Notes/AbstractNote'
import NoteFactory from '@/MusicElements/Notes/NoteFactory'
import { EventBus, EVENT_GUESS_RESULT } from '@/EventBus'
export default class StaffArea extends AbstractDrawingArea {
  public readonly WINDOW_WIDTH = 1100
  public readonly WINDOW_HEIGHT = 900
  private staff: AbstractStaff
  private gameStaff: GameStaff
  private activeNote?: Note

  public constructor() {
    super('staffArea')
    this.drawing.viewbox(0, 0, this.WINDOW_WIDTH, this.WINDOW_HEIGHT)
    this.drawing.attr('preserveAspectRatio', 'xMidYMax meet')
    EventBus.$on(EVENT_GUESS_RESULT, this.newGuess.bind(this))
  }

  public draw() {
    this.gameStaff = GameStore.getStaffSelected()
    const Y_START = 300
    const X_START = 0
    this.staff = StaffFactory.createStaff(this.gameStaff, this)
    this.staff.draw(X_START, Y_START, this.WINDOW_WIDTH, Note.NOTE_HEIGHT)
  }

  /**
   * Adds a note to the staff
   */
  public addNewNote() {
    const NOTE_SIZE_RATIO = 0.45
    const noteData = this.staff.getRandomNote()
    this.activeNote = NoteFactory.createNote(noteData.notePitch, this.staff)
    this.activeNote.draw(this.staff.getPlayableArea(), noteData.yPosition, NOTE_SIZE_RATIO)
    this.activeNote.fadeIn(500)
    GameStore.setActivePitch(noteData.notePitch)
  }

  public getStaff() {
    return this.staff
  }

  public getActiveNote() {
    return this.activeNote
  }

  /**
   * Check the boundaries of the staff for the current active note
   * if its
   */
  public checkActiveNote() {
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
        this.newGuess(0, false)
        this.removeCurrentNote()
      }
    }
  }

  public newGuess(midiVal: number, correct: boolean) {
    if (correct) {
      this.removeCurrentNote()
    }
    GameStore.setNewGuess(correct)
  }

  public destroy() {
    super.destroy()
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

}
