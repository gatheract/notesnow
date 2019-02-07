import {GameStaff} from '@/Store/Modules/Settings/Types'
import staffFAndG from '@/MusicElements/Staff/StaffFAndG'
import staffF from '@/MusicElements/Staff/StaffF'
import staffG from '@/MusicElements/Staff/StaffG'

export default class StaffFactory {
  public static createStaff(staff: GameStaff) {
    switch (staff) {
      case GameStaff.both:
        return new staffFAndG()
      case GameStaff.fStaff:
        return new staffF()
      case GameStaff.gStaff:
         return new staffG()
      default:
        throw new Error('Invalid staff')
    }
  }
}
