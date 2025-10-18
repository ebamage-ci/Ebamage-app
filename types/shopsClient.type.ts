import { IShop } from "./shop.type";

export interface IShopsResponseClient {
  success: boolean;
  data: IShop[];
}
