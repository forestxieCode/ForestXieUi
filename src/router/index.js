import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index.vue'

import form from '@/views/form.vue'
import display from '@/views/display.vue'
import alert from '@/views/alert.vue'
import table from '@/views/table-render.vue'
import test from '@/views/test.vue'
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
    },
    {
      path: '/alert',
      name: 'alert',
      component: alert
    },
    {
      path: '/display',
      name: 'display',
      component: display
    },
    {
      path: '/table',
      name: 'table',
      component: table
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
