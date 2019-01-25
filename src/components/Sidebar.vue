<template>
  <div class="sidebar"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Button, Table } from 'iview'

@Component
export default class SideBar extends Vue {
  @Prop() private msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sidebar {
  background: black;
  width: 100%;
  height: 100%;
}
</style>
