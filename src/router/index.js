import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Main from '../components/Main.vue'
import detail from '../components/detail.vue'
import Reg from '../components/Reg.vue'
import Recipedetails from '../components/Recipedetails.vue'
import buy from '../components/buy.vue'
import Collection from '../components/Collection.vue'
import My from '../components/My.vue'
import updatemy from '../components/updatemy.vue'
import Orders from '../components/Orders.vue'
import Comments from '../components/Comments.vue'
import shopping from '../components/shopping.vue'
import search from '../components/search.vue'
import startup from '../components/startup.vue'

const routes = [
  {
    path: '/',
    name: 'startup',
    component: startup
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Main',
    name: 'Main',
    component: Main
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: detail
  },
  {
    path: '/Reg',
    name: 'Reg',
    component: Reg
  },

  {
    path: '/Recipedetails/:id',
    name: 'Recipedetails',
    component: Recipedetails
  },
 
  {
    path: '/buy/:id',
    name: 'buy',
    component: buy
  },
  {
    path: '/Collection',
    name: 'Collection',
    component: Collection
  },
  {
    path: '/My',
    name: 'My',
    component: My
  },
  {
    path: '/updatemy',
    name: 'updatemy',
    component: updatemy
  },
  {
    path: '/Orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/Comments',
    name: 'Comments',
    component: Comments
  },
  {
    path: '/shopping',
    name: 'shopping',
    component: shopping
  },
  {
    path: '/search/:content',
    name: 'search',
    component: search
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
