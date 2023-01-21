import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/drink/:id',
    name: 'drink',
    component: () => import( '../views/DrinkView.vue')
  },
  {
    path: '/addDrink',
    name: 'addDrink',
    component: () => import( '../views/addDrinkView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
