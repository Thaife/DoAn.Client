import { ModuleName } from "@/core/public_api";
import BaseApi from "../base_api";

export default class TrademarkApi extends BaseApi {
  constructor(){
    super(ModuleName.Trademark + 's');
  }
}