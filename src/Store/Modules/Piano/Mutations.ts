import { MutationTree } from 'vuex'
import { PianoState } from './Types'

export const MUT_HIGH_CORRECT = 'MUT_HIGH_CORRECT'
export const MUT_HIGH_ATTEMPT_CORRECT = 'MUT_HIGH_ATTEMPT_CORRECT'
export const MUT_SHOW_KEY_NAMES = 'MUT_SHOW_KEY_NAMES'
export const MUT_MARK_OCTAVE = 'MUT_MARK_OCTAVE'
export const MUT_BLUR_UNNECESARY = 'MUT_BLUR_UNNECESARY'

export const mutations: MutationTree<PianoState> = {
    [MUT_HIGH_CORRECT](state, high: boolean) {
        state.highCorrect = high
    },
    [MUT_HIGH_ATTEMPT_CORRECT](state, high: boolean) {
        state.highAttemptCorrect = high
    },
    [MUT_SHOW_KEY_NAMES](state, show: boolean) {
        state.showKeyNames = show
    },
    [MUT_MARK_OCTAVE](state, mark: boolean) {
        state.markOctave = mark
    },
    [MUT_BLUR_UNNECESARY](state, blur: boolean) {
        state.blurUnnecesary = blur
    },
}
