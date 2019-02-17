import { Module } from 'vuex'
import { getters } from './Getters'
import { actions } from './Actions'
import { mutations } from './Mutations'
import { StatsState } from './Types'
import { RootState } from '../../Types'

export const state: StatsState = {
    right: 0,
    wrong: 0,
    level: 1
}

export const stats: Module<StatsState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
