import { createRouter, createWebHistory } from 'vue-router'
import startRoute from '@/router/startRoute.js'
import catalog from '@/router/catalogRoute.js'
import cartRoute from '@/router/cartRoute.js'
import productRoute from '@/router/productRoute.js'
import userRoute from '@/router/userRoute.js'
import mainLayout from '@/views/Shop/templates/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name:'MainLayout',
      path:'/',
      component: mainLayout,
      children:
        [].concat(
          startRoute,
          catalog,
          cartRoute,
          productRoute,
          userRoute
        )
    },
  ],
})

export default router
