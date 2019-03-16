import { GetterTree } from 'vuex'
import { SettingsState } from './Types'
import { RootState } from '../../Types'
import {GameType, GameStaff, MidiStatus} from './Types'

export const GAME_TYPE = 'GAME_TYPE'
export const STAFF_SELECTED = 'STAFF_SELECTED'
export const INITIAL_MISTAKES_ALLOWED = 'INITIAL_MISTAKES_ALLOWED'
export const BASE_SPEED = 'BASE_SPEED'
export const SPEED_INCREMENT = 'SPEED_INCREMENT'
export const USE_ALL_NOTES_GUESSES = 'USE_ALL_NOTES_GUESSES'
export const MIDI_AVAILABLE = 'MIDI_AVAILABLE'
export const ENABLE_MIDI = 'ENABLE_MIDI'
export const MIDI_INPUT_ID = 'MIDI_INPUT_ID'

export const getters: GetterTree<SettingsState, RootState> = {
    [GAME_TYPE](state): GameType {
        return state.gameType
    },    
    [STAFF_SELECTED](state): GameStaff {
        return state.staffSelected
    },
    [INITIAL_MISTAKES_ALLOWED](state): number {
        return state.initialMistakesAllowed
    },
    [BASE_SPEED](state): number {
        return state.baseSpeed
    },
    [SPEED_INCREMENT](state): number {
        return state.speedIncrement
    },
    [USE_ALL_NOTES_GUESSES](state): boolean {
        return state.useAllNotesGuesses
    },
    [MIDI_AVAILABLE](state): MidiStatus {
        return state.midiAvailable
    },
    [ENABLE_MIDI](state): boolean {
        return state.enableMidi
    },
    [MIDI_INPUT_ID](state): string {
        return state.midiInputId
    },
}
