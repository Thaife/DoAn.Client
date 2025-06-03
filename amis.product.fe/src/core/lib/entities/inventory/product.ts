import { Gender } from "@/core/public_api";
import { BaseEntity } from "../base_entities";

/**
 * product
 */
export class Product extends BaseEntity{

  /** ID product */
  public productID: string;

  /** Mã product */
  public productCode: string = '';

  /** Tên product */
  public productName: string = '';

  /** ID product */
  public depotID?: string = undefined ;

  /** Mã product */
  public depotCode: string = '';

  /** Tên product */
  public depotName: string = '';

  /** ID product */
  public categoryID?: string = undefined ;

  /** Mã product */
  public categoryCode: string = '';

  /** Tên product */
  public categoryName: string = '';

  /** ID product */
  public originID?: string = undefined ;

  /** Mã product */
  public originCode: string = '';

  /** Tên product */
  public originName: string = '';

  /** ID product */
  public trademarkID?: string = undefined ;

  /** Mã product */
  public trademarkCode: string = '';

  /** Tên product */
  public trademarkName: string = '';

  /** Mô tả */
  public description: string = '';

  /**  Giá*/
  public price?:number = undefined ;

  /** Giới tính */
  public gender: Gender = Gender.Male;

  /** Mô tả */
  public material: string = '';

  /** Mô tả */
  public batteryLife: string = '';

  /**  Giá*/
  public visit?:number = undefined ;
  
  /**  Thời hạn bảo hành */
  public warrantyPeriod: string = ''  ;

  /**  Hình ảnh */
  public avatar: string = ''  ;

  /** Trạng thái */
  public isActive: boolean = true;
}
