<template>
  <div class="mainContainer">
    <div class="logoArea">
      <h1 class="title">{{$t("mainScreen.title")}}</h1>
      <h2 class="subtitle">{{$t("mainScreen.subtitle")}}</h2>
      <div class="svgContainer">
        <svg id="drawing"></svg>
      </div>
    </div>
    <div id="levelRadio" class="levelArea">
      <RadioGroup
        v-bind:value="difficultyLevel"
        v-on:on-change="changeDifficulty"
        size="large"
        type="button"
      >
        <Radio :label="DifficultyLevel.easy">
          <span>{{$t("mainScreen.levelEasy")}}</span>
        </Radio>
        <Radio :label="DifficultyLevel.hard">
          <span>{{$t("mainScreen.levelHard")}}</span>
        </Radio>
      </RadioGroup>
    </div>
    <div id="levelSelect" class="levelArea">
      <Select v-bind:value="difficultyLevel" style="width:200px">
        <Option
          :value="DifficultyLevel.easy"
          :key="DifficultyLevel.easy"
        >{{$t("mainScreen.levelEasy")}}</Option>
        <Option
          :value="DifficultyLevel.hard"
          :key="DifficultyLevel.hard"
        >{{$t("mainScreen.levelHard")}}</Option>
      </Select>
    </div>
    <Button
      v-on:click="startGame"
      size="large"
      id="gameStart"
      type="error"
    >{{$t("mainScreen.startButton")}}</Button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { G, Library } from 'svg.js'
import { DifficultyLevel } from '@/Store/Modules/Settings/Types'
import SVG = require('svg.js')
import { namespace } from 'vuex-class'
import { DIFFICULTY_LEVEL } from '@/Store/Modules/Settings/Getters'
import { SET_DIFFICULTY } from '@/Store/Modules/Settings/Actions'
const settingsModule = namespace('Settings')

const PIANO = require('@/assets/images/cyberscooty-stylised_piano.svg')

@Component
export default class GamerContainer extends Vue {
  @settingsModule.Getter(DIFFICULTY_LEVEL)
  private difficultyLevel: DifficultyLevel

  @settingsModule.Action(SET_DIFFICULTY)
  private setDifficulty: any

  private drawing: SVG.Doc
  private insertedGroup: G
  private elementGroup: Library['Element']
  private level: DifficultyLevel = DifficultyLevel.easy

  private data() {
    return {
      DifficultyLevel
    }
  }
  private changeDifficulty(difficulty: DifficultyLevel) {
    this.setDifficulty(difficulty)
  }
  private mounted() {
    this.insertPiano()
  }

  private startGame() {
    this.$router.push('play')
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

.mainContainer {
  background: white;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  height: 100%;
  padding: 10px 30px;
  border: solid 2px black;
  min-height: 100vh;
}
.logoArea {
  height: 65vh;
  display: flex;
  flex-direction: column;
}
.svgContainer {
  padding-top: 5vh;
  height: 100%;
  width: 100%;
  margin: 0 auto;
}

.levelArea {
  padding: 20px 30px;
  padding-bottom: 30px;
}

#levelSelect {
  display: none;
}
#levelRadio {
  display: block;
}

@media only screen and (max-width: 600px) {
  h2.subtitle {
    font-size: 20px;
    line-height: 24px;
  }
  #levelSelect {
    display: block;
  }
  #levelRadio {
    display: none;
  }
}

@media only screen and (max-height: 500px) {
  h2 {
    display: none;
  }
  #levelSelect {
    display: block;
  }
  #levelRadio {
    display: none;
  }
}
</style>
