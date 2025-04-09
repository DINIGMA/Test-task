import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Home.vue'),
    },
    {
      path: '/task/:id',
      name: 'task',
      component: () => import('@/pages/Task.vue'),
      props: true,
    },
  ],
})

export default router
