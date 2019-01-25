import {PianoKey} from './NoteConstants'
/**
 * Generator that returns the musical notes
 * if modifiedKeys is true it will return 12 notes (piano keys)
 * if its not it will return 7 (musical notes)
 * notesAfter && notesBefore are not really that useful
 * @param startValue the starting note
 * @param forwardDirection whether to go C A B (forward) or C B A(backwards)
 * @param modifiedKeys modified keys if you also want to return the mods
 * @param notesBefore notes before the starting note
 * @param notesAfter notes after the starting note
 */
export default function* NotesGenerator(
    startValue: PianoKey | null,
    modifiedKeys: boolean = true,
    forwardDirection: boolean = true,
    notesBefore: number = 0,
    notesAfter: number = 0,
    
) {
    let last = 0
    const notes: PianoKey[] = []
    const notesVals = [
        { val: PianoKey.A, mod: false },
        { val: PianoKey.A_MOD, mod: true },
        { val: PianoKey.B, mod: false },
        { val: PianoKey.C, mod: false },
        { val: PianoKey.C_MOD, mod: true },
        { val: PianoKey.D, mod: false },
        { val: PianoKey.D_MOD, mod: true },
        { val: PianoKey.E, mod: false },
        { val: PianoKey.F, mod: false },
        { val: PianoKey.F_MOD, mod: true },
        { val: PianoKey.G, mod: false },
        { val: PianoKey.G_MOD, mod: true }
    ]

    notesVals.map((a) => {
        if (modifiedKeys) {
            notes.push(a.val)
        } else if (!a.mod) {
            notes.push(a.val)
        }
    })

    /**
     * Start in a given note as opposed to 'A'
     */
    if (startValue !== null) {
        const noteIndex = notes.indexOf(startValue)

        if (noteIndex === -1) {
            throw new Error('Invalid starting note for the generator')
        }

        last = noteIndex

        /**
         * If you want to go back 9 notes from a note
         * is the same as going back 2 places 9%7 = 2
         * same thing when going forward
         */
        if (notesBefore) {
            const subs = notesBefore % 7
            last += subs <= last ? subs * -1 : notes.length - subs
        }

        if (notesAfter) {
            const subs = notesAfter % 7
            last += subs + last < notes.length ? subs : (notes.length - subs) * -1
        }
    }

    while (true) {
        yield* [notes[last]]
        if (forwardDirection) {
            last = last === notes.length - 1 ? last = 0 : ++last
        } else {
            last = last > 0 ? --last : last = notes.length - 1
        }
    }
}
