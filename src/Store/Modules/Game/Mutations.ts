import { MutationTree } from 'vuex'
import { GameState } from './Types'
import { PitchesCollection } from '@/Notation/Pitches'
import { INotePitch } from '@/Notation/NoteData'

export const MUT_ALTERED = 'MUT_ALTERED'
export const MUT_NATURAL = 'MUT_NATURAL'
export const MUT_STAFF = 'MUT_STAFF'
export const MUT_ACTIVE_PITCH = 'MUT_ACTIVE_PITCH'
export const MUT_PRACTICE_SPEED = 'MUT_PRACTICE_SPEED'
export const MUT_PAUSED = 'MUT_PAUSED'

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
    [MUT_PAUSED](state, paused: boolean) {
        state.paused = paused
    },
    [MUT_PRACTICE_SPEED](state, speed: number) {
        if (speed >= 0 && speed <= 1000) {
            state.practiceSpeed = speed
        }
    },
}
