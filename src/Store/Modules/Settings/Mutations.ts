import { MutationTree } from 'vuex'
import { SettingsState, GameType, GameStaff, MidiStatus } from './Types'

export const MUT_GAME_TYPE = 'MUT_GAME_TYPE'
export const MUT_STAFF = 'MUT_STAFF'
export const MUT_USE_ALL_NOTES_GUESSES = 'MUT_USE_ALL_NOTES_GUESSES'
export const MUT_MIDI_AVAILABLE = 'MUT_MIDI_AVAILABLE'
export const MUT_ENABLE_MIDI = 'MUT_ENABLE_MIDI'
export const MUT_MIDI_INPUT_ID = 'MUT_MIDI_INPUT_ID'

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
    [MUT_MIDI_AVAILABLE](state, status: MidiStatus.INITIALIZING ) {
        state.midiAvailable = status
    },
    [MUT_MIDI_INPUT_ID](state, id: string ) {
        state.midiInputId = id
    }
}
