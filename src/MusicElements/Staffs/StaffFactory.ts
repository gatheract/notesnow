import {GameStaff} from '@/Store/Modules/Settings/Types'
import staffFAndG from '@/MusicElements/Staffs/StaffFAndG'
import staffF from '@/MusicElements/Staffs/StaffF'
import staffG from '@/MusicElements/Staffs/StaffG'
import AbstractDrawingArea from '@/Drawing/AbstractDrawingArea'

export default class StaffFactory {
  public static createStaff(staff: GameStaff, da: AbstractDrawingArea) {
    switch (staff) {
      case GameStaff.both:
        return new staffFAndG(da)
      case GameStaff.fStaff:
        return new staffF(da)
      case GameStaff.gStaff:
         return new staffG(da)
      default:
        throw new Error('Invalid staff')
    }
  }
}
