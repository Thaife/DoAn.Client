import { BaseEntity } from "../base_entities";

/**
 * Nhập kho
 */
export class Inward extends BaseEntity{

  public inwardID: string;

  public inwardName: string = '';

  public depotID: string;

  public depotCode: string = '';

  public depotName: string = '';

  public description: string = '';

  public isApprove: number
  public isApproveText: string = '';

  public inwardDetail: InwardDetail[] = [];

}

export class InwardDetail{

  public inwardDetailID: string;
  public inwardID: string;
  public productID: string = '';

  public productCode: string;

  public productName: string = '';

  public quantity: number;

  public price: number;


}

