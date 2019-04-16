import { GetterTree } from 'vuex'
import { PianoState } from './Types'
import { RootState } from '../../Types'

export const GET_HIGH_CORRECT = 'GET_HIGH_CORRECT'
export const GET_HIGH_ATTEMPT_CORRECT = 'GET_HIGH_ATTEMPT_CORRECT'
export const GET_SHOW_KEY_NAMES = 'GET_SHOW_KEY_NAMES'
export const GET_MARK_OCTAVE = 'GET_MARK_OCTAVE'
export const GET_BLUR_UNNECESARY = 'GET_BLUR_UNNECESARY'

export const getters: GetterTree<PianoState, RootState> = {
    [GET_HIGH_CORRECT](state): boolean {
        return state.highCorrect
    },
    [GET_HIGH_ATTEMPT_CORRECT](state): boolean {
        return state.highAttemptCorrect
    },
    [GET_SHOW_KEY_NAMES](state): boolean {
        return state.showKeyNames
    },
    [GET_MARK_OCTAVE](state): boolean {
        return state.markOctave
    },
    [GET_BLUR_UNNECESARY](state): boolean {
        return state.blurUnnecesary
    },
}
