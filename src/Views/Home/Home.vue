<template>
  <div class="mainContainer">
    <div class="logoArea">
      <h1 class="title">{{$t("mainScreen.title")}}</h1>
      <h2 class="subtitle">{{$t("mainScreen.subtitle")}}</h2>
      <HomeLogo></HomeLogo>
    </div>
    
    <LevelSelect class="levelArea"></LevelSelect>
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

import HomeLogo from './Components/HomeLogo.vue'
import LevelSelect from './Components/LevelSelect.vue'
@Component({
  components:{
    HomeLogo,
    LevelSelect
  }
})
export default class GamerContainer extends Vue {
  
  
  private startGame() {
    this.$router.push('staffsel')
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

.levelArea {
  padding: 20px 30px;
  padding-bottom: 30px;
}

@media only screen and (max-width: 600px) {
  h2.subtitle {
    font-size: 20px;
    line-height: 24px;
  }
}

@media only screen and (max-height: 500px) {
  h2 {
    display: none;
  }
}
</style>
