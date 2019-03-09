
import { INoteData} from '@/Notation/NoteData'
import { Alterations } from '@/Notation/NoteConstants'
import AbstractStaff from '@/MusicElements/Staffs/AbstractStaff'
import NoteNatural from './NoteNatural'
import NoteSharp from './NoteSharp'
import NoteFlat from './NoteFlat'

export default class NoteFactory {
  public static createNote(note: INoteData, staff: AbstractStaff) {
    switch (note.alt) {
      case Alterations.natural:
        return new NoteNatural(note, staff)
      case Alterations.sharp:
        return new NoteSharp(note, staff)
      case Alterations.flat:
        return new NoteFlat(note, staff)
      default:
        throw new Error('Invalid note')
    }
  }
}
