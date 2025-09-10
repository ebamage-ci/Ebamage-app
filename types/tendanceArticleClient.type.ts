import { IArticle } from "./article.type";

export type ITendanceArticleClient = IArticle;

export interface ITendanceArticlesResponseClient {
  data: ITendanceArticleClient[];
  success: boolean;
  message: string;
}
