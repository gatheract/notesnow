import { Note } from './NoteConstants'

export interface IKeySignatureData {
  major: Note,
  minor: Note,
  alterations: Note[]
  type: KeySignatureType,
  
}

/**
 * Just something to index them by
 */
export enum KeySignaturesIndex {
  C,
  G,
  D,
  A,
  E,
  B,
  C_FLAT,
  F_SHARP,  
  G_FLAT,
  D_FLAT,
  C_SHARP,
  A_FLAT,
  E_FLAT,
  B_FLAT,
  F
}

export enum KeySignatureType {
  SHARPS,
  FLATS
}

export const KeySignaturesData: { [key: string]: IKeySignatureData } = {
  [KeySignaturesIndex.C]: {
    major: Note.C, minor: Note.A,
    alterations: [],
    type: KeySignatureType.SHARPS
  },
  [KeySignaturesIndex.G]: {
    major: Note.G, minor: Note.E,
    type: KeySignatureType.SHARPS,
    alterations: [Note.FS],
  },
  [KeySignaturesIndex.D]: {
    major: Note.D, minor: Note.B,
    type: KeySignatureType.SHARPS,
    alterations: [Note.FS, Note.CS]
  },
  [KeySignaturesIndex.A]: {
    major: Note.A, minor: Note.FS,
    type: KeySignatureType.SHARPS,
    alterations: [Note.FS, Note.CS, Note.GS]
  },
  [KeySignaturesIndex.E]: {
    major: Note.E, minor: Note.CS,
    type: KeySignatureType.SHARPS,
    alterations: [Note.FS, Note.CS, Note.GS, Note.DS]
  },
  [KeySignaturesIndex.B]: {
    major: Note.B, minor: Note.GS,
    type: KeySignatureType.SHARPS,
    alterations: [Note.FS, Note.CS, Note.GS, Note.DS, Note.AS]
  },
  [KeySignaturesIndex.F_SHARP]: {
    major: Note.FS, minor: Note.DS,
    type: KeySignatureType.SHARPS,
    alterations: [Note.FS, Note.CS, Note.GS, Note.DS, Note.AS, Note.ES]
  },
  [KeySignaturesIndex.C_SHARP]: {
    major: Note.CS, minor: Note.AS,
    type: KeySignatureType.SHARPS,
    alterations: [Note.FS, Note.CS, Note.GS, Note.DS, Note.AS, Note.ES, Note.BS]
  },
  [KeySignaturesIndex.F]: {
    major: Note.F, minor: Note.D,
    type: KeySignatureType.FLATS,
    alterations: [Note.BF]
  } ,
  [KeySignaturesIndex.B_FLAT]: {
    major: Note.BF, minor: Note.G,
    type: KeySignatureType.FLATS,
    alterations: [Note.BF, Note.EF]
  },
  [KeySignaturesIndex.E_FLAT]: {
    major: Note.EF, minor: Note.C,
    type: KeySignatureType.FLATS,
    alterations: [Note.BF, Note.EF, Note.AF]
  },
  [KeySignaturesIndex.A_FLAT]: {
    major: Note.AF, minor: Note.F,
    type: KeySignatureType.FLATS,
    alterations: [Note.BF, Note.EF, Note.AF, Note.DF]   
  },
  [KeySignaturesIndex.D_FLAT]: {
    major: Note.DF, minor: Note.BF,
    type: KeySignatureType.FLATS,
    alterations: [Note.BF, Note.EF, Note.AF, Note.DF, Note.GF]
  },
  [KeySignaturesIndex.G_FLAT]: {
    major: Note.GF, minor: Note.EF,
    type: KeySignatureType.FLATS,
    alterations: [Note.BF, Note.EF, Note.AF, Note.DF, Note.GF, Note.CF]
  },
  [KeySignaturesIndex.C_FLAT]: {
    major: Note.CF, minor: Note.AF,
    type: KeySignatureType.FLATS,
    alterations: [Note.BF, Note.EF, Note.AF, Note.DF, Note.GF, Note.CF, Note.FF]
  }
}
