import { GetterTree } from 'vuex'
import { GameState } from './Types'
import { RootState } from '../../Types'
import { PitchesCollection } from '@/Notation/Pitches'

export const ALTERED_PITCHES = 'ALTERED_PITCHES'
export const NATURAL_PITCHES = 'NATURAL_PITCHES'
export const STAFF_INTERVAL_PITCHES = 'STAFF_INTERVAL_PITCHES'

export const getters: GetterTree<GameState, RootState> = {
    [ALTERED_PITCHES](state): PitchesCollection {
        return state.alteredPitches
    },
    [NATURAL_PITCHES](state): PitchesCollection {
        return state.naturalPitches
    },
    [STAFF_INTERVAL_PITCHES](state): PitchesCollection {
        return state.staffIntervalPitches
    },
}
