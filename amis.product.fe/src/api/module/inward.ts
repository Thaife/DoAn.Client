import { ModuleName } from "@/core/public_api";
import BaseApi from "../base_api";

export default class InwardApi extends BaseApi {
  constructor(){
    super(ModuleName.Inward + 's');
  }
}