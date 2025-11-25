import { IArticle } from "./article.type";

export type IRecommandedArticleClient = IArticle;

export interface IRecommandedArticlesResponseClient {
  data: IRecommandedArticleClient[];
  success: boolean;
  message: string;
  pagination: {
    total: number;
    current_page: number;
  };
}
