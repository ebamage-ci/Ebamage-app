export type variation = {
  nom_variation: string;
  lib_variation: string;
};

export type articleItemCart = {
  nom_article: string;
  quantite: number;
  prix_unitaire: number;
  image: string;
  variations: variation[];
  prix_avec_quantite: number;
  hashid_panier_item: string;
};

// ajout article
export interface IAddArticleRequestClient {
  id_article: string;
  variations: variation[];
}

export interface IAddArticleResponseClient {
  id_panier: string;
  success: boolean;
  message: string;
  cart: articleItemCart[];
  prix_total: number;
}

// get articles cart
export interface IListCartResponseClient {
  id_panier: string;
  success: boolean;
  message: string;
  cart: articleItemCart[];
  prix_total: number;
}

// increment quantity of article cart
export interface IIncrementArticleCartRequestClient {
  hashid_panier_item: string;
}

export interface IIncrementArticleCartResponseClient {
  id_panier: string;
  success: boolean;
  message: string;
  cart: articleItemCart[];
  prix_total: number;
}

// decrement quantity of article cart

export interface IDecrementArticleCartRequestClient {
  hashid_panier_item: string;
}

export interface IDecrementArticleCartResponseClient {
  id_panier: string;
  success: boolean;
  message: string;
  cart: articleItemCart[];
  prix_total: number;
}

// delete article from cart
export interface IDeleteArticleCartRequestClient {
  hashid_panier_item: string;
}

export interface IDeleteArticleCartResponseClient {
  id_panier: string;
  success: boolean;
  message: string;
  cart: articleItemCart[];
  prix_total: number;
}
