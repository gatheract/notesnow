<template>
  <MainContainer>
    <div class="contentContainer">
        <div class="titleContainer">
        <h2 class="subtitle">{{$t("StaffSel.title")}}</h2>
      </div>
      <div class="staffContainer">
        <div class="staffOption">
          <StaffOption :type="GameStaff.gStaff"></StaffOption>
        </div>  
        <div class="staffOption">
          <StaffOption :type="GameStaff.fStaff"></StaffOption>
        </div>  
        <div class="staffOption">
          <StaffOption :type="GameStaff.both"></StaffOption>
        </div>  
      </div>      
    </div>
    <div class="buttonContainer">
        <el-button
          v-on:click="moreOptions"
          size="large"
          type="danger"
        ><i class='uil uil-check'> </i> {{$t("StaffSel.next")}}</el-button>
      </div>  
  </MainContainer>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { GameType, GameStaff } from '@/Store/Modules/Settings/Types'
import { namespace } from 'vuex-class'
import StaffOption from './Components/StaffOption.vue'
import MainContainer from '@/Components/Template/MainContainer.vue'
const settingsModule = namespace('Settings')

@Component({
  components: {
    StaffOption,
    MainContainer
  }
})
export default class StaffSel extends Vue {
  private moreOptions() {
    this.$router.push('options')
  }
  private data() {
    return {
      GameStaff
    }
  }
}
</script>

<style scoped lang="scss">
  .buttonContainer{
    margin: 0 auto;
    width: 100%;
    text-align: center;
    
  }
  
  h2.subtitle {
    color:black;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 28px;
    font-weight: 400;
    line-height: 58px;
  }
  .staffOption{
    
    max-width: 700px;
  }
  
  .staffContainer{
    max-height: 50vh;
    height: 50vh;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;    
    padding: 1px 1px;
    border-radius: 3px;
  }

  .optionText{
    position: absolute;
    right: 10px; 
  }
  
</style>
