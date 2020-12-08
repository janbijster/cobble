import Vue from 'vue'
import Vuex from 'vuex'

import navigation from './vuex-navigation'
import editor from './vuex-editor'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    navigation,
    editor
  }
})

export default store
