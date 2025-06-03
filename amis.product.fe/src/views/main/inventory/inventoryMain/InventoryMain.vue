<template>
	<div class="container">
    <div class="container-list_page">
      <div class="major">
        <div class="list_page-title">
          {{ $t('module.inventory.inventory_business') }}
        </div>
        <div class="list-page-content">
          <img src="../../../../assets/css/image/qt_Kho.10b11e5a.svg" alt="">
        </div>
        <div class="list-page-footer">
          <div class="footer-page_list">
            <router-link to="/inventory/depot" class="footer-page_item">
              <div class="footer-page_icon" style="background-position: -1264px -200px;"></div>
              <div class="footer-page_text">
								{{ $t('module.inventory.depot') }}
              </div>
            </router-link>
            <router-link to="/inventory/product" class="footer-page_item">
              <div class="footer-page_icon" style="background-position: -1152px -200px;"></div>
              <div class="footer-page_text">
								{{ $t('module.inventory.inventory_item') }}
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.container{
	padding-left: 24px;
	flex: 1;
}
.container-list_page{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}
.report{
	width: 300px;
	background-color: var(--while__color);
	border: 1px solid #e5e5e5;
	border-radius: 3px;
	height: 460px;
	display: flex;
	flex-direction: column;
	margin-left: 10px;    
}
.major{
	border-radius: 3px;
	height: 460px;
	display: flex;
	flex-direction: column;
}
.major .list_page-title, .major .list-page-content{
	background-color: var(--while__color);
	border: 1px solid #e5e5e5;
}
.major .list_page-title{
	border-bottom: none;
}
.list_page-title{
	border-bottom: solid 1px #e5e5e5;
	font-family: 'notosans-bold';
	font-size: 14px;
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;
	text-transform: uppercase;
	height: 40px;
}
.major .list-page-content{
	height: 340px;
	vertical-align: middle;
}
.report .list-page-content ul li{
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 16px 0;
	border-bottom: 1px solid #e5e5e5;
	height: 74px;
}
.report .list-page-content ul li::before{
	content: "\2022";
	color: #646464;
	font-size: 24px;
	margin-right: 12px;
}
.report .list-page-content ul li:last-child{
	border-bottom: none;
}
.report .list-page-content ul{
	padding: 0 16px;
	border-bottom: 1px solid #e5e5e5;
}
.report .list-page-footer{
	cursor: pointer;
	height: 44px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #0075c0;
}
.footer-page_list{
	display: flex;
	background-color: #fff;
	border: 1px solid #e5e5e5;
	border-radius: 3px;
	margin-top: 10px;
	height: 70px;
}
.footer-page_item{
	border-right: 1px solid #e5e5e5;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
	justify-content: center;
	color: var(--text__color);
}
.footer-page_item:hover{
	box-shadow: 0 3px 6px rgb(0, 0, 0, .25);
}
.footer-page_item:last-child{
	border-right: none;
}
.footer-page_icon{
	background: var(--url__icon) no-repeat;
	width: 24px;
	height: 24px;
}
.footer-page_text{
	text-align: center;
}
</style>