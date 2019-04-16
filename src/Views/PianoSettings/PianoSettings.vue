<template>
  <MainContainer>
    <div class="contentContainer">
      <div class="titleContainer">
        <h1>{{$t("PianoSettings.title")}}</h1>
      </div>
      <div class="optionsContainer">
        <div class="option">
          <div class="label">{{$t("PianoSettings.helpers")}}</div>
          <div class="innerOption">
            <el-switch
              active-color="red"
              :active-text="$t('PianoSettings.highlightKey')"
              v-on:change="setHighCorrect"
              :value="highCorrect"
              inactive-color="lightgrey"
            ></el-switch>
          </div>
          <div class="innerOption">
            <el-switch
              active-color="red"
              :active-text="$t('PianoSettings.highlightAttemptKey')"
              v-on:change="setHighAttemptCorrect"
              :value="highAttemptCorrect"
              inactive-color="lightgrey"
            ></el-switch>
          </div>
        </div>
        <div class="option">
          <div class="label">{{$t("PianoSettings.miniKey")}}</div>
          <div>
            <el-switch
              active-color="red"
              :active-text="$t('PianoSettings.showKeyName')"
              v-on:change="setShowKeyNames"
              :value="showKeyNames"
              inactive-color="lightgrey"
            ></el-switch>
          </div>
        </div>
        <div class="option">
          <div class="label">{{$t("PianoSettings.midiKey")}}</div>
          <div class="innerOption">
            <el-switch
              active-color="red"
              :active-text="$t('PianoSettings.markOctave')"
              v-on:change="setMarkOctave"
              :value="markOctave"
              inactive-color="lightgrey"
            ></el-switch>
          </div>
          <div>
            <el-switch
              active-color="red"
              :active-text="$t('PianoSettings.blurKeys')"
              v-on:change="setBlurUnnecesary"
              :value="blurUnnecesary"
              inactive-color="lightgrey"
            ></el-switch>
          </div>
        </div>
      </div>
    </div>
    <div class="buttonContainer"></div>
  </MainContainer>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import MainContainer from '@/Components/Template/MainContainer.vue'
import { namespace } from 'vuex-class'
const pianoModule = namespace('Piano')
import * as Actions from '@/Store/Modules/Piano/Actions'
import * as Getters from '@/Store/Modules/Piano/Getters'

@Component({
  components: {
    MainContainer
  }
})
export default class PianoSettings extends Vue {
  @pianoModule.Getter(Getters.GET_HIGH_CORRECT)
  private highCorrect: boolean
  @pianoModule.Getter(Getters.GET_HIGH_ATTEMPT_CORRECT)
  private highAttemptCorrect: boolean
  @pianoModule.Getter(Getters.GET_SHOW_KEY_NAMES)
  private showKeyNames: boolean
  @pianoModule.Getter(Getters.GET_MARK_OCTAVE)
  private markOctave: boolean
  @pianoModule.Getter(Getters.GET_BLUR_UNNECESARY)
  private blurUnnecesary: boolean

  @pianoModule.Action(Actions.SET_HIGH_CORRECT)
  private setHighCorrect: any
  @pianoModule.Action(Actions.SET_HIGH_ATTEMPT_CORRECT)
  private setHighAttemptCorrect: any
  @pianoModule.Action(Actions.SET_SHOW_KEY_NAMES)
  private setShowKeyNames: any
  @pianoModule.Action(Actions.SET_MARK_OCTAVE)
  private setMarkOctave: any
  @pianoModule.Action(Actions.SET_BLUR_UNNECESARY)
  private setBlurUnnecesary: any
}
</script>

<style scoped lang="scss">
.option {
  margin-top: 20px;
}

.label {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 10px;
}
.innerOption {
  margin-bottom: 5px;
}

.optionsContainer {
  display: inline-block;
  margin: 0 auto;
  text-align: left;
}
</style>
