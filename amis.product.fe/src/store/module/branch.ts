import { ActionTable, InfoTable, ModuleName } from '@/core/public_api';
import BaseStore from '../base_store';
import { branch } from './column-module/index'

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
  actionDefault: ActionTable.Edit,
	actionList: [ActionTable.Replication, ActionTable.Delete, ActionTable.StopUsing],
	fieldId: "branchID",
	fieldCode: "branchCode",
	fieldActive: "isActive",
};

/**
 * Khai báo store với việc khởi tạo store viết base với các action, mutation được xây dựng trước đó
 * TVTHAI - 08.03.2023
 */
const branchs: BaseStore = new BaseStore(ModuleName.Branch, branch, mutations, actions, actionTable);

/**
 * Giải phóng bộ nhớ
 */
setTimeout(() => {
  mutations = null;
  actions = null;
}, 0);

export default branchs.store;
