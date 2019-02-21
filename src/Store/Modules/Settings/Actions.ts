import { ActionTree } from 'vuex'
import { SettingsState, GameStaff, GameType } from './Types'
import { RootState } from '../../Types'
import {MUT_GAME_TYPE, MUT_STAFF} from './Mutations'

export const SET_GAME_TYPE = 'SET_GAME_TYPE'
export const SET_STAFF = 'SET_STAFF'

export const actions: ActionTree<SettingsState, RootState> = {
  [SET_GAME_TYPE]({ commit }, gameType: GameType) {
    commit(MUT_GAME_TYPE, gameType)
  },
  [SET_STAFF]({ commit }, staff: GameStaff) {
    commit(MUT_STAFF, staff)
  }
}
