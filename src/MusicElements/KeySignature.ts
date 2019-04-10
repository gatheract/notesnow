import SVGElement from './SVGElement'
import * as ks from '@/Notation/KeySignatures'
import Sharp from './Alterations/Sharp'
import Flat from './Alterations/Flat'
import AbstractDrawingArea from '@/Drawing/AbstractDrawingArea'

export default class KeySignature extends SVGElement {
  
    protected keyPos: number[]
    protected keyType: ks.KeySignatureType | null
    protected startX: number
    protected doubleStaff: boolean
    
    public constructor(da: AbstractDrawingArea, keyType: ks.KeySignatureType | null, 
                       keyPos: number[], startX: number, doubleStaff = false) {
      super(da)
      this.keyPos = keyPos
      this.keyType = keyType
      this.startX = startX
      this.doubleStaff = doubleStaff
    }
    
    public draw() {
         
      if (this.keyType === null) {
        return
      }
      let alteration: Sharp | Flat
      const SHARP_Y_SEP = 15 
      const FLAT_Y_SEP = 31
      
      const SHARP_X_SEP = 14 
      const FLAT_X_SEP = 18
      
      const FLAT_SIZE_RATIO = 0.5
      const SHARP_SIZE_RATIO = 0.36
      let i = 0
      for (const pos of this.keyPos) {
        if (this.doubleStaff) {          
          if (i === (this.keyPos.length) / 2) {
            i = 0
          }
        }
        if (this.keyType === ks.KeySignatureType.FLATS) {
          alteration = new Flat(this.getDrawingArea())
          alteration.draw(this.startX + (i++ * FLAT_X_SEP) , pos - FLAT_Y_SEP , FLAT_SIZE_RATIO)
        } else {
          alteration = new Sharp(this.getDrawingArea())
          alteration.draw(this.startX + (i++ * SHARP_X_SEP) , pos - SHARP_Y_SEP , SHARP_SIZE_RATIO)
        } 
        this.addChild(alteration)  
      }
    }
    
    public getStartX() {
      return this.startX
    }
}
