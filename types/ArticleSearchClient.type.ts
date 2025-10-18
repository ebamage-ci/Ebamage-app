import { IArticle } from "./article.type";

export interface IArticleSearchResponseClient {
  success: boolean;
  data: IArticle[];
}

export interface ISuggestion {
  hashid: string;
  libelle: string;
}

export interface ISuggestionResponseClient {
  success: boolean;
  data: ISuggestion[];
}
