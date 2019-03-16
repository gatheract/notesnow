
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
  midiInputId: string
}
