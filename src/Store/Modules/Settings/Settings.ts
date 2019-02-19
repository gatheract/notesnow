import { Module } from 'vuex'
import { getters } from './Getters'
import { actions } from './Actions'
import { mutations } from './Mutations'
import { SettingsState, DifficultyLevel, GameStaff } from './Types'
import { RootState } from '../../Types'

export const state: SettingsState = {
    difficultyLevel: DifficultyLevel.hard,
    staffSelected: GameStaff.gStaff,
    initialMistakesAllowed: 10,
    notesPerLevel: 4,
    baseSpeed: 1,
    speedIncrement: 0.3
}

export const settings: Module<SettingsState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
