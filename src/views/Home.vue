<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Sidebar from '@/Components/Sidebar.vue'
import MainScreen from '@/Components/MainScreen.vue'

@Component({
  components: {
    Sidebar,
    MainScreen
  }
})
export default class Home extends Vue { }
</script>
<style scoped lang="scss">
#homeContainer {
  display: flex;
}
#sidebar {
  
  display: none;
}
</style>

<template>
  <div id="homeContainer">
    <sidebar id="sidebar"/>
    <MainScreen/>
  </div>
</template>
