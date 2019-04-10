import { G, Library, Doc } from 'svg.js'
import AbstractDrawingArea from '@/Drawing/AbstractDrawingArea'

export default abstract class SVGElement {
  protected element: Library['Element']
  protected group: G
  protected parentGroup: G
  private drawingArea: AbstractDrawingArea
  
  constructor(drawingArea: AbstractDrawingArea) {
    this.parentGroup = drawingArea.area.group()
    this.group = drawingArea.area.group()
    this.parentGroup.add(this.group)
    this.parentGroup.addClass('elementParentGroup')
    this.group.addClass('elementGroup')
    this.drawingArea = drawingArea
  }
  
  /**
   * Make an svg element visible or not
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
  
  public getSubGroup() {
    return this.group
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
  
  /**
   * Returns the SVG document
   */
  public getDocument() {
    return this.parentGroup.doc() as Doc
  }
  
  /**
   * Adds the parent group of an element to this parent group
   * (none of the transforms of this element are applied
   */
  public addParent(element: SVGElement) {
    this.parentGroup.add(element.getParentGroup())
  }
  
  /**
   * Adds the parent group of an element to this group
   * (transforms applied)
   */
  public addChild(element: SVGElement) {
    this.group.add(element.getParentGroup())
  }
  
  public getDrawingArea() {
    return this.drawingArea
  }
}
