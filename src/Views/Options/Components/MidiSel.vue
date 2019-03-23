<template>
    <div class="midiContainer">
      
      <div v-if="midiSupport">
        <el-switch
          active-color="red"
          :active-text="midiEnabledLabel"      
          v-on:change="midiEnableHandler"  
          :value="midiEnabled" 
          inactive-color="lightgrey">
        </el-switch>
        
        <div v-if="midiEnabled" class="midiControllerStatus">
          <div v-if="midiAvailable === MidiStatus.INITIALIZING">
            Initializing
          </div>
          <div v-else-if="midiAvailable === MidiStatus.AVAILABLE">            
            <div>
              <el-select style="max-width: 300px;" v-on:change="inputSelected" :value="midiInputId" placeholder="MIDI Controller">
                <template v-if="midiInputsAvailable.length > 0">
                  <el-option key="none" :label="$t('MidiSel.none')" :value="NO_INPUT"></el-option>
                  <el-option
                    v-for="input in midiInputsAvailable"
                    :key="input.id"
                    :label="input.name"
                    :value="input.id">
                  </el-option>  
                </template> 
                <template v-else>
                  <el-option key="None" :label="$t('MidiSel.noInputs')" :value="NO_INPUT"></el-option>
                </template>        
              </el-select>
            </div>
          </div>
          <div v-else-if="midiAvailable === MidiStatus.FAILED">
            {{$t('MidiSel.notAvailable')}}
          </div>
        </div>  
      </div>
      <div class="notSupported" v-else>
        <span >
        {{$t('MidiSel.notSupported')}}
        </span>        
        <br />        
        <router-link class="link" to="/midihelp">Need help?</router-link>
      </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { MIDI_AVAILABLE, ENABLE_MIDI, MIDI_INPUT_ID } from '@/Store/Modules/Settings/Getters'
import { MidiStatus } from '@/Store/Modules/Settings/Types'
import { SET_ENABLE_MIDI, SET_MIDI_INPUT_ID } from '@/Store/Modules/Settings/Actions'
import { namespace } from 'vuex-class'
import { EventBus, EVENT_MIDI_STATE_CHANGE } from '@/EventBus'
import Midi from '@/Audio/Midi'
import GameStore from '@/Game/GameStore'
const settingsModule = namespace('Settings')

interface MIDIInput {
  name: string,
  id: string
}

@Component({
  components: {
    
  }
})
export default class MidiSel extends Vue {
  
  private readonly NO_INPUT = ''
  
  @settingsModule.Getter(MIDI_INPUT_ID)
  private midiInputId: string
  @settingsModule.Getter(MIDI_AVAILABLE)
  private midiAvailable: string
  @settingsModule.Getter(ENABLE_MIDI)
  private midiEnabled: boolean
  
  @settingsModule.Action(SET_ENABLE_MIDI)
  private setMidiEnabled: any
  @settingsModule.Action(SET_MIDI_INPUT_ID)
  private setMidiInputId: any
   
  private midiInputsAvailable: MIDIInput[] = []
  
  /**
   * Shows wheter midi is available or not
   */
  private get midiEnabledLabel() {
    if (this.midiEnabled) {
      return this.$t('MidiSel.enabledLabel')  
    } else {
      return this.$t('MidiSel.disabledLabel')  
    }
  }
  
  /**
   * Does the browser support midi
   */
  private get midiSupport() {
    return navigator.requestMIDIAccess
  } 
  
  /**
   * Gets the available midi inputs
   */
  public getMidiInputs() {    
    const res: MIDIInput[] = []
    const inputs = Midi.getInstance().getInputs()
    
    if (inputs && inputs.size ) {
      for (const input of inputs.values()) {
        res.push({name: input.name || 'Unnamed', id: input.id})
      }
    } 
    if (res.length < 1) {
      this.setMidiInputId(this.NO_INPUT)
    }    
    this.midiInputsAvailable = res    
  }
    
  private beforeMount() {
    this.getMidiInputs()
  } 
    
  private mounted() {
    EventBus.$on(EVENT_MIDI_STATE_CHANGE, this.getMidiInputs.bind(this))
  }
  
  private startGame() {
    this.$router.push('play')
  }
  private data() {
    return {
      MidiStatus,
      enabled: true,
    }
  }
  
  @Watch('midiAvailable')
  private midiAvailableHandler() {
    this.getMidiInputs()
  }
  
  private inputSelected(val: string) {
    this.setMidiInputId(val)
    Midi.getInstance().selectInput(this.midiInputId)  
  }
  
  /**
   * Enable the the webmidi controller when the user toggles it
   */
  private midiEnableHandler(val: boolean) {
    this.setMidiEnabled(val)
    if (val) {
      Midi.getInstance().startMidi()
    }
  }
  
  private beforeDestroy() {
    EventBus.$off(EVENT_MIDI_STATE_CHANGE)
  }
}
</script>

<style scoped lang="scss">
  .notSupported{
    font-size: 15px;
    
  }
   a.link{
    text-decoration: none;
  }
  
  
  
  .midiControllerStatus{
    margin-top: 20px;
    padding-left: 10px;
  }
  
  .midiContainer{
    max-width: 500px;
    margin: 0 auto;
  }

</style>
