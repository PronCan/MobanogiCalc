import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Calculator from '../views/Calculator.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'calculator',
    component: Calculator
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 