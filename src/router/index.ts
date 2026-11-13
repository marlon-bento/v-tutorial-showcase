import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SistemasView from '../views/SistemasView.vue'
import ReportView from '@/views/ReportView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sistema/:id',
      name: 'sistema',
      component: SistemasView,
      props: true,
    },
    {
      path: '/report',
      name: 'report',
      component: ReportView,
      props: true,
    },
  ],
})

export default router
