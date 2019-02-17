import { G, Library } from 'svg.js'
import DrawingArea from '@/Drawing/DrawingArea'
import AbstractMusicElement from '@/MusicElements/AbstractMusicElement'

/**
 * All the music elements inserted into the canvas from an SVG drawing
 * share this attributes
 *
 * First SVG.js inserts the drawing as a new document
 * It's visible by default, so it has to be hidden
 * The enclosing svg/group of the the drawing must have a class named 'element'
 */
export default abstract class AbstractMusicDrawing extends AbstractMusicElement {   
    protected elementGroup: Library['Element']
    protected readonly ELEMENT_CLASS = '.element'
    /**
     * @param elementSVG imported svg string (with the raw-loader)
     */
    public constructor(elementSVG: string) {
        super()
        /** Create a new group where the element will be inserted in the main SVG */
        this.group = DrawingArea.Instance.area.group()
        this.element = this.group.svg(elementSVG)
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
}
