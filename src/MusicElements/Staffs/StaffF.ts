import AbstractStaff from '@/MusicElements/Staffs/AbstractStaff'
import ClefF from '../Clefs/ClefF'
import {KeySignatureType} from '../../Notation/KeySignatures'

export default class StaffF extends AbstractStaff {
    
  public static readonly SHARPS_POSITIONS = [2, 5, 1, 4, 7, 3, 6]
  public static readonly FLATS_POSITIONS = [6, 3, 7, 4, 8, 5, 9]
  
  protected startingPitch: string = 'B3'
  protected readonly numberLines: number = AbstractStaff.SINGLE_STAFF_LINES
  protected readonly CLEF_F_Y: number = 4

  protected generateKeySignaturePositions(type: KeySignatureType, numberAlterations: number) {
    const self = this
    
    const calcPos = (val: number) => {
      const start = self.staves[0].getY()
      return start + (val * this.NOTE_SEPARATION)
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
        return StaffF.SHARPS_POSITIONS.filter(remove).map(calcPos)    
      case KeySignatureType.FLATS:
        return StaffF.FLATS_POSITIONS.filter(remove).map(calcPos)
    }
  }
  
  protected drawClef() {
    const clefF = new ClefF()
    this.clefs.push(clefF)
    clefF.draw(this.x, this.y - this.CLEF_F_Y, 0.5)
    this.addParent(clefF)
  }
}
