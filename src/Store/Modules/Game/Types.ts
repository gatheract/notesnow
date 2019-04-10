import { PitchesCollection } from '@/Notation/Pitches'

export interface GameState {
  naturalPitches: PitchesCollection,
  alteredPitches: PitchesCollection,
  staffIntervalPitches: PitchesCollection,
}
