
export enum GameType {
  game,
  practice
}

export enum GameStaff {
  gStaff,
  fStaff,
  both
}

export interface SettingsState {
  gameType: GameType
  staffSelected: GameStaff,
  initialMistakesAllowed: number,
  notesPerLevel: number,
  baseSpeed: number,
  speedIncrement: number
}
