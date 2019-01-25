<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Sidebar from '@/components/Sidebar.vue'
import MainScreen from '@/components/MainScreen.vue'

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
  flex: 1;
  max-width: 300px;
  min-width: 300px;
}
</style>

<template>
  <div id="homeContainer">
    <sidebar id="sidebar"/>
    <MainScreen/>
  </div>
</template>
