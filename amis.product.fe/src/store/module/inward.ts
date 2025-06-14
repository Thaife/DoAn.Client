import { ActionTable, InfoTable, ModuleName, StorageService, EntitySystem, Employee } from '@/core/public_api';
import BaseStore from '../base_store';
import { inward } from './column-module/index'

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
	// approve(context: any, payload: any){
	// 	context.commit("setColumnMutation", payload);
	// },
};

const user:Employee = JSON.parse(StorageService.getItemWithSystemConstants(EntitySystem.CurrentUser));

/**
 * Các action thao tác với table
 * TVTHAI - 08.03.2023
 */
const actionTable: InfoTable = {
  actionDefault: ActionTable.Edit,
	actionList: user && user.roleType == 1 ? [ActionTable.Delete, ActionTable.Approve] : [ActionTable.Delete],
	fieldId: "inwardID",
	fieldCode: "inwardName",
	fieldActive: "isActive",
};

/**
 * Khai báo store với việc khởi tạo store viết base với các action, mutation được xây dựng trước đó
 * TVTHAI - 08.03.2023
 */
const inwards: BaseStore = new BaseStore(ModuleName.Inward, inward, mutations, actions, actionTable);

/**
 * Giải phóng bộ nhớ
 */
setTimeout(() => {
  mutations = null;
  actions = null;
}, 0);

export default inwards.store;
