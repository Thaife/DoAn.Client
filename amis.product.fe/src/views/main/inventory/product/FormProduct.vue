<template>
	<div class="modal-body" :class="{ active : isShowFullModal }">
		<div class="form form_product_in">
			<div class="form-header">
				<div class="modal-title">
					<h2>{{ Base.StateForm === ActionTable.Add ? $t('common.add_record', {module: $t(`module.inventory.inventoryItem_small`) }) 
          : Base.StateForm === ActionTable.Replication ? $t('common.replication_record', {module: $t(`module.inventory.inventoryItem_small`) }) 
          : $t('common.edit_record', {module: $t(`module.inventory.inventoryItem_small`) }) }}</h2>
					<div class="form-title">
						<div class="nature">
							<div class="form-title_image form-goods">
							</div>
							<div class="form-title_header">
								{{ $t('module.inventory.goods') }}
							</div>
						</div>
					</div>
				</div>
				<div class="modal-close">
					<a href="/feature-built" target="_blank" class="modal-icon modal-icon_help" :content="$t('common.support') + ' F1'"></a>
          <div @click="handleCloseModal()" class="modal-icon modal-icon_close" :content="$t('common.close') + ' ESC'"></div>
				</div>
			</div>
			<div class="form-container">
				<div class="form-detail flex-center">
					<div class="form-item form-item_left">
						<button ref="focusLoopTop" class="focus-loop"></button>
						<div class="form-item_input">
							<div class="form-group ms-big">
								<base-input
									ref="inputFocus"
									:required="true"
									:focus="true"
									:type="'text'"
									:maxLength="255"
                  :messageValid="t('validate.empty', { field: t('module.inventory.productName') })"
									:label="$t('common.name')"
									v-model="product.productName"
									:class="{ 'is-valid': isValid && product.productName == '' }"
								></base-input>
							</div>
						</div>
						<div class="form-item_input">
							<div class="form-group ms-small-s">
								<base-input
									:required="true"
									:type="'text'"
									:maxLength="25"
									:label="$t('common.id')" 
									:leftMessage="'95%'"
									v-model="product.productCode"
                  :messageValid="t('validate.empty', { field: t('module.inventory.productCode') })"
									:class="{ 'is-valid': isValid && product.productCode == '' }"
								></base-input>
							</div>
							<div class="form-group ms-big">
								<base-combobox
									widthOptionSelect="600px"
									widthLabelCode="250px"
									:options="optionCategoryIn.optionCategory"
                  :value="'categoryID'"
                  :header="'categoryName'"
                  :label="$t('module.inventory.categoryName')"
                  :labelCode="$t('module.inventory.categoryCode')"
                  :labelName="$t('module.inventory.categoryName')"
                  :headerCode = "'categoryCode'"
                  v-model="product.categoryID"
                  v-model:textField="product.categoryName"
                  :addIcon="true"
                  v-model:textCode="product.categoryCode"
                  :handleAddIcon="BaseCategory.openModal"
								></base-combobox>
							</div>
						</div>
						<div class="form-item_input">
							<div class="form-group ms-small">
								<base-combobox
                  :widthLabelCode="'170px'"
                  :widthOptionSelect="'450px'"
									:options="optionOriginIn.optionOrigin"
                  :value="'originID'"
                  :header="'originName'"
                  :label="$t('module.inventory.originName')"
                  :labelCode="$t('module.inventory.originCode')"
                  :labelName="$t('module.inventory.originName')"
                  :headerCode = "'originCode'"
                  v-model="product.originID"
                  v-model:textField="product.originName"
                  :addIcon="true"
                  v-model:textCode="product.originCode"
                  :handleAddIcon="BaseOrigin.openModal"
								></base-combobox>
							</div>
							<div class="form-group ms-big">
								<base-combobox
                  :widthLabelCode="'170px'"
                  :widthOptionSelect="'450px'"
									:options="optionTrademarkIn.optionTrademark"
                  :value="'trademarkID'"
                  :header="'trademarkName'"
                  :label="$t('module.inventory.trademarkName')"
                  :labelCode="$t('module.inventory.trademarkCode')"
                  :labelName="$t('module.inventory.trademarkName')"
                  :headerCode = "'trademarkCode'"
                  v-model="product.trademarkID"
                  v-model:textField="product.trademarkName"
                  :addIcon="true"
                  v-model:textCode="product.trademarkCode"
                  :handleAddIcon="BaseTrademark.openModal"
								></base-combobox>
							</div>
						</div>
					</div>
					<base-image v-model="product.avatar"></base-image>
				</div>
				<div class="divide-line"></div>
        <div class="form-item_input">
          <div class="form-group ms-small-s">
            <base-combobox
              :options="[
                { value: `1 ${$t('calendar.month')}`, header: `1 ${$t('calendar.month')}` },
                { value: `2 ${$t('calendar.month')}`, header: `2 ${$t('calendar.month')}` },
                { value: `3 ${$t('calendar.month')}`, header: `3 ${$t('calendar.month')}` },
                { value: `6 ${$t('calendar.month')}`, header: `6 ${$t('calendar.month')}` },
                { value: `9 ${$t('calendar.month')}`, header: `9 ${$t('calendar.month')}` },
                { value: `1 ${$t('calendar.year')}`, header: `1 ${$t('calendar.year')}` },
                { value: `2 ${$t('calendar.year')}`, header: `2 ${$t('calendar.year')}` },
                { value: `3 ${$t('calendar.year')}`, header: `3 ${$t('calendar.year')}` },
                { value: `6 ${$t('calendar.year')}`, header: `6 ${$t('calendar.year')}` },
                { value: `9 ${$t('calendar.year')}`, header: `9 ${$t('calendar.year')}` },
                { value: `12 ${$t('calendar.year')}`, header: `12 ${$t('calendar.year')}` },
              ]"
              :value="'value'"
              :header="'header'"
              :label="$t('module.inventory.warrantyPeriod')"
              v-model="product.warrantyPeriod"
            ></base-combobox>
          </div>
          <div class="form-group ms-small-s">
            <base-input
              :type="'text'"
              :label="$t('module.inventory.price')"
              :isNumber="true"
              v-model.number="product.price"
            ></base-input>
          </div>
          <div class="form-group ms-big ">
            <base-input
              :type="'text'"
              :label="$t('module.inventory.batteryLife')"
              :maxLength="255"
              v-model="product.batteryLife"
            ></base-input>
          </div>
        </div>
        <div class="form-item_input">
          <div class="form-group">
            <base-combobox
              :widthLabelCode="'170px'"
              :widthOptionSelect="'450px'"
              :options="optionDepotIn.optionDepot"
              :value="'depotID'"
              :header="'depotName'"
              :label="$t('module.inventory.depot_impact')"
              :labelCode="$t('module.inventory.depotCode')"
              :labelName="$t('module.inventory.depotName')"
              :headerCode = "'depotCode'"
              v-model="product.depotID"
              v-model:textField="product.depotName"
              :addIcon="true"
              v-model:textCode="product.depotCode"
              :handleAddIcon="BaseDepot.openModal"
            ></base-combobox>
          </div>
          <div class="form-group">
            <base-input
              :type="'text'"
              :maxLength="255"
              :label="$t('module.inventory.material')"
              v-model="product.material"
            ></base-input>
          </div>
          <div v-show="false" style="padding-left: 16px" class="form-group">
            <label>{{ $t('common.gender') }}</label>
            <div class="base-radio_item">
              <base-radio
                :label="$t('gender.male')"
                :value="Gender.Male"
                v-model.number="product.gender"
              ></base-radio>
              <base-radio
                :label="$t('gender.female')"
                :value="Gender.Female"
                v-model.number="product.gender"
              ></base-radio>
            </div>
          </div>
        </div>
        <div class="form-item_input">
          <div class="form-group">
            <label>{{ $t('common.description') }}</label>
            <quill-editor 
              v-model:content="product.description" 
              contentType="html" 
              theme="snow" 
              toolbar="full"
            >
          </quill-editor>
          </div>
        </div>
			</div>
			<div class="form-action">
				<div class="form-action_container">
          <div class="form-action_item">
            <button @click="handleSaveData(true)" style="margin-right: 9px" class="btn modal-icon up btn-form_cat" :content="$t('common.add_form') + ' (Ctrl + S)'">
              {{ $t('common.add_form') }}
            </button>
            <button @click="handleSaveData(false)" class="btn btn-success modal-icon up btn-form_cat-them" :content="$t('common.add_form_and_add') + ' (Ctrl + Shift +  S)'">
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
		<div @click="()=> {isShowFullModal = !isShowFullModal}" class="resize">
			<div class="resize-icon"></div>
		</div>
		<teleport to="#app">
			<base-modal-form v-if="BaseDepot.isShowModal">
				<form-depot :Base="BaseDepot" :AddItem="AddDepot"></form-depot>
			</base-modal-form>
			<base-modal-form v-if="BaseCategory.isShowModal">
				<form-category :Base="BaseCategory" :AddItem="AddCategory"></form-category>
			</base-modal-form>
			<base-modal-form v-if="BaseOrigin.isShowModal">
				<form-origin :Base="BaseOrigin" :AddItem="AddOrigin"></form-origin>
			</base-modal-form>
			<base-modal-form v-if="BaseTrademark.isShowModal">
				<form-trademark :Base="BaseTrademark" :AddItem="AddTrademark"></form-trademark>
			</base-modal-form>
		</teleport>
	</div>
