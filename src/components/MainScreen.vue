<template>
  <div class="gameContainer">
    <div id="gameConfig">
      <h1>MusiTrain</h1>
    </div>
    <div>
      <Button v-on:click="startGame" size="large" id="gameStart" type="error">Start Playing</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class GamerContainer extends Vue {
  public startGame() {
    this.$router.push('play')
  }
}
</script>

<style scoped lang="scss">
.gameContainer {
  background: white;
  width: 100%;
  height: 100%;
  padding: 30px;
}

#gameConfig {
  height: 70vh;
}
</style>
