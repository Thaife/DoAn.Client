import { ActionTable, InfoTable, ModuleName } from '@/core/public_api';
import BaseStore from '../base_store';
import { order } from './column-module/index'

/**
 * Các mutation
 * TVTHAI - 08.03.2023
 */
let mutations: any = {
  
};

/**
 * Các action
 * TVTHAI - 08.03.2023
 */
let actions: any = {
	
};

/**
 * Các action thao tác với table
 * TVTHAI - 08.03.2023
 */
const actionTable: InfoTable = {
  actionDefault: ActionTable.ViewDetail,
	actionList: [ActionTable.WaitConfirm, ActionTable.Confirm, ActionTable.Delivery, ActionTable.Delivered, ActionTable.Destroy, ActionTable.Delete],
	fieldId: "orderID",
	fieldCode: "userName",
	fieldActive: "isActive",
};

/**
 * Khai báo store với việc khởi tạo store viết base với các action, mutation được xây dựng trước đó
 * TVTHAI - 08.03.2023
 */
const orders: BaseStore = new BaseStore(ModuleName.Cart, order, mutations, actions, actionTable);

/**
 * Giải phóng bộ nhớ
 */
setTimeout(() => {
  mutations = null;
  actions = null;
}, 0);

export default orders.store;
