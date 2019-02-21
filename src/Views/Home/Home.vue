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
    <el-button  v-on:click="selectStaff" type="danger"><i class='uil uil-play'> </i> 
      {{$t("mainScreen.startButton")}}</el-button>     
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
    this.$router.push('staffsel')
  }
}
</script>

<style scoped lang="scss">

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
