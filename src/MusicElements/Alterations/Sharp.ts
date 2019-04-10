
import SVGDrawing from '../SVGDrawing'
import AbstractDrawingArea from '@/Drawing/AbstractDrawingArea'

const sharpSVG = require('@/assets/images/sharp.svg')

export default class Sharp extends SVGDrawing {
  public constructor(da: AbstractDrawingArea) {
    super(sharpSVG, da)
  }
}
