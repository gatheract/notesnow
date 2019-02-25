import { G, Library } from 'svg.js'
import DrawingArea from '@/Drawing/DrawingArea'
export default abstract class AbstractMusicElement {
  protected element: Library['Element']
  protected group: G
  
  constructor() {
    this.group = DrawingArea.Instance.area.group()
  }
  
  /**
   * Make an svg element visible or not
   * @param visible
   */
  public setVisible(visible: boolean) {
    return this.group.style(visible ? 'visibility: visible' : 'visibility: hidden')
  }
  
  public fadeIn(duration: number) {
    return this.group.attr('opacity', 0 ).animate(duration).attr('opacity', 1 )
  }
      
  public fadeOut(duration: number) {
    return this.group.animate(duration).attr('opacity', 0 )
  }
  
  public getX() {
    return this.group.x()
  }

  public getGroup() {
      return this.group
  }
       
  public moveX(x: number) {
    this.group.dx(x)
  }
  
  /**
   * Width of the enclosing element
   */
  public get width() {
    return this.group.bbox().width
    
  }

  /**
   * Height of the enclosing element
   */
  public get height() {
      return this.group.bbox().height
  }

  /**
   * Remove svg element from the canvas
   */
  public destroy() {
    this.group.remove()            
  }
  
}
