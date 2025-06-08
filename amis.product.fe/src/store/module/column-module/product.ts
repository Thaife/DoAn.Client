import { ModuleName, TypeFilter, TypeSearch, Header, ComparisonType, IdbDataTable, Gender } from "@/core/public_api";

/**
 * Chứa các column nhân viên
 * TVTHAI - 08.03.2023
 */
let columns: Header [] = [
  new Header(
    "avatar",
    "product.Avatar",
    'module.inventory.avatar',
    "120",
  ),
  new Header(
    "productCode",
    "product.ProductCode",
    'module.inventory.productCode',
    "300",
    { typeSearch: TypeSearch.Text, columnSearch: "product.ProductCode" , typeFilter: TypeFilter.Text, module: ModuleName.Product, headerSearch: 'module.inventory.productCode'}
  ),
  new Header(
    "productName",
    "product.ProductName",
    'module.inventory.productName',
    "400",
    { typeSearch: TypeSearch.Text, columnSearch: "product.ProductName" , typeFilter: TypeFilter.Text, module: ModuleName.Product, headerSearch: 'module.inventory.productName'},
  ),
  // new Header(
  //   "gender",
  //   "product.Gender",
  //   'common.gender',
  //   "120",
  //   { typeSearch: TypeSearch.Number, columnSearch: "product.Gender" , typeFilter: TypeFilter.Combobox, module: ModuleName.Product, headerSearch: 'common.gender', data: [
  //     { value: '', header: 'common.all' },
  //     { value: Gender.Male, header: 'gender.male' },
  //     { value: Gender.Female, header: 'gender.female' },
  //   ], comparisonType: ComparisonType.Equal },
  // ),
  new Header(
    "material",
    "product.Material",
    'module.inventory.material',
    "250",
    { typeSearch: TypeSearch.Text, columnSearch: "product.Material" , typeFilter: TypeFilter.Text, module: ModuleName.Product, headerSearch: 'module.inventory.material',},
  ),
  new Header(
    "batteryLife",
    "product.BatteryLife",
    'module.inventory.batteryLife',
    "250",
    { typeSearch: TypeSearch.Text, columnSearch: "product.BatteryLife" , typeFilter: TypeFilter.Text, module: ModuleName.Product, headerSearch: 'module.inventory.batteryLife',},
  ),
  new Header(
    "depotCode",
    "depot.DepotCode",
    'module.inventory.depotCode',
    "150",
    { typeSearch: TypeSearch.Text, columnSearch: "depot.DepotCode" , typeFilter: TypeFilter.Text, module: ModuleName.Product, headerSearch: 'module.inventory.depotCode'}
  ),
  new Header(
    "depotName",
    "depot.DepotName",
    'module.inventory.depotName',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "depot.DepotName" , typeFilter: TypeFilter.Text, module: ModuleName.Product, headerSearch: 'module.inventory.depotName'},
  ),
  new Header(
    "categoryCode",
    "category.CategoryCode",
    'module.inventory.categoryCode',
    "150",
    { typeSearch: TypeSearch.Text, columnSearch: "category.CategoryCode" , typeFilter: TypeFilter.Text, module: ModuleName.Product, headerSearch: 'module.inventory.categoryCode'}
  ),
  new Header(
    "categoryName",
    "category.CategoryName",
    'module.inventory.categoryName',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "category.CategoryName" , typeFilter: TypeFilter.Text, module: ModuleName.Product, headerSearch: 'module.inventory.categoryName'},
  ),
  new Header(
    "originCode",
    "origin.OriginCode",
    'module.inventory.originCode',
    "150",
    { typeSearch: TypeSearch.Text, columnSearch: "origin.OriginCode" , typeFilter: TypeFilter.Text, module: ModuleName.Product, headerSearch: 'module.inventory.originCode'}
  ),
  new Header(
    "originName",
    "origin.OriginName",
    'module.inventory.originName',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "origin.OriginName" , typeFilter: TypeFilter.Text, module: ModuleName.Product, headerSearch: 'module.inventory.originName'},
  ),
  new Header(
    "trademarkCode",
    "trademark.TrademarkCode",
    'module.inventory.trademarkCode',
    "150",
    { typeSearch: TypeSearch.Text, columnSearch: "trademark.TrademarkCode" , typeFilter: TypeFilter.Text, module: ModuleName.Product, headerSearch: 'module.inventory.trademarkCode'}
  ),
  new Header(
    "trademarkName",
    "trademark.TrademarkName",
    'module.inventory.trademarkName',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "trademark.TrademarkName" , typeFilter: TypeFilter.Text, module: ModuleName.Product, headerSearch: 'module.inventory.trademarkName'},
  ),
  new Header(
    "price",
    "product.Price",
    'module.inventory.price',
    "200",
    { typeSearch: TypeSearch.Number, columnSearch: "product.Price" , typeFilter: TypeFilter.Number, module: ModuleName.Product, headerSearch: 'module.inventory.price'},
  ),
  new Header(
    "purchasePrice",
    "product.PurchasePrice",
    'module.inventory.purchasePrice',
    "200",
    { typeSearch: TypeSearch.Number, columnSearch: "product.PurchasePrice" , typeFilter: TypeFilter.Number, module: ModuleName.Product, headerSearch: 'module.inventory.purchasePrice'},
  ),
  new Header(
    "quantity",
    "product.Quantity",
    'module.inventory.quantity',
    "200",
    { typeSearch: TypeSearch.Number, columnSearch: "product.Quantity" , typeFilter: TypeFilter.Number, module: ModuleName.Product, headerSearch: 'module.inventory.quantity'},
  ),
  new Header(
    "warrantyPeriod",
    "product.WarrantyPeriod",
    'module.inventory.warrantyPeriod',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "product.WarrantyPeriod" , typeFilter: TypeFilter.Text, module: ModuleName.Product, headerSearch: 'module.inventory.warrantyPeriod'},
  ),
  // new Header(
  //   "isActive",
  //   "product.IsActive",
  //   'common.status',
  //   "300",
  //   { typeSearch: TypeSearch.Number, columnSearch: "product.IsActive" , typeFilter: TypeFilter.Combobox, data: [
  //     { value: '', header: 'common.all' },
  //     { value: 'true', header: 'common.using' },
  //     { value: 'false', header: 'common.stopUsing' },
  //   ], module: ModuleName.Product, headerSearch: 'common.status', comparisonType: ComparisonType.Equal },
  // ),
];

columns.forEach((item: Header, index)=> {
  if(item.Field === 'gender'){
    columns[index].TypeFormat.IsGender = true;
  }
  else if(item.Field === 'isActive'){
    columns[index].TypeFormat.IsActive = true;
    return
  }
  else if(item.Field === 'avatar'){
    columns[index].TypeFormat.IsImage = true;
    return
  }
  else if(item.Field === 'price'){
    columns[index].TypeFormat.FractionSize = true;
    columns[index].TypeFormat.TextAlign = 'right';
    return
  }
  else if(item.Field === 'description'){
    columns[index].TypeFormat.HTML = true;
    return
  }
})

/** Kiểm tra dữ liệu column đã được lưu ở indexedDB trước đó chưa */
const dataTable: IdbDataTable = new IdbDataTable(ModuleName.Product);
await dataTable.checkAndSetColumns(columns).then((data: Header[]) => { columns = data });

export default columns;