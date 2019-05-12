import { ActionTree } from 'vuex'
import { SettingsState, GameStaff, GameType, MidiStatus } from './Types'
import { RootState } from '../../Types'
import { defaultIntervals } from './Types'
import * as MUT from './Mutations'
import { KeySignaturesIndex } from '@/Notation/KeySignatures'

export const SET_GAME_TYPE = 'SET_GAME_TYPE'
export const SET_STAFF = 'SET_STAFF'
export const SET_USE_ALL_NOTES_GUESSES = 'SET_USE_ALL_NOTES_GUESSES'
export const SET_MIDI_AVAILABLE = 'SET_MIDI_AVAILABLE'
export const SET_ENABLE_MIDI = 'SET_ENABLE_MIDI'
export const SET_MIDI_INPUT_ID = 'SET_MIDI_INPUT_ID'
export const SET_KEY_SIGNATURE = 'SET_KEY_SIGNATURE'
export const SET_STAFF_SELECTED_INTERVAL = 'SET_STAFF_SELECTED_INTERVAL'
export const SET_SOUND = 'SET_SOUND'
export const RESTORE_STAFF_SELECTED_INTERVAL = 'RESTORE_STAFF_SELECTED_INTERVAL'

export const actions: ActionTree<SettingsState, RootState> = {
  [SET_GAME_TYPE]({ commit }, gameType: GameType) {
    commit(MUT.MUT_GAME_TYPE, gameType)
  },
  [SET_STAFF]({ commit }, staff: GameStaff) {
    commit(MUT.MUT_STAFF, staff)
  },
  [SET_USE_ALL_NOTES_GUESSES]({ commit }, use: boolean) {
    commit(MUT.MUT_USE_ALL_NOTES_GUESSES, use)
  },
  [SET_ENABLE_MIDI]({ commit }, enable: boolean) {
    commit(MUT.MUT_ENABLE_MIDI, enable)
  },
  [SET_MIDI_AVAILABLE]({ commit }, status: MidiStatus) {
    commit(MUT.MUT_MIDI_AVAILABLE, status)
  },
  [SET_MIDI_INPUT_ID]({ commit }, id: string) {
    commit(MUT.MUT_MIDI_INPUT_ID, id)
  },
  [SET_KEY_SIGNATURE]({ commit }, key: KeySignaturesIndex | null) {
    commit(MUT.MUT_KEY_SIGNATURE, key)
  },
  [SET_STAFF_SELECTED_INTERVAL]({ commit }, { start, end }: { start: string, end: string }) {
    commit(MUT.MUT_STAFF_SELECTED_INTERVAL_START, start)
    commit(MUT.MUT_STAFF_SELECTED_INTERVAL_END, end)
  },
  [RESTORE_STAFF_SELECTED_INTERVAL]({ commit, state, rootState, dispatch }) {
    const interval = defaultIntervals[rootState.Settings!.staffSelected]
    commit(MUT.MUT_STAFF_SELECTED_INTERVAL_START, interval.startPitch)
    commit(MUT.MUT_STAFF_SELECTED_INTERVAL_END, interval.endPitch)

  },
  [SET_SOUND]({ commit }, sound: boolean) {
    commit(MUT.MUT_SOUND, sound)
  },

}
