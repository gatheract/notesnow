import AbstractNote from './AbstractNote'
import Flat from '../Alterations/Flat'

export default class NoteFlat extends AbstractNote {
  private flat: Flat
  
  public draw(x: number, y: number, sizeRatio?: number) {
    this.flat = new Flat()
    super.draw(x, y, sizeRatio)
    this.flat.draw(-40, 105, 1)
    this.group.add(this.flat.getParentGroup())    
  }
}
