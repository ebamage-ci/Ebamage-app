import * as z from "zod/v4";

export const passwordSchema = z
  .string()
  .trim()
  .min(8, "Veuillez entrer un mot de passe d'au moins 8 caractères");

const usePwdValidation = (oldpwd: string, newpwd: string) => {
  const { success: isOldPasswordValid, error: oldPasswordError } =
    passwordSchema.safeParse(oldpwd);

  const { success: isNewPasswordValid, error: newPasswordError } =
    passwordSchema.safeParse(newpwd);

  const isUserDatasValid = isOldPasswordValid && isNewPasswordValid;

  return {
    isOldPasswordValid,
    oldPasswordError: oldPasswordError?.issues[0]?.message,
    isNewPasswordValid,
    newPasswordError: newPasswordError?.issues[0]?.message,
    isUserDatasValid,
  };
};

export default usePwdValidation;
