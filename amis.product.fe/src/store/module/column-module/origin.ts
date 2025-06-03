import { ModuleName, TypeFilter, TypeSearch, Header, ComparisonType, IdbDataTable } from "@/core/public_api";

/**
 * Chứa các column nhân viên
 * Khắc Tiềm - 08.03.2023
 */
let columns: Header [] = [
  new Header(
    "originCode",
    "origin.OriginCode",
    'module.inventory.originCode',
    "300",
    { typeSearch: TypeSearch.Text, columnSearch: "origin.OriginCode" , typeFilter: TypeFilter.Text, module: ModuleName.Origin, headerSearch: 'module.inventory.originCode'}
  ),
  new Header(
    "originName",
    "origin.OriginName",
    'module.inventory.originName',
    "400",
    { typeSearch: TypeSearch.Text, columnSearch: "origin.OriginName" , typeFilter: TypeFilter.Text, module: ModuleName.Origin, headerSearch: 'module.inventory.originName'},
  ),
  new Header(
    "description",
    "origin.Description",
    'common.description',
    "552",
    { typeSearch: TypeSearch.Text, columnSearch: "origin.Description" , typeFilter: TypeFilter.Text, module: ModuleName.Origin, headerSearch: 'common.description',},
  ),
  // new Header(
  //   "isActive",
  //   "origin.IsActive",
  //   'common.status',
  //   "300",
  //   { typeSearch: TypeSearch.Number, columnSearch: "origin.IsActive" , typeFilter: TypeFilter.Combobox, data: [
  //     { value: '', header: 'common.all' },
  //     { value: 'true', header: 'common.using' },
  //     { value: 'false', header: 'common.stopUsing' },
  //   ], module: ModuleName.Origin, headerSearch: 'common.status', comparisonType: ComparisonType.Equal },
  // ),
];

columns.forEach((item: Header, index)=> {
  if(item.Field === 'isActive'){
    columns[index].TypeFormat.IsActive = true;
    return
  }
})

/** Kiểm tra dữ liệu column đã được lưu ở indexedDB trước đó chưa */
const dataTable: IdbDataTable = new IdbDataTable(ModuleName.Origin);
await dataTable.checkAndSetColumns(columns).then((data: Header[]) => { columns = data });

export default columns;