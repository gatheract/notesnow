import AbstractClef from './AbstractClef'
import AbstractDrawingArea from '@/Drawing/AbstractDrawingArea'
const clefSVG = require('@/assets/images/cleff.svg')

export default class ClefF extends AbstractClef {
    constructor(da: AbstractDrawingArea) {
        super(clefSVG, da)        
    }
}
