import { ModuleName, TypeFilter, TypeSearch, Header, ComparisonType, IdbDataTable } from "@/core/public_api";

/**
 * Chứa các column nhân viên
 * TVTHAI - 08.03.2023
 */
let columns: Header [] = [
  new Header(
    "avatar",
    "trademark.Avatar",
    'module.inventory.avatar',
    "120",
  ),
  new Header(
    "trademarkCode",
    "trademark.TrademarkCode",
    'module.inventory.trademarkCode',
    "300",
    { typeSearch: TypeSearch.Text, columnSearch: "trademark.TrademarkCode" , typeFilter: TypeFilter.Text, module: ModuleName.Trademark, headerSearch: 'module.inventory.trademarkCode'}
  ),
  new Header(
    "trademarkName",
    "trademark.TrademarkName",
    'module.inventory.trademarkName',
    "400",
    { typeSearch: TypeSearch.Text, columnSearch: "trademark.TrademarkName" , typeFilter: TypeFilter.Text, module: ModuleName.Trademark, headerSearch: 'module.inventory.trademarkName'},
  ),
  new Header(
    "description",
    "trademark.Description",
    'common.description',
    "552",
    { typeSearch: TypeSearch.Text, columnSearch: "trademark.Description" , typeFilter: TypeFilter.Text, module: ModuleName.Trademark, headerSearch: 'common.description',},
  ),
  // new Header(
  //   "isActive",
  //   "trademark.IsActive",
  //   'common.status',
  //   "300",
  //   { typeSearch: TypeSearch.Number, columnSearch: "trademark.IsActive" , typeFilter: TypeFilter.Combobox, data: [
  //     { value: '', header: 'common.all' },
  //     { value: 'true', header: 'common.using' },
  //     { value: 'false', header: 'common.stopUsing' },
  //   ], module: ModuleName.Trademark, headerSearch: 'common.status', comparisonType: ComparisonType.Equal },
  // ),
];

columns.forEach((item: Header, index)=> {
  if(item.Field === 'isActive'){
    columns[index].TypeFormat.IsActive = true;
    return
  }
  else if(item.Field === 'avatar'){
    columns[index].TypeFormat.IsImage = true;
    return
  }
})

/** Kiểm tra dữ liệu column đã được lưu ở indexedDB trước đó chưa */
const dataTable: IdbDataTable = new IdbDataTable(ModuleName.Trademark);
await dataTable.checkAndSetColumns(columns).then((data: Header[]) => { columns = data });

export default columns;