import apiClient from "@/services/apiClient";
import {
  INewPasswordForgotPasswordPayload,
  IStandardResponse,
  IUserSignInClient,
  IUserSignUpClient,
  IUserSignupResponseClient,
  IVerifOtpClient,
  IVerifOtpForgotPasswordPayload,
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

// logout client
export const logoutClient = async () => {
  try {
    const response = await apiClient.post(`/client/deconnexion`);

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response?.data;
  } catch (error: any) {
    throw parseApiError(error);
  }
};
// delete client account
export const deleteClientAccount = async () => {
  try {
    const response = await apiClient.post(`/client/delete`);

    console.log("delete client account", response?.data);

    if (!response?.data?.success) {
      throw response?.data;
    }

    return response?.data;
  } catch (error: any) {
    throw parseApiError(error);
  }
};

// forgot - password
export const forgotPassword = async (data: {
  email: string;
}): Promise<IStandardResponse> => {
  try {
    const response = await apiClient.post<IStandardResponse>(
      `/demande/reinitialisation/password`,
      data
    );

    // console.log("data ===> ", JSON.stringify(data, null, 2));
    // console.log("response ===> ", JSON.stringify(response.data, null, 2));

    if (!response?.data?.success) {
      throw response?.data;
    }
    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};

// verify otp for forgot password
export const verifyOtpForgotPassword = async (
  verifData: IVerifOtpForgotPasswordPayload
): Promise<IStandardResponse> => {
  try {
    const response = await apiClient.post<IStandardResponse>(
      `/verification/token/password`,
      verifData
    );
    if (!response?.data?.success) {
      throw response?.data;
    }
    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};

// new password for forgot password
export const newPasswordForgotPassword = async (
  newPasswordData: INewPasswordForgotPasswordPayload
): Promise<IStandardResponse> => {
  try {
    const response = await apiClient.post<IStandardResponse>(
      `/reinitialisation/password`,
      newPasswordData
    );
    if (!response?.data?.success) {
      throw response?.data;
    }
    return response.data;
  } catch (error) {
    throw parseApiError(error);
  }
};
