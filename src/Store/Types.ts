import { SettingsState } from './Modules/Settings/Types'
import { StatsState } from './Modules/Stats/Types'
import { GameState } from './Modules/Game/Types'

export interface RootState {
  version: string,
  Settings?: SettingsState,
  Stats?: StatsState,
  Game?: GameState
}
