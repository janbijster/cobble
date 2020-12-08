import Vue from 'vue'
import RunApp from './RunApp.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(RunApp)
}).$mount('#runapp')
