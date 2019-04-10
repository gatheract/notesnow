import AbstractStaff from '@/MusicElements/Staffs/AbstractStaff'
import ClefG from '../Clefs/ClefG'
import ClefF from '../Clefs/ClefF'
import { KeySignatureType } from '../../Notation/KeySignatures'
import StaffG from './StaffG'

export default class StaffFAndG extends AbstractStaff {
  protected startingPitch: string = 'C8'
  protected readonly numberLines: number = AbstractStaff.DOUBLE_STAFF_LINES
  protected readonly CLEF_G_Y: number = 45
  protected readonly CLEF_F_Y: number = 145

  protected generateKeySignaturePositions(type: KeySignatureType, numberAlterations: number) {
    const self = this

    const start1 = self.staves[0].getY()
    const start2 = self.staves[6].getY()

    const calcPos1 = (val: number) => {
      return start1 + (val * this.NOTE_SEPARATION)
    }
    const calcPos2 = (val: number) => {
      return start2 + (val * this.NOTE_SEPARATION)
    }
    /**
     * Filter the "notes" in the key signature
     * not by value but by the number of them
     * i.e. If the key of E minor has only one alt
     * then only show the first in the list
     */
    const remove = (a: number, index: number) => {
      if (index >= numberAlterations) {
        return false
      }
      return true
    }

    switch (type) {
      case KeySignatureType.SHARPS:
        const pos = StaffG.SHARPS_POSITIONS.filter(remove).map(calcPos1)
        const pos2 = StaffG.SHARPS_POSITIONS.filter(remove).map(calcPos2)
        return pos.concat(pos2)
      case KeySignatureType.FLATS:
        const posf = StaffG.SHARPS_POSITIONS.filter(remove).map(calcPos1)
        const posf2 = StaffG.SHARPS_POSITIONS.filter(remove).map(calcPos2)
        return posf.concat(posf2)
    }
  }

  protected drawClef() {

    const clefG = new ClefG(this.getDrawingArea())
    const clefF = new ClefF(this.getDrawingArea())
    this.clefs.push(clefG)
    this.clefs.push(clefF)
    clefG.draw(this.x, this.y - this.CLEF_G_Y, 0.5)
    clefF.draw(this.x, this.y + this.CLEF_F_Y, 0.5)

    this.addParent(clefG)
    this.addParent(clefF)
  }
}
