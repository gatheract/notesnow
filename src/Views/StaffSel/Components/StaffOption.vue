<template >
  <div class="option" @click="select" v-bind:class="{ selected: isSelected }">
    <div class="optionText">{{selectedText}}</div>
    <img class="imgResponsive" :src="imgPath" alt="">
  </div>  
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { GameStaff } from '@/Store/Modules/Settings/Types'
import { SET_STAFF } from '@/Store/Modules/Settings/Actions'
import { STAFF_SELECTED } from '@/Store/Modules/Settings/Getters'
const imgGStaff = require('@/assets/images/g_staff_option.png')
const imgFStaff = require('@/assets/images/f_staff_option.png')

const settingsModule = namespace('Settings')

@Component({
  props: {
    type: {
      type: Number as () => GameStaff,
      required: true,
      validator(value) {      
        return value in GameStaff
      }
    }
  }
})
export default class StaffOption extends Vue {
  @settingsModule.Getter(STAFF_SELECTED)
  private staffSelected: GameStaff
  
  @settingsModule.Action(SET_STAFF)
  private setStaff: any
  private type: GameStaff
  
  private select() {
    this.setStaff(this.type)
  }
    
  get isSelected() {
    return this.staffSelected === this.type
  }
  
  get imgPath(): string {
    switch (this.type) {
      case GameStaff.gStaff:
        return imgGStaff
      case GameStaff.fStaff:
        return imgFStaff
      default:
        return imgFStaff
    }
  }
  
  get selectedText() {
    switch (this.type) {
      case GameStaff.gStaff:
        return this.$t('StaffOption.gClef')
      case GameStaff.fStaff:
        return this.$t('StaffOption.fClef')
      default:
        return this.$t('StaffOption.both')
    }
  }
}
</script>

<style scoped lang="scss">
  .option{
    height: 100%;
    border: 1px solid transparent;    
    padding: 5px;
    position: relative;
    font-size: 14px;
    font-weight: 700;
    color: black;
    transition: all 0.3s;
  }
    
  .option.selected{
    transition: all 0.3s;
     border-bottom: solid 1px red;
     border-top: solid 1px red;
  }
  
  .optionText{
    position: absolute;
    right: 10px;  
    z-index: 9999
  }
  .imgResponsive{
    width: 100%;
    height: auto;
    max-height: 100px;
  }
</style>
