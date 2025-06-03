<template>
	<div class="container-table">
		<div class="container-table_header">
      <div class="name-table">
        <h1>{{ $t('page.order') }}</h1>
      </div>
    </div>
    <div class="table-function sticky">
      <div class="form-fix">
        <div class="mi-arrow-check-all"></div>
        <button class="table-function_series toggle-list">
          <span>{{ $t('common.batch_execution') }}</span>
          <div class="table-function_series-icon"></div>
          <div v-show="Base.checkShowActionSeries.length > 0" class="table-list_action">
            <div class="list_action-item" @click="handleChangeStatus('waitConfirm')">{{ $t('common.waitConfirm') }}</div>
            <div class="list_action-item" @click="handleChangeStatus('confirm')">{{ $t('common.confirm') }}</div>
            <div class="list_action-item" @click="handleChangeStatus('deliveryOrder')">{{ $t('common.deliveryOrder') }}</div>
            <div class="list_action-item" @click="handleChangeStatus('delivered')">{{ $t('common.delivered') }}</div>
            <div class="list_action-item" @click="handleChangeStatus('destroy')">{{ $t('common.destroy') }}</div>
            <div class="list_action-item" @click="handleQuestionDeleteAll()">{{ $t('common.delete') }}</div>
          </div>
        </button>
        <base-form-key-search :loadData="Base.loadData" :moduleFilter="ModuleName.Cart"></base-form-key-search>
      </div>
      <div style="min-width: 350px;" class="table-function_search">
        <div class="search-table">
          <input @input="Base.handleSearchData" class="input input-table_search" type="text" :placeholder="$t('common.search_by_code_name')"/>
          <div class="icon-search"></div>
        </div>
        <div @click="Base.loadData()" class="action-render_table reload-table" :content="$t('common.load_data')"></div>
        <div @click="Base.exportToExcel()" class="action-render_table export-data" :content="$t('common.export_excel')"></div>
        <div @click="Base.handleShowSettingTable()" class="action-render_table setting-table" :content="$t('common.customize_interface')"></div>
      </div>
    </div>
		<base-table :BaseComponent="Base" :handleClickActionColumTable="handleClickActionColumTable">
    </base-table>
		<teleport to="#app">
      <base-modal-form v-if="Base.isShowResultExcel">
        <view-order :Base="Base"></view-order>
      </base-modal-form>
      <base-setting v-if="Base.isShowSettingTable" :columns="Base.columnSetting" :handleShowSettingTable="Base.handleShowSettingTable"
      ></base-setting>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { Grid, ModuleName, ActionTable, ENotificationType } from '@/core/public_api';
import { reactive, onBeforeMount, onUnmounted, onMounted, defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import CartApi from '@/api/module/cart';
const ViewOrder = defineAsyncComponent(() => import('./ViewOrder.vue'));

const { t } = useI18n();
/**
 * Khai báo các api của module
 * Khắc Tiềm 13-03-2023
 */
const api:CartApi = new CartApi();

/** Sử dụng base thư viện Grid đã viết */
const Base:Grid = reactive(new Grid(ModuleName.Cart, api));

/**
 * Trước khi mounted sẽ load dữ liệu 1 lần
 * Khắc Tiềm - 08.03.2023
 */
onBeforeMount(() => {
	Base.loadData({ v_Offset: Base.recordSelectPaging, v_Limit: Base.PageSize, v_Where: Base.keyword });
});

/**
 * Hàm xử lý khi click vào các hành động của từng cột dữ liệu table
 * Khắc Tiềm - 08.03.2023
 */
function handleClickActionColumTable(action: any, recordId: any, recordCode: any) {
	try {
		if (action == ActionTable.Delete) {
			questionDeleteRecordApi(recordId, recordCode);
		} else if (action == ActionTable.ViewDetail) {
      Base.RecordID = recordId;
      Base.showResultExcel();
		} else if(action === ActionTable.WaitConfirm){
      exActionAll(action, recordId);
		} else if(action === ActionTable.Confirm){
      exActionAll(action, recordId);
		} else if(action === ActionTable.Delivery){
      exActionAll(action, recordId);
		} else if(action === ActionTable.Delivered){
      exActionAll(action, recordId);
		} else if(action === ActionTable.Destroy){
      exActionAll(action, recordId);
		}
	} catch (e) {
		console.log(e);
	}
}
function handleChangeStatus(action: any){
  Base.showNotificationWanning(exActionAll, t('message.crud.action_all'), action);
}

function exActionAll(action: any, recordId: any = undefined){
  const listID = recordId ? [recordId] : Base.checkShowActionSeries;
  Base.apiService.callApi(Base.api.actionMultipleApi, {action: action, listID: listID}, () => { 
    Base.addNotification(ENotificationType.Success, t('message.crud.success_all'));
    Base.loadData();
  }, false );
}

/**
 *  Hàm thực hiện hỏi xoá một bản ghi 
 * Khắc Tiềm - 08.03.2023
*/
function questionDeleteRecordApi(recordId: any, recordCode:any ){
  Base.showNotificationWanning(Base.deleteRecord, t('message.crud.question_wanning_delete', { module: t(`page.${Base.Module}`), code: recordCode ? recordCode : t('message.crud.statue_of_liberty') }), recordId);
}

/** 
 * Hàm hỏi xác nhận xoá nhiều 
 * Khắc Tiềm - 08.03.2023
*/
function handleQuestionDeleteAll() {
	try {
    if(Base.checkShowActionSeries.length > 0){
      Base.showNotificationWanning(Base.deleteAll, t('message.crud.wanning_delete_all'));
    }
	} catch (e) {
		console.log(e);
	}
}

/**
 * Hàm xử lý các event nút bấm tắt
 * NK Tiềm 08.03.2023
 */
function handleKey(event: any){
	Base.handleEventCtrlNum1(event, Base.openModal, ActionTable.Add)
}

/** 
 * Khi Mounted thì bắt đầu lắng nghe các sự kiện
 * Khắc Tiềm - 08.03.2023
 */
onMounted(() => {
	window.addEventListener("keydown", handleKey);
	window.addEventListener("keyup", Base.handleEventInterruptCtrlNum1);
})

/** 
 * Khi UnMounted thì bắt đầu huỷ lắng nghe các sự kiện
 * Khắc Tiềm - 08.03.2023
 */
onUnmounted(() =>{
	window.removeEventListener("keyup", Base.handleEventInterruptCtrlNum1);
	window.removeEventListener("keydown", handleKey);
  Base.setEmptyData();
})
</script>

<style scoped>
  @import "../../../assets/css/crud.css";
</style>