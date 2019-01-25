import DA from '../DrawingArea'
import { PolyLine } from 'svg.js'
/**
 *  A line inside the staff, a stave!
 */
export default class Stave {
    private element: PolyLine
    private y: number
    
    public getY() {
        return this.y
    }
    
    /**
     * The two set of coordinates represent the begining and end
     * of the line
     * @param startX
     * @param startY
     * @param endX
     * @param endY
     */
    public draw(startX: number, endX: number, yPosition: number) {
        this.y = yPosition
        this.element = DA.Instance.area.polyline(
            [
                [startX, yPosition],
                [endX, yPosition]
            ]
        ).fill('none').stroke({ width: 1 })
    }
}
