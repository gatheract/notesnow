<template>
  <MainContainer>
    <div class="logoArea">
      <div class="titleContainer">
        <h1 class="title">{{$t("mainScreen.title")}}</h1>
        <h2 class="subtitle">{{$t("mainScreen.subtitle")}}</h2>  
      </div>      
      <HomeLogo></HomeLogo>
    </div>    
    <LevelSelect class="levelArea"></LevelSelect>
    <Button
      v-on:click="levelSelect"
      size="large"
      id="levelSelect"
      type="error"
    >{{$t("mainScreen.startButton")}}</Button>
  </MainContainer>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import HomeLogo from './Components/HomeLogo.vue'
import LevelSelect from './Components/LevelSelect.vue'
import MainContainer from '@/Components/Template/MainContainer.vue'
@Component({
  components: {
    HomeLogo,
    LevelSelect,
    MainContainer
  }
})
export default class Home extends Vue {
  private levelSelect() {
    this.$router.push('staffsel')
  }
}
</script>

<style scoped lang="scss">

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