</template>

<script setup lang="ts">
import CategoryApi from '@/api/module/category';
import DepotApi from '@/api/module/depot';
import OriginApi from '@/api/module/origin';
import TrademarkApi from '@/api/module/trademark';
import { ActionTable, Product, ENotificationType, Grid, ModuleName, ServiceResponse, Gender } from '@/core/public_api';
import { onUnmounted, onMounted, ref, onBeforeMount, reactive, watch, defineAsyncComponent } from 'vue';
import { useI18n } from 'vue-i18n';
const FormDepot = defineAsyncComponent(()=> import('../depot/FormDepot.vue'));
const FormOrigin = defineAsyncComponent(()=> import('../origin/FormOrigin.vue'));
const FormTrademark = defineAsyncComponent(()=> import('../trademark/FormTrademark.vue'));
const FormCategory = defineAsyncComponent(()=> import('../category/FormCategory.vue'));
const { t } = useI18n();

/** 
 *  Biến lưu trạng thái mở full modal
 *  TVTHAI - 08.03.2023
 */
 const isShowFullModal = ref(false);

/**
 * Props truyền vào với những Base từ bên component cha
 * TVTHAI - 08.03.2023
 */
const props = defineProps({
  Base: { type: Grid, required: true },
	optionDepotIn: { type: Object, required: true } ,
	optionOriginIn: { type: Object, required: true } ,
	optionTrademarkIn: { type: Object, required: true } ,
	optionCategoryIn: { type: Object, required: true } ,
})

