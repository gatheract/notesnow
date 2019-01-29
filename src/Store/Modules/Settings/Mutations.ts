import { MutationTree } from 'vuex'
import { SettingsState, DifficultyLevel, GameStaff } from './Types'

export const MUT_DIFFICULTY = 'MUT_DIFFICULTY'
export const MUT_STAFF = 'MUT_STAFF'

export const mutations: MutationTree<SettingsState> = {
    [MUT_DIFFICULTY](state, difficulty: DifficultyLevel) {
        state.difficultyLevel = difficulty
    },
    [MUT_STAFF](state, staff: GameStaff) {
        state.staffSelected = staff
    }
}
