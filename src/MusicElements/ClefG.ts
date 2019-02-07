import AbstractMusicElement from './AbstractMusicElement'

const clefSVG = require('@/assets/images/clefg.svg')

export default class ClefG extends AbstractMusicElement {
    constructor() {
        super(clefSVG)
    }
}
