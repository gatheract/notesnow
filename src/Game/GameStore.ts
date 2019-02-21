/**
 * I just hate typescript vuex getters/actions so much that I do this
 * not to have to look at them
 */
import { LEVEL, RIGHT_GUESSES, WRONG_GUESSES, PROGRESS } from '@/Store/Modules/Stats/Getters'
import { GAME_TYPE, INITIAL_MISTAKES_ALLOWED, BASE_SPEED, 
  SPEED_INCREMENT, STAFF_SELECTED } from '@/Store/Modules/Settings/Getters'
import { SET_CLEAR_STATS, SET_NEW_TRY } from '@/Store/Modules/Stats/Actions'
import Store from '@/Store/Store'

const statsModule = 'Stats/'
const settingsModule = 'Settings/'

export default class GameStore {
  public static getGameType() {
    return Store.getters[settingsModule + GAME_TYPE]
  }
  public static getWrongGuesses() {
    return Store.getters[statsModule + WRONG_GUESSES]
  }
  public static getRightGuesses() {
    return Store.getters[statsModule + RIGHT_GUESSES]
  }
  public static getInitialMistakesAllowed() {
    return Store.getters[settingsModule + INITIAL_MISTAKES_ALLOWED]
  }
  public static getProgress() {
    return Store.getters[statsModule + PROGRESS]
  }
  public static getBaseSpeed() {
    return Store.getters[settingsModule + BASE_SPEED]
  }
  public static getSpeedIncrement() {
    return Store.getters[settingsModule + SPEED_INCREMENT]
  }
  public static getStaffSelected() {
    return Store.getters[settingsModule + STAFF_SELECTED]
  }
  public static getLevel() {
    return Store.getters[statsModule + LEVEL]
  }
  public static setNewGuess(right: boolean) {
    Store.dispatch(statsModule + SET_NEW_TRY, right)
  }
  public static setClearStats() {
    Store.dispatch(statsModule + SET_CLEAR_STATS)
  }
} 
