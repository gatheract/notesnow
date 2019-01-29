import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './Types'
import { settings } from './Modules/Settings/Settings'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
    state: {
        version: '1.0.0' 
    },
    modules: {
        Settings: settings
    }
}

export default new Vuex.Store<RootState>(store)
