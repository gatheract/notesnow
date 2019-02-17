import { GetterTree } from 'vuex'
import { SettingsState } from './Types'
import { RootState } from '../../Types'
import {DifficultyLevel, GameStaff} from './Types'

export const DIFFICULTY_LEVEL = 'DIFFICULTY_LEVEL'
export const STAFF_SELECTED = 'STAFF_SELECTED'
export const INITIAL_MISTAKES_ALLOWED = 'INITIAL_MISTAKES_ALLOWED'

export const getters: GetterTree<SettingsState, RootState> = {
    [DIFFICULTY_LEVEL](state): DifficultyLevel {
        return state.difficultyLevel
    },    
    [STAFF_SELECTED](state): GameStaff {
        return state.staffSelected
    },
    [INITIAL_MISTAKES_ALLOWED](state): number {
        return state.initialMistakesAllowed
    }
}
