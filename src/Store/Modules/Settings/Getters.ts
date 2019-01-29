import { GetterTree } from 'vuex'
import { SettingsState } from './Types'
import { RootState } from '../../Types'
import {DifficultyLevel, GameStaff} from './Types'

export const DIFFICULTY_LEVEL = 'DIFFICULTY_LEVEL'

export const getters: GetterTree<SettingsState, RootState> = {
    [DIFFICULTY_LEVEL](state): DifficultyLevel {
        return state.difficultyLevel
    },    
    staffSelected(state): GameStaff {
        return state.staffSelected
    }
    
}
