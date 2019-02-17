import { GetterTree } from 'vuex'
import { StatsState } from './Types'
import { RootState } from '../../Types'

export const RIGHT_GUESSES = 'RIGHT_GUESSES'
export const WRONG_GUESSES = 'WRONG_GUESSES'
export const LEVEL = 'LEVEL'
export const PROGRESS = 'PROGRESS'

export const getters: GetterTree<StatsState, RootState> = {
    [RIGHT_GUESSES](state): number {
        return state.right
    },    
    [WRONG_GUESSES](state): number {
        return state.wrong
    },
    [PROGRESS](state, a: any, rootState: any): number {
        const mistakes = rootState.Settings.initialMistakesAllowed
        return mistakes - state.wrong + (state.right / 3)
    }
}
