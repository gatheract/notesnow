
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
  staffSelected: GameStaff
}
