import { Module } from 'vuex'
import { getters } from './Getters'
import { actions } from './Actions'
import { mutations } from './Mutations'
import { SettingsState, GameType, GameStaff, MidiStatus, StaffInterval, defaultIntervals } from './Types'
import fastClone from 'fast-clone'
import { RootState } from '../../Types'

export const state: SettingsState = {
    gameType: GameType.game,
    staffSelected: GameStaff.gStaff,
    initialMistakesAllowed: 10,
    notesPerLevel: 4,
    baseSpeed: 1,
    speedIncrement: 0.3,
    useAllNotesGuesses: false,
    enableMidi: false,
    midiAvailable: MidiStatus.INITIALIZING,
    midiInputId: '',
    keySignature: null,
    staffIntervals: fastClone(defaultIntervals)

}

export const settings: Module<SettingsState, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
