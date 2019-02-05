
export enum DifficultyLevel {
  easy,
  hard,
  custom
}

export enum GameStaff {
  gStaff,
  cStaff,
  both
}

export interface SettingsState {
  difficultyLevel: DifficultyLevel
  staffSelected: GameStaff
}
