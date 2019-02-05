<template>
  <div class="staffScreen">
    <div class="staffContainer">
      <div class="staffOption">
        <StaffOption :type="GameStaff.gStaff"></StaffOption>
      </div>  
      <div class="staffOption">
        <StaffOption :type="GameStaff.cStaff"></StaffOption>
      </div>  
      <div class="staffOption">
        <StaffOption :type="GameStaff.both"></StaffOption>
      </div>  
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
  private data() {
    return {
      GameStaff
    }
  }
}
</script>

<style scoped lang="scss">
  .staffOption{
    max-height: 21vh;
    height: 21vh;
    max-width: 700px;
  }
  
  .staffContainer{
    max-height: 70vh;
    height: 70vh;
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
