import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import HalamanLogin from '../halaman_login/template/HalamanLogin.vue'
import DashboardPage from '../dashboard/template/DashboardPage.vue'
import ListUser from '../user/ListUser.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: HalamanLogin,
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
  },

  {
    path: '/user',
    name: 'user',
    component: ListUser,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')
  const isPublicRoute = to.name === 'login'

  if (isPublicRoute) {
    if (token) {
      next({ name: 'dashboard' })
      return
    }

    next()
    return
  }

  if (!token) {
    next({ name: 'login' })
    return
  }

  next()
})

export default router
