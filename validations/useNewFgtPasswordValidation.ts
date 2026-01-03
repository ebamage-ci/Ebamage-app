import * as z from "zod/v4";

const passwordSchema = z
  .string()
  .trim()
  .min(8, "Veuillez entrer un mot de passe d'au moins 8 caractères");

const useNewFgtPasswordValidation = (password: string) => {
  const { success: isPasswordValid, error: passwordError } =
    passwordSchema.safeParse(password);

  return {
    isPasswordValid,
    passwordError: passwordError?.issues[0]?.message,
  };
};

export default useNewFgtPasswordValidation;
