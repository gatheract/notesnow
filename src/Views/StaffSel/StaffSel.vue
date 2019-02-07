<template>
  <div class="staffScreen mainContainer">
    <div class="titleContainer">
      <h1 class="title">{{$t("mainScreen.title")}}</h1>
      <h2 class="subtitle">{{$t("mainScreen.subtitle")}}</h2>
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
    <div class="buttonContainer">
      <Button
        v-on:click="startGame"
        size="large"
        id="gameStart"
        type="error"
      >{{$t("StaffSel.start")}}</Button>
    </div>    
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { DifficultyLevel, GameStaff } from '@/Store/Modules/Settings/Types'
import { namespace } from 'vuex-class'
import { DIFFICULTY_LEVEL } from '@/Store/Modules/Settings/Getters'
import { SET_DIFFICULTY } from '@/Store/Modules/Settings/Actions'
import StaffOption from './Components/StaffOption.vue'
const settingsModule = namespace('Settings')

@Component({
  components: {
    StaffOption
  }
})
export default class StaffSel extends Vue {
  private startGame() {
    this.$router.push('play')
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
  h1.title {
    color: black;
    font-family: "Arial", sans-serif;
    font-size: 54px;
    font-weight: 600;
    line-height: 58px;
  }
  h2.subtitle {
    color: #7c795d;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 28px;
    font-weight: 400;
    line-height: 32px;
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
  .imgResponsive{
    width: 100%;
    height: auto;
    max-height: 100%;
  }
  .optionText{
    position: absolute;
    right: 10px; 
    
  }
  
</style>
