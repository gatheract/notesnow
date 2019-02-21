<template>
  <nav role="navigation">
    <div id="menuToggle">
      <input type="checkbox" v-on:click="toggle">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <ul id="menu" v-bind:class="{ hidden: showMenu}">
        <div class="linksContainer">
        <router-link to="/">        
          <li><i class='uil uil-home'> </i>  {{$t('Hamburguer.home')}}</li>
        </router-link>
        <a href="#">
          <li><i class='uil uil-cog'> </i>{{$t('Hamburguer.settings')}}</li>
        </a>
        <a href="https://github.com/Enchufadoo/notesnow" class="lastLink">
          <li>{{$t('Hamburguer.github')}}</li>
        </a>  
        </div>
        
      </ul>
  </nav>
</template>

<script lang="ts">
/**
 * From https://codepen.io/erikterwan/pen/EVzeRP
 */
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Hamburguer extends Vue {
  private showMenu: boolean = false
  private toggle() {
    this.showMenu = !this.showMenu
  }
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: black;
  transition: color 0.3s ease;
}

a:hover {
  color: #D00;
}
nav{
  position: absolute;
}

#menuToggle {
  display: block;
  position: relative;
  top: 40px;
  left: 40px;
  z-index: 1;

  -webkit-user-select: none;
  user-select: none;
}

#menuToggle input {
  display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  top: -7px;
  left: -5px;

  cursor: pointer;

  opacity: 0; /* hide this */
  z-index: 2; /* and place it over the hamburger */

  -webkit-touch-callout: none;
}

/*
 * Just a quick hamburger
 */
#menuToggle span {
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;

  background:black;
  border-radius: 3px;

  z-index: 1;

  transform-origin: 4px 0px;

  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
}

#menuToggle span:first-child {
  transform-origin: 0% 0%;
}

#menuToggle span:nth-last-child(2) {
  transform-origin: 0% 100%;
}

/* 
 * Transform all the slices of hamburger
 * into a crossmark.
 */
#menuToggle input:checked ~ span {
  opacity: 1;
  transform: rotate(-45deg) translate(-2px, -1px);
  background: #232323;
}

/*
 * But let's hide the middle one.
 */
#menuToggle input:checked ~ span:nth-last-child(3) {
  transform: rotate(45deg) translate(1px, 1px);
}

/*
 * Ohyeah and the last one should go the other direction
 */
#menuToggle input:checked ~ span:nth-last-child(2) {
  
  transform: rotate(0deg) scale(0.2, 0.2);
  opacity: 0;
}

/*
 * Make this absolute positioned
 * at the top left of the screen
 */
#menu {
  position: absolute;
  top: 0;
  height: 100vh;
  width: 300px;
  
  padding: 40px;
  padding-top: 115px;
  height: 100vh;
  background: #e7ebef;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  /* to stop flickering of text in safari */

  transform-origin: 0% 0%;
  transform: translate(-100%, 0);
 
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

#menu li {
  padding: 10px 0;
  font-size: 22px;
}

#menu.hidden{
  transform: none;
}

.linksContainer{
  display: flex; 
  flex-direction: column; 
  height: 100%
}
.lastLink{
  margin-top: auto;
}
</style>