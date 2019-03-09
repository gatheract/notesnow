import AbstractMusicElement from './AbstractMusicElement'
import LedgerLinesTypes from '@/Notation/LedgerLinesTypes'
import AbstractNote from './Notes/AbstractNote'
import DrawingArea from '@/Drawing/DrawingArea'

export default class LedgerLines extends AbstractMusicElement {
  private numberLines: number
  private position: LedgerLinesTypes
  private note: AbstractNote
  public constructor(numberLines: number, position: LedgerLinesTypes, note: AbstractNote) {
    super()
    this.numberLines = numberLines
    this.position = position
    this.note = note
  }
  
  public draw() {
    let yPos: number
    let sign: number
    const staffBounds = this.note.getStaff().getStaffBounds()
    
    switch (this.position) {
      case LedgerLinesTypes.ABOVE:
        yPos = staffBounds[0] 
        sign = -1 
        break
      case LedgerLinesTypes.BELOW:
        yPos = staffBounds[staffBounds.length - 1]
        sign = 1
        break
      default:
        yPos = staffBounds[1]
        sign = 1
        break
    }
    
    for (let i = 0 ; i < this.numberLines; i++) {
      yPos += sign * this.note.getStaff().STAVE_SEPARATION
      
      const line = DrawingArea.Instance.area.polyline([
          [18, yPos ],
          [67, yPos ]
      ]).fill('none').stroke({ width: 1 })    
      
      this.parentGroup.add(line)    
      this.note.getParentGroup().add(this.parentGroup)
      
    }
  }
}
