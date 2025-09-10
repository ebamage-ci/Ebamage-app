import { IArticle } from "./article.type";

export interface IArticleSearchResponseClient {
  success: boolean;
  data: IArticle[];
}
