import AbstractClef from './AbstractClef'
const clefSVG = require('@/assets/images/clefg.svg')

export default class ClefG extends AbstractClef {
    constructor() {
        super(clefSVG)
    }
}
