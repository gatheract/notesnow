import { INoteData, INotePitch } from '@/Notation/NoteData'
import SVGDrawing from '../SVGDrawing'
import AbstractStaff from '@/MusicElements/Staffs/AbstractStaff'
import LedgerLines from '../LedgerLines'
import LedgerLinesTypes from '@/Notation/LedgerLines'
import Sharp from '../Alterations/Sharp'
import Flat from '../Alterations/Flat'
const noteSVG = require('@/assets/images/quarter.svg')

/**
 * Just a quarter note (for now)
 */
export default class AbstractNote extends SVGDrawing {
    public static readonly NOTE_HEIGHT = 50
    protected staff: AbstractStaff
    protected alteration: Sharp | Flat
    private fadingOut = false
    private noteRepresentation: INotePitch

    constructor(note: INotePitch, staff: AbstractStaff) {
        super(noteSVG, staff.getDrawingArea())
        this.noteRepresentation = note
        this.staff = staff
    }

    public getNoteRepresentation() {
        return this.noteRepresentation
    }

    /**
     * Get the width of the note
     */
    public getWidth() {
        return this.group.bbox().w
    }

    /**
     * Gets the note alteration
     */
    public getAlteration() {
        return this.alteration
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
            ledgerLines = new LedgerLines(numberLines, position, this, x)
            ledgerLines.draw()
        }

        this.setVisible(true)
    }

    public getX(): number {
        return this.element.rbox(this.element.doc()).x
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

    public getNotePlusAlterationWidth() {
        let width = this.getRbox().width
        if (this.alteration) {
            width += + this.getAlteration().getRbox().width
        }
        return width
    }
}
