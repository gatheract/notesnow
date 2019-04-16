import { Module } from 'vuex'
import { getters } from './Getters'
import { actions } from './Actions'
import { mutations } from './Mutations'
import { PianoState } from './Types'
import { RootState } from '../../Types'

export const state: PianoState = {
    blurUnnecesary: false,
    highAttemptCorrect: false,
    highCorrect: false,
    markOctave: false,
    showKeyNames: false
}

export const piano: Module<PianoState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
