import { ModuleName, TypeFilter, TypeSearch, Header, ComparisonType, IdbDataTable } from "@/core/public_api";

/**
 * Chứa các column nhân viên
 * TVTHAI - 08.03.2023
 */
let columns: Header [] = [
  new Header(
    "inwardName",
    "inward.InwardName",
    'module.inward.inwardName',
    "250",
    { typeSearch: TypeSearch.Text, columnSearch: "inward.InwardName" , typeFilter: TypeFilter.Text, module: ModuleName.Depot, headerSearch: 'module.inward.inwardName'}
  ),
  new Header(
    "description",
    "inward.Description",
    'module.inward.description',
    "400",
    { typeSearch: TypeSearch.Text, columnSearch: "inward.Description" , typeFilter: TypeFilter.Text, module: ModuleName.Depot, headerSearch: 'module.inward.description'},
  ),
  new Header(
    "depotName",
    "depot.DepotName as DepotName",
    'module.inward.depotName',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "inward.DepotName" , typeFilter: TypeFilter.Text, module: ModuleName.Depot, headerSearch: 'module.inward.depotName',},
  ),
  new Header(
    "isApproveText",
    "inward.IsApprove",
    'module.inward.isApprove',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "inward.IsApprove" , typeFilter: TypeFilter.Text, module: ModuleName.Depot, headerSearch: 'module.inward.isApprove',},
  ),
  new Header(
    "createdDate",
    "inward.isApprove",
    'module.inward.CreatedDate',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "inward.CreatedDate" , typeFilter: TypeFilter.Text, module: ModuleName.Depot, headerSearch: 'module.inward.CreatedDate',},
  ),
  new Header(
    "createdBy",
    "employee.EmployeeName as CreatedBy",
    'module.inward.CreatedBy',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "inward.CreatedBy" , typeFilter: TypeFilter.Text, module: ModuleName.Depot, headerSearch: 'module.inward.CreatedBy',},
  ),
  new Header(
    "createdDate",
    "inward.CreatedDate",
    'module.inward.CreatedDate',
    "200",
    { typeSearch: TypeSearch.Text, columnSearch: "inward.CreatedDate" , typeFilter: TypeFilter.Text, module: ModuleName.Depot, headerSearch: 'module.inward.CreatedDate',},
  ),
];

columns.forEach((item: Header, index)=> {
  // if(item.Field === 'quantity'){
  //   columns[index].TypeFormat.Input = true;
  // }
})


/** Kiểm tra dữ liệu column đã được lưu ở indexedDB trước đó chưa */
const dataTable: IdbDataTable = new IdbDataTable(ModuleName.Inward);
await dataTable.checkAndSetColumns(columns).then((data: Header[]) => { columns = data });

export default columns;