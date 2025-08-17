import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/votes',
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
  },

  {
    path: '/votes',
    name: 'VoteList',
    component: () => import('../views/VoteList.vue'),
  },
  {
    path: '/new',
    name: 'NewVote',
    component: () => import('../views/NewVote.vue'),
  },
  {
    path: '/me',
    name: 'MyPage',
    component: () => import('../views/MyPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
