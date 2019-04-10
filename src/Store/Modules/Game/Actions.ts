import { ActionTree } from 'vuex'
import { GameState } from './Types'
import { RootState } from '../../Types'
import { Pitches } from '@/Notation/Pitches'
import * as MUT from './Mutations'

export const SET_ALTERED_NOTES = 'SET_ALTERED_NOTES'

export const actions: ActionTree<GameState, RootState> = {
  [SET_ALTERED_NOTES]({ commit, rootState }) {
    const pit = new Pitches()
    const sig = rootState.Settings!.keySignature
    const notes = pit.initialize(sig, null, null)
    commit(MUT.MUT_ALTERED, notes)
  },
}
