import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueDragDrop from 'vue-drag-drop'

Vue.config.productionTip = false

// Buefy/Bulma:
Vue.use(Buefy)

// Styles:
import '@/assets/style/main.scss'

// Vue Drag Drop:
Vue.use(VueDragDrop)

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
