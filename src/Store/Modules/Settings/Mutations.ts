import { MutationTree } from 'vuex'
import { SettingsState, GameType, GameStaff, MidiStatus } from './Types'
import { KeySignaturesIndex } from '@/Notation/KeySignatures'

export const MUT_GAME_TYPE = 'MUT_GAME_TYPE'
export const MUT_STAFF = 'MUT_STAFF'
export const MUT_USE_ALL_NOTES_GUESSES = 'MUT_USE_ALL_NOTES_GUESSES'
export const MUT_MIDI_AVAILABLE = 'MUT_MIDI_AVAILABLE'
export const MUT_ENABLE_MIDI = 'MUT_ENABLE_MIDI'
export const MUT_MIDI_INPUT_ID = 'MUT_MIDI_INPUT_ID'
export const MUT_KEY_SIGNATURE = 'MUT_KEY_SIGNATURE'
export const MUT_STAFF_SELECTED_INTERVAL_START = 'MUT_STAFF_SELECTED_INTERVAL_START'
export const MUT_STAFF_SELECTED_INTERVAL_END = 'MUT_STAFF_SELECTED_INTERVAL_END'
export const MUT_SOUND = 'MUT_SOUND'

export const mutations: MutationTree<SettingsState> = {
    [MUT_GAME_TYPE](state, gameType: GameType) {
        state.gameType = gameType
    },
    [MUT_STAFF](state, staff: GameStaff) {
        state.staffSelected = staff
    },
    [MUT_USE_ALL_NOTES_GUESSES](state, use: boolean) {
        state.useAllNotesGuesses = use
    },
    [MUT_ENABLE_MIDI](state, enable: boolean) {
        state.enableMidi = enable
    },
    [MUT_MIDI_AVAILABLE](state, status: MidiStatus.INITIALIZING) {
        state.midiAvailable = status
    },
    [MUT_MIDI_INPUT_ID](state, id: string) {
        state.midiInputId = id
    },
    [MUT_KEY_SIGNATURE](state, key: KeySignaturesIndex | null) {
        state.keySignature = key
    },
    [MUT_STAFF_SELECTED_INTERVAL_START](state, startPitch: string) {
        state.staffIntervals[state.staffSelected].startPitch = startPitch
    },
    [MUT_STAFF_SELECTED_INTERVAL_END](state, endPitch: string) {
        state.staffIntervals[state.staffSelected].endPitch = endPitch
    },
    [MUT_SOUND](state, sound: boolean) {
        state.sound = sound
    }
}
