import { IUserSignInClient } from "@/types/authclient.type";
import * as z from "zod/v4";

// schemas
const loginSchema = z
  .string()
  .trim()
  .min(1, "Veuillez entrer votre email ou numéro de téléphone");

const passwordSchema = z
  .string()
  .trim()
  .min(8, "Veuillez entrer un mot de passe d'au moins 8 caractères");

const useSignInValidationClient = (user: IUserSignInClient) => {
  const { login, password_clt } = user;

  const { success: isLoginValid, error: loginError } =
    loginSchema.safeParse(login);

  const { success: isPasswordValid, error: passwordError } =
    passwordSchema.safeParse(password_clt);

  const isUserDatasValid = isLoginValid && isPasswordValid;

  return {
    isLoginValid,
    loginError: loginError?.issues[0].message,

    isPasswordValid,
    passwordError: passwordError?.issues[0].message,
    isUserDatasValid,
  };
};

export default useSignInValidationClient;
