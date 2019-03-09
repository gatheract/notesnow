import { G, Library } from 'svg.js'
import DrawingArea from '@/Drawing/DrawingArea'
export default abstract class AbstractMusicElement {
  protected element: Library['Element']
  protected group: G
  protected parentGroup: G
  
  constructor() {
    this.parentGroup = DrawingArea.Instance.area.group()
    this.group = DrawingArea.Instance.area.group()
    this.parentGroup.add(this.group)
    this.parentGroup.addClass('elementParentGroup')
    this.group.addClass('elementGroup')
  }
  
  /**
   * Make an svg element visible or not
   * @param visible
   */
  public setVisible(visible: boolean) {
    return this.parentGroup.style(visible ? 'visibility: visible' : 'visibility: hidden')
  }
  
  public fadeIn(duration: number) {
    return this.parentGroup.attr('opacity', 0 ).animate(duration).attr('opacity', 1 )
  }
      
  public fadeOut(duration: number) {
    return this.parentGroup.animate(duration).attr('opacity', 0 )
  }
  
  public getX() {
    return this.parentGroup.x()
  }

  public getParentGroup() {
      return this.parentGroup
  }
       
  public moveX(x: number) {
    this.parentGroup.dx(x)
  }
  
  /**
   * Width of the enclosing element
   */
  public getWidth() {
    return this.parentGroup.bbox().width
  }

  /**
   * Height of the enclosing element
   */
  public getHeight() {
      return this.parentGroup.bbox().height
  }

  /**
   * Remove svg element from the canvas
   */
  public destroy() {
    this.parentGroup.remove()            
  }
  
}
