export interface IOrder {
  hashid: string;
  created_at: string;
  nombre_articles: number;
  prix_total_articles: number;
  prix_total: number;
  quantite: number;
  statut: string;
  code_commande: string;
}

export interface IOrdersResponseClient {
  success: boolean;
  message: string;
  data: IOrder[];
}
