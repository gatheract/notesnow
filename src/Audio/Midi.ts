import { EventBus, EVENT_MIDI_DEV_KEY_PRESSED, EVENT_MIDI_DEV_KEY_RELEASED, 
    EVENT_MIDI_STATE_CHANGE, EVENT_MIDI_ENABLED } from '@/EventBus'
import { MidiStatus } from '@/Store/Modules/Settings/Types'
import GameStore from '@/Game/GameStore'

export default class Midi {
  
  public static getInstance() {
    return this.instance || (this.instance = new this())
  }
  
  private static readonly NOTE_ON = 144
  private static readonly NOTE_OFF = 128
  
  private static instance: Midi
  
  private context: AudioContext
  private access: false
  private midiAccess: WebMidi.MIDIAccess
  private constructor() {}
  
  /**
   * Request midi access to the browser
   */
  public startMidi() {
    /**
     * Typescript doesn't recognize audiocontext as a part of window for some reason
     * https://stackoverflow.com/questions/42475034/using-typescript-web-audio-api-on-ios
     */
    this.context = new ((window as any).AudioContext || (window as any).webkitAudioContext)()
    if (navigator.requestMIDIAccess) {
    const b = navigator.requestMIDIAccess()
      .then(this.onMidiInit.bind(this), this.onMidiError.bind(this))
      .catch(this.onMidiReject.bind(this))
    }
  }
  
  public getInputs() {
    if (this.midiAccess) {
      return this.midiAccess.inputs  
    }
    
  }
  
  public selectInput(id: string) {
    for (const input of this.midiAccess.inputs.values()) {
      input.onmidimessage = () => {} /** I don't know if theres another way to remove the handler */
      if (input.id === id) {
        input.onmidimessage = this.messageHandler.bind(this)
      }
    }
  }
  
  /**
   * Midi is available in the browser
   * but there may be no inputs
   * attach the note listener to the available devices
   * @param midi 
   */
  protected onMidiInit(midi: WebMidi.MIDIAccess) {    
    this.midiAccess = midi
    midi.onstatechange = this.onStateChange.bind(this)
    GameStore.setMidiStatus(MidiStatus.AVAILABLE)
  }

  protected onStateChange(event: WebMidi.MIDIConnectionEvent) {
    EventBus.$emit(EVENT_MIDI_STATE_CHANGE)
  }
  
  /**
   * I don't know if when the promise fails the midi device can still be open
   * @todo
   * @param err 
   */
  protected onMidiReject(err: any) {
    GameStore.setMidiStatus(MidiStatus.FAILED)
  }
  
  /**
   * When midi is not available / there's an error
   * @param err 
   */
  protected onMidiError(err: any) {
    GameStore.setMidiStatus(MidiStatus.FAILED)
  }  
  
  /**
   * When a note is pressed handle the logic
   * can be use to handle other midi controller actions
   * @param message 
   */
  protected messageHandler(message: WebMidi.MIDIMessageEvent) {
    const command = message.data[0]
    const note = message.data[1]
    const velocity = (message.data.length > 2) ? message.data[2] : 0

    switch (command) {
      case Midi.NOTE_ON: 
        if (velocity > 0) {
          this.noteOnHandler(note, velocity)
        } else { 
          /** 
           * apparently if there's no velocity it means that it's a note off
           * since some midi instruments don't send it
           */ 
          this.noteOffHandler(note)
        }
        break
      case Midi.NOTE_OFF: 
        this.noteOffHandler(note)
        break
    }
  }
  
  /**
   * When a note is pressed
   * @param note 
   * @param velocity 
   */
  protected noteOnHandler(note: number, velocity: number) {
    EventBus.$emit(EVENT_MIDI_DEV_KEY_PRESSED, note, velocity)
  }
  
  /**
   * When a note is released
   * @param note 
   */
  protected noteOffHandler(note: number) {
    EventBus.$emit(EVENT_MIDI_DEV_KEY_RELEASED, note)
  }
  
}
