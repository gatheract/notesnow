import AbstractStaff from '@/MusicElements/Staff/AbstractStaff'
import ClefF from '../ClefF'

export default class StafF extends AbstractStaff {
  protected startingPitch: string = 'B3'
  protected readonly CLEF_F_Y: number = 4
  protected drawClef() {
    const clefF = new ClefF()
    clefF.draw(this.x, this.y - this.CLEF_F_Y, 0.5)
    this.group.add(clefF.getGroup())
  }
}
