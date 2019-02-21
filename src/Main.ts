import Vue from 'vue'
import App from './App.vue'
import router from './Router'
import store from './Store/Store'

import '@/assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/css/style.scss'

import VueI18n from 'vue-i18n'
import * as enLocale from '@/assets/_locales/en.json'
import * as esLocale from '@/assets/_locales/es.json'
import Element from 'element-ui'

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(Element)

const i18n = new VueI18n({
  locale: 'en', 
  messages: {
    es: esLocale,
    en: enLocale
  }, 
})

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
