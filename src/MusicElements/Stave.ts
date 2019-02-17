import { PolyLine, G } from 'svg.js'
import DrawingArea from '@/Drawing/DrawingArea'
import AbstractMusicElement from './AbstractMusicElement'
import AbstractStaff from '@/MusicElements/Staff/AbstractStaff'
/**
 *  A line inside the staff, a stave!
 */
export default class Stave extends AbstractMusicElement {
    protected staff: AbstractStaff
    private y: number      
     
    constructor(staff: AbstractStaff) {
        super()
        this.staff = staff
        this.staff.getGroup().add(this.group)
    }
    
    public getY() {
        return this.y
    }
    
    /**
     * X origin / end coordinates and Y position
     * @param xStart 
     * @param xEnd 
     * @param y 
     */
    public draw(xStart: number, xEnd: number, y: number) {
        this.y = y
        
        const element = DrawingArea.Instance.area.polyline(
            [
                [xStart, y],
                [xEnd, y]
            ]
        ).fill('none').stroke({ width: 1 })
        
        this.group.add(element)
    }
}
