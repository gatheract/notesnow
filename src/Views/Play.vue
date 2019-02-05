<template>
  <div id="playView">
    <div id="drawing"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DrawingArea from '@/Drawing/DrawingArea'
import Game from '@/Game'

@Component
export default class Play extends Vue {  
  public mounted() {
    this.initialize()
  }
  public initialize() {
    const dArea = DrawingArea.Instance
    const game = new Game()

    dArea.initialize()
    game.start()
  }
}
</script>
<style lang="scss">

#playView{
  
  height: 100%;
  max-height: 100vh;
  min-height: 100vh;
}


#drawing > svg{height: 100vh}

@font-face {
  font-family: "MusiSync";
  src: url("/@/src/assets/fonts/MusiSync.ttf");
  src: url("/@/src/assets/fonts/MusiSync.ttf") format("truetype");
}
</style>