<template>
  <MainContainer>
    <div class="contentContainer">
      <div class="titleContainer">
        <h1>{{$t("PianoSettings.title")}}</h1>
      </div>
      <div class="optionsContainer">
        <el-tabs v-model="activeName">
          <el-tab-pane label="Piano" name="piano">
            <PianoSettingsSector></PianoSettingsSector>
          </el-tab-pane>
          <el-tab-pane label="Notes" name="notes">
            <NotesSettingsSector></NotesSettingsSector>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="buttonContainer">
      <el-button v-on:click="goBack" size="large" type="primary">
        <i class="uil uil-left-arrow-from-left"></i>
        {{$t("Site.back")}}
      </el-button>
    </div>
  </MainContainer>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import PianoSettingsSector from './PianoSettingsSector.vue'
import NotesSettingsSector from './NotesSettingsSector.vue'
import MainContainer from '@/Components/Template/MainContainer.vue'
import { namespace } from 'vuex-class'
const pianoModule = namespace('Piano')
import * as Actions from '@/Store/Modules/Piano/Actions'
import * as Getters from '@/Store/Modules/Piano/Getters'
const path = require('path')
@Component({
  components: {
    MainContainer,
    PianoSettingsSector,
    NotesSettingsSector
  }
})
export default class PianoSettings extends Vue {
  private activeName: string

  private beforeMount() {
    this.activeName = path.basename(this.$route.path)
  }
  private goBack() {
    this.$router.replace('/options')
  }
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
  text-align: left;
}
</style>
