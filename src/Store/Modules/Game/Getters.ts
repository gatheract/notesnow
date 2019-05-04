import { GetterTree } from 'vuex'
import { GameState } from './Types'
import { RootState } from '../../Types'
import { PitchesCollection } from '@/Notation/Pitches'
import { INotePitch } from '@/Notation/NoteData'

export const GET_ALTERED_PITCHES = 'GET_ALTERED_PITCHES'
export const GET_NATURAL_PITCHES = 'GET_NATURAL_PITCHES'
export const GET_STAFF_INTERVAL_PITCHES = 'GET_STAFF_INTERVAL_PITCHES'
export const GET_ACTIVE_PITCH = 'GET_ACTIVE_PITCH'
export const GET_SPEED = 'GET_SPEED'
export const GET_PRACTICE_SPEED = 'GET_PRACTICE_SPEED'
export const GET_PAUSED = 'GET_PAUSED'

export const getters: GetterTree<GameState, RootState> = {
    [GET_ALTERED_PITCHES](state): PitchesCollection {
        return state.alteredPitches
    },
    [GET_NATURAL_PITCHES](state): PitchesCollection {
        return state.naturalPitches
    },
    [GET_STAFF_INTERVAL_PITCHES](state): PitchesCollection {
        return state.staffIntervalPitches
    },
    [GET_ACTIVE_PITCH](state): INotePitch | null {
        return state.activePitch
    },
    [GET_PRACTICE_SPEED](state): number {
        return state.practiceSpeed
    },
    [GET_PAUSED](state): boolean {
        return state.paused
    },
    [GET_SPEED](state): number {
        const practIncrement = state.practiceSpeed <= 100
            ? state.practiceSpeed : Math.pow(state.practiceSpeed, 1.1)
        return state.baseSpeed * (practIncrement / 100)
    },
}
