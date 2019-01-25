import AbstractMusicElement from './AbstractMusicElement'

const cleffSVG = require('@/assets/images/cleffg.svg')

export default class CleffG extends AbstractMusicElement {
    constructor() {
        super(cleffSVG)
    }
}
