export interface IUserSignUpClient {
  nom_clt: string;
  prenom_clt: string;
  email_clt: string;
  password_clt: string;
  tel_clt: string;
}

export interface IUserSignupResponseClient {
  success: boolean;
  message: string;
  data: {
    nom_clt: string;
    email_clt: string;
    tel_clt: string;
  };
}

export interface IVerifOtpClient {
  code_otp: string;
  email_clt: string;
}

export interface IVerifOtpResponseClient {
  success: boolean;
  message: string;
  data: {
    nom_clt: string;
    email_clt: string;
    tel_clt: string;
    prenom_clt: string;
    solde_tdl: number;
    hashid: string;
  };
  token: string;
}

export interface IUserStorage {
  nom_clt: string;
  email_clt: string;
  tel_clt: string;
  solde_tdl: number;
  hashid_clt: string;
  token: string;
}

export interface IUserSignInClient {
  email_clt: string;
  password_clt: string;
}
