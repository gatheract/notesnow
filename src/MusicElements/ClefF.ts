import AbstractMusicElement from './AbstractMusicDrawing'
import { G } from 'svg.js'
const clefSVG = require('@/assets/images/cleff.svg')

export default class ClefF extends AbstractMusicElement {
    constructor() {
        super(clefSVG)        
    }
}
