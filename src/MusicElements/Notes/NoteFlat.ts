import AbstractNote from './AbstractNote'
import Flat from '../Alterations/Flat'

export default class NoteFlat extends AbstractNote {  
  public draw(x: number, y: number, sizeRatio?: number) {
    this.alteration = new Flat()
    super.draw(x, y, sizeRatio)
    this.alteration.draw(-40, 105, 1)
    this.addChild(this.alteration)
  }
}
