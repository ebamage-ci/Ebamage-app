export interface IPub {
  id: string;
  image_pub: string;
}

export interface IGetPubResponseClient {
  success: boolean;
  message: string;
  data: IPub[];
}
