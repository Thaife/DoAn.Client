import { createStore } from 'vuex';
import config from './module/config';
import employee from './module/employee';
import branch from './module/branch';
import depot from './module/depot';
import origin from './module/origin';
import trademark from './module/trademark';
import product from './module/product';
import category from './module/category';
import order from './module/order';
import coupon from './module/coupon';

const store = createStore({
  modules: {
    config,
    employee,
    branch,
    depot,
    origin,
    trademark,
    product,
    category,
    order,
    coupon,
  },
});

export default store;