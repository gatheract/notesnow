
import SVGDrawing from '../SVGDrawing'
import AbstractDrawingArea from '@/Drawing/AbstractDrawingArea'

const flatSVG = require('@/assets/images/flat.svg')

export default class Flat extends SVGDrawing {
  public constructor(da: AbstractDrawingArea) {
    super(flatSVG, da)
  }
}
