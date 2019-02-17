import AbstractMusicElement from './AbstractMusicDrawing'

const clefSVG = require('@/assets/images/clefg.svg')

export default class ClefG extends AbstractMusicElement {
    constructor() {
        super(clefSVG)
    }
}
