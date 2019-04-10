import { Note, PianoKey, Alterations as Alt, PentegramNote as Pen } from '@/Notation/NoteConstants'
import { BasicNoteData } from '@/Notation/BasicNoteData'
import { KeySignaturesData, KeySignaturesIndex, KeySignatureType } from '@/Notation/KeySignatures'
import { NoteData, INotePitch, INoteData, INoteDataObject } from './NoteData'
import fastClone from 'fast-clone'

export default class AllNotes {
  public static getInstance() {
    if (!this.instance) {
      this.instance = new this()
    }
    return this.instance
  }

  private static instance: AllNotes
  private notesWithAltLimits: INotePitch[]
  private notesWithoutAlt: INotePitch[]
  private notesWithoutAltOrLimits: INotePitch[]
  private constructor() { }

  /**
   * Notes are the ones with the keysignature applied
   */
  public get notes() {
    return this.notesWithAltLimits
  }

  /**
   * The original notes without the keysignature applied
   */
  public get naturalNotes() {
    if (!this.notesWithoutAlt) {
      this.notesWithoutAlt = this.generateNotes(null, null, null)
    }
    return this.notesWithoutAlt
  }

  public get pianoNotes() {
    return this.notesWithoutAltOrLimits
  }

  public initialize(
    signature: KeySignaturesIndex | null,
    startNotePitch: string | null,
    endNotePitch: string | null) {
    this.notesWithoutAltOrLimits = this.generateNotes(signature, null, null)
    if (!this.notesWithoutAlt) {
      this.notesWithoutAlt = this.generateNotes(null, null, null)
    }
    const nwa = this.notesWithoutAlt
    const startNote = nwa.findIndex((i) => i.pitch === startNotePitch)
    const endNote = nwa.findIndex((i) => i.pitch === endNotePitch)
    this.notesWithAltLimits = this.generateNotes(signature, nwa[startNote], nwa[endNote])
  }

  private generateNotes(
    signature: KeySignaturesIndex | null,
    startNote: INotePitch | null,
    endNote: INotePitch | null) {
    let skipFlag = 0
    const notePitchs = []
    const postFixList = ['_1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    const NewNoteData = fastClone(NoteData)
    if (signature !== null) {
      this.applyKeySignature(signature, NewNoteData)
    }

    let octave = 0
    for (const post of postFixList) {
      const noteDataKeys = Object.keys(NewNoteData)
      for (const key of noteDataKeys) {
        /**
         * Should have used slice @todo
         */
        if (++skipFlag < 2) { continue } // CF_1 doesnt exist
        let newData: INotePitch
        const newKey = Note[Number(key)] + post // string C_1, C0, ... G9
        newData = Object.assign({}, Object(NewNoteData[key]))

        newData.pitch = newKey
        /**
         * The midi value grows as the note it refers to changes
         * a lot of notes are enharmonics, so they are the same,
         * and the midi value shouldnt change
         * 12 is the size of max value each octave not counting
         * BS that is actually the first note of the next one
         */
        newData.midiValue = (octave * 12) + (newData.noteVal) - 1

        /**
         * The user selects a start and endnote interval for each staff
         * the notes above and below are not necessary
         */
        if (startNote && endNote) {
          if (
            newData.midiValue < startNote.midiValue
            || newData.midiValue > endNote.midiValue) {
            continue
          }
        }

        newData.octave = octave

        notePitchs.push(newData)
        if (newKey === 'G9') { break }
      }
      ++octave
    }
    return notePitchs
  }

  /**
   * Return the next piano key in the PianoKey enum and sets the correct midi value   * 
   * @param note
   * @param next wheter to return previous or next key
   */
  private nextPianoKey(note: INoteData, next: boolean = true) {
    const sign = next ? 1 : -1
    let newNote = note.key + sign
    /**
     * Typescript apparently doesnt have this function
     */
    if (typeof PianoKey[newNote] === 'undefined') {
      if (next) {
        newNote = Number(PianoKey.C)
      } else {
        newNote = Number(PianoKey.B)
      }

    }
    /** Note key is used by the the svg keyboard */
    note.key = newNote
    /** Noteval is used to calculate the midi value */
    note.noteVal += sign
    return note
  }

  /**
   * Applies the key signature alterations to match the corresponding piano key
   * @param signature 
   * @param noteData 
   */
  private applyKeySignature(signature: KeySignaturesIndex, noteData: INoteDataObject) {
    const modPentagramNotes: Pen[] = []
    const signatureData = KeySignaturesData[signature]
    const sigData = KeySignaturesData[signature]

    for (const sigNote of signatureData.alterations) {
      modPentagramNotes.push(noteData[sigNote].penNote)
    }
    for (const e in noteData) {
      if (noteData[e]) {
        for (const k in modPentagramNotes) {
          if (noteData[e].penNote === modPentagramNotes[k]) {
            noteData[e] = this.nextPianoKey(noteData[e],
              sigData.type === KeySignatureType.SHARPS)
          }
        }
      }
    }
  }
}