/** Dữ liệu dropdown 
 *  TVTHAI - 08.03.2023
*/
const apiDepot:DepotApi = new DepotApi();
const BaseDepot:Grid = reactive(new Grid(ModuleName.Depot, apiDepot));
BaseDepot.setStateForm(ActionTable.Add);
function AddDepot(item: any){
	props.optionDepotIn.addItem(item);
	product.value.depotID = item.depotID;
	product.value.depotCode = item.depotCode;
	product.value.depotName = item.depotName;
}

/** Dữ liệu dropdown 
 *  TVTHAI - 08.03.2023
*/
const apiOrigin:OriginApi = new OriginApi();
const BaseOrigin:Grid = reactive(new Grid(ModuleName.Origin, apiOrigin));
BaseOrigin.setStateForm(ActionTable.Add);
function AddOrigin(item: any){
	props.optionOriginIn.addItem(item);
	product.value.originID = item.originID;
	product.value.originCode = item.originCode;
	product.value.originName = item.originName;
}

/** Dữ liệu dropdown 
 *  TVTHAI - 08.03.2023
*/
const apiTrademark:TrademarkApi = new TrademarkApi();
const BaseTrademark:Grid = reactive(new Grid(ModuleName.Trademark, apiTrademark));
BaseTrademark.setStateForm(ActionTable.Add);
function AddTrademark(item: any){
	props.optionTrademarkIn.addItem(item);
	product.value.trademarkID = item.trademarkID;
	product.value.trademarkCode = item.trademarkCode;
	product.value.trademarkName = item.trademarkName;
}

