<template>
	<div class="background">
		<div class="container-login">
			<form @submit.prevent="handleLogin()" class="form form_employee_in">
				<div class="form-header">
					<div class="modal-title">
						<h2>{{ $t('page.login') }}</h2>
					</div>
				</div>
				<div class="form-container">
					<div class="form-item_input">
						<div class="form-group">
							<base-input
								:focus="true"
								:required="true"
								:type="'text'"
								:maxLength="20"
								:messageValid="$t('validate.empty', { field: $t('module.cash.employeeCode') })"
								:label="$t('module.cash.employeeCode')" 
								v-model="employee.employeeCode"
								:class="{ 'is-valid': isValid && employee.employeeCode == '' }"
								ref="inputFocus"
							></base-input>
						</div>
					</div>
					<div class="form-item_input">
						<div class="form-group pass">
							<base-input
								:required="true"
								:type="typePass"
								:maxLength="255"
								:messageValid="$t('validate.empty', { field: $t('module.cash.password') })"
								:label="$t('module.cash.password')"
								v-model="employee.password"
								:class="{ 'is-valid': isValid && employee.password == '' }"
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
						<div style="width: 100%;" class="form-action_item">
							<button style="width: 100%;" type="submit" class="btn btn-success">
								{{ $t('page.login') }}
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>
  
<script lang="ts" setup>
import EmployeeApi from '@/api/module/employee';
import { Employee, EntitySystem, Grid, ModuleName, StorageService } from '@/core/public_api';
import { onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';
/**
 * Khai báo các api của module
 * Khắc Tiềm 13-03-2023
 */
 const api:EmployeeApi = new EmployeeApi();

const { t } = useI18n();

const employee = ref<Employee>(new Employee());
const typePass = ref('password');

onBeforeMount(() => {
const user = JSON.parse(StorageService.getItemWithSystemConstants(EntitySystem.CurrentUser));
  if(user){
    window.location.href = '/';
  }
});

/**
 * Lưu trạng thái hiển thị validate
 * NK Tiềm 08.03.2023
 */
const isValid = ref(false);
const Base = new Grid(ModuleName.Employee, api);
 
function handleLogin(){
	/** Kiểm tra validate */
	const messValid = validateInput();
	if (messValid.length > 0) {
		isValid.value = true;
		Base.showNotificationError(messValid, ()=> { Base.focusInputError('form_employee_in') });
	}
	else{
		Base.apiService.callApi(api.login, employee.value ,async (response: Employee) => {
			await StorageService.setItemWithSystemConstants(EntitySystem.CurrentUser, JSON.stringify(response));
			window.location.href = '/';
		},false);
	}
}

	/** 
 * Hàm validate input
 * Khắc Tiềm - 08.03.2023
 */
function validateInput() {
  return [
    employee.value.employeeCode.trim() === "" ? t('validate.empty', { field: t('module.cash.employeeCode') }) : null,
    employee.value.password.trim() === "" ? t('validate.empty', { field: t('module.cash.password') }) : null,
  ].filter((item) => { if(item){ return true; } });
}
</script>

<style scoped>
.background{
	height: 100vh;
	width: 100%;
	background: url('../../assets/css/image/bg2.jpg') center no-repeat;
}
.container-login{
	position: relative;
}
.modal-title h2{
	padding: 10px 32px;
}
.form{
	position: absolute;
	top: calc(100% + 200px);
	left: 50%;
	transform: translateX(-50%);
	background-color: var(--while__color);
	padding-bottom: 30px;
	border-radius: 4px;

}
.form-container {
  padding: 0 32px;
}
.form-action {
  margin-top: 10px;
  padding: 0 32px;
}
.form-detail {
  padding-bottom: 12px;
}
.form-item {
  width: 50%;
}
.form-item + .form-item {
  padding-left: 26px;
}
.form-group {
  padding-bottom: 12px;
  width: 100%;
}
.form-group label {
  font-family: "notosans-semibold";
  margin-bottom: 4px;
  display: block;
  white-space: nowrap;
}
.form-group label span {
  font-family: "notosans-regular";
}
label.required::after {
  content: "*";
  color: red;
  margin-left: 3px;
}
.form-item_input {
  display: flex;
}
.form-item_input .form-group + .form-group {
  padding-left: 6px;
}
.ms-small {
  width: 40%;
}
.ms-big {
  flex: 1;
}
.form-item.flex-center {
  width: 100%;
}
.form-item.flex-center + .form-item.flex-center {
  padding: 0;
}
.form-item.flex-center .form-group {
  width: 25%;
}
.form-item.flex-center .form-group + .form-group {
  padding-left: 6px;
}
.form-action_container {
  display: flex;
  align-items: center;
	justify-content: center;
}
/* Phần modal thông báo */
.modal-notification_container {
  width: 444px;
  left: calc(50vw - 222px);
}
.modal-notification_content {
  padding: 32px;
}
.modal-notification_body {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.modal-notification_icon {
  background: var(--url__icon) no-repeat;
  width: 48px;
  height: 48px;
}
.modal-notification_mess {
  flex: 1;
  padding-left: 16px;
}
.modal-notification_icon.icon-error {
  background-position: -24px -954px;
}
.modal-notification_icon.icon-wanning {
  background-position: -592px -456px;
}
.modal-notification_icon.icon-question {
  background-position: -826px -456px;
}
.mess-line_notification {
  height: 0.1px;
  background: #b8bcc3;
  margin-bottom: 20px;
}
.modal-notification_action {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.modal-notification_action-item .btn + .btn {
  margin-left: 5px;
}
.input-radio_item {
  display: flex;
  padding-top: 5px;
}
label{
  font-size: 12px;
	font-family: "notosans-semibold";
	margin-bottom: 4px;
	display: block;
	white-space: nowrap;
}
.base-radio_item{
  margin-top: 10px;
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
	background: url('../../assets/css/image/icon-hide-pass.svg') center no-repeat;
}
.eye.text{
	background: url('../../assets/css/image/icon-show-pass.svg') center no-repeat;
}
</style>