export interface IPub {
  id: string;
  imagePub: string;
}

export interface IGetPubResponseClient {
  success: boolean;
  message: string;
  data: IPub[];
}
