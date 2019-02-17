/**
 * I just hate typescript vuex getters/actions so much that I do this
 * not to have to look at them
 */
import { LEVEL, RIGHT_GUESSES, WRONG_GUESSES, PROGRESS } from '@/Store/Modules/Stats/Getters'
import { INITIAL_MISTAKES_ALLOWED } from '@/Store/Modules/Settings/Getters'
import { SET_CLEAR_STATS, SET_NEW_TRY } from '@/Store/Modules/Stats/Actions'
import Store from '@/Store/Store'

const statsModule = 'Stats/'
const settingsModule = 'Stats/'

export default class GameStore {
  public static getWrongGuesses() {
    return Store.getters[statsModule + WRONG_GUESSES]
  }
  public static getRightGuesses() {
    return Store.getters[statsModule + RIGHT_GUESSES]
  }
  public static getInitialMistakesAllowed() {
    return Store.getters[settingsModule + INITIAL_MISTAKES_ALLOWED]
  }
  public static getProgress(){
    return Store.getters[statsModule + PROGRESS]
  }
  public static setNewGuess(right: boolean) {
    Store.dispatch(statsModule + SET_NEW_TRY, right)
  }
  public static setClearStats() {
    Store.dispatch(statsModule + SET_CLEAR_STATS)
  }
} 
