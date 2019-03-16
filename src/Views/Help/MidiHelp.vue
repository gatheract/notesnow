<template>
  <MainContainer>
    <div class="contentContainer">
        <div class="titleContainer">
        <h2 class="subtitle">{{$t("MidiHelp.title")}}</h2>
        </div>
        <div class="explanation">
          {{$t('MidiHelp.para1')}}          
          <br />          
          <a href="https://www.apple.com/lae/safari/">Safari</a> & <a href="https://www.mozilla.org/en-US/firefox/">Firefox</a> need a plugin / extensions to use a MIDI Controller
          <br />
          {{$t('MidiHelp.para2')}}
          <a href="https://jazz-soft.net/">https://jazz-soft.net/</a>
          <br /><br />
          {{$t('MidiHelp.para3')}}
          <div style="margin-top: 20px">
          <el-button
          v-on:click="goBack"
          size="medium"
          type="primary"
        ><i class='uil el-icon-back'> </i> {{$t("Site.back")}}</el-button>  
          </div>
        </div>
    </div>
    
  </MainContainer>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import MainContainer from '@/Components/Template/MainContainer.vue'

@Component({
  components: {
    MainContainer
  }
})
export default class MidiHelp extends Vue {
  private goBack() {
    window.history.go(-1)
  } 
}
</script>

<style scoped lang="scss">
 
  .explanation{
    font-size: 15px
  }
  h2.subtitle {
    color:black;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 28px;
    font-weight: 400;
    line-height: 58px;
  }  
</style>
