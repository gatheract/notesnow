import AbstractDrawingArea from './AbstractDrawingArea'
import Piano from '../MusicElements/Piano/Piano'

export default class PianoArea extends AbstractDrawingArea {
  public readonly WINDOW_WIDTH = 1000
  public readonly WINDOW_HEIGHT = 1000
  
  private piano: Piano
  
  public constructor() {
    super('pianoArea')
    this.drawing.addClass('imgResponsive')
    
    // this.drawing.attr('preserveAspectRatio', 'xMinYMin meet')
    // this.drawing.viewbox(0, 0, this.WINDOW_WIDTH, this.WINDOW_HEIGHT)
    // this.drawing.attr('preserveAspectRatio', 'none')    
  } 
  
  public draw() {
    this.piano = new Piano(this)
    this.piano.draw()
  }
  
  public getPiano() {
    return this.piano
  }
}
