export interface ITownsCityResponseClient {
  data: {
    hashid: number;
    lib_commune: string;
  }[];
  success: boolean;
  message: string;
}
