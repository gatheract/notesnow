<template>
  <MainContainer>
    <div class="contentContainer">
      <div class="titleContainer">
        <h2 class="subtitle">{{$t("Options.title")}}</h2>
      </div>
      <div class="option">
        <div class="label">
          Sheet Staff
        </div>
        <StaffSel></StaffSel>
      </div>
      <div class="option">
        <div class="label">
          MIDI Controller
        </div>
        <MidiSel></MidiSel>
      </div>
      
    </div>
    <div class="buttonContainer">
        <el-button
          v-on:click="startGame"
          size="large"
          type="danger"
        ><i class='uil uil-check'> </i> {{$t("Options.start")}}</el-button>
    </div>  
  </MainContainer>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import MainContainer from '@/Components/Template/MainContainer.vue'
import MidiSel from './Components/MidiSel.vue'
import StaffSel from './Components/StaffSel.vue'

@Component({
  components: {
    MainContainer,
    MidiSel,
    StaffSel
  }
})
export default class Options extends Vue {  
  private startGame() {
    this.$router.push('play')
  } 
}
</script>

<style scoped lang="scss">
  
  .buttonContainer{
    margin: 0 auto;
    width: 100%;
    text-align: center; 
  }
  
  .option{
    margin-top: 20px
  }
  
  .label{
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
    
  }
  
  h2.subtitle {
    color:black;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 28px;
    font-weight: 400;
    margin-top: 25px    
  }

  
</style>
