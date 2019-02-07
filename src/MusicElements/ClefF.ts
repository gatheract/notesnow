import AbstractMusicElement from './AbstractMusicElement'

const clefSVG = require('@/assets/images/cleff.svg')

export default class ClefF extends AbstractMusicElement {
    constructor() {
        super(clefSVG)
    }
}
