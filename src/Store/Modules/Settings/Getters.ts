import { GetterTree } from 'vuex'
import { SettingsState, StaffInterval } from './Types'
import { RootState } from '../../Types'
import { GameType, GameStaff, MidiStatus } from './Types'
import { KeySignaturesIndex } from '@/Notation/KeySignatures'

export const GAME_TYPE = 'GAME_TYPE'
export const STAFF_SELECTED = 'STAFF_SELECTED'
export const INITIAL_MISTAKES_ALLOWED = 'INITIAL_MISTAKES_ALLOWED'
export const BASE_SPEED = 'BASE_SPEED'
export const SPEED_INCREMENT = 'SPEED_INCREMENT'
export const USE_ALL_NOTES_GUESSES = 'USE_ALL_NOTES_GUESSES'
export const MIDI_AVAILABLE = 'MIDI_AVAILABLE'
export const ENABLE_MIDI = 'ENABLE_MIDI'
export const MIDI_INPUT_ID = 'MIDI_INPUT_ID'
export const KEY_SIGNATURE = 'KEY_SIGNATURE'
export const START_PITCH = 'START_PITCH'
export const END_PITCH = 'END_PITCH'
export const SHOW_MINI_KEYBOARD = 'SHOW_MINI_KEYBOARD'
export const STAFF_INTERVALS = 'STAFF_INTERVALS'

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
    [KEY_SIGNATURE](state): KeySignaturesIndex | null {
        return state.keySignature
    },
    [START_PITCH](state): string {
        return state.staffIntervals[state.staffSelected].startPitch
    },
    [END_PITCH](state): string {
        return state.staffIntervals[state.staffSelected].endPitch
    },
    /**
     * If midi is enabled and a keyboard is selected then show full keyboard
     * else show the minikeyboard
     */
    [SHOW_MINI_KEYBOARD](state): boolean {
        return false
        // return !(state.enableMidi && state.midiAvailable
        // && state.midiInputId && state.midiInputId !== '')
    },
    [STAFF_INTERVALS](state) {
        return state.staffIntervals
    }
}
