import { SettingsState } from './Modules/Settings/Types'
import { StatsState } from './Modules/Stats/Types'

export interface RootState {
  version: string,
  Settings?: SettingsState,
  Stats?: StatsState
}
