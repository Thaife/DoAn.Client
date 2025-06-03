import { BaseEntity } from './../base_entities';
import { Product } from "../inventory/product";

export class Cart extends BaseEntity {
  public cartDetail: CartDetail [] = [];
}

export class CartDetail extends Product {
  public cartDetailID: string = '';
  public currentUser: string = '';
  public quantity: number = 1;
}