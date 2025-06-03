import { BaseEntity } from "../base_entities";

/**
 * đơn vị
 */
export class Trademark extends BaseEntity{

  /** ID đơn vị */
  public trademarkID: string;

  /** Mã đơn vị */
  public trademarkCode: string = '';

  /** Tên đơn vị */
  public trademarkName: string = '';

  /** Mô tả */
  public description: string = '';

  /**  Hình ảnh */
  public avatar: string = ''  ;

  /** Trạng thái */
  public isActive: boolean = true;
}
