<template>
  <div id="playView">
    <div id="drawing"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Game from '@/Game/Game'
import { namespace } from 'vuex-class'
import { DIFFICULTY_LEVEL, STAFF_SELECTED } from '@/Store/Modules/Settings/Getters'
import { DifficultyLevel, GameStaff } from '@/Store/Modules/Settings/Types'
const settingsModule = namespace('Settings')
import { EventBus, GAME_OVER } from '@/EventBus'

@Component
export default class Play extends Vue {  
  @settingsModule.Getter(DIFFICULTY_LEVEL)
  private difficultyLevel: DifficultyLevel
  
  @settingsModule.Getter(STAFF_SELECTED)
  private staffSelected: GameStaff
  
  private game: Game
  
  public mounted() {
    EventBus.$on(GAME_OVER, this.gameOver.bind(this))
    this.game = new Game()
    this.game.start()
    
  }
  
  public beforeDestroy() {
    this.game.stop()
    EventBus.$off(GAME_OVER)
  }
  
  private gameOver() {
    this.$router.push('over')
  }
}
</script>
<style lang="scss">

#playView{  
  height: 100%;
  max-height: 100vh;
  min-height: 100vh;
  overflow: hidden;
}

#drawing > svg{height: 100vh}

@font-face {
  font-family: "MusiSync";
  src: url("/@/src/assets/fonts/MusiSync.ttf");
  src: url("/@/src/assets/fonts/MusiSync.ttf") format("truetype");
}
</style>