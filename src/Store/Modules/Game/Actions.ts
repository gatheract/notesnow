import { ActionTree } from 'vuex'
import { GameState } from './Types'
import { RootState } from '../../Types'
import { Pitches } from '@/Notation/Pitches'
import * as MUT from './Mutations'
import { INotePitch } from '@/Notation/NoteData'

export const SET_ALTERED_NOTES = 'SET_ALTERED_NOTES'
export const SET_ACTIVE_PITCH = 'SET_ACTIVE_PITCH'

export const actions: ActionTree<GameState, RootState> = {
  [SET_ALTERED_NOTES]({ commit, rootState }) {
    const pit = new Pitches()
    const sig = rootState.Settings!.keySignature
    const notes = pit.initialize(sig, null, null)
    commit(MUT.MUT_ALTERED, notes)
  },
  [SET_ACTIVE_PITCH]({ commit }, pitch: INotePitch | null) {
    commit(MUT.MUT_ACTIVE_PITCH, pitch)
  },
}
