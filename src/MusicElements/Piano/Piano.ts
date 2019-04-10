
import SVGDrawing from '@/MusicElements/SVGDrawing'
import PianoOctave from './PianoOctave'
import SVGElement from '../SVGElement'
import AbstractDrawingArea from '../../Drawing/AbstractDrawingArea'
import GameStore from '@/Game/GameStore'
import Store from '@/Store/Store'
import * as SetGetters from '@/Store/Modules/Settings/Getters'

/**
 * Piano that appears on the bottom of the scree
 */
export default class Piano extends SVGElement {
  private octaves: PianoOctave[] = []
  public constructor(da: AbstractDrawingArea) {
    super(da)
  }
  
  public draw() {
    if (this.isMidiEnabled()) {
      const pianoOctave = new PianoOctave(this.getDrawingArea())
      this.octaves.push(pianoOctave)
      pianoOctave.draw(
        this.getDrawingArea().WINDOW_WIDTH / 2 - pianoOctave.getWidth() / 2,
        this.getDrawingArea().WINDOW_HEIGHT - pianoOctave.getHeight(), 1
        )
    } else {
      const octaves = 1
      const width = this.getDrawingArea().WINDOW_WIDTH
      for (let i = 0; i < octaves; i++) {
        const pianoOctave = new PianoOctave(this.getDrawingArea())
        this.octaves.push(pianoOctave)
        pianoOctave.draw(
          i * width / octaves,
          0, 0.7
        )
      }
    }
}
  
  private isMidiEnabled() {
    const enabled = Store.getters['Settings/' + SetGetters.ENABLE_MIDI]
    const input = Store.getters['Settings/' + SetGetters.MIDI_INPUT_ID]
    
    return enabled && input
  }
  
}
