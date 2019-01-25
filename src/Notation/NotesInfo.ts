import {PianoKey} from './NoteConstants'

const NOTES_INFO: { [index: number]: { sharp: boolean, flat: boolean } } = {
  [PianoKey.A]: { sharp: true, flat: true },
  [PianoKey.B]: { sharp: false, flat: true },
  [PianoKey.C]: { sharp: true, flat: false },
  [PianoKey.D]: { sharp: true, flat: true },
  [PianoKey.E]: { sharp: false, flat: true },
  [PianoKey.F]: { sharp: true, flat: false },
  [PianoKey.G]: { sharp: true, flat: true }
}

export { NOTES_INFO }
