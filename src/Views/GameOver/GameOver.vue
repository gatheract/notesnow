<template>
  <MainContainer>
    <div class="component">
      <div class="statsBanner">
        <div class="stats">
          <div class="title">
            {{$t('GameOver.title')}}
          </div>
          <div class="subtitle">
            {{$t('GameOver.subtitle')}} {{gameLevel}}
          </div>  
        </div>
        
        <div class="buttons">
          <el-button
            v-on:click="goHome"
            size="large"        
          ><i class='uil uil-home'> </i> {{$t("GameOver.home")}}</el-button>
          <el-button
            v-on:click="playAgain"
            size="large"       
            type="danger" 
          ><i class='uil uil-repeat'> </i> {{$t("GameOver.playAgain")}}</el-button>
        </div>
      </div>
      
    </div>
    
  </MainContainer>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {LEVEL} from '@/Store/Modules/Stats/Getters'
import { namespace } from 'vuex-class'
import MainContainer from '@/Components/Template/MainContainer.vue'
const statsModule = namespace('Stats')

@Component({
  components: {
    MainContainer
  }
})
export default class GameOver extends Vue {
  @statsModule.Getter(LEVEL)
  private gameLevel: number
  
  private goHome() {
    this.$router.push('/')
  }
  private playAgain() {
    this.$router.push('play')
  }
}
</script>

<style scoped lang="scss">
.title{
  font-size: 30px;
  font-weight: 700;
}
.subtitle{
  font-size: 20px;
}

.component{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.statsBanner{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 600px;
  max-height: 400px;
  
  height: 100%;
  width: 100vw;
  border-radius: 30px;
  border: 1px solid #888;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  padding: 40px 40px;
}

@media only screen and (max-width: 600px) {
  .statsBanner{
    border: none;
    box-shadow: none;  
    padding: 10px 10px;
  }
  
}

</style>
