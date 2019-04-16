import { SettingsState } from './Modules/Settings/Types'
import { StatsState } from './Modules/Stats/Types'
import { GameState } from './Modules/Game/Types'
import { PianoState } from './Modules/Piano/Types'

export interface RootState {
  version: string,
  Settings?: SettingsState,
  Stats?: StatsState,
  Game?: GameState,
  Piano?: PianoState
}
