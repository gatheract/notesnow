export enum EDefaultPianoLayouts {
  keys88,
  keys76,
  keys61,
  keys49
}

export interface IPianoLayout {
  numberKeys: number,
  startPitch: string,
  endPitch: string
}

export interface IPianoLayouts {
  [index: string]: IPianoLayout
}

/**
 * Just some basic common layouts
 * https://www.thoughtco.com/illustrated-guide-to-middle-c-2701388
 */
export const PianoLayouts: IPianoLayouts = {
  [EDefaultPianoLayouts.keys88]: {
    numberKeys: 88,
    startPitch: 'A0',
    endPitch: 'C8'
  },
  [EDefaultPianoLayouts.keys76]: {
    numberKeys: 76,
    startPitch: 'E0',
    endPitch: 'G6'
  },
  [EDefaultPianoLayouts.keys61]: {
    numberKeys: 61,
    startPitch: 'C1',
    endPitch: 'C6'
  },
  [EDefaultPianoLayouts.keys49]: {
    numberKeys: 49,
    startPitch: 'C1',
    endPitch: 'C5'
  }
}