/** Dữ liệu dropdown 
 *  TVTHAI - 08.03.2023
*/
const apiCategory:CategoryApi = new CategoryApi();
const BaseCategory:Grid = reactive(new Grid(ModuleName.Category, apiCategory));
BaseCategory.setStateForm(ActionTable.Add);
function AddCategory(item: any){
	props.optionCategoryIn.addItem(item);
	product.value.categoryID = item.categoryID;
	product.value.categoryCode = item.categoryCode;
	product.value.categoryName = item.categoryName;
}

/**
 * Lắng nghe các sự thay đổi bật tắt modal để bật tắt sự kiện
 */
watch(BaseDepot, (newVal: Grid) => {
	if(newVal.isShowModal){
		unListenEvent();
	}
	else{
		listenEvent();
	}
});
watch(BaseOrigin, (newVal: Grid) => {
	if(newVal.isShowModal){
		unListenEvent();
	}
	else{
		listenEvent();
	}
});
watch(BaseTrademark, (newVal: Grid) => {
	if(newVal.isShowModal){
		unListenEvent();
	}
	else{
		listenEvent();
	}
});
watch(BaseCategory, (newVal: Grid) => {
	if(newVal.isShowModal){
		unListenEvent();
	}
	else{
		listenEvent();
	}
});

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
const product = ref<Product>(new Product());
const productComparison = ref<Product>(new Product());

/** 
 * Chuẩn bị dữ liệu trước khi mount
 * TVTHAI - 08.03.2023
 */
onBeforeMount(() => {
  if(props.Base.StateForm === ActionTable.Edit || props.Base.StateForm === ActionTable.Replication){
    product.value = {...props.Base.RecordEdit};
    productComparison.value = {...props.Base.RecordEdit};
  }
  else{
    product.value.productCode = props.Base.RecordCode;
    productComparison.value.productCode = props.Base.RecordCode;
  }
})

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
      props.Base.showNotificationError(messValid, ()=> { props.Base.focusInputError('form_product_in'), listenEvent() });
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
        product.value = new Product();
        productComparison.value = new Product();
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
  await props.Base.apiService.callApi(api, product.value ,async (response: any) => { 
    if (props.Base.StateForm === ActionTable.Add || props.Base.StateForm === ActionTable.Replication){
      props.Base.store.dispatch(`${props.Base.Module}/addRecordAction`, { ...product.value, productID: response });
    }
    else{
      props.Base.store.dispatch(`${props.Base.Module}/editRecordAction`, { ...product.value, productID: response });
      props.Base.setStateForm(ActionTable.Add);
    }
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
    product.value.productCode.trim() === "" ? t('validate.empty', { field: t('module.inventory.productCode') }) : null,
    /** Validate name */
    product.value.productName.trim() === "" ? t('validate.empty', { field: t('module.inventory.productName') }) : null,

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
    if (JSON.stringify(product.value) != JSON.stringify(productComparison.value)) {
      unListenEvent();
      props.Base.showNotificationAction(saveDataAndCloseForm, props.Base.closeModal, t('common.question_data_change'), () => {
        listenEvent();
        handleLoopFocus();
      });
    } else {
      props.Base.closeModal();
    }
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
@import "../../../../assets/css/formRight.css";

::-webkit-scrollbar-track {
	border-radius: 0;
	direction: rtl;
}

::-webkit-scrollbar-thumb {
	border-radius: 0;
	background: #B8BCC3;
}
::-webkit-scrollbar-thumb:hover {
	border-radius: 0;
	background: #808080;
}
::-webkit-scrollbar {
	height: 10px; /* height of horizontal scrollbar ← You're missing this */
	width: 8px;
}
.modal-body {
  width: 800px;
  height: 100%;
  margin: 0;
  left: calc(100%);
  top: 0;
  transform: none;
  padding: 0 16px;
  position: relative;
  transition: all ease 0.15s;
}
</style>