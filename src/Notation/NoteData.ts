import {NotePitch, PianoKey, Alterations as Alt, PentegramNote as Pen} from '@/Notation/NoteConstants'
import {BasicNoteData} from '@/Notation/BasicNoteData'

/**
 * Returns whether a pitch note is flattened or sharpened or not
 * @param note 
 */
const getNotePitchMod = (note: NotePitch): boolean => {
  const basicNote = NoteData[note].key  
  return BasicNoteData[basicNote].mod
}

/**
 * 
 */
interface INoteData {
  key: PianoKey, natEnharmonic: boolean, alt: Alt, penNote: Pen, noteVal: number
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
 * alt is the note alteration if any
 * penNote is the note
 * noteval is something to get the midivalue
 * https://jythonmusic.me/api/midi-constants/pitch/
 * https://musescore.org/es/plugin-development/note-pitch-values
 */
const NoteData: { [key: string]: 
   INoteData } = {
  [NotePitch.CF]: {key: PianoKey.B, natEnharmonic: true, alt: Alt.flat, penNote: Pen.C, noteVal: 0},
  [NotePitch.C]: {key: PianoKey.C, natEnharmonic: false, alt: Alt.natural, penNote: Pen.C, noteVal: 1},
  [NotePitch.CS]: { key: PianoKey.C_MOD, natEnharmonic: false, alt: Alt.sharp, penNote: Pen.C, noteVal: 2},
  [NotePitch.DF]: { key: PianoKey.C_MOD, natEnharmonic: false, alt: Alt.flat, penNote: Pen.D, noteVal: 2},
  [NotePitch.D]: { key: PianoKey.D, natEnharmonic: false, alt: Alt.natural, penNote: Pen.D, noteVal: 3},
  [NotePitch.DS]: { key: PianoKey.D_MOD, natEnharmonic: false, alt: Alt.sharp, penNote: Pen.D, noteVal: 4},
  [NotePitch.EF]: { key: PianoKey.D_MOD, natEnharmonic: false, alt: Alt.flat, penNote: Pen.E, noteVal: 4},
  [NotePitch.E]: { key: PianoKey.E, natEnharmonic: false, alt: Alt.natural, penNote: Pen.E , noteVal: 5},
  [NotePitch.ES]: { key: PianoKey.F, natEnharmonic: true, alt: Alt.sharp, penNote: Pen.E, noteVal: 6},
  [NotePitch.FF]: { key: PianoKey.E, natEnharmonic: false, alt: Alt.flat, penNote: Pen.F, noteVal: 5},
  [NotePitch.F]: { key: PianoKey.F, natEnharmonic: false, alt: Alt.natural, penNote: Pen.F, noteVal: 6},
  [NotePitch.FS]: { key: PianoKey.F_MOD, natEnharmonic: false, alt: Alt.sharp, penNote: Pen.F, noteVal: 7},
  [NotePitch.GF]: { key: PianoKey.F_MOD, natEnharmonic: false, alt: Alt.flat, penNote: Pen.G, noteVal: 7},
  [NotePitch.G]: { key: PianoKey.G, natEnharmonic: false, alt: Alt.natural, penNote: Pen.G, noteVal: 8},
  [NotePitch.GS]: { key: PianoKey.G_MOD, natEnharmonic: false, alt: Alt.sharp, penNote: Pen.G, noteVal: 9}, 
  [NotePitch.AF]: { key: PianoKey.G_MOD, natEnharmonic: false, alt: Alt.flat, penNote: Pen.A, noteVal: 9},
  [NotePitch.A]: { key: PianoKey.A, natEnharmonic: false, alt: Alt.natural, penNote: Pen.A, noteVal: 10},
  [NotePitch.AS]: { key: PianoKey.A_MOD, natEnharmonic: false, alt: Alt.sharp, penNote: Pen.A, noteVal: 11},
  [NotePitch.BF]: { key: PianoKey.A_MOD, natEnharmonic: false, alt: Alt.flat, penNote: Pen.B, noteVal: 11},
  [NotePitch.B]: { key: PianoKey.B, natEnharmonic: false, alt: Alt.natural, penNote: Pen.B, noteVal: 12},
  [NotePitch.BS]: { key: PianoKey.C, natEnharmonic: true, alt: Alt.sharp, penNote: Pen.B, noteVal: 13},
}

/**
 * Generates all 222 notes with 127 values in the midi specification
 * from C_1 to G9
 */
const getAllNotes = () => { 
  let skipFlag = 0
  const allNotes = []
  const postFixList = [
    '_1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
  ]  
  
  let octave = 0
  for ( const post of postFixList) {
    const noteDataKeys = Object.keys(NoteData) 
    for (const key of noteDataKeys) {
      /**
       * Should have used slice @todo
       */
      if (++skipFlag < 2) { continue } // CF_1 doesnt exist
      let newData: INotePitch
      const newKey = NotePitch[Number(key)] + post // string C_1, C0, ... G9
      newData = Object.assign({}, Object(NoteData[key])) 
      newData.pitch = newKey
      /**
       * The midi value grows as the note it refers to changes
       * a lot of notes are enharmonics, so they are the same,
       * and the midi value shouldnt change
       * 12 is the size of max value each octave not counting
       * BS that is actually the first note of the next one
       */             
      newData.midiValue =  (octave * 12) + (newData.noteVal) - 1 
      newData.octave = octave
      
      allNotes.push(newData)      
      if (newKey === 'G9') { break }
    } 
    ++octave   
  }  
  
  return allNotes
}

const AllNotes = getAllNotes()

export {NoteData, getNotePitchMod, getAllNotes, AllNotes, INoteData, INotePitch}
