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

const token = localStorage.getItem('token')

router.beforeEach((to) => {
  if (!token && to.name !== 'Login') {
    return '/'
  }
})

export default router
