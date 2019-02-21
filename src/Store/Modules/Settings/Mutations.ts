import { MutationTree } from 'vuex'
import { SettingsState, GameType, GameStaff } from './Types'

export const MUT_GAME_TYPE = 'MUT_GAME_TYPE'
export const MUT_STAFF = 'MUT_STAFF'

export const mutations: MutationTree<SettingsState> = {
    [MUT_GAME_TYPE](state, gameType: GameType) {
        state.gameType = gameType
    },
    [MUT_STAFF](state, staff: GameStaff) {
        state.staffSelected = staff
    }
}
