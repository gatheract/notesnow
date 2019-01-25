/**
 * I need these because the game sometimes matches a key, say G, to various
 * pitches, like G4, G3. The connections is in @see NoteData
 */
enum PianoKey {
  C,
  C_MOD,
  D,
  D_MOD,
  E,
  F,
  F_MOD,
  G,
  G_MOD,
  A,
  A_MOD,
  B
}

/**
 * I guess these are all the notes there is xd
 * https://jythonmusic.me/api/midi-constants/pitch/
 */
enum NotePitch {
  CF,
  C,
  CS,
  DF,
  D,
  DS,
  EF,
  E,
  ES,
  FF,
  F,
  FS,
  GF,
  G,
  GS,
  AF,
  A,
  AS,
  BF,
  B,
  BS,
}

enum PentegramNote {
  C,
  D,
  E,
  F,
  G,
  A,
  B
}

enum Alterations {
  natural, 
  sharp,
  flat
}

export {PianoKey, NotePitch, Alterations, PentegramNote}
