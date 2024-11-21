import { createRouter, createWebHistory } from 'vue-router'
import startRoute from '@/router/startRoute.js'
import catalog from '@/router/catalogRoute.js'
import cartRoute from '@/router/cartRoute.js'
import productRoute from '@/router/productRoute.js'
import userRoute from '@/router/userRoute.js'
import mainLayout from '@/components/StoreLayout.vue'
import { useUserStore } from '@/stores/userStore.js'
import AdminComp from '@/views/Admin/AdminMain/AdminMainLayout.vue'
import AdminCompMain from '@/views/Admin/AdminMain/AdminCompMain.vue'
import AdminCompEntities from '@/views/Admin/AdminMain/AdminCompEntities.vue'
import AdminUserLoginComp from '@/views/Admin/AdminUser/AdminUserLoginComp.vue'

let router = createRouter({
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
          userRoute,
        )
    },
    {
      path: '/admin',
      name: 'AdminComp',
      component: AdminComp,
      meta: {
        requiresAuth: true,
        isAdmin: true
      },
      children: [
        {
          name: 'AdminCompMain',
          path: 'main',
          component: AdminCompMain,
        },
        {
          name: 'AdminCompEntities',
          path: 'entities',
          component: AdminCompEntities,
        },
      ],
    },
    {
      path: '/admin/login',
      name: 'AdminUserLogin',
      component:  AdminUserLoginComp
    }
  ],
});
router.beforeEach( async (to, from ,next) => {
  const store = useUserStore();
  await store.isAuthorized();
  if (to.meta.requiresAuth && !store.isAuthed) {
    next({name:'StartComp'});
    return;
  }
  if(to.meta.isAdmin && !store.checkAdmin) {
    next({name:'StartComp'});
    return;
  }
  next();
  return;

});

export default router;
