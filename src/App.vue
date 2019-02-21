<template>
  <div id="app">
    <div id="main">
      <Hamburguer></Hamburguer>
      <router-view/>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Hamburguer from '@/Components/Template/Hamburguer.vue'
@Component({
  components: {
    Hamburguer
  }
})
export default class App extends Vue {
}
</script>
<style lang="scss">
  #app, #main{
    height: 100%;
  }
</style>
