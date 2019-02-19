import { ActionTree } from 'vuex'
import { StatsState } from './Types'
import { RootState } from '../../Types'
import {MUT_LEVEL, MUT_RIGHT, MUT_WRONG, MUT_NOTES_ADDED, MUT_LEVEL_NOTES} from './Mutations'
import { GAME_SCORE_CHANGE, GAME_LEVEL_CHANGE, EventBus, GAME_OVER } from '@/EventBus'
import GameStore from '@/Game/GameStore'
export const SET_NEW_TRY = 'SET_NEW_TRY'
export const SET_LEVEL = 'SET_LEVEL'
export const SET_CLEAR_STATS = 'SET_CLEAR_STATS'
export const SET_NOTE_ADDED = 'SET_NOTE_ADDED'

export const actions: ActionTree<StatsState, RootState> = {
  [SET_NEW_TRY]({ commit, state, rootState }, right: boolean) {
    /**
     * first log in the try
     */
    if (right) {
      commit(MUT_RIGHT, ++state.right)
    } else {
      commit(MUT_WRONG, ++state.wrong)
    }        
    EventBus.$emit(GAME_SCORE_CHANGE)
    
    if (GameStore.getProgress() <= 0) {
      EventBus.$emit(GAME_OVER)
    } else if (!((state.right + state.wrong) % rootState.Settings!.notesPerLevel)) { 
      commit(MUT_LEVEL, ++state.level)
    }
  },
  /**
   * Set the current level 
   */
  [SET_LEVEL]({ commit }, level: number) {
    commit(MUT_LEVEL, level)
    EventBus.$emit(GAME_LEVEL_CHANGE)
  },
  /**
   * Beginning game stats
   */
  [SET_CLEAR_STATS]({ commit }) {
    commit(MUT_RIGHT, 0)
    commit(MUT_WRONG, 0)
    commit(MUT_LEVEL, 1)
    commit(MUT_NOTES_ADDED, 0)
    EventBus.$emit(GAME_SCORE_CHANGE)
  },
  /**
   * When a new note is added to the pentagram
   */
  [SET_NOTE_ADDED]({ commit, state }) {
    commit(MUT_NOTES_ADDED, ++state.notesAdded)
    commit(MUT_LEVEL_NOTES, ++state.levelNotes)
  },  
}
