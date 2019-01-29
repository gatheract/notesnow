import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './Store/Store'
import './registerServiceWorker'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/css/style.scss'
import VueI18n from 'vue-i18n'

import * as enLocale from '@/assets/_locales/en.json'
import * as esLocale from '@/assets/_locales/es.json'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueI18n)

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
