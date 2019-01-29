import { ActionTree } from 'vuex'
import { SettingsState, GameStaff, DifficultyLevel } from './Types'
import { RootState } from '../../Types'
import {MUT_DIFFICULTY, MUT_STAFF} from './Mutations'

export const SET_DIFFICULTY = 'SET_DIFFICULTY'
export const SET_STAFF = 'SET_STAFF'

export const actions: ActionTree<SettingsState, RootState> = {
  [SET_DIFFICULTY]({ commit }, difficulty: DifficultyLevel) {
    commit(MUT_DIFFICULTY, difficulty)
    return true
  },
  [SET_STAFF]({ commit }, staff: GameStaff) {
    commit(MUT_STAFF, staff)
  }
}
