<template>
  <div class="modal-body">
    <div class="form">
      <div class="form-container">
        <div class="container-table">
          <div class="table-function sticky">
            <div class="modal-title">
              <h2>{{ $t('page.order') }}</h2>
            </div>
            <div class="modal-close">
              <div @click="Base.closeResultExcel()" class="modal-icon modal-icon_close" :content="$t('common.close') + ' ESC'"
              ></div>
            </div>
          </div>
          <p class="info-order info-order-header">
            {{ $t('page.order') }}: {{ orderDetail.userName }} - {{ orderDetail.phoneNumber }} - {{ orderDetail.email }} - {{ Base.formatDateDDMMYYYYHHMMSS(orderDetail.modifiedDate + '') }}
            <br>
            {{ $t('common.delivery') }}: {{ orderDetail.address }} -  {{ orderDetail.ward }} -  {{ orderDetail.district }} -  {{ orderDetail.province }}
            <br>
            {{ $t('common.note') }}: {{ orderDetail.description }}
            <br>
            {{ $t('common.status') }}: {{ Base.formatStatus(orderDetail.status) }}
          </p>
          <base-table :BaseComponent="BaseComponent">
          </base-table>
          <div class="status-order">
            <div class="status-delivery">
              <p style="color: var(--primary__color);" class="info-order-status">
                * {{ $t('module.order.statusOrder') }}:
              </p>
              <p v-for="(item, index) in statusList" :key="index" class="info-order-status">
                {{ item.Comment }} ({{ Base.formatDateDDMMYYYYHHMMSS(item.CreatedDate + '') }})
              </p>
              <div style="display: flex; margin-top: 12px;">
                <base-input
                  style="width: 340px;"
                  :type="'text'"
                  v-model="statusOrder"
                >
                </base-input>
                <button @click="addStatusOrder" style="margin-left: 10px; margin-top: -1px;" class="btn btn-success">
                  {{ $t('module.order.addStatus') }}
                </button>
              </div>
            </div>
            <p style="margin-top: 12px;" class="info-order">
              <p><span>{{ $t('module.order.totalQuantity') }}:</span> {{ quantity }} {{ $t('page.product') }}</p>
              <p><span>{{ $t('module.order.totalPrice') }}:</span> {{ Base.Comma(totalPrice) }} đ</p>
              <p><span>{{ $t('module.order.coupon') }}:</span> {{ orderDetail.couponCode }} ({{ orderDetail.percent }}%) (-{{ Base.Comma((totalPrice * (orderDetail.percent / 100))) }} đ)</p>
              <div class="hr"></div>
              <p><span>{{ $t('module.order.intoMoney') }}:</span> {{ Base.Comma(totalPrice - (totalPrice * (orderDetail.percent / 100))) }} đ</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CartApi from '@/api/module/cart';
import { ENotificationType, Grid, Header, KeyCode, Order } from '@/core/public_api';
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
/**
 * Khai báo các api của module
 * Khắc Tiềm 13-03-2023
 */
 const api:CartApi = new CartApi();
 
/**
 * Props truyền vào với những Base từ bên component cha
 * Khắc Tiềm - 08.03.2023
 */
const props = defineProps({
  Base: { type: Grid, required: true },
})
const columnProduct = computed<Header []>(() => props.Base.store.state[`product`].columns.filter(function (value: any) { return value.IsShow; }));
const orderDetail = ref<Order>(new Order());
const statusOrder = ref('');

const statusList:any = ref([]);

function addStatusOrder(){
  if(statusOrder.value.trim() == ''){
    props.Base.addNotification(ENotificationType.Error, t('message.crud.is_valid'));
  }
  else{
    props.Base.apiService.callApi(api.addStatusOrder, {orderID: props.Base.RecordID, comment: statusOrder.value}, () => {
      statusList.value = [...statusList.value, {Comment: statusOrder.value, CreatedDate: new Date()}]
      statusOrder.value = '';
    }, false );
  }
}
/**
 * Chứa các column nhân viên
 * Khắc Tiềm - 08.03.2023
 */
 const columns: Header [] = [
  new Header(
    "total",
    "",
    'module.order.total',
    "150",
  ),
  new Header(
    "quantity",
    "",
    'module.order.quantity',
    "150",
  ),
  new Header(
    "priceOrder",
    "",
    'module.order.priceOrder',
    "150",
  ),
  ...columnProduct.value,
];

