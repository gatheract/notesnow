<template>
  <div>
    <div id="levelRadio">  
      <el-radio-group v-on:input="changeGameType" v-bind:value="gameType" size="small">
        <el-radio class="gameTypeOption" :label="GameType.game" border>{{$t("mainScreen.game")}}</el-radio>
        <el-radio class="gameTypeOption" :label="GameType.practice" border >{{$t("mainScreen.practice")}}</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { GameType } from '@/Store/Modules/Settings/Types'
import { namespace } from 'vuex-class'
import { GAME_TYPE } from '@/Store/Modules/Settings/Getters'
import { SET_GAME_TYPE } from '@/Store/Modules/Settings/Actions'
const settingsModule = namespace('Settings')
@Component
export default class GameTypeSelect extends Vue {
  @settingsModule.Getter(GAME_TYPE)
  private gameType: GameType
  
  @settingsModule.Action(SET_GAME_TYPE)
  private setGameType: any
  
  private data() {
    return {
      GameType
    }
  }
  private changeGameType(type: GameType) {
    this.setGameType(type)    
  }
}
</script>

<style scoped lang="scss">
.gameTypeOption{
  margin: 0!important;
}

</style>
