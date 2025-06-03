<template>
<div class="modal-body form_change_password">
  <div class="form">
    <div class="form-header">
      <div class="modal-title">
        <h2>
          {{ $t('login.change_password') }}
        </h2>
      </div>
      <div class="modal-close">
        <div @click="close();" class="modal-icon modal-icon_close" :content="$t('common.close') + ' ESC'"
        ></div>
      </div>
    </div>
    <div class="form-container">
      <div class="form-item_input">
        <div class="form-group pass">
          <base-input
            :required="true"
            :type="typePass"
            :focus="true"
            :maxLength="255"
            :messageValid="$t('validate.empty', { field: $t('module.cash.password') })"
            :label="$t('module.cash.password')"
            v-model="employee.password"
            :class="{ 'is-valid': isValid && (!employee.password || employee.password == '') }"
          ></base-input>
          <i class="eye" :class="typePass" @click="() => {
            if(typePass === 'password'){
              typePass = 'text';
            }
            else{
              typePass = 'password';
            }
          }"></i>
        </div>
      </div>
      <div class="form-item_input">
        <div class="form-group pass">
          <base-input
            :required="true"
            :type="typePass"
            :maxLength="255"
            :messageValid="$t('validate.empty', { field: $t('module.cash.password_new') })"
            :label="$t('module.cash.password_new')"
            v-model="employee.passwordNew"
            :class="{ 'is-valid': isValid && (!employee.passwordNew || employee.passwordNew == '') }"
          ></base-input>
          <i class="eye" :class="typePass" @click="() => {
            if(typePass === 'password'){
              typePass = 'text';
            }
            else{
              typePass = 'password';
            }
          }"></i>
        </div>
      </div>
      <div class="form-item_input">
        <div class="form-group pass">
          <base-input
            :required="true"
            :type="typePass"
            :maxLength="255"
            :messageValid="$t('validate.empty', { field: $t('module.cash.password_confirm') })"
            :label="$t('module.cash.password_confirm')"
            v-model="employee.passwordAccess"
            :class="{ 'is-valid': isValid && (!employee.passwordAccess || employee.passwordAccess == '' )}"
          ></base-input>
          <i class="eye" :class="typePass" @click="() => {
            if(typePass === 'password'){
              typePass = 'text';
            }
            else{
              typePass = 'password';
            }
          }"></i>
        </div>
      </div>
    </div>
    <div class="form-action">
      <div class="form-action_container">
        <div class="form-action_item">
          <button @click="save()" class="btn btn-success modal-icon btn-form_cat" :content="$t('common.add_form') + ' (Ctrl + S)'">
            {{ $t('common.add_form') }}
          </button>
        </div>
        <div class="form-action_item">
          <button @click="close();" class="btn" :content="$t('common.cancel_form')">
            {{ $t('common.cancel_form') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
  
<script setup lang="ts">
import EmployeeApi from '@/api/module/employee';
import { ENotificationType, Employee, EntitySystem, Grid, KeyCode, ModuleName, StorageService } from '@/core/public_api';
import { onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
/**
 * Khai báo các api của module
 * Khắc Tiềm 13-03-2023
 */
const api:EmployeeApi = new EmployeeApi();
const { t } = useI18n();
const props = defineProps({
  close: {type: Function , required: true },
})
const employee = ref<Employee>(JSON.parse(StorageService.getItemWithSystemConstants(EntitySystem.CurrentUser)));
const typePass = ref('password');
const isValid = ref(false);
const Base = new Grid(ModuleName.Employee, api);
  /**
 * Hàm xử lý đóng
 * Khắc Tiềm 19.09.2022
 */
const handleEventKey = function (event: any) {
  Base.handleEventFormCtrlShiftS(event, props.close, null, save, null, save, null)
};
function save(){
  /** Kiểm tra validate */
	const messValid = validateInput();
	if (messValid.length > 0) {
		isValid.value = true;
		Base.showNotificationError(messValid, ()=> { Base.focusInputError('form_change_password') });
	}
	else{
    Base.apiService.callApi(api.changePassword, employee.value ,() => {
      Base.addNotification(ENotificationType.Success, `${t(`login.change_password_success`)}`);
      props.close();
		},false);
	}
}
	/** 
 * Hàm validate input
 * Khắc Tiềm - 08.03.2023
 */
 function validateInput() {
  return [
    !employee.value.password || employee.value.password === "" ? t('validate.empty', { field: t('module.cash.password') }) : null,
    !employee.value.passwordNew || employee.value.passwordNew === "" ? t('validate.empty', { field: t('module.cash.password_new') }) : null,
    !employee.value.passwordAccess || employee.value.passwordAccess === "" ? t('validate.empty', { field: t('module.cash.password_confirm') }) : null,
    employee.value.passwordAccess != employee.value.passwordNew ? t('login.not_access_password') : null,
  ].filter((item) => { if(item){ return true; } });
}
onMounted(() => {
  window.addEventListener("keydown", handleEventKey);
  window.addEventListener("keyup", Base.handleEventInterruptFormCtrlShiftS);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleEventKey);
  window.addEventListener("keyup", Base.handleEventInterruptFormCtrlShiftS);
});
</script>

<style scoped>
.form_change_password {
  max-width: 500px !important;
  width: 500px !important;
  left: calc(50vw - 250px) !important;
  height: 350px;
}

.modal-title {
  padding: 20px 12px 6px 32px !important;
}
.pass{
	position: relative;
}
.eye{
	display: block;
	width: 16px;
	height: 16px;
	position: absolute;
	top: 55%;
	cursor: pointer;
	transform: translateY(-50%);
	right: 8px;
}
.eye.password{
	background: url('../assets/css/image/icon-hide-pass.svg') center no-repeat;
}
.eye.text{
	background: url('../assets/css/image/icon-show-pass.svg') center no-repeat;
}
</style>