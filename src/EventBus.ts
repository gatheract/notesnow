import Vue from 'vue'
export const EventBus = new Vue()

export const EVENT_PIANO_KEY_PRESSED = 'EVENT_PIANO_KEY_PRESSED'
export const EVENT_PIANO_KEY_RELEASED = 'EVENT_PIANO_KEY_RELEASED'

export const GAME_SCORE_CHANGE = 'GAME_SCORE_CHANGE'
export const GAME_LEVEL_CHANGE = 'GAME_LEVEL_CHANGE'
export const GAME_OVER = 'GAME_OVER'
