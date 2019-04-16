import { MutationTree } from 'vuex'
import { GameState } from './Types'
import { PitchesCollection } from '@/Notation/Pitches'
import { INotePitch } from '@/Notation/NoteData'

export const MUT_ALTERED = 'MUT_ALTERED'
export const MUT_NATURAL = 'MUT_NATURAL'
export const MUT_STAFF = 'MUT_STAFF'
export const MUT_ACTIVE_PITCH = 'MUT_ACTIVE_PITCH'

export const mutations: MutationTree<GameState> = {
    [MUT_ALTERED](state, pitches: PitchesCollection) {
        state.alteredPitches = pitches
    },
    [MUT_NATURAL](state, pitches: PitchesCollection) {
        state.naturalPitches = pitches
    },
    [MUT_STAFF](state, pitches: PitchesCollection) {
        state.staffIntervalPitches = pitches
    },
    [MUT_ACTIVE_PITCH](state, pitch: INotePitch) {
        state.activePitch = pitch
    },
}
