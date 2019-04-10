import Stave from '../Stave'

import { PentegramNote } from '../../Notation/NoteConstants'

import { Library } from 'svg.js'
import SVGElement from '@/MusicElements/SVGElement'
import LedgerLinesTypes from '@/Notation/LedgerLines'
import KeySignature from '@/MusicElements/KeySignature'
import AbstractClef from '../Clefs/AbstractClef'
import { KeySignatureType, KeySignaturesData, KeySignaturesIndex } from '../../Notation/KeySignatures'
import GameStore from '@/Game/GameStore'
import AbstractDrawingArea from '@/Drawing/AbstractDrawingArea'
import { INotePitch } from '@/Notation/NoteData'
import { PianoLayouts, EDefaultPianoLayouts } from '@/Piano/PianoLayouts'

interface INotePosition {
    yPosition: number
    notePitch: INotePitch
}

export default abstract class Staff extends SVGElement {
    protected static readonly DOUBLE_STAFF_LINES = 11
    protected static readonly SINGLE_STAFF_LINES = 5
    public readonly STAVE_SEPARATION: number = 25
    protected readonly Y_POSITION = 100
    protected readonly NOTE_Y_FIX = 76
    protected readonly NOTE_SEPARATION: number = this.STAVE_SEPARATION / 2
    protected xEnd: number
    /**
     * Usable positions are those in the staff interval
     */
    protected notePositions: INotePosition[] = []
    protected usablePositions: INotePosition[] = []
    protected noteMask: Library['Mask']
    protected abstract readonly numberLines: number
    protected abstract startingPitch: string
    protected x: number
    protected y: number
    protected size: number
    protected staves: Stave[]
    protected noteHeight: number
    protected keySignature: KeySignature
    protected clefs: AbstractClef[] = []

    /**
     * The first and last stave, 4 in case of a double staff
     */
    protected staffBounds: number[]
    public constructor(da: AbstractDrawingArea) {
        super(da)
        this.staves = []
        this.staffBounds = []
        this.parentGroup.id('staff')
    }

    /**
     * Line end limit
     */
    public noteOutsideStaff(noteXPos: number) {
        return noteXPos > this.xEnd
    }

    public getRandomNote() {
        const pos = Math.floor((this.usablePositions.length - 1) * Math.random())
        return this.usablePositions[pos]
    }

    public getStaffBounds() {
        return this.staffBounds
    }

    /**
     * If the note needs a line drawn across when it's above or below the staff
     */
    public ledgerLinesPosition(noteYPosition: number) {
        const noteYTop = this.getNoteTopPosition(noteYPosition)

        /**
         * Then check if its on top or below the staff
         */
        if (
            noteYTop < this.staffBounds[0]
        ) {
            return LedgerLinesTypes.ABOVE
        } else if (noteYTop > this.staffBounds[this.staffBounds.length - 1]) {
            return LedgerLinesTypes.BELOW

        } else if (this.staffBounds.length === 4) {
            /**
             * If there are two staffs check that the note is not in the middle
             */
            if (noteYTop > this.staffBounds[1] &&
                noteYTop < this.staffBounds[2]) {
                return LedgerLinesTypes.MIDDLE
            }
        }
        return LedgerLinesTypes.NONE
    }

    /**
     * How many ledger lines below or above the current note
     * @param noteYPosition 
     * @param position 
     */
    public numberLedgeLines(noteYPosition: number, position: LedgerLinesTypes) {
        const yPos = this.getNoteTopPosition(noteYPosition)
        if (position === LedgerLinesTypes.ABOVE) {

            return Math.floor((this.staffBounds[0] - yPos) / this.STAVE_SEPARATION)
        } else if (position === LedgerLinesTypes.BELOW) {
            return Math.floor(Math.abs(
                ((this.staffBounds[this.staffBounds.length - 1] - yPos) / this.STAVE_SEPARATION)
            ))
        }
        return 1
    }

    public getPlayableArea() {
        return this.keySignature.getStartX() + this.keySignature.getWidth()
    }

    public draw(x: number, y: number, size: number, noteHeight: number) {
        this.x = x
        this.y = y
        this.size = size
        this.xEnd = this.x + this.size
        this.noteHeight = noteHeight
        for (let a = 0; a < this.numberLines; a++) {
            if (a === 5) {
                /**
                 * when there are two staffs the 5th line is invisible
                 * in the middle of both
                 */
                continue
            }
            const startX = this.x
            const endX = this.x + this.size
            const yPosition = this.y + (this.STAVE_SEPARATION * a)

            const stave = new Stave(this)
            stave.draw(startX, endX, yPosition)
            this.staves.push(stave)
        }

        /**
         * Limits of the staff/s, 2 or 4 positions
         */
        [0, 4, 5, 9].forEach((i) => {
            if (this.staves[i]) {
                this.staffBounds.push(this.staves[i].getY())
            }
        })

        this.generatePositions()

        this.drawClef()
        this.drawKeySignature()
    }

    protected abstract drawClef(): void
    /**
     * Generate an array with all the possible note pitches and their corresponding
     * Y value inside the canvas
     */
    protected generatePositions() {
        const altNotes = GameStore.getAlteredPitches()
        const altNotesArray = Object.values(altNotes).reverse()
        const startNote = altNotes[GameStore.getStartPitch()]
        const endNote = altNotes[GameStore.getEndPitch()]

        /**
         * The end note is the one at the top of the staff
         */
        const staffBegNote = altNotes[PianoLayouts[EDefaultPianoLayouts.keys88].endPitch]

        /**
         * First set a starting point (the first note in the piano pentagram
         */
        const startPosition = this.staves[0].getY() - this.NOTE_Y_FIX - (9 * this.STAVE_SEPARATION)

        let staffPos: number = 0
        let staveCount: number = 0
        let lastNote: PentegramNote = staffBegNote.penNote

        for (const a in altNotesArray) {
            if (altNotesArray[a].midiValue <= staffBegNote.midiValue) {
                if (lastNote !== altNotesArray[a].penNote) {
                    lastNote = altNotesArray[a].penNote
                    ++staveCount
                }
                staffPos = startPosition + (staveCount * this.NOTE_SEPARATION)
                const data = { notePitch: altNotesArray[a], yPosition: staffPos }
                this.notePositions.push(data)
                if (
                    (altNotesArray[a].midiValue >= startNote.midiValue) &&
                    altNotesArray[a].midiValue <= endNote.midiValue
                ) {
                    this.usablePositions.push(data)
                }

            }
        }
    }

    protected drawKeySignature() {
        const SIGNATURE_X = 80

        const keySig = GameStore.getKeySignature()
        let pos: number[]
        let type: KeySignatureType | null

        if (keySig !== null) {
            const numAlt = KeySignaturesData[keySig].alterations.length
            type = KeySignaturesData[keySig].type
            pos = this.generateKeySignaturePositions(type, numAlt)

        } else {
            pos = []
            type = null
        }
        this.keySignature = new KeySignature(this.getDrawingArea(), type, pos, SIGNATURE_X, this.isDoubleStaff())
        this.keySignature.draw()
    }

    /**
     * Generate the y positions of the sharps or flats that go into the key signature
     * First I get the position of the first stave, and then according to the note separation
     * add or substract height
     */
    protected abstract generateKeySignaturePositions(type: KeySignatureType, numberAlterations: number): number[]

    /**
     * Returns the y position of the point that goes through the stave position
     * @param noteY 
     */
    protected getNoteTopPosition(noteY: number) {
        return noteY + this.NOTE_Y_FIX
    }

    protected isDoubleStaff() {
        return this.staves.length > 5
    }

}
