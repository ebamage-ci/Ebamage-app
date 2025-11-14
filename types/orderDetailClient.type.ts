import { variation } from "./articlesCartClient.type";

type articleOrder = {
  hashid: string;
  nom_article: string;
  prix: number;
  quantite: number;
  image: string;
  description: string;
  variations: variation[];
  boutique: {
    hashid_btq: string;
    nom_btq: string;
  };
};

export interface IOrderDetailResponseClient {
  success: boolean;
  message: string;
  hashid: string;
  moyen_de_paiement: string;
  statut: string;
  localisation: {
    commune: string;
    ville: string;
    quartier: string;
  };
  prix_total_articles: number;
  livraison: number;
  prix_total_commande: number;
  articles: articleOrder[];
  created_at: string;
  code_commande: string;
}
