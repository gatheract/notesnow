import { G, Library } from 'svg.js'
import DrawingArea from '@/Drawing/DrawingArea'

/**
 * All the music elements inserted into the canvas from an SVG drawing
 * share this attributes
 *
 * First SVG.js inserts the drawing as a new document
 * It's visible by default, so it has to be hidden
 * The enclosing svg/group of the the drawing must have a class named 'element'
 */
export default abstract class MusicElementInterface {
    protected element: G
    protected insertedGroup: G
    protected elementGroup: Library['Element']
    protected readonly ELEMENT_CLASS = '.element'

    /**
     * @param elementSVG imported svg string (with the raw-loader)
     */
    public constructor(elementSVG: string) {
        /** Create a new group where the element will be inserted in the main SVG */
        this.insertedGroup = DrawingArea.Instance.area.group()
        this.element = this.insertedGroup.svg(elementSVG)
        this.elementGroup = this.element.select(this.ELEMENT_CLASS).first()
        if (!this.elementGroup) {
            throw new Error(`The class ${this.ELEMENT_CLASS} was not found`)
        }
        this.setVisible(false)
    }

    /**
     * The element is already on the canvas, this sets the element as visible,
     * the position and the relative size
     * @param x
     * @param y
     * @param sizeRatio
     */
    public draw(x: number, y: number, sizeRatio?: number) {
        if (sizeRatio) {
            this.elementGroup.transform({ scale: sizeRatio })
        }
        this.elementGroup.transform({ x, y })
        this.setVisible(true)
    }
    /**
     * Make an svg element visible or not
     * @param visible
     */
    public setVisible(visible: boolean) {
        return this.element.style(visible ? 'visibility: visible' : 'visibility: hidden')
    }

    /**
     * Width of the enclosing element
     */
    public get width() {
        return this.element.bbox().width
    }

    /**
     * Height of the enclosing element
     */
    public get height() {
        return this.element.bbox().height
    }
    
    public moveX(x: number) {
        this.element.dx(x)
    }
    
    public x() {
        return this.element.x()
    }
    
    public fadeIn(duration: number) {
        return this.element.attr('opacity', 0 ).animate(duration).attr('opacity', 1 )
    }
        
    public fadeOut(duration: number) {
        return this.element.animate(duration).attr('opacity', 0 )
    }
}
