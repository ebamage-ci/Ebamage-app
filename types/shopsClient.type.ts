import { IArticle } from "./article.type";
import { IShop } from "./shop.type";

export interface IShopsResponseClient {
  success: boolean;
  data: IShop[];
}

export interface IArticlesShopResponseClient {
  success: boolean;
  data: IArticle[];
  share_link?: string;
}
