import { ModuleName } from "@/core/public_api";
import BaseApi from "../base_api";

export default class OriginApi extends BaseApi {
  constructor(){
    super(ModuleName.Origin + 's');
  }
}