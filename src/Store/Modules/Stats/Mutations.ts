import { MutationTree } from 'vuex'
import { StatsState } from './Types'
import { GAME_SCORE_CHANGE, EventBus } from '@/EventBus'

export const MUT_NEW_TRY = 'MUT_TRY'
export const MUT_LEVEL = 'MUT_LEVEL'
export const MUT_CLEAR_STATS = 'MUT_CLEAR_STATS'

export const mutations: MutationTree<StatsState> = {
    [MUT_NEW_TRY](state, right: boolean) {
        
        if (right === true) {
            state.right += 1
        } else {
            state.wrong += 1
        }
        EventBus.$emit(GAME_SCORE_CHANGE)
    },    
    [MUT_LEVEL](state, level: number) {
        if (level < 1 ){
            throw new Error('Invalid level')
        }
        state.level = level
    },
    [MUT_CLEAR_STATS](state) {
        EventBus.$emit(GAME_SCORE_CHANGE)
        state.wrong = 0
        state.right = 0
        state.level = 1
    },      
}
