import { ModuleName, TypeFilter, TypeSearch, Header, ComparisonType, IdbDataTable } from "@/core/public_api";

/**
 * Chứa các column nhân viên
 * Khắc Tiềm - 08.03.2023
 */
let columns: Header [] = [
  new Header(
    "categoryCode",
    "category.CategoryCode",
    'module.inventory.categoryCode',
    "300",
    { typeSearch: TypeSearch.Text, columnSearch: "category.CategoryCode" , typeFilter: TypeFilter.Text, module: ModuleName.Category, headerSearch: 'module.inventory.categoryCode'}
  ),
  new Header(
    "categoryName",
    "category.CategoryName",
    'module.inventory.categoryName',
    "400",
    { typeSearch: TypeSearch.Text, columnSearch: "category.CategoryName" , typeFilter: TypeFilter.Text, module: ModuleName.Category, headerSearch: 'module.inventory.categoryName'},
  ),
  new Header(
    "description",
    "category.Description",
    'common.description',
    "552",
    { typeSearch: TypeSearch.Text, columnSearch: "category.Description" , typeFilter: TypeFilter.Text, module: ModuleName.Category, headerSearch: 'common.description',},
  ),
  // new Header(
  //   "isActive",
  //   "category.IsActive",
  //   'common.status',
  //   "300",
  //   { typeSearch: TypeSearch.Number, columnSearch: "category.IsActive" , typeFilter: TypeFilter.Combobox, data: [
  //     { value: '', header: 'common.all' },
  //     { value: 'true', header: 'common.using' },
  //     { value: 'false', header: 'common.stopUsing' },
  //   ], module: ModuleName.Category, headerSearch: 'common.status', comparisonType: ComparisonType.Equal },
  // ),
];

columns.forEach((item: Header, index)=> {
  if(item.Field === 'isActive'){
    columns[index].TypeFormat.IsActive = true;
    return
  }
})

/** Kiểm tra dữ liệu column đã được lưu ở indexedDB trước đó chưa */
const dataTable: IdbDataTable = new IdbDataTable(ModuleName.Category);
await dataTable.checkAndSetColumns(columns).then((data: Header[]) => { columns = data });

export default columns;