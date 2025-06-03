import i18n from '@/locales/i18n';
import { createRouter, createWebHistory } from 'vue-router'
import main from './modules/main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      /** 
       * Nhánh chính 
       * TVTHAI - 08.03.2023
       * */
      path: '/',
      component: () => import('../views/main/MainPage.vue'),
      children: [...main],
    },
    {
      /** 
       * Trang login 
       * TVTHAI - 08.03.2023
       * */
      path: '/login',
      component: () => import('../views/login/LoginPage.vue'),
      meta: { title: 'page.login' }
    },
    {
      /** 
       * Trang không tồn tại 
       * TVTHAI - 08.03.2023
       * */
      path: '/:pathMatch(.*)*',
      redirect: '/not-found'
    },
  ],
  linkActiveClass: "active",
})

/**
 * Hàm trước khi route được thực thi
 * TVTHAI - 08.03.2023
 */
router.beforeEach((to: any, from: any, next: any) => {
  document.title = i18n.global.t(to.meta.title ? to.meta.title : 'page.default') // Đặt tiêu đề trang theo ngôn ngữ hiện tại
  if (to.path == "/") {
    next({ name: "cashMain" });
  }
  next();
})

export default router
