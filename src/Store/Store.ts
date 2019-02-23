import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './Types'
import { settings } from './Modules/Settings/Settings'
import { stats } from './Modules/Stats/Stats'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.sessionStorage,
    key: 'notesnow'
})

const store: StoreOptions<RootState> = {
    state: {
        version: '1.0.0' 
    },
    modules: {
        Settings: settings,
        Stats: stats
    },
    
    plugins: [vuexLocal.plugin]
}

export default new Vuex.Store<RootState>(store)
