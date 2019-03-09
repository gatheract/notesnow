import AbstractStaff from '@/MusicElements/Staffs/AbstractStaff'
import ClefG from '../ClefG'
import ClefF from '../ClefF'

export default class StaffFAndG extends AbstractStaff {
  protected startingPitch: string = 'G4'
  protected readonly numberLines: number = AbstractStaff.DOUBLE_STAFF_LINES
  protected readonly CLEF_G_Y: number = 45
  protected readonly CLEF_F_Y: number = 145
  protected drawClef() {
      
      const clefG = new ClefG()
      const clefF = new ClefF()
      clefG.draw(this.x, this.y - this.CLEF_G_Y, 0.5)
      clefF.draw(this.x, this.y + this.CLEF_F_Y, 0.5)
      
      this.parentGroup.add(clefG.getParentGroup())
      this.parentGroup.add(clefF.getParentGroup())
  }  
}