/** SetFormat */
columns.forEach((item: Header, index)=> {
  if(item.Field === 'total'){
    columns[index].TypeFormat.TextAlign = "right";
    columns[index].TypeFormat.FractionSize = true;
  }
  else if(item.Field === 'quantity'){
    columns[index].TypeFormat.TextAlign = "right";
  }
  else if(item.Field === 'priceOrder'){
    columns[index].TypeFormat.TextAlign = "right";
    columns[index].TypeFormat.FractionSize = true;
  }
})

/**
 * Khởi tạo Base truyền vào table
 * Khắc Tiềm - 08.03.2023
 */
const BaseComponent:any = ref(
  {
    OptionCheck : false,
    columns: columns,
    recordList: [],
    actionTable: props.Base.actionTable,
    hideAction: true,
    hideFilter: true,
    lineClamp: props.Base.lineClamp,
    formatServiceResponse: props.Base.formatServiceResponse,
    columnFix: columns.map((item: Header, index: number) => {
      if(index === 0){
        return {
          Width: 16,
        };
      }
    })
  }
);

const totalPrice = ref(0);
const quantity = ref(0);

onBeforeMount(() => {
  props.Base.apiService.callApi(api.getStatusOrder, {v_OrderID: props.Base.RecordID}, (res: any) => {
    statusList.value = [...res];
  }, false );
  props.Base.apiService.callApi(api.getOrderByID, {v_OrderID: props.Base.RecordID}, (res: Order) => {
    orderDetail.value = res;
    res.orderDetail.forEach((item, index) => {
      res.orderDetail[index].total = item.priceOrder * item.quantity;
      totalPrice.value += res.orderDetail[index].total;
      quantity.value += item.quantity;
    })
    BaseComponent.value.recordList = res.orderDetail;
  }, false );
});

/**
 * Hàm xử lý đóng
 * Khắc Tiềm 19.09.2022
 */
 const handleEventKey = function (event: any) {
  if (event.keyCode === KeyCode.Esc) {
    props.Base.closeResultExcel();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleEventKey);
});

onUnmounted(() => {
  props.Base.setResultExcel();
  window.removeEventListener("keydown", handleEventKey);
})
</script>

<style scoped>
@import "../../../assets/css/crud.css";
/* Phần header table */
::-webkit-scrollbar-track {
  margin-bottom: 0 !important;
}
.modal-body {
  max-width: calc(100% - 40px); 
  width: calc(100% - 40px); 
  left: 20px; 
  margin: 0 !important;
  height: 90vh;
}
.modal-title{
  padding: 8px 12px 15px 25px !important;
}
h2{
  font-family: 'notosans-bold' !important;
}
.form-container,.form,.container-table{
  height: 100%;
}
.form-container{
  padding: 0 0 !important;
}
.container-table{
  padding: 5px 5px 10px 5px !important;
  overflow: unset !important;
}
.table-content{
  max-height: 400px;
  flex-grow: unset !important;
}
.table-function.sticky{
  padding: 0 0 !important;
}
.table-scroll{
  padding: 0 0 !important;
}
.modal-icon{
  margin-left: 40px;
}
.cbx{
  margin-top: 15px;
}
.info-order{
  color: var(--text__color);
  font-family: 'notosans-bold' !important;
}
.info-order-status{
  color: var(--text__color);
  font-family: 'notosans-bold' !important;
}
.status-order{
  display: flex;
  margin: 0 18px;
  flex-grow: 1;
  justify-content: space-between;
}
::-webkit-scrollbar-thumb {
  border-radius: 0;
  background: #b0b0b0;
}
::-webkit-scrollbar-thumb:hover {
  border-radius: 0;
  background: #808080;
}
::-webkit-scrollbar {
  height: 10px; /* height of horizontal scrollbar ← You're missing this */
  width: 8px;
	background-color: var(--while__color);
}
::-webkit-scrollbar-track {
  border-radius: 0;
  direction: rtl;
  margin-left: 16px;
  margin-right: 15px;
}
.status-delivery{
  width: 800px;
  margin-top: 12px;
  overflow: auto;
  position: relative;
}
.info-order-header{
  margin-left: 18px;
  margin-bottom: 12px;
}
.info-order span{
  width: 180px;
  display: inline-block;
}
.info-order p {
  margin-bottom: 6px;
  font-size: 14px;
}
.hr{
  width: 100%;
  height: 1px;
  background-color: #808080;
  margin: 3px 0;
}
</style>