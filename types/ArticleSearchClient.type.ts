import { IArticle } from "./article.type";
import { IShop } from "./shop.type";

export interface IArticleSearchResponseClient {
  success: boolean;
  data: {
    articles: IArticle[];
    boutiques: IShop[];
  };
}

export interface ISuggestion {
  hashid: string;
  libelle: string;
}

export interface ISuggestionResponseClient {
  success: boolean;
  data: ISuggestion[];
}
