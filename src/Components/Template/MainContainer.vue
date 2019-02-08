<template>
  <div class="mainContainer">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class MainContainer extends Vue {
}
</script>

<style scoped lang="scss">
  .mainContainer{
    box-shadow: inset 3px 3px black, inset 3px -3px black, inset -3px 3px black;
    background: white;
    margin: 0 auto;
    width: 100%;
    text-align: center;
    height: 100%;
    min-height: 100vh;
    @media only screen and (max-width: 600px) {
      box-shadow: none;
    }
  }
</style>