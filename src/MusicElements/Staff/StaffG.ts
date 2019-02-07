import AbstractStaff from '@/MusicElements/Staff/AbstractStaff'
import ClefG from '../ClefG'

export default class StafFG extends AbstractStaff {
    protected drawClef() {
      const clefG = new ClefG()
      clefG.draw(this.x, 55, 0.5)
    }
}
