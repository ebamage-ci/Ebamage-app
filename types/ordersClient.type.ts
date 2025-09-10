export interface IOrder {
  hashid: string;
  created_at: string;
  nombre_articles: number;
}

export interface IOrdersResponseClient {
  success: boolean;
  message: string;
  data: IOrder[];
}
