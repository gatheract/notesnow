import DrawingArea from '@/Drawing/DrawingArea'
import { GAME_SCORE_CHANGE, EventBus } from '@/EventBus'
import { G, Library } from 'svg.js'
import GameStore from '@/GameStore'
export default class ProgressMeter {
  private meterBox: Library['Rect']
  constructor() {
    EventBus.$on(GAME_SCORE_CHANGE, this.updateFill.bind(this))
  }
  public draw(x: number, y: number) {
    const WIDTH = 250
    const HEIGHT = 30
    this.meterBox = DrawingArea.Instance.area.rect(WIDTH, HEIGHT).move(x - (WIDTH / 2) , y)
    this.updateFill()
  }
  
  private updateFill() {
    this.meterBox.attr({'stroke': '#000', 'stroke-width': 1})
    const progress = GameStore.getProgress() / 10
    const red = Math.floor((1 - progress) * 255) 
    const green = Math.floor(progress * 255)
    const progressColor = 'rgb(' + ((red > 0) ? red : 0) + ', ' + ((green > 0) ? green : 0) + ', 0)'
    const gradient = DrawingArea.Instance.area.gradient('linear', (stop: any) => {
      stop.at(progress, progressColor)
      stop.at(progress, 'transparent')
    })
    
    this.meterBox.fill(gradient)
  }
}
