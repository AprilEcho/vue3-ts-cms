import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router' //导入路由类型
import LocalCatch from '@/utils/cache'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHistory()
})
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = LocalCatch.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})
export default router
