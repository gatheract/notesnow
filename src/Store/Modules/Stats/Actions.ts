import { ActionTree } from 'vuex'
import { StatsState } from './Types'
import { RootState } from '../../Types'
import {MUT_LEVEL, MUT_NEW_TRY, MUT_CLEAR_STATS} from './Mutations'

export const SET_NEW_TRY = 'SET_NEW_TRY'
export const SET_LEVEL = 'SET_LEVEL'
export const SET_CLEAR_STATS = 'SET_CLEAR_STATS'

export const actions: ActionTree<StatsState, RootState> = {
  [SET_NEW_TRY]({ commit }, right: boolean) {
    commit(MUT_NEW_TRY, right)
  },
  [SET_LEVEL]({ commit }, level: number) {
    commit(MUT_LEVEL, level)
  },
  [SET_CLEAR_STATS]({ commit }) {
    commit(MUT_CLEAR_STATS)
  },
}
