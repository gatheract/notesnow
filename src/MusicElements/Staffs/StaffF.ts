import AbstractStaff from '@/MusicElements/Staffs/AbstractStaff'
import ClefF from '../ClefF'

export default class StafF extends AbstractStaff {
  protected startingPitch: string = 'B3'
  protected readonly numberLines: number = AbstractStaff.SINGLE_STAFF_LINES
  protected readonly CLEF_F_Y: number = 4
  protected drawClef() {
    const clefF = new ClefF()
    clefF.draw(this.x, this.y - this.CLEF_F_Y, 0.5)
    this.parentGroup.add(clefF.getParentGroup())
  }
}
