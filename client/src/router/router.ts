import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginPage.vue'
import Register from '../views/RegisterPage.vue'
import Dashboard from '../views/HomeDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  if (!token && to.name === 'Dashboard') {
    return '/'
  }
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  if (token && to.name !== 'Dashboard') {
    return '/dashboard'
  }
})

export default router
