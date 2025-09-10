export interface IArticleOrderRequestClient {
  id_panier: string;
  lib_ville: string;
  lib_commune: string;
  quartier: string;
  moyen_de_paiement: 0 | 1;
}

export interface IArticleOrderResponseClient {
  success: boolean;
  message: string;
  hashid: string;
}
