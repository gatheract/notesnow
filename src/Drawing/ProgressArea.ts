import AbstractDrawingArea from './AbstractDrawingArea'

export default class ProgressArea extends AbstractDrawingArea {
  public readonly WINDOW_WIDTH = 1100
  public readonly WINDOW_HEIGHT = 900
  public constructor() {
    super('progressArea')
  }
}
