<template>
  <div>
    <div id="levelRadio">
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
    <div id="levelSelect">
      <Select v-bind:value="difficultyLevel" class="selectElem">
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
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { DifficultyLevel } from '@/Store/Modules/Settings/Types'
import { namespace } from 'vuex-class'
import { DIFFICULTY_LEVEL } from '@/Store/Modules/Settings/Getters'
import { SET_DIFFICULTY } from '@/Store/Modules/Settings/Actions'
const settingsModule = namespace('Settings')
@Component
export default class LevelSelect extends Vue {
  @settingsModule.Getter(DIFFICULTY_LEVEL)
  private difficultyLevel: DifficultyLevel

  @settingsModule.Action(SET_DIFFICULTY)
  private setDifficulty: any
  private level: DifficultyLevel = DifficultyLevel.easy

  private data() {
    return {
      DifficultyLevel
    }
  }
  private changeDifficulty(difficulty: DifficultyLevel) {
    this.setDifficulty(difficulty)
  }
}
</script>

<style scoped lang="scss">

.selectElem{
  max-width:200px;
}

#levelSelect {
  display: none;
}
#levelRadio {
  display: block;
}

@media only screen and (max-width: 600px) {
  
  #levelSelect {
    display: block;
  }
  #levelRadio {
    display: none;
  }
}

@media only screen and (max-height: 500px) {
  
  #levelSelect {
    display: block;
  }
  #levelRadio {
    display: none;
  }
}
</style>
