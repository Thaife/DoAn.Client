import { BaseEntity } from "../base_entities";

/**
 * đơn vị
 */
export class Coupon extends BaseEntity{

  /** ID đơn vị */
  public couponID: string;

  /** Mã đơn vị */
  public couponCode: string = '';

  /** Tên đơn vị */
  public couponName: string = '';

  /** Mô tả */
  public description: string = '';

  public percent?: number = undefined;

  public quantity?: number = undefined;

  public dateStart?: Date;

  public dateEnd?: Date;

  /** Trạng thái */
  public isActive: boolean = true;
}
