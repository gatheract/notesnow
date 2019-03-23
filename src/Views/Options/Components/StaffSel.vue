<template>
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
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { GameType, GameStaff } from '@/Store/Modules/Settings/Types'
import { namespace } from 'vuex-class'
import StaffOption from './StaffOption.vue'
const settingsModule = namespace('Settings')

@Component({
  components: {
    StaffOption,
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
    max-width: 150px;
  }  
  .staffContainer{
    margin: 0 auto;
    display: flex;
    max-width: 450px;
    justify-content: center; 
    padding: 1px 1px;
    border-radius: 3px;
  }
  .optionText{
    position: absolute;
    right: 10px; 
  }  
</style>
