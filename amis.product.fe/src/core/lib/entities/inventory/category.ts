import { BaseEntity } from "../base_entities";

/**
 * đơn vị
 */
export class Category extends BaseEntity{

  /** ID đơn vị */
  public categoryID: string;

  /** Mã đơn vị */
  public categoryCode: string = '';

  /** Tên đơn vị */
  public categoryName: string = '';

  /** Mô tả */
  public description: string = '';

  /** Trạng thái */
  public isActive: boolean = true;
}
