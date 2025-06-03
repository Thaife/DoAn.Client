import { ModuleName } from "@/core/public_api";
import BaseApi from "../base_api";

export default class CouponApi extends BaseApi {
  constructor(){
    super(ModuleName.Coupon + 's');
  }
}