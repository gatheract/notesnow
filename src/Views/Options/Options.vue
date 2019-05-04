<template>
  <MainContainer>
    <div class="contentContainer">
      <div class="titleContainer">
        <h1>{{$t("Options.title")}}</h1>
      </div>
      <div class="option">
        <div class="label">{{$t("Options.sheetStaffLabel")}}</div>
        <StaffSel></StaffSel>
        <div class="signatureInterval">
          {{$t("Options.signatureInterval")}}
          <p class="interval">{{startPitch}}</p>
          {{$t("Options.signatureIntervalTo")}}
          <p class="interval">{{endPitch}}</p>
          <span>
            <router-link class="bigLink" to="/options/interval">{{$t("Options.changeInterval")}}</router-link>
          </span>
        </div>
        <div>
          <span>
            <hr class="sep">
            <span class="pianoIcon"></span>
            <router-link class="bigLink" to="/options/piano">{{$t("Options.pianoSettings")}}</router-link>
          </span>
        </div>
      </div>
      <div class="option">
        <div class="label">{{$t("Options.keySignatureLabel")}}</div>
        <KeySel></KeySel>
      </div>
      <div class="option">
        <div class="label">{{$t("Options.midiControllerLabel")}}</div>
        <MidiSel></MidiSel>
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
import { START_PITCH, END_PITCH } from '@/Store/Modules/Settings/Getters'
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
  @settingsModule.Getter(END_PITCH)
  private endPitch: string

  @settingsModule.Getter(START_PITCH)
  private startPitch: string

  private startGame() {
    this.$router.push('play')
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
</style>
