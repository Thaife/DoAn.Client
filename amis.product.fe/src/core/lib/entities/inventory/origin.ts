import { BaseEntity } from "../base_entities";

/**
 * đơn vị
 */
export class Origin extends BaseEntity{

  /** ID đơn vị */
  public originID: string;

  /** Mã đơn vị */
  public originCode: string = '';

  /** Tên đơn vị */
  public originName: string = '';

  /** Mô tả */
  public description: string = '';

  /** Trạng thái */
  public isActive: boolean = true;
}
