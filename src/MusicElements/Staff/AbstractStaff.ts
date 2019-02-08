import Stave from '../Stave'

import { PentegramNote } from '../../Notation/NoteConstants'
import { AllNotes } from '../../Notation/NoteData'
import { Library } from 'svg.js'

interface INotePosition {
    yPosition: number
    allNotesIndex: number
}

export default abstract class Staff {
    
    public xEnd: number
    public notePositions: INotePosition[] = [] 
    public usableNotePositions: INotePosition[] = [] 
    public noteMask: Library['Mask']
    public readonly NOTE_Y_FIX = 76
    
    protected abstract startingPitch: string
    protected x: number
    protected y: number
    
    private lines: number = 5
    private readonly STAVE_SEPARATION: number = 25
    private readonly NOTE_SEPARATION: number = this.STAVE_SEPARATION / 2    
    private size: number    
    
    private staves: Stave[]
    private noteHeight: number

    /* Magic number to make the font work with the size of staff */
    private readonly EXTRA_NOTES_BELOW_STAFF = 10    
    
    public constructor() {
        this.staves = []
    }
    
    public getRandomNote() {
        const pos = Math.floor((this.usableNotePositions.length - 1) * Math.random())
        return this.usableNotePositions[pos]
    }

    public draw(x: number, y: number, size: number, noteHeight: number) {
        this.x = x
        this.y = y
        this.size = size
        this.xEnd = this.x + this.size
        this.noteHeight = noteHeight
        
        for (let a = 0; a < this.lines; a++) {
            const startX = this.x
            const endX = this.x + this.size
            const yPosition = this.y + (this.STAVE_SEPARATION * a)
            
            const stave = new Stave()
            
            stave.draw(startX, endX, yPosition)
            this.staves.push(stave)
        }

        this.generatePositions()
        
        this.drawClef()
    }
    
    public getRandomStaffNote() {
        return 1
    }
    protected abstract drawClef(): void
    /**
     * Generate an array with all the possible note pitches and their corresponding
     * Y value inside the canvas
     */
    private generatePositions() {
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
            if (staffPos > this.noteHeight) {
                this.usableNotePositions.push(data)
            }            
        }
    }    
    
}
