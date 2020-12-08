import Vue from 'vue'
import VueRouter from 'vue-router'
import MainWindow from '@/views/MainWindow.vue'
import Cloud from '@/views/Cloud.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainWindow
  },
  {
    path: '/cloud',
    name: 'cloud',
    component: Cloud
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
