import { ActionTree } from 'vuex'
import { PianoState } from './Types'
import { RootState } from '../../Types'
import * as MUT from './Mutations'

export const SET_HIGH_CORRECT = 'SET_HIGH_CORRECT'
export const SET_HIGH_ATTEMPT_CORRECT = 'SET_HIGH_ATTEMPT_CORRECT'
export const SET_SHOW_KEY_NAMES = 'SET_SHOW_KEY_NAMES'
export const SET_MARK_OCTAVE = 'SET_MARK_OCTAVE'
export const SET_BLUR_UNNECESARY = 'SET_BLUR_UNNECESARY'

export const actions: ActionTree<PianoState, RootState> = {
  [SET_HIGH_CORRECT]({ commit }, high: boolean) {
    commit(MUT.MUT_HIGH_CORRECT, high)
  },
  [SET_HIGH_ATTEMPT_CORRECT]({ commit }, high: boolean) {
    commit(MUT.MUT_HIGH_ATTEMPT_CORRECT, high)
  },
  [SET_SHOW_KEY_NAMES]({ commit }, show: boolean) {
    commit(MUT.MUT_SHOW_KEY_NAMES, show)
  },
  [SET_MARK_OCTAVE]({ commit }, mark: boolean) {
    commit(MUT.MUT_MARK_OCTAVE, mark)
  },
  [SET_BLUR_UNNECESARY]({ commit }, blur: boolean) {
    commit(MUT.MUT_BLUR_UNNECESARY, blur)
  }
}
