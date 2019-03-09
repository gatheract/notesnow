import AbstractNote from './AbstractNote'
import Sharp from '../Alterations/Sharp'

export default class NoteSharp extends AbstractNote {
  private sharp: Sharp
  public draw(x: number, y: number, sizeRatio?: number) {
    this.sharp = new Sharp()
    super.draw(x, y, sizeRatio)
    this.sharp.draw(-45, 140, 0.8)
    this.group.add(this.sharp.getParentGroup())    
  }
}
