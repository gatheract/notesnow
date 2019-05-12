<template>
  <MainContainer>
    <div class="contentContainer">
      <div class="titleContainer">
        <h1>{{$t("Options.title")}}</h1>
      </div>
      <div class="option">
        <div class="label">{{$t("Options.sheetStaffLabel")}}</div>
        <StaffSel></StaffSel>
      </div>
      <div class="option">
        <KeySel></KeySel>
      </div>
      <div class="option">
        <div class="label">{{$t("Options.moreOptions")}}</div>
        <router-link to="/options/piano" class="bigLink">
          <i class="uil uil-cog"></i> Advanced Settings
        </router-link>
      </div>
      <div class="option">
        <div class="label">{{$t("Options.midiControllerLabel")}}</div>
        <MidiSel></MidiSel>
      </div>
      <div class="option">
        <div class="label">{{$t("Options.sound")}}</div>
        <div
          @click="toggleSound"
          class="soundToggle"
          :class="{'soundOff': !sound, 'soundOn': sound,}"
        >
          <div class="soundIcon">
            <i v-if="!sound" class="uil uil-volume-off"></i>
            <i v-if="sound" class="uil uil-volume"></i>
          </div>
          <div class="soundLabel">
            <span v-if="sound">{{$t("Options.soundOn")}}</span>
            <span v-if="!sound">{{$t("Options.soundOff")}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="buttonContainer">
      <el-button v-on:click="startGame" size="large" type="danger">
        <i class="uil uil-play"></i>
        {{$t("Options.start")}}
      </el-button>
    </div>
  </MainContainer>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import MainContainer from '@/Components/Template/MainContainer.vue'
import { namespace } from 'vuex-class'
const settingsModule = namespace('Settings')
import { START_PITCH, END_PITCH, SOUND } from '@/Store/Modules/Settings/Getters'
import { SET_SOUND } from '@/Store/Modules/Settings/Actions'
import MidiSel from './Components/MidiSel.vue'
import StaffSel from './Components/StaffSel.vue'
import KeySel from './Components/KeySel.vue'

@Component({
  components: {
    MainContainer,
    MidiSel,
    StaffSel,
    KeySel
  }
})
export default class Options extends Vue {
  @settingsModule.Getter(END_PITCH) private endPitch: string
  @settingsModule.Getter(START_PITCH) private startPitch: string
  @settingsModule.Getter(SOUND) private sound: boolean
  @settingsModule.Action(SET_SOUND) private setSound: any

  private startGame() {
    this.$router.push('play')
  }
  private toggleSound() {
    this.setSound(!this.sound)
  }
}
</script>

<style scoped lang="scss">
.signatureInterval {
  font-weight: 300;
  margin-top: 20px;
  font-size: 16px;
  .interval {
    display: inline-block;
    font-weight: bold;

    font-size: 14px;
  }
}

.buttonContainer {
  margin: 0 auto;
  width: 100%;
  text-align: center;
}

.option {
  margin-top: 20px;
}

.label {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 10px;
}

.bigLink {
  text-decoration: none;
  font-size: 15px;
  &:visited,
  & {
    color: #0d60c6;
  }
}
.pianoIcon {
  content: url("https://api.iconify.design/mdi-piano.svg?height=16");
  vertical-align: -0.125em;
  padding-right: 5px;
}

.sep {
  height: 1px;
  border: none;
  color: #000;
  background-color: #000;
  max-width: 250px;
  text-align: center;
  margin: 10px auto;
}

.soundToggle {
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  &.soundOff {
    color: grey;
  }
  &.soundOn {
    color: green;
  }

  .soundLabel {
    font-size: 15px;
    line-height: 30px;
  }
  .soundIcon {
    font-size: 30px;
  }
}
</style>
