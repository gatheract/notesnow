import AbstractStaff from '@/MusicElements/Staffs/AbstractStaff'
import ClefG from '../Clefs/ClefG'
import {KeySignatureType} from '../../Notation/KeySignatures'

export default class StaffG extends AbstractStaff {
    public static readonly SHARPS_POSITIONS = [0, 3, -1, 2, 5, 1, 4]
    public static readonly FLATS_POSITIONS = [4, 1, 5, 2, 6, 3, 7]
  
    protected startingPitch: string = 'G4'
    protected readonly numberLines: number = AbstractStaff.SINGLE_STAFF_LINES
    protected readonly CLEF_G_Y: number = 45
    
    protected drawClef() {
      const clefG = new ClefG()
      this.clefs.push(clefG)
      clefG.draw(this.x, this.y - this.CLEF_G_Y, 0.5)
      this.addParent(clefG)
    }
    
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
          return StaffG.SHARPS_POSITIONS.filter(remove).map(calcPos)    
        case KeySignatureType.FLATS:
          return StaffG.FLATS_POSITIONS.filter(remove).map(calcPos)
      }
    }
}
