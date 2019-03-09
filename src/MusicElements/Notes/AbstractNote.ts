import { INoteData} from '@/Notation/NoteData'
import AbstractMusicElement from '../AbstractMusicDrawing'
import AbstractStaff from '@/MusicElements/Staffs/AbstractStaff'
import LedgerLines from '../LedgerLines'
import LedgerLinesTypes from '@/Notation/LedgerLinesTypes'
const noteSVG = require('@/assets/images/quarter.svg')

/**
 * Just a quarter note (for now)
 */
export default class AbstractNote extends AbstractMusicElement {
    public static readonly NOTE_HEIGHT = 50
    protected staff: AbstractStaff 
    private  fadingOut = false
    private noteRepresentation: INoteData
    
    constructor(note: INoteData, staff: AbstractStaff) {
        super(noteSVG)
        this.noteRepresentation = note
        this.staff = staff        
    }
    
    public getNoteRepresentation(): INoteData {
        return this.noteRepresentation
    }
     
    /**
     * Get the width of the note
     */
    public getWidth() {
        return this.element.bbox().w
    }
    
    public getRbox() {
        return this.element.rbox(this.element.doc())
    }

    /**
     * Set the element color
     * @param color
     */
    public fill(color: string) {
        this.element.fill(color)
    }
    
    public draw(x: number, y: number, sizeRatio?: number) {
        super.draw(x, y, sizeRatio, false)
        let ledgerLines: LedgerLines
        const position = this.staff.ledgerLinesPosition(y)
        if (position !== LedgerLinesTypes.NONE) {
            const numberLines = this.staff.numberLedgeLines(y, position)
            ledgerLines = new LedgerLines(numberLines, position, this)
            ledgerLines.draw()
        }
        
        this.setVisible(true)
    }
    
    public getStaff() {
        return this.staff
    }
    
    public getFadingOut() {
        return this.fadingOut
    }

    public fadeOutNote() {
        this.fadingOut = true
        this.fadeOut(500)
    }
}
