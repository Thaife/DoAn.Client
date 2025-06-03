import { ActionTable, InfoTable, ModuleName } from '@/core/public_api';
import BaseStore from '../base_store';
import { coupon } from './column-module/index'

/**
 * Các mutation
 * Khắc Tiềm - 08.03.2023
 */
let mutations: any = {
  
};

/**
 * Các action
 * Khắc Tiềm - 08.03.2023
 */
let actions: any = {
	
};

/**
 * Các action thao tác với table
 * Khắc Tiềm - 08.03.2023
 */
const actionTable: InfoTable = {
  actionDefault: ActionTable.Edit,
	actionList: [ActionTable.Replication, ActionTable.Delete, ActionTable.StopUsing],
	fieldId: "couponID",
	fieldCode: "couponCode",
	fieldActive: "isActive",
};

/**
 * Khai báo store với việc khởi tạo store viết base với các action, mutation được xây dựng trước đó
 * Khắc Tiềm - 08.03.2023
 */
const coupons: BaseStore = new BaseStore(ModuleName.Coupon, coupon, mutations, actions, actionTable);

/**
 * Giải phóng bộ nhớ
 */
setTimeout(() => {
  mutations = null;
  actions = null;
}, 0);

export default coupons.store;
