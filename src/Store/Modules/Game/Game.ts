import { Module } from 'vuex'
import { getters } from './Getters'
import { actions } from './Actions'
import { mutations } from './Mutations'
import { GameState } from './Types'
import { RootState } from '../../Types'
import { Pitches } from '@/Notation/Pitches'

export const state: GameState = {
    naturalPitches: new Pitches().initialize(null, null, null),
    alteredPitches: {},
    staffIntervalPitches: {},
    activePitch: null
}

export const game: Module<GameState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
