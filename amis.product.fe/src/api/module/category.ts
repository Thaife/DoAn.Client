import { ModuleName } from "@/core/public_api";
import BaseApi from "../base_api";

export default class CategoryApi extends BaseApi {
  constructor(){
    super(ModuleName.Category + 's');
  }
}