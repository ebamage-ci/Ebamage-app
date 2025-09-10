export interface IArticle {
  hashid: string;
  nom_article: string;
  description: string;
  image: string;
  prix: number;
  old_price?: number;
}
