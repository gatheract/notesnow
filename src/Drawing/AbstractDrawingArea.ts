import SVG = require('svg.js')

export default abstract class AbstractDrawingArea {
    public abstract readonly WINDOW_WIDTH: number
    public abstract readonly WINDOW_HEIGHT: number

    /**
     * public readonly WINDOW_WIDTH = 800
     * public readonly WINDOW_HEIGHT = 1200 mobile approx
     */

    protected drawing: SVG.Doc

    public constructor(id: string) {
        this.drawing = SVG(id)
    }

    get area(): SVG.Doc {
        return this.drawing
    }

    public destroy() {
        this.drawing.remove()
    }
}
