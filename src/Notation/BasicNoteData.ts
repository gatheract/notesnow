import {PianoKey} from '@/Notation/NoteConstants'

/**
 * Modified is whether a note is(sharpened, flatened) or not
 * I don't know what the term is
 */
const BasicNoteData = {
  [PianoKey.C]: {mod: false},
  [PianoKey.C_MOD]: {mod: true},
  [PianoKey.D]: {mod: false},
  [PianoKey.D_MOD]: {mod: true},
  [PianoKey.E]: {mod: false},
  [PianoKey.F]: {mod: false},
  [PianoKey.F_MOD]: {mod: true},
  [PianoKey.G]: {mod: false},
  [PianoKey.G_MOD]: {mod: true},
  [PianoKey.A]: {mod: false},
  [PianoKey.A_MOD]: {mod: true},
  [PianoKey.B]: {mod: false}
}

/**
 * Returns if a note is a modified note
 * @param note 
 */
const getNoteMod = (note: PianoKey) => {
  return BasicNoteData[note].mod
}

export {BasicNoteData}
