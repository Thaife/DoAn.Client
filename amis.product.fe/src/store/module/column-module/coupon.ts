import { ModuleName, TypeFilter, TypeSearch, Header, ComparisonType, IdbDataTable } from "@/core/public_api";

/**
 * Chứa các column nhân viên
 * TVTHAI - 08.03.2023
 */
let columns: Header [] = [
  new Header(
    "couponCode",
    "coupon.CouponCode",
    'module.order.couponCode',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "coupon.CouponCode" , typeFilter: TypeFilter.Text, module: ModuleName.Coupon, headerSearch: 'module.order.couponCode'}
  ),
  new Header(
    "couponName",
    "coupon.CouponName",
    'module.order.couponName',
    "300",
    { typeSearch: TypeSearch.Text, columnSearch: "coupon.CouponName" , typeFilter: TypeFilter.Text, module: ModuleName.Coupon, headerSearch: 'module.order.couponName'},
  ),
  new Header(
    "dateStart",
    "coupon.DateStart",
    'module.order.dateStart',
    "200",
    { typeSearch: TypeSearch.Date, columnSearch: "coupon.DateStart" , typeFilter: TypeFilter.Date, module: ModuleName.Coupon, headerSearch: 'module.order.dateStart'},
  ),
  new Header(
    "dateEnd",
    "coupon.DateEnd",
    'module.order.dateEnd',
    "200",
    { typeSearch: TypeSearch.Date, columnSearch: "coupon.DateEnd" , typeFilter: TypeFilter.Date, module: ModuleName.Coupon, headerSearch: 'module.order.dateEnd'},
  ),
  new Header(
    "percent",
    "coupon.Percent",
    'module.order.percent',
    "350",
    { typeSearch: TypeSearch.Number, columnSearch: "coupon.Percent" , typeFilter: TypeFilter.Number, module: ModuleName.Coupon, headerSearch: 'module.order.percent',},
  ),
  new Header(
    "quantity",
    "coupon.Quantity",
    'module.order.quantity',
    "350",
    { typeSearch: TypeSearch.Number, columnSearch: "coupon.Quantity" , typeFilter: TypeFilter.Number, module: ModuleName.Coupon, headerSearch: 'module.order.quantity',},
  ),
  new Header(
    "description",
    "coupon.Description",
    'common.description',
    "350",
    { typeSearch: TypeSearch.Text, columnSearch: "coupon.Description" , typeFilter: TypeFilter.Text, module: ModuleName.Coupon, headerSearch: 'common.description',},
  ),
  // new Header(
  //   "isActive",
  //   "coupon.IsActive",
  //   'common.status',
  //   "300",
  //   { typeSearch: TypeSearch.Number, columnSearch: "coupon.IsActive" , typeFilter: TypeFilter.Combobox, data: [
  //     { value: '', header: 'common.all' },
  //     { value: 'true', header: 'common.using' },
  //     { value: 'false', header: 'common.stopUsing' },
  //   ], module: ModuleName.Coupon, headerSearch: 'common.status', comparisonType: ComparisonType.Equal },
  // ),
];

columns.forEach((item: Header, index)=> {
  if(item.Field === 'isActive'){
    columns[index].TypeFormat.IsActive = true;
  }
  else if(item.Field === 'dateStart'){
    columns[index].TypeFormat.TextAlign = "center";
    columns[index].TypeFormat.FormatDate = true;
  }
  else if(item.Field === 'dateEnd'){
    columns[index].TypeFormat.TextAlign = "center";
    columns[index].TypeFormat.FormatDate = true;
  }
})

/** Kiểm tra dữ liệu column đã được lưu ở indexedDB trước đó chưa */
const dataTable: IdbDataTable = new IdbDataTable(ModuleName.Coupon);
await dataTable.checkAndSetColumns(columns).then((data: Header[]) => { columns = data });

export default columns;