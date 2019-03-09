import Stave from '../Stave'

import { PentegramNote } from '../../Notation/NoteConstants'
import { AllNotes } from '../../Notation/NoteData'
import { Library} from 'svg.js'
import AbstractMusicElement from '@/MusicElements/AbstractMusicElement'
import LedgerLinesTypes from '@/Notation/LedgerLinesTypes'

interface INotePosition {
    yPosition: number
    allNotesIndex: number
}

export default abstract class Staff extends AbstractMusicElement {
    
    protected static readonly DOUBLE_STAFF_LINES = 11
    protected static readonly SINGLE_STAFF_LINES = 5
    public readonly STAVE_SEPARATION: number = 25
    protected readonly Y_POSITION = 100
    protected readonly NOTE_Y_FIX = 76
    protected readonly NOTE_SEPARATION: number = this.STAVE_SEPARATION / 2  
    protected xEnd: number
    protected notePositions: INotePosition[] = [] 
    protected usableNotePositions: INotePosition[] = [] 
    protected noteMask: Library['Mask']    
    protected abstract readonly numberLines: number
    protected abstract startingPitch: string
    protected x: number
    protected y: number      
    protected size: number        
    protected staves: Stave[]
    protected noteHeight: number
    
    /**
     * The first and last stave, 4 in case of a double staff
     */
    protected staffBounds: number[]
    
    public constructor() {
        super()
        this.staves = []
        this.staffBounds = []
    }
    
    /**
     * Line end limit
     */
    public noteOutsideStaff(noteXPos: number) {
        return noteXPos > this.xEnd
   }
    
    public getRandomNote() {
        const pos = Math.floor((this.usableNotePositions.length - 1) * Math.random())
        return this.usableNotePositions[pos]        
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
    }
    
    protected abstract drawClef(): void
    /**
     * Generate an array with all the possible note pitches and their corresponding
     * Y value inside the canvas
     */
    protected generatePositions() {
        /**
         * First set a starting point (g for the key of g!)
         */
        const g4Position = this.staves[3].getY() - this.NOTE_Y_FIX
               
        const g4Index = AllNotes.findIndex((element) => {
            return element.pitch === this.startingPitch
        })      
        let staffPos: number = 0             
        let staveCount: number = 0
        let lastNote: PentegramNote = AllNotes[g4Index].penNote
        
        /**
         * I have to do two for loops because I can only calculate the 
         * y position of a note relative to a stave(G / G4).
         * And I can't start at C0 because I don't know how many REAL positions 
         * (disregarding flats, sharps and enharmonics) below G4 it is
         * I need to do some sorting and then filtering with some wickery fuckery
         * to get that number.
         * @todo
         */
        for (let a = g4Index; a >= 0; a--) {
            if (lastNote !== AllNotes[a].penNote) {
                lastNote = AllNotes[a].penNote
                ++staveCount                
            }            
            staffPos = g4Position + (staveCount * this.NOTE_SEPARATION)            
            const data = {allNotesIndex: a, yPosition: staffPos}
            this.notePositions.push(data)
            if (staffPos <= this.staves[this.staves.length - 1].getY() - this.noteHeight) {               
                this.usableNotePositions.push(data)
            }            
        }
        
        staveCount = 0
        lastNote = AllNotes[g4Index].penNote
        for (let a = g4Index + 1 ; a < AllNotes.length; a++) {
            if (lastNote !== AllNotes[a].penNote) {
                lastNote = AllNotes[a].penNote
                ++staveCount                
            }            
            staffPos = g4Position - (staveCount * this.NOTE_SEPARATION)            
            const data = {allNotesIndex: a, yPosition: staffPos}
            this.notePositions.push(data)
            if (staffPos > 0) { // alternate staffPos > this.noteHeight
                this.usableNotePositions.push(data)
            }            
        }
    }    
    
    /**
     * Returns the y position of the point that goes through the stave position
     * @param noteY 
     */
    protected getNoteTopPosition(noteY: number ) {
        return noteY + this.NOTE_Y_FIX
    }
    
}
