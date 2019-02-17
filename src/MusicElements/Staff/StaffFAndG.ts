import AbstractStaff from '@/MusicElements/Staff/AbstractStaff'
import ClefG from '../ClefG'
import ClefF from '../ClefF'

export default class StaffFAndG extends AbstractStaff {
  protected startingPitch: string = 'G4'
  protected readonly NUMBER_LINES: number = 11
  protected readonly CLEF_G_Y: number = 45
  protected readonly CLEF_F_Y: number = 145
  protected drawClef() {
      const clefG = new ClefG()
      const clefF = new ClefF()
      clefG.draw(this.x, this.y - this.CLEF_G_Y, 0.5)
      clefF.draw(this.x, this.y + this.CLEF_F_Y, 0.5)
      
      this.group.add(clefG.getGroup())
      this.group.add(clefF.getGroup())
  }  
}
