/**
 * I just hate typescript vuex getters/actions so much that I do this
 * not to have to look at them
 */
import { LEVEL, RIGHT_GUESSES, WRONG_GUESSES, PROGRESS } from '@/Store/Modules/Stats/Getters'
import * as SetGet from '@/Store/Modules/Settings/Getters'
import { SET_CLEAR_STATS, SET_NEW_TRY } from '@/Store/Modules/Stats/Actions'
import * as Settings from '@/Store/Modules/Settings/Actions'
import { MidiStatus } from '@/Store/Modules/Settings/Types'
import Store from '@/Store/Store'
import { KeySignaturesIndex } from '@/Notation/KeySignatures'

const statsModule = 'Stats/'
const settingsModule = 'Settings/'

export default class GameStore {
  public static getGameType() {
    return Store.getters[settingsModule + SetGet.GAME_TYPE]
  }
  public static getWrongGuesses() {
    return Store.getters[statsModule + WRONG_GUESSES]
  }
  public static getRightGuesses() {
    return Store.getters[statsModule + RIGHT_GUESSES]
  }
  public static getInitialMistakesAllowed() {
    return Store.getters[settingsModule + SetGet.INITIAL_MISTAKES_ALLOWED]
  }
  public static getProgress() {
    return Store.getters[statsModule + PROGRESS]
  }
  public static getBaseSpeed() {
    return Store.getters[settingsModule + SetGet.BASE_SPEED]
  }
  public static getSpeedIncrement() {
    return Store.getters[settingsModule + SetGet.SPEED_INCREMENT]
  }
  public static getStaffSelected() {
    return Store.getters[settingsModule + SetGet.STAFF_SELECTED]
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
  public static setMidiStatus(status: MidiStatus) {
    Store.dispatch(settingsModule + Settings.SET_MIDI_AVAILABLE, status)
  }
  public static getKeySignature(): KeySignaturesIndex | null {
    return Store.getters[settingsModule + SetGet.KEY_SIGNATURE]
  }
} 
