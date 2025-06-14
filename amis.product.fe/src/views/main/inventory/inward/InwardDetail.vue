<template>
	<div class="modal-body">
    <div class="form form_depot_in">
      <div class="form-header">
        <div class="modal-title">
          <h2>{{ Base.StateForm === ActionTable.Add ? 'Thêm phiếu nhập' : 'Sửa phiếu nhập' }}</h2>
        </div>
        <div class="modal-close">
          <a href="/feature-built" target="_blank" class="modal-icon modal-icon_help" :content="$t('common.support') + ' F1'"></a>
          <div @click="handleCloseModal()" class="modal-icon modal-icon_close" :content="$t('common.close') + ' ESC'"
          ></div>
        </div>
      </div>
      <div class="form-container">
        <div class="form-item_input">
          <button ref="focusLoopTop" class="focus-loop"></button>
          <div class="form-group ms-small">
            <!-- Tên phiếu nhập -->
            <base-input
              :focus="true"
              :required="true"
              :type="'text'"
              :maxLength="20"
              :disabled="inward.isApprove"
              :messageValid="t('validate.empty', { field: t('module.inward.inwardName') })"
              :label="$t('module.inward.inwardName')" 
              v-model="inward.inwardName"
              :class="{ 'is-valid': isValid && inward.inwardName == '' }"
              ref="inputFocus"
            ></base-input>
          </div>
          <!-- Kho nhập -->
          <div class="form-group ms-big">
            <base-combobox
              widthOptionSelect="600px"
              widthLabelCode="250px"
              :disabled="inward.isApprove"
              :required="true"
              :options="dataStock"
              :value="'depotID'"
              :header="'depotName'"
              label="Tên kho nhập"
              labelCode="Mã kho"
              labelName="Tên kho"
              :headerCode = "'depotCode'"
              v-model="inward.depotID"
              v-model:textField="inward.depotName"
              v-model:textCode="inward.depotCode"
            ></base-combobox>
          </div>
        </div>
        <!-- Diễn giải -->
        <div class="form-group">
          <base-input
            :required="false"
            :type="'text'"
            :maxLength="200"
            label="Diễn giải" 
            :disabled="inward.isApprove"
            v-model="inward.description"
            ref="inputFocus"
          ></base-input>
        </div>
      </div>
      <div class="table-wrap">
        <div class="add-btn-wrap">
          <div class="form-group ms-big">
            <base-combobox
              widthOptionSelect="600px"
              widthLabelCode="250px"
              :selectMultiple="selectMultiple"
              :disabled="inward.isApprove"
              headerSelectMultiple="productCode"
              :options="dataProduct"
              :value="'productID'"
              header="productName"
              label="Chọn thêm sản phẩm"
              labelCode="Mã sản phẩm"
              :modelValue="listSelected"
              @handleClickData="handleClickData"
              labelName="Tên sản phẩm"
              headerCode = "productCode"
            ></base-combobox>
          </div>
        </div>
        <base-table :BaseComponent="BaseComponent" :disabled="inward.isApprove">
        </base-table>
      </div>
      <div class="form-action">
        <div class="form-action_container" v-if="!inward.isApprove">
          <div class="form-action_item">
            <button @click="handleSaveData(true)" style="margin-right: 9px" class="btn modal-icon btn-form_cat" :content="$t('common.add_form') + ' (Ctrl + S)'">
              {{ $t('common.add_form') }}
            </button>
            <button @click="handleSaveData(false)" class="btn btn-success modal-icon btn-form_cat-them" :content="$t('common.add_form_and_add') + ' (Ctrl + Shift +  S)'">
              {{ $t('common.add_form_and_add') }}
            </button>
          </div>
          <div class="form-action_item">
            <button @click="Base.closeModal" class="btn" :content="$t('common.cancel_form')">
              {{ $t('common.cancel_form') }}
            </button>
          </div>
        </div>
      </div>
      <button ref="focusLoop" class="focus-loop"></button>
    </div>

    <!-- <teleport to="#app">
        <base-modal-form v-if="isShowDetail">
            <InwardInventoryDetail :Base="BaseInwardProductDetail" :AddItem="AddProduct"></InwardInventoryDetail>
        </base-modal-form>
    </teleport> -->
  </div>
