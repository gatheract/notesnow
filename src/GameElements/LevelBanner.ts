import DrawingArea from '@/Drawing/DrawingArea'

export default class LevelBanner {
  public static draw(level: number, x: number, y: number) {
    const text = DrawingArea.Instance.area
      .text('Level ' + level)
      .font({ family: 'Arial', size: 70, leading: '1.5em' })
      .opacity(0)
    text.x(x - text.bbox().w / 2)
    text.y(y - text.bbox().h / 2)

    text.animate().attr({ opacity: 1 })
    return text.animate().attr({ opacity: 0 })
  }
}
