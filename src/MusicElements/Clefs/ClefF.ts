import AbstractClef from './AbstractClef'
const clefSVG = require('@/assets/images/cleff.svg')

export default class ClefF extends AbstractClef {
    constructor() {
        super(clefSVG)        
    }
}
