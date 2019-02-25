import { Library } from 'svg.js'
import AbstractMusicElement from '@/MusicElements/AbstractMusicDrawing'
import {PianoKey} from '@/Notation/NoteConstants'
import { EventBus, EVENT_PIANO_KEY_PRESSED, EVENT_PIANO_KEY_RELEASED } from '@/EventBus'

const pianoImage = require('@/assets/images/piano_keys.svg')

/**
 * Keys of a piano octave
 */
export default class PianoOctave extends AbstractMusicElement {
    private readonly WRONG_KEY_COLOR = '#f00'
    private readonly CORRECT_KEY_COLOR = '#0f0'
    private readonly NOTES_SVG_CLASSES: { [key in PianoKey | number]: string } = {
        [PianoKey.A]: 'NOTE_A',
        [PianoKey.A_MOD]: 'NOTE_A_SHARP',
        [PianoKey.B]: 'NOTE_B',
        [PianoKey.C]: 'NOTE_C',
        [PianoKey.C_MOD]: 'NOTE_C_SHARP',
        [PianoKey.D]: 'NOTE_D',
        [PianoKey.D_MOD]: 'NOTE_D_SHARP',
        [PianoKey.E]: 'NOTE_E',
        [PianoKey.F]: 'NOTE_F',
        [PianoKey.F_MOD]: 'NOTE_F_SHARP',
        [PianoKey.G]: 'NOTE_G',
        [PianoKey.G_MOD]: 'NOTE_G_SHARP'
    }

    constructor() {
        super(pianoImage)
        this.addClickListeners()
    }

    /**
     * Sets the color of the piano key for a user guess
     * @param note
     * @param correct
     */
    public keyPress(note: PianoKey, correct: boolean) {
        const pianoKey = this.getNoteClass(note)

        if (pianoKey) {
            pianoKey.style('fill', correct ? this.CORRECT_KEY_COLOR : this.WRONG_KEY_COLOR)
        }
    }
    /**
     * When a key is realeased set the fill of the key to null
     * after that the color of the class of the key takes precedence
     * @param note
     */
    public keyRelease(note: PianoKey) {
        const pianoKey = this.getNoteClass(note)
        if (pianoKey) {
            pianoKey.style('fill', null)
        }
    }
    /**
     * Returns the svg element (key) for a note
     * @param note
     */
    private getNoteClass(note: PianoKey): Library['Element'] | undefined {
        if (this.NOTES_SVG_CLASSES[note]) {
            const noteClass = '.' + this.NOTES_SVG_CLASSES[note]
            return this.group.select(noteClass).first()
        }
    }

    /**
     * When a piano key is pressed emit an event to be handled by the game
     */
    private handleMouseDown(event: Event) {
        const keyElement = event.target as HTMLElement
        const keyData = keyElement.getAttribute('data-key')
        const noteClicked = this.clickNoteMatch(keyData)
        EventBus.$emit(EVENT_PIANO_KEY_PRESSED, noteClicked)
    }

    /**
     * When a piano key is relased
     */
    private handleMouseUp(event: Event) {
        const keyElement = event.target as HTMLElement
        const keyData = keyElement.getAttribute('data-key')
        const noteClicked = this.clickNoteMatch(keyData)
        EventBus.$emit(EVENT_PIANO_KEY_RELEASED, noteClicked)
    }

    /**
     * KeyData is an attribute of the svg containg the name of the note that then is matched
     * to the NOTE_SVG_CLASSES object
     */
    private clickNoteMatch(keyData: string | null): PianoKey {
        if (keyData === null) {
            throw Error('Key has no note assigned')
        }
        const keys = Object.keys(this.NOTES_SVG_CLASSES)
        let noteClicked: PianoKey | undefined
        for (const o of keys) {
            const index = parseInt(o, 10)
            if (this.NOTES_SVG_CLASSES.hasOwnProperty(o)) {
                if (this.NOTES_SVG_CLASSES[index] === keyData) {
                    noteClicked = index
                }
            } else {
                throw Error('Invalid class for the note')
            }
        }

        if (typeof (noteClicked) === 'undefined') {
            throw Error('Key has no note or an invalid class assigned')
        }

        return noteClicked
    }

    /**
     * Piano key events for the mouse/touch interface
     */
    private addClickListeners() {
        const keys = this.group.select('.piano_key')
        for (let i = 0; i < keys.length(); i++) {
            const key = keys.get(i)
            key.on('mousedown touchstart', this.handleMouseDown.bind(this))
            key.on('mouseup mouseout touchleave touchend touchcancel', this.handleMouseUp.bind(this))
        }
    }
}
