import SVG = require('svg.js')

export default class DrawingArea {
    private static instance: DrawingArea
    public readonly WINDOW_WIDTH = 800
    public readonly WINDOW_HEIGHT = 1000

    private drawing: SVG.Doc

    private constructor() {
    }

    get area(): SVG.Doc {
        return this.drawing
    }

    public initialize() {
        this.drawing = SVG('drawing').size('100%', '100%')
        this.drawing.viewbox(0, 0, this.WINDOW_WIDTH, this.WINDOW_HEIGHT)
        this.drawing.attr('preserveAspectRatio', 'xMidYMax meet')
    }

    public static get Instance() {
        return this.instance || (this.instance = new this())
    }
}
