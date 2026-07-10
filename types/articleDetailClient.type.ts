import { IArticle } from "./article.type";

export type Variation = {
  nom_variation: string;
  lib_variation: string[];
};

// type InforArticle = {
//   hashid: string;
//   nom_article: string;
//   description: string;
//   images: string[];
//   prix: number;
//   old_price?: number;
//   nom_btq: string;
// };

export interface IArticleDetailResponseClient {
  success: boolean;
  data: {
    hashid: string;
    nom_article: string;
    description: string;
    images: string[];
    prix: number;
    old_price?: number;
    nom_btq: string;
    variations: Variation[];
    sharelink?: string;
    stock: number;
  };

  communs: IArticle[];
  similaires: IArticle[];
}
