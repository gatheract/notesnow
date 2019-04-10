<template>
  <div id="game">
    <div id="progressArea"></div>
    <div id="staffArea"></div>
    <div id="pianoCont">
      <PianoOctave v-if="showMiniKeyboard"></PianoOctave>
      <Piano v-else></Piano>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import GameObj from '@/Game/Game'
import { namespace } from 'vuex-class'
import { SHOW_MINI_KEYBOARD } from '@/Store/Modules/Settings/Getters'
import { GameType, GameStaff } from '@/Store/Modules/Settings/Types'
const settingsModule = namespace('Settings')
import { EventBus, GAME_OVER } from '@/EventBus'
import Piano from './Components/Piano.vue'
import PianoOctave from './Components/PianoOctave.vue'
@Component({
  components: {
    Piano,
    PianoOctave
  }
})
export default class Game extends Vue {
  @settingsModule.Getter(SHOW_MINI_KEYBOARD)
  private showMiniKeyboard: boolean

  private game: GameObj

  public mounted() {
    EventBus.$on(GAME_OVER, this.gameOver.bind(this))
    this.game = GameObj.getInstance()
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
#game {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100vh;
  overflow: hidden;

  #progressArea {
    position: absolute;
    display: none;
  }
  #staffArea {
    height: 65vh;

    @include media(">=desktop") {
      margin-left: 10vw;
      margin-right: 10vw;
    }

    @include media("<tablet") {
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  #pianoArea {
    height: auto;
    max-height: 100px;
    width: auto;
  }
  #pianoCont {
    height: 35vh;
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
    flex-direction: row;
  }
}
//#drawing > svg{height: 100vh}
</style>