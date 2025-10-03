export interface INotif {
  hashid: string;
  title: string;
  body: string;
  type: string;
  created_at: string;
}

export interface INotifsResponseClient {
  success: boolean;
  message: string;
  data: INotif[];
}

export interface INotifUpdateClient {
  hashid: string;
  deviceToken: string;
}
