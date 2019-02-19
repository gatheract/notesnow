import { MutationTree } from 'vuex'
import { StatsState } from './Types'

export const MUT_LEVEL = 'MUT_LEVEL'
export const MUT_NOTES_ADDED = 'MUT_NOTE_ADDED'
export const MUT_LEVEL_NOTES = 'MUT_LEVEL_NOTES'
export const MUT_RIGHT = 'MUT_RIGHT'
export const MUT_WRONG = 'MUT_WRONG'

export const mutations: MutationTree<StatsState> = {
    [MUT_LEVEL](state, level: number) {
        state.level = level
        state.levelNotes = 0
    },
    [MUT_NOTES_ADDED](state, notesAdded) {
        state.notesAdded = notesAdded
    },
    [MUT_LEVEL_NOTES](state, levelNotes) {
        state.levelNotes = levelNotes
    },
    [MUT_RIGHT](state, right: number) {
        state.right = right
    },
    [MUT_WRONG](state, wrong: number) {
        state.wrong = wrong
    },
}
