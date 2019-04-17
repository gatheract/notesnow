<template>
  <MainContainer>
    <ForkMe></ForkMe>
    <div class="contentContainer logoArea">
      <div class="titleContainer">
        <h1 class="title">{{$t("mainScreen.title")}}</h1>
        <h2 class="subtitle">{{$t("mainScreen.subtitle")}}</h2>
      </div>
      <HomeLogo></HomeLogo>
      <GameTypeSelect class="levelArea"></GameTypeSelect>
    </div>
    <div class="buttonContainer">
      <el-button v-on:click="selectStaff" type="danger">
        <i class="uil uil-play"></i>
        {{$t("mainScreen.startButton")}}
      </el-button>
    </div>
  </MainContainer>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import HomeLogo from './Components/HomeLogo.vue'
import GameTypeSelect from './Components/GameTypeSelect.vue'
import MainContainer from '@/Components/Template/MainContainer.vue'
import ForkMe from '@/Views/Home/Components/ForkMe.vue'

@Component({
  components: {
    ForkMe,
    HomeLogo,
    GameTypeSelect,
    MainContainer
  }
})
export default class Home extends Vue {
  private selectStaff() {
    this.$router.push('options')
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

.logoArea {
  display: flex;
  flex-direction: column;
}

.levelArea {
  padding: 20px 0px;
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
