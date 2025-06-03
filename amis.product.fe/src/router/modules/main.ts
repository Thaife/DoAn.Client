import home from './main/home';
import cash from './main/cash';
import inventory from './main/inventory';

const router: any = [
  {
    /** 
     * Module trang chủ 
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/',
    children: [...home],
  },
  {
    /** 
     * Module trang tiền mặt 
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/cash',
    children: [...cash],
  },
  {
    /** 
     * Module trang kho 
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/inventory',
    children: [...inventory],
  },
  {
    /** 
     * Trang kho
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/category',
    component: () => import('../../views/main/inventory/category/CategoryPage.vue'),
    meta: { title: 'page.category' }
  },
  {
    /** 
     * Trang kho
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/origin',
    component: () => import('../../views/main/inventory/origin/OriginPage.vue'),
    meta: { title: 'page.origin' }
  },
  {
    /** 
     * Trang kho
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/trademark',
    component: () => import('../../views/main/inventory/trademark/TrademarkPage.vue'),
    meta: { title: 'page.trademark' }
  },
  {
    /** 
     * Trang order
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/order',
    component: () => import('../../views/main/order/OrderPage.vue'),
    meta: { title: 'page.order' }
  },
  {
    /** 
     * Trang order
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/coupon',
    component: () => import('../../views/main/coupon/CouponPage.vue'),
    meta: { title: 'page.coupon' }
  },
  {
    /** 
     * Trang không tồn tại 
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/not-found',
    component: () => import('../../views/main/not-found/NotFound.vue'),
    meta: { title: 'page.not_found' }
  },
  {
    /** 
     * Trang không tồn tại 
     * Khắc Tiềm - 08.03.2023
     * */
    path: '/feature-built',
    component: () => import('../../views/main/Construction/ConstructionPage.vue'),
    meta: { title: 'page.construction_page' }
  },
]

export default router;