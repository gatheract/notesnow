import AbstractClef from './AbstractClef'
import AbstractDrawingArea from '@/Drawing/AbstractDrawingArea'
const clefSVG = require('@/assets/images/clefg.svg')

export default class ClefG extends AbstractClef {
    constructor(da: AbstractDrawingArea) {
        super(clefSVG, da)
    }
}
