import SVGDrawing from '../SVGDrawing'
import AbstractDrawingArea from '@/Drawing/AbstractDrawingArea'

export default class AbstractClef extends SVGDrawing {
    public constructor(clefSVG: string, da: AbstractDrawingArea) {
      super(clefSVG, da)
    }
}
