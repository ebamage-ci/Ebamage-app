import * as z from "zod/v4";

const emailSchema = z.string().email("Veuillez entrer un mail valide");

const useForgotPasswordValidation = ({ email }: { email: string }) => {
  const { success: isMailValid, error: mailError } =
    emailSchema.safeParse(email);

  return {
    isMailValid,
    mailError: mailError?.issues[0]?.message,
  };
};

export default useForgotPasswordValidation;
