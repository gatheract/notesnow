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
  key: PianoKey, natEnharmonic: boolean, alt: Alt, penNote: Pen
}

interface INotePitch extends INoteData {
  pitch: string, /** string representation */
  midiValue: number /** midi ocnstant value */
  octave: number
}

/**
 * Constants for every possible note in an octave
 * value refers to the midi pitch constant in the specification
 * natEnharmonic is when a flt/sharp note is enharmonic with a natural note
 * key is the piano key to which the note belongs
 * alt is the note alteration if any
 * penNote is the note
 * https://jythonmusic.me/api/midi-constants/pitch/
 * https://musescore.org/es/plugin-development/note-pitch-values
 */
const NoteData: { [key: string]: 
   INoteData } = {
  [NotePitch.CF]: {key: PianoKey.B, natEnharmonic: true, alt: Alt.flat, penNote: Pen.C},
  [NotePitch.C]: {key: PianoKey.C, natEnharmonic: false, alt: Alt.natural, penNote: Pen.C},
  [NotePitch.CS]: { key: PianoKey.C_MOD, natEnharmonic: false, alt: Alt.sharp, penNote: Pen.C},
  [NotePitch.DF]: { key: PianoKey.C_MOD, natEnharmonic: false, alt: Alt.flat, penNote: Pen.D},
  [NotePitch.D]: { key: PianoKey.D, natEnharmonic: false, alt: Alt.natural, penNote: Pen.D},
  [NotePitch.DS]: { key: PianoKey.D_MOD, natEnharmonic: false, alt: Alt.sharp, penNote: Pen.D},
  [NotePitch.EF]: { key: PianoKey.D_MOD, natEnharmonic: false, alt: Alt.flat, penNote: Pen.E},
  [NotePitch.E]: { key: PianoKey.E, natEnharmonic: false, alt: Alt.natural, penNote: Pen.E},
  [NotePitch.ES]: { key: PianoKey.F, natEnharmonic: true, alt: Alt.sharp, penNote: Pen.E},
  [NotePitch.FF]: { key: PianoKey.E, natEnharmonic: false, alt: Alt.flat, penNote: Pen.F},
  [NotePitch.F]: { key: PianoKey.F, natEnharmonic: false, alt: Alt.natural, penNote: Pen.F},
  [NotePitch.FS]: { key: PianoKey.F_MOD, natEnharmonic: false, alt: Alt.sharp, penNote: Pen.F},
  [NotePitch.GF]: { key: PianoKey.F_MOD, natEnharmonic: false, alt: Alt.flat, penNote: Pen.G},
  [NotePitch.G]: { key: PianoKey.G, natEnharmonic: false, alt: Alt.natural, penNote: Pen.G},
  [NotePitch.GS]: { key: PianoKey.G_MOD, natEnharmonic: false, alt: Alt.sharp, penNote: Pen.G}, 
  [NotePitch.AF]: { key: PianoKey.G_MOD, natEnharmonic: false, alt: Alt.flat, penNote: Pen.A},
  [NotePitch.A]: { key: PianoKey.A, natEnharmonic: false, alt: Alt.natural, penNote: Pen.A},
  [NotePitch.AS]: { key: PianoKey.A_MOD, natEnharmonic: false, alt: Alt.sharp, penNote: Pen.A},
  [NotePitch.BF]: { key: PianoKey.A_MOD, natEnharmonic: false, alt: Alt.flat, penNote: Pen.B},
  [NotePitch.B]: { key: PianoKey.B, natEnharmonic: false, alt: Alt.natural, penNote: Pen.B},
  [NotePitch.BS]: { key: PianoKey.C, natEnharmonic: true, alt: Alt.sharp, penNote: Pen.B},
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
  let midiValue = 0
  let lastPianoKey = PianoKey.C
  
  for ( const post of postFixList) {
    let i = 0  
    const noteDataKeys = Object.keys(NoteData)
    for (const key of noteDataKeys) {
      ++i
      if (++skipFlag < 2) { continue } // CF_1 doesnt exist
      let newData: INotePitch
      const newKey = NotePitch[Number(key)] + post
      newData = Object.assign({}, Object(NoteData[key])) 
      newData.pitch = newKey
      /**
       * The midi value grows as the note it refers to changes
       * a lot of notes are enharmonics, so they are the same,
       * and the midi value shouldnt change
       * piano key is good enough for detecting this
       */
      if (newData.key !== lastPianoKey) {
        /**
         * Hack to make this work, i when its C or when the octave changes and its 0
         * should increase the midivalue even though the pianokey is less than the one before
         */
        midiValue += (newData.key < lastPianoKey) && (i !== 1) && (i !== noteDataKeys.length ) ? -1 : 1
      }
      newData.midiValue = midiValue    
      lastPianoKey = newData.key
      
      allNotes.push(newData)      
      if (newKey === 'G9') { break }
    }    
  }
  return allNotes
}

const AllNotes = getAllNotes()

export {NoteData, getNotePitchMod, getAllNotes, AllNotes, INoteData, INotePitch}
