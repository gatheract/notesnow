<template>
  <div>
    <div id="drawing"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DrawingArea from '@/DrawingArea'
import Game from '@/Game'

@Component
export default class Play extends Vue {
  public sel: string = 'xMidYMax meet'
  
  public cambio() {
    DrawingArea.Instance.area.attr('preserveAspectRatio', this.sel)
  }
  public mounted() {
    this.initialize()
    this.cambio()
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
#borrar{position: absolute} 
#drawing {
  height: 100%;
  overflow: hidden;
}

@font-face {
  font-family: "MusiSync";
  src: url("/@/src/assets/fonts/MusiSync.ttf");
  src: url("/@/src/assets/fonts/MusiSync.ttf") format("truetype");
}
</style>