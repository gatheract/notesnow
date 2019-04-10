import AbstractDrawingArea from '@/Drawing/AbstractDrawingArea'
import SVGElement from './SVGElement'
import AbstractStaff from '@/MusicElements/Staffs/AbstractStaff'
/**
 *  A line inside the staff, a stave!
 */
export default class Stave extends SVGElement {
    protected staff: AbstractStaff
    private y: number      
     
    constructor(staff: AbstractStaff) {
        super(staff.getDrawingArea())
        this.staff = staff
        this.staff.addParent(this)
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
        
        const element = this.getDrawingArea().area.polyline(
            [
                [xStart, y],
                [xEnd, y]
            ]
        ).fill('none').stroke({ width: 1 })
        
        this.parentGroup.add(element)
    }
}
