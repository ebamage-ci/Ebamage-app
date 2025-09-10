export interface Category {
  hashid: string;
  nom_categorie: string;
  image_categorie?: string;
}

export interface ICategoriesResponseClient {
  data: Category[];
  success: boolean;
  message: string;
}
