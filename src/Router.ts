import Vue from 'vue'
import Router from 'vue-router'
import Home from './Views/Home.vue'
import Play from './Views/Play.vue'
import StaffSel from './Views/StaffSel/StaffSel.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/staffsel',
      name: 'staffsel',
      component: StaffSel,
    },
    {
      path: '/play',
      name: 'play',
      component: Play
    }
  ],
})
