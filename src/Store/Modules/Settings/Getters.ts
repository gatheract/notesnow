import { GetterTree } from 'vuex'
import { SettingsState } from './Types'
import { RootState } from '../../Types'
import {GameType, GameStaff} from './Types'

export const GAME_TYPE = 'GAME_TYPE'
export const STAFF_SELECTED = 'STAFF_SELECTED'
export const INITIAL_MISTAKES_ALLOWED = 'INITIAL_MISTAKES_ALLOWED'
export const BASE_SPEED = 'BASE_SPEED'
export const SPEED_INCREMENT = 'SPEED_INCREMENT'

export const getters: GetterTree<SettingsState, RootState> = {
    [GAME_TYPE](state): GameType {
        return state.gameType
    },    
    [STAFF_SELECTED](state): GameStaff {
        return state.staffSelected
    },
    [INITIAL_MISTAKES_ALLOWED](state): number {
        return state.initialMistakesAllowed
    },
    [BASE_SPEED](state): number {
        return state.baseSpeed
    },
    [SPEED_INCREMENT](state): number {
        return state.speedIncrement
    },
}
