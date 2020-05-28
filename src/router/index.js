import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index.vue'

import form from '@/views/form.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/form',
      name: 'form',
      component: form
    }
  ]
})
