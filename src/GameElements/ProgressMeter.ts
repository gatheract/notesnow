import DrawingArea from '@/Drawing/DrawingArea'
import { GAME_SCORE_CHANGE, EventBus } from '@/EventBus'
import { Library } from 'svg.js'
import GameStore from '@/GameStore'

/**
 * Draw a status bar on top of the screen
 */
export default class ProgressMeter {
  private meterBox: Library['Rect']
  private gradient: Library['Gradient']
  private stop1: Library['Stop'] 
  private stop2: Library['Stop'] 
  private readonly START_COLOR = '#0F0'
  private readonly ANIMATION_SPEED = 100
  
  constructor() {
    EventBus.$on(GAME_SCORE_CHANGE, this.updateFill.bind(this))
  }
  
  public draw(x: number, y: number) {
    const WIDTH = 250
    const HEIGHT = 30
    this.meterBox = DrawingArea.Instance.area.rect(WIDTH, HEIGHT).move(x - (WIDTH / 2) , y)
    this.meterBox.attr({'stroke': '#000', 'stroke-width': 1})
    this.gradient = DrawingArea.Instance.area.gradient('linear', (stop: Library['Gradient']) => {
      this.stop1 = stop.at(1, this.START_COLOR)
      this.stop2 = stop.at(1, 'transparent')
    })
    this.meterBox.fill(this.gradient)    
  }
  
  /**
   * Change the color from green to red
   * and animate from 100% to 0% (lose)
   */
  private updateFill() {    
    const progress = GameStore.getProgress() / 10
    const doubleProgress = Math.pow(progress, 8) // need the red to go up faster 
    const red = Math.floor((1 - doubleProgress) * 255) 
    const green = Math.floor(progress * 255)
    const progressColor = 'rgb(' + ((red > 0) ? red : 0) + ', ' + ((green > 0) ? green : 0) + ', 0)'    
    this.stop1.animate(this.ANIMATION_SPEED).attr({
        'stop-color': progressColor,
        'offset': progress
    })
    this.stop2.animate(this.ANIMATION_SPEED).attr({
        offset: progress
    })
  }
}
