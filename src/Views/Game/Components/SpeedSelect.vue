<template>
  <div>
    <div class="wrapper">
      <div class="gameSpeed">
        <span @click="setPaused" class="control">
          <i v-if="!paused" class="uil uil-pause"></i>
          <i v-if="paused" class="uil uil-play"></i>
        </span>
        <input
          @change="changeInput"
          :step="SPEED_STEP"
          type="number"
          size="3"
          :value="speed"
          class="speedSelect"
          min="0"
          max="500"
        >
        <span class="per">%</span>
        <div class="caretCont">
          <i
            ref="moreSpeed"
            @click="moreSpeed"
            class="el-select__caret el-input__icon el-icon-arrow-up caret"
            :class="{'disabledInput': !moreSpeedEnabled}"
          ></i>
          <i
            ref="lessSpeed"
            @click="lessSpeed"
            class="el-select__caret el-input__icon el-icon-arrow-down caret"
            :class="{'disabledInput': !lessSpeedEnabled}"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { GET_PRACTICE_SPEED, GET_PAUSED } from '@/Store/Modules/Game/Getters'
import { SET_PRACTICE_SPEED, SET_PAUSED } from '@/Store/Modules/Game/Actions'
import { namespace } from 'vuex-class'
const gameModule = namespace('Game')

@Component({

})
export default class SpeedSelect extends Vue {

  get moreSpeedEnabled() {
    return this.speed < 500
  }

  get lessSpeedEnabled() {
    return this.speed > 0
  }
  @gameModule.Action(SET_PAUSED)
  public savePaused: any
  @gameModule.Getter(GET_PRACTICE_SPEED)
  protected speed: number
  @gameModule.Getter(GET_PAUSED)
  protected paused: boolean
  @gameModule.Action(SET_PRACTICE_SPEED)
  private setGameSpeed: any

  private readonly SPEED_STEP = 10

  public setPaused() {
    this.savePaused(!this.paused)
  }

  public changeInput(event: any) {
    this.setGameSpeed(Number(event.target.value))
  }
  public moreSpeed() {
    this.setGameSpeed(this.speed + this.SPEED_STEP)
  }
  public lessSpeed() {
    this.setGameSpeed(this.speed - this.SPEED_STEP)
  }
}
</script>

<style scoped lang="scss">
.disabledInput {
  pointer-events: none;
  color: lightgrey;
}

.visible {
  display: block;
}

.hidden {
  display: none;
}

.wrapper {
  @include media("<tablet") {
    top: 10px;
    right: 10px;
  }
  margin-top: -10px;
  width: 130px;
  max-width: 130px;
  top: 20px;
  right: 20px;
  overflow: hidden;
  position: absolute;

  .gameSpeed {
    display: flex;
    justify-content: flex-end;
    & > span,
    & > input {
      font-size: 2em;
      font-weight: bold;
      display: inline-block;
    }
    & > input {
      max-width: 50px;
      border: none;
      flex-grow: 0;
      text-align: right;
    }
    & > span {
      flex-grow: 0;
    }
    .per {
      font-size: 1.5em;
      line-height: 40px;
      padding-right: 5px;
    }
    .control {
      display: flex;
      line-height: 34px;
      transition: all 0.3s;
      & > i {
        display: inline-block;
        &::before {
          vertical-align: bottom;
        }
      }
      &:hover {
        color: grey;
        cursor: pointer;
        transition: all 0.3s;
      }
    }
    .caretCont {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 3px;
    }
    .caret {
      line-height: 10px;
      height: auto;
      &::before {
        font-size: 20px;
        font-weight: bold;
      }
      &:hover {
        color: grey;
        cursor: pointer;
      }
    }
    font-weight: bold;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type="number"] {
      -moz-appearance: textfield; /* Firefox */
    }
  }
}
</style>
