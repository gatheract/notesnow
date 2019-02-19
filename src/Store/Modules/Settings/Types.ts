
export enum DifficultyLevel {
  easy,
  hard,
  custom
}

export enum GameStaff {
  gStaff,
  fStaff,
  both
}

export interface SettingsState {
  difficultyLevel: DifficultyLevel
  staffSelected: GameStaff,
  initialMistakesAllowed: number,
  notesPerLevel: number,
  baseSpeed: number,
  speedIncrement: number
}
