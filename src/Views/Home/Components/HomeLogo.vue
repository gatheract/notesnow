<template>
  <div class="svgContainer">
    <svg id="drawing"></svg>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { G, Library } from 'svg.js'
import SVG = require('svg.js')

const PIANO = require('@/assets/images/cyberscooty-stylised_piano.svg')

@Component
export default class HomeLogo extends Vue {
  private drawing: SVG.Doc
  private insertedGroup: G
  private elementGroup: Library['Element']
  
  private mounted() {
    this.insertPiano()
  }
    
  /**
   * Draw a little svg piano 
   */
  private insertPiano() {
    this.drawing = SVG('drawing').size('100%', '100%')
    this.drawing.attr('preserveAspectRatio', 'xMidYMid meet')
    this.insertedGroup = this.drawing.group()
    this.elementGroup = this.insertedGroup.svg(PIANO)
    const insertedSvg = this.insertedGroup.select('svg').first()

    /**
     * svg.js inserts the svg as a new document but the width and height
     * screws everything, idk if this is the best way to deal with that
     */
    insertedSvg.width('none')
    insertedSvg.height('none')

    const pianoPath = this.insertedGroup.select('#layer1').first()
    pianoPath.transform({ scale: 0.8 })

  }
}
</script>

<style scoped lang="scss">
.svgContainer {
  height: 100%;
  width: 100%;
  margin: 0 auto;
}

</style>
