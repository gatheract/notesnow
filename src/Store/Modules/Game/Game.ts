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
    activePitch: null,
    gameSpeed: 100,
    practiceSpeed: 100,
    baseSpeed: 1.3,
    speedIncrement: 0.1,
    paused: false
}

export const game: Module<GameState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
