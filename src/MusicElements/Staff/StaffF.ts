import AbstractStaff from '@/MusicElements/Staff/AbstractStaff'
import ClefF from '../ClefF'

export default class StafF extends AbstractStaff {
  protected startingPitch: string = 'B3'
  protected drawClef() {
    const clefF = new ClefF()
    clefF.draw(this.x, 96, 0.5)
  }
}
