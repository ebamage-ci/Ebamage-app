import { IUserSignInClient } from "@/types/authclient.type";
import * as z from "zod/v4";

// schemas
const emailSchema = z.email("Veuillez entrer un mail valide");

const passwordSchema = z
  .string()
  .trim()
  .min(8, "Veuillez entrer un mot de passe d'au moins 8 caractères");

const useSignInValidationClient = (user: IUserSignInClient) => {
  const { email_clt, password_clt } = user;

  const { success: isMailValid, error: mailError } =
    emailSchema.safeParse(email_clt);

  const { success: isPasswordValid, error: passwordError } =
    passwordSchema.safeParse(password_clt);

  const isUserDatasValid = isMailValid && isPasswordValid;

  return {
    isMailValid,
    mailError: mailError?.issues[0].message,

    isPasswordValid,
    passwordError: passwordError?.issues[0].message,
    isUserDatasValid,
  };
};

export default useSignInValidationClient;
