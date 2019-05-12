import { KeySignaturesIndex } from '@/Notation/KeySignatures'

export enum GameType {
  game,
  practice
}

export enum GameStaff {
  gStaff,
  fStaff,
  both
}

export enum MidiStatus {
  INITIALIZING,
  AVAILABLE,
  FAILED
}

export interface StaffInterval {
  [index: number]: { startPitch: string, endPitch: string }
}

export interface SettingsState {
  gameType: GameType
  staffSelected: GameStaff,
  initialMistakesAllowed: number,
  notesPerLevel: number,
  baseSpeed: number,
  speedIncrement: number,
  useAllNotesGuesses: boolean,
  enableMidi: boolean,
  midiAvailable: MidiStatus,
  midiInputId: string,
  keySignature: KeySignaturesIndex | null,
  staffIntervals: StaffInterval,
  sound: boolean
}

export const defaultIntervals: StaffInterval = {
  [GameStaff.both]: {
    startPitch: 'A1',
    endPitch: 'F6',
  },
  [GameStaff.gStaff]: {
    startPitch: 'E3',
    endPitch: 'F6',
  },
  [GameStaff.fStaff]: {
    startPitch: 'A1',
    endPitch: 'G4',
  },
}
