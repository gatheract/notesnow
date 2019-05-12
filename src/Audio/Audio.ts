const soundfont = require('@/assets/soundfonts/0250_SoundBlasterOld_sf2')

const WebAudioFontPlayer = require('webaudiofont')

export default class Audio {
  private audioContext: AudioContext
  private player: any
  private notes: any = {}
  public constructor() {
    const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext
    this.audioContext = new AudioContext()
    this.player = new WebAudioFontPlayer()
    this.player.loader.decodeAfterLoading(this.audioContext, '_tone_0000_JCLive_sf2')
  }

  public playNote(midiPitch: number) {
    this.notes[midiPitch] = this.player.queueWaveTable(this.audioContext, this.audioContext.destination,
      soundfont._tone_0250_SoundBlasterOld_sf2, 0, midiPitch, 1)
  }

  public stopNote(midiPitch: number) {
    this.notes[midiPitch].cancel()
  }
}
