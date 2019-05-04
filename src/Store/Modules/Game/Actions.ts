import { ActionTree } from 'vuex'
import { GameState } from './Types'
import { RootState } from '../../Types'
import { Pitches } from '@/Notation/Pitches'
import * as MUT from './Mutations'
import { INotePitch } from '@/Notation/NoteData'

export const SET_ALTERED_NOTES = 'SET_ALTERED_NOTES'
export const SET_ACTIVE_PITCH = 'SET_ACTIVE_PITCH'
export const SET_PRACTICE_SPEED = 'SET_PRACTICE_SPEED'
export const SET_PAUSED = 'SET_PAUSED'

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
  [SET_PRACTICE_SPEED]({ commit }, speed: number) {
    commit(MUT.MUT_PRACTICE_SPEED, speed)
  },
  [SET_PAUSED]({ commit }, paused: boolean) {
    commit(MUT.MUT_PAUSED, paused)
  },
}
