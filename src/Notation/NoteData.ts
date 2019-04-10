import {Note, PianoKey, Alterations as Alt, PentegramNote as Pen} from '@/Notation/NoteConstants'
import {BasicNoteData} from '@/Notation/BasicNoteData'

/**
 * Returns whether a pitch note is flattened or sharpened or not
 * @param note 
 */
const getNotePitchMod = (note: Note): boolean => {
  const basicNote = NoteData[note].key  
  return BasicNoteData[basicNote].mod
}

export interface INoteData {
  key: PianoKey, natEnharmonic: boolean, alt: Alt, penNote: Pen, noteVal: number
}

export interface INoteDataObject {
  [index: string]: INoteData
}

interface INotePitch extends INoteData {
  pitch: string, /** string representation */
  midiValue: number /** midi ocnstant value */
  octave: number /** octave starting from 0 (lowest sound) */
}

/**
 * Constants for every possible note in an octave
 * value refers to the midi pitch constant in the specification
 * natEnharmonic is when a flt/sharp note is enharmonic with a natural note
 * key is the piano key to which the note belongs
 * alt is the note alteration if anyn
 * penNote is the note
 * noteval is something to get the midivalue
 * https://jythonmusic.me/api/midi-constants/pitch/
 * https://musescore.org/es/plugin-development/note-pitch-values
 */
const NoteData: INoteDataObject = {
  [Note.CF]: {key: PianoKey.B, natEnharmonic: true, alt: Alt.FLAT, penNote: Pen.C, noteVal: 0},
  [Note.C]: {key: PianoKey.C, natEnharmonic: false, alt: Alt.NATURAL, penNote: Pen.C, noteVal: 1},
  [Note.CS]: { key: PianoKey.C_MOD, natEnharmonic: false, alt: Alt.SHARP, penNote: Pen.C, noteVal: 2},
  [Note.DF]: { key: PianoKey.C_MOD, natEnharmonic: false, alt: Alt.FLAT, penNote: Pen.D, noteVal: 2},
  [Note.D]: { key: PianoKey.D, natEnharmonic: false, alt: Alt.NATURAL, penNote: Pen.D, noteVal: 3},
  [Note.DS]: { key: PianoKey.D_MOD, natEnharmonic: false, alt: Alt.SHARP, penNote: Pen.D, noteVal: 4},
  [Note.EF]: { key: PianoKey.D_MOD, natEnharmonic: false, alt: Alt.FLAT, penNote: Pen.E, noteVal: 4},
  [Note.E]: { key: PianoKey.E, natEnharmonic: false, alt: Alt.NATURAL, penNote: Pen.E , noteVal: 5},
  [Note.ES]: { key: PianoKey.F, natEnharmonic: true, alt: Alt.SHARP, penNote: Pen.E, noteVal: 6},
  [Note.FF]: { key: PianoKey.E, natEnharmonic: false, alt: Alt.FLAT, penNote: Pen.F, noteVal: 5},
  [Note.F]: { key: PianoKey.F, natEnharmonic: false, alt: Alt.NATURAL, penNote: Pen.F, noteVal: 6},
  [Note.FS]: { key: PianoKey.F_MOD, natEnharmonic: false, alt: Alt.SHARP, penNote: Pen.F, noteVal: 7},
  [Note.GF]: { key: PianoKey.F_MOD, natEnharmonic: false, alt: Alt.FLAT, penNote: Pen.G, noteVal: 7},
  [Note.G]: { key: PianoKey.G, natEnharmonic: false, alt: Alt.NATURAL, penNote: Pen.G, noteVal: 8},
  [Note.GS]: { key: PianoKey.G_MOD, natEnharmonic: false, alt: Alt.SHARP, penNote: Pen.G, noteVal: 9}, 
  [Note.AF]: { key: PianoKey.G_MOD, natEnharmonic: false, alt: Alt.FLAT, penNote: Pen.A, noteVal: 9},
  [Note.A]: { key: PianoKey.A, natEnharmonic: false, alt: Alt.NATURAL, penNote: Pen.A, noteVal: 10},
  [Note.AS]: { key: PianoKey.A_MOD, natEnharmonic: false, alt: Alt.SHARP, penNote: Pen.A, noteVal: 11},
  [Note.BF]: { key: PianoKey.A_MOD, natEnharmonic: false, alt: Alt.FLAT, penNote: Pen.B, noteVal: 11},
  [Note.B]: { key: PianoKey.B, natEnharmonic: false, alt: Alt.NATURAL, penNote: Pen.B, noteVal: 12},
  [Note.BS]: { key: PianoKey.C, natEnharmonic: true, alt: Alt.SHARP, penNote: Pen.B, noteVal: 13},
}

export const getNoteName = (note: Note) => {
  const str = Note[note]
  if (str.length < 2) {
    return str
  } else {
    let res = str.substr(0, 1)
    const sec = str.substr(1, 1)
    if (sec === 'F') {
      res += 'b'
    } else {
      res += '#'
    }
    return res
  }
}

export {getNotePitchMod, NoteData, INotePitch}
