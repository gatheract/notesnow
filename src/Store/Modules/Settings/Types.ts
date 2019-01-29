export interface User {
  firstName: string
  lastName: string
  email: string
  phone?: string
}

export interface ProfileState {
  user?: User
  error: boolean
}

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
