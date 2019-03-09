
import AbstractMusicDrawing from '../AbstractMusicDrawing'

const flatSVG = require('@/assets/images/flat.svg')

export default class Flat extends AbstractMusicDrawing {
  public constructor() {
    super(flatSVG)
  }
}
