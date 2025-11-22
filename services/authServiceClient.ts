import apiClient from "@/services/apiClient";
import {
  IUserSignInClient,
  IUserSignUpClient,
  IUserSignupResponseClient,
  IVerifOtpClient,
  IVerifOtpResponseClient,
} from "@/types/authclient.type";
import { parseApiError } from "@/utils/parseApiError";
 

// signup client
export const signupClient = async (
  data: IUserSignUpClient
): Promise<IUserSignupResponseClient> => {
  try {
    const response = await apiClient.post(`/register/client`, {
      email_clt: data.email_clt,
      nom_clt: `${data.nom_clt} ${data.prenom_clt}`,
      // prenom_clt: data.prenom_clt,
      tel_clt: data.tel_clt,
      password_clt: data.password_clt,
    });

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response.data;
  } catch (error: any) {
    throw parseApiError(error);
  }
};

// verif otp client
export const verifOtpClient = async (
  data: IVerifOtpClient
): Promise<IVerifOtpResponseClient> => {
  try {
    const response = await apiClient.post(`/verify/otp/client`, data);

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response?.data;
  } catch (error: any) {
    throw parseApiError(error);
  }
};

//  signin client
export const signinClient = async (
  data: IUserSignInClient
): Promise<IVerifOtpResponseClient> => {
  try {
    const response = await apiClient.post(`/login/client`, data);
    if (!response?.data?.success) {
      throw response?.data;
    }
    return response?.data;
  } catch (error: any) {
    throw parseApiError(error);
  }
};

// resend otp
export const resendOtpClient = async (email: string) => {
  try {
    const response = await apiClient.post(`/resend/otp/client`, {
      email_clt: email,
    });

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response?.data;
  } catch (error: any) {
    throw parseApiError(error);
  }
};
