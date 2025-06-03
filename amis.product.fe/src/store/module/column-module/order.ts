import { ModuleName, TypeFilter, TypeSearch, Header, ComparisonType, IdbDataTable, StatusOrder, TypeCheckout } from "@/core/public_api";

/**
 * Chứa các column nhân viên
 * Khắc Tiềm - 08.03.2023
 */
let columns: Header [] = [
  new Header(
    "userName",
    "order.UserName",
    'module.order.userName',
    "300",
    { typeSearch: TypeSearch.Text, columnSearch: "order.UserName" , typeFilter: TypeFilter.Text, module: ModuleName.Cart, headerSearch: 'module.order.userName'}
  ),
  new Header(
    "phoneNumber",
    "order.PhoneNumber",
    'module.order.phoneNumber',
    "300",
    { typeSearch: TypeSearch.Text, columnSearch: "order.PhoneNumber" , typeFilter: TypeFilter.Text, module: ModuleName.Cart, headerSearch: 'module.order.phoneNumber'}
  ),
  new Header(
    "email",
    "order.Email",
    'module.order.email',
    "300",
    { typeSearch: TypeSearch.Text, columnSearch: "order.Email" , typeFilter: TypeFilter.Text, module: ModuleName.Cart, headerSearch: 'module.order.email'}
  ),
  new Header(
    "province",
    "order.Province",
    'module.order.province',
    "300",
    { typeSearch: TypeSearch.Text, columnSearch: "order.Province" , typeFilter: TypeFilter.Text, module: ModuleName.Cart, headerSearch: 'module.order.province'}
  ),
  new Header(
    "district",
    "order.District",
    'module.order.district',
    "300",
    { typeSearch: TypeSearch.Text, columnSearch: "order.District" , typeFilter: TypeFilter.Text, module: ModuleName.Cart, headerSearch: 'module.order.district'}
  ),
  new Header(
    "ward",
    "order.Ward",
    'module.order.ward',
    "300",
    { typeSearch: TypeSearch.Text, columnSearch: "order.Ward" , typeFilter: TypeFilter.Text, module: ModuleName.Cart, headerSearch: 'module.order.ward'}
  ),
  new Header(
    "address",
    "order.Address",
    'module.order.address',
    "300",
    { typeSearch: TypeSearch.Text, columnSearch: "order.Address" , typeFilter: TypeFilter.Text, module: ModuleName.Cart, headerSearch: 'module.order.address'}
  ),
  new Header(
    "description",
    "order.Description",
    'module.order.description',
    "300",
    { typeSearch: TypeSearch.Text, columnSearch: "order.Description" , typeFilter: TypeFilter.Text, module: ModuleName.Cart, headerSearch: 'module.order.description'}
  ),
  new Header(
    "typeCheckout",
    "order.TypeCheckout",
    'module.order.typeCheckout',
    "300",
    { typeSearch: TypeSearch.Number, columnSearch: "order.TypeCheckout" , typeFilter: TypeFilter.Combobox, data: [
      { value: '', header: 'common.all' },
      { value: TypeCheckout.Live, header: 'module.order.Live' },
      { value: TypeCheckout.Check, header: 'module.order.Check' },
    ], module: ModuleName.Cart, headerSearch: 'module.order.typeCheckout', comparisonType: ComparisonType.Equal },
  ),
  new Header(
    "status",
    "order.Status",
    'common.status',
    "300",
    { typeSearch: TypeSearch.Number, columnSearch: "order.Status" , typeFilter: TypeFilter.Combobox, data: [
      { value: '', header: 'common.all' },
      { value: StatusOrder.WaitConfirm, header: 'module.order.WaitConfirm' },
      { value: StatusOrder.Confirm, header: 'module.order.Confirm' },
      { value: StatusOrder.Delivery, header: 'module.order.Delivery' },
      { value: StatusOrder.Delivered, header: 'module.order.Delivered' },
      { value: StatusOrder.Destroy, header: 'module.order.Destroy' },
    ], module: ModuleName.Cart, headerSearch: 'common.status', comparisonType: ComparisonType.Equal },
  ),
];

columns.forEach((item: Header, index)=> {
  if(item.Field === 'typeCheckout'){
    columns[index].TypeFormat.TypeCheckout = true;
  }
  if(item.Field === 'status'){
    columns[index].TypeFormat.Status = true;
  }
})

/** Kiểm tra dữ liệu column đã được lưu ở indexedDB trước đó chưa */
const dataTable: IdbDataTable = new IdbDataTable(ModuleName.Cart);
await dataTable.checkAndSetColumns(columns).then((data: Header[]) => { columns = data });

export default columns;