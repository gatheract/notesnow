import AbstractNote from './AbstractNote'
import Sharp from '../Alterations/Sharp'

export default class NoteSharp extends AbstractNote {
  public draw(x: number, y: number, sizeRatio?: number) {
    this.alteration = new Sharp()
    super.draw(x, y, sizeRatio)
    this.alteration.draw(-45, 140, 0.8)
    this.addChild(this.alteration)
  }
}
