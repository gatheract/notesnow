import AbstractStaff from '@/MusicElements/Staff/AbstractStaff'
import ClefG from '../ClefG'

export default class StafFG extends AbstractStaff {
    protected startingPitch: string = 'G4'
    protected readonly CLEF_G_Y: number = 45
    protected drawClef() {
      const clefG = new ClefG()
      clefG.draw(this.x, this.y - this.CLEF_G_Y, 0.5)
      this.group.add(clefG.getGroup())
    }
}