</template>

<script setup lang="ts">
import { ActionTable, Inward, ENotificationType, Grid, ModuleName, ServiceResponse, Header, Product, TypeFormat, FilterHeaderIn, Depot } from '@/core/public_api';
import { onUnmounted, onMounted, ref, onBeforeMount, defineAsyncComponent, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const InwardInventoryDetail = defineAsyncComponent(() => import('./InwardInventoryDetail.vue'))
import InwardApi from '@/api/module/inward';
// import ProductApi from '@/api/module/product';
import axiosAPI from "../../../..//api/index";
import { product } from '@/store/module/column-module';
import DepotApi from '@/api/module/depot';

const { t } = useI18n();

/**
 * Props truyền vào với những Base từ bên component cha
 * TVTHAI - 08.03.2023
 */
const props = defineProps({
  Base: { type: Grid, required: true },
  AddItem: { type: Function, default: () => {} },
})

const handleAddDetail = () => {
    isShowDetail.value = true;
};

const selectMultiple = ref(true);

let listSelected = reactive<any[]>([]);
let listDataGrid = reactive<any[]>([]);

function handleClickData(data:any) {
  const index = listSelected.indexOf(data);
  if (index > -1) {
    listSelected.splice(index, 1);
    listDataGrid.splice(index, 1);
  } else {
    listSelected.push(data)
    let itemProduct = dataProduct.value.find(item => item.productID == data)
    let newItem = {
      productID: itemProduct?.productID,
      productCode: itemProduct?.productCode,
      productName: itemProduct?.productName,
      quantity: 0,
      price: itemProduct?.price
    }
    listDataGrid.push(newItem)
  }
}

const dataProduct = ref<Product[]>([]);

async function loadDataProduct() {
  var res = await axiosAPI.get(`/products`);
  dataProduct.value = res.data
  // console.log(res.data)
}

const dataStock = ref<Depot[]>([]);

const isShowDetail = ref(false);
const apiInward:InwardApi = new InwardApi();
const BaseInwardProductDetail:Grid = reactive(new Grid(ModuleName.Inward, apiInward));
BaseInwardProductDetail.setStateForm(ActionTable.Add);

const typeFormatInput = new TypeFormat();
typeFormatInput.Input = true;

/**
 * Chứa các column
 * TVTHAI - 08.03.2023
 */
 const columns: Header [] = [
  new Header(
    "productCode",
    "",
    'module.inward.productCode',
    "150",
  ),
  new Header(
    "productName",
    "",
    'module.inward.productName',
    "150",
  ),
  new Header(
    "price",
    "",
    'module.inward.price',
    "150",
  ),
  new Header(
    "quantity",
    "",
    'module.inward.quantity',
    "150",
    new FilterHeaderIn(),
    typeFormatInput,
  ),
];

/**
 * Khởi tạo Base truyền vào table
 * TVTHAI - 08.03.2023
 */
const BaseComponent:any = ref(
  {
    OptionCheck : false,
    columns: columns,
    recordList: listDataGrid,
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

/**
 * Lưu trạng thái hiển thị validate
 * NK Tiềm 08.03.2023
 */
const isValid = ref(false);

/** Biến lưu trạng thái gọi api có bị lỗi hay không
 *  TVTHAI - 08.03.2023
 */
const errorApi = ref(false);

/**
 * Khởi tạo đối tượng thêm sửa xoá và so sánh
 * TVTHAI - 08.03.2023
 */
const inward = ref<Inward>(new Inward());
const inwardComparison = ref<Inward>(new Inward());

/** 
 * Chuẩn bị dữ liệu trước khi mount
 * TVTHAI - 08.03.2023
 */
onBeforeMount(() => {
  if(props.Base.StateForm === ActionTable.Edit || props.Base.StateForm === ActionTable.Replication){
    inward.value = {...props.Base.RecordEdit};
    let a: any[] = [];
    inward.value.inwardDetail.forEach(element => {
      listDataGrid.push(element)
      a.push(element.productID)
    });
    inward.value.depotID = '';
    setTimeout(() => {
      a.forEach(element => {
        listSelected.push(element)
      });
      inward.value.depotID = '';
      inward.value.depotID = props.Base.RecordEdit.depotID;

    }, 300);
    inwardComparison.value = {...props.Base.RecordEdit};
  }
})

async function AddProduct(product: any) {

}

/** 
 * Hàm xử lý lưu dữ liệu
 * TVTHAI - 08.03.2023
 */
async function handleSaveData(closeModal: any) {
  try {
    /** Kiểm tra validate */
    const messValid = validateInput();
    if (messValid.length > 0) {
      isValid.value = true;
      unListenEvent();
      props.Base.showNotificationError(messValid, ()=> { props.Base.focusInputError('form_depot_in'), listenEvent() });
    } else if(listDataGrid.length <= 0) {
      props.Base.showNotificationError('Bạn phải nhập ít nhất 1 sản phẩm');
    }
    else {
      if (props.Base.StateForm === ActionTable.Add || props.Base.StateForm === ActionTable.Replication) {
        /** Nếu trạng thái form là thêm thì truyền api thêm */
        await callApiForm(props.Base.api.createRecordApi, props.Base.StateForm);
      } 
      else {
        /** nếu trạng thái form là sửa thì truyền api sửa */
        await callApiForm(props.Base.api.editRecordApi, props.Base.StateForm);
      }
      if (closeModal === true && errorApi.value === false) {
        /** Đóng form, không tiếp tục thêm  */
        props.Base.closeModal();
      } 
      else if (errorApi.value === false) {
        /** Nếu tiếp tục thêm thì reset dữ liệu, focus vào ô input */
        props.Base.setStateForm(ActionTable.Add);
        isValid.value = false;
        inward.value = new Inward();
        inwardComparison.value = new Inward();
        inputFocus.value.tagInput.focus(); 
      }
    }
  } catch (e) {
    console.log(e);
  }
}

/** 
 * Hàm xử lý gọi api của một form thêm, sửa xoá
 * TVTHAI - 08.03.2023
 */
const callApiForm = async (api: any, stateForm: string = '') => {
  errorApi.value = true;
  //Gán detail
  inward.value.inwardDetail = listDataGrid;
  //
  await props.Base.apiService.callApi(api, inward.value ,async (response: any) => { 
    if (props.Base.StateForm === ActionTable.Add || props.Base.StateForm === ActionTable.Replication){
      inward.value.isApproveText = 'Chưa duyệt'
      const today = new Date();

      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); // tháng bắt đầu từ 0
      const year = today.getFullYear();

      const formatted = `${day}/${month}/${year}`;
      props.Base.store.dispatch(`${props.Base.Module}/addRecordAction`, { ...inward.value, createdDate: formatted, depotID: response });
      props.AddItem({ ...inward.value, depotID: response });
    }
    else{
      inward.value.isApproveText = 'Chưa duyệt'
      const today = new Date();

      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); // tháng bắt đầu từ 0
      const year = today.getFullYear();

      const formatted = `${day}/${month}/${year}`;
      props.Base.store.dispatch(`${props.Base.Module}/editRecordAction`, { ...inward.value, createdDate: formatted, depotID: response });
      props.Base.setStateForm(ActionTable.Add);
    }
    props.Base.loadData();
    errorApi.value = false;
    props.Base.addNotification(ENotificationType.Success, `${t(`common.${stateForm}`)} ${t(`common.success`)}`);
  },false , (res: ServiceResponse) => {
    props.Base.addNotificationCRUD(res.data.userMsg, 'module.inventory');
  });
}

/** 
 * Hàm validate input
 * TVTHAI - 08.03.2023
 */
function validateInput() {
  return [
    /** Validate code */ 
    inward.value.inwardName.trim() === "" ? t('validate.empty', { field: t('module.inward.inwardName') }) : null,
    /** Validate name */
    inward.value.depotName.trim() === "" ? t('validate.empty', { field: t('module.inward.depotName') }) : null,

  ].filter((item) => { if(item){ return true; } });
}

/**
 * Element input và các button ẩn đi bắt sự kiện focus vào tạo vòng lặp vào khi mở from
 * NK Tiềm 08.03.2023
 */
const inputFocus:any = ref(null);
const focusLoop:any = ref(null); 
const focusLoopTop:any = ref(null); 

/**
 * Hàm xử lý lặp khi tab focus
 * NK Tiềm 08.03.2023
 */
const handleLoopFocus = function () {
  inputFocus.value.tagInput.focus();
};

/** Xử lý hỏi lưu dữ liệu rồi mới đóng form */
const handleCloseModal = () => {
  try {
    props.Base.closeModal();
    // if (JSON.stringify(inward.value) != JSON.stringify(inwardComparison.value)) {
    //   unListenEvent();
    //   props.Base.showNotificationAction(saveDataAndCloseForm, props.Base.closeModal, t('common.question_data_change'), () => {
    //     listenEvent();
    //     handleLoopFocus();
    //   });
    // } else {
    //   props.Base.closeModal();
    // }
  } catch (e) {
    console.log(e);
  }
}

/** Call back truyền vào action hỏi (chạy khi người dùng bấm đồng ý) */
const saveDataAndCloseForm = () => {
  handleSaveData(true);
}

/** Lắng nghe các sử kiện */
const listenEvent = () => {
	window.addEventListener("keydown", handleKey);
  window.addEventListener("keyup", props.Base.handleEventInterruptFormCtrlShiftS);
}

/** Bỏ lắng nghe */
const unListenEvent = () => {
	window.removeEventListener("keydown", handleKey);
	window.removeEventListener("keyup", props.Base.handleEventInterruptFormCtrlShiftS);
}

/**
 * Hàm xử lý các event nút bấm tắt
 * NK Tiềm 08.03.2023
 */
function handleKey(event: any){
  props.Base.handleEventFormCtrlShiftS(event, handleCloseModal, null, handleSaveData, false, handleSaveData, true)
	props.Base.handleEventF1(event, () => {
    window.open('/feature-built');
  })
}

/** 
 * Khi Mounted thì bắt đầu lắng nghe các sự kiện
 * TVTHAI - 08.03.2023
 */
onMounted(() => {
	focusLoop.value.addEventListener("focus", handleLoopFocus);
	focusLoopTop.value.addEventListener("focus", handleLoopFocus);
  loadDataProduct();
  props.Base.apiService.callApi(new DepotApi().getDropdown, null, async (response: any) => { dataStock.value = response;});
  listenEvent();
})

/** 
 * Khi UnMounted thì bắt đầu huỷ lắng nghe các sự kiện
 * TVTHAI - 08.03.2023
 */
onUnmounted(() =>{
	window.removeEventListener("focus", handleLoopFocus);
  unListenEvent();
})
</script>

<style scoped>
.modal-body {
  max-width: 1200px !important;
  width: 1200px !important;
  left: calc(50vw - 600px) !important;
  height: 800px !important;
  top: 50vh !important;
  transform: translateY(-50%) !important;
  padding: 0 !important;
}
textarea{
  resize: none;
  display: block;
  padding: 9px;
  font-size: 13px;
  width: 100%;
  height: 100%;
}
.table-wrap {
  padding: 0 16px;
  flex: 1;
}
.add-btn-wrap {
  /* padding-left: 32px; */
  margin: 0 16px;
  padding-top: 10px;
  /* border-top: 1px solid rgb(202, 200, 200); */
}
.form_depot_in {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>