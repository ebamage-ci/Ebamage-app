import { IUserSignUpClient } from "@/types/authclient.type";
import * as z from "zod/v4";

// schemas
const emailSchema = z.email("Veuillez entrer un mail valide");
const firstNameSchema = z
  .string()
  .trim()
  .min(2, "Veuillez entrer un nom valide d'au moins 2 caractères")
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le nom ne doit contenir que des lettres");

const lastNameSchema = z
  .string()
  .trim()
  .min(2, "Veuillez entrer un prenom valide d'au moins 2 caractères")
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le prenom ne doit contenir que des lettres");

const phoneSchema = z
  .string()
  .trim()
  .regex(
    /^\d{10}$/,
    "Veuillez entrer un numéro de téléphone valide de 10 chiffres"
  );

const passwordSchema = z
  .string()
  .trim()
  .min(8, "Veuillez entrer un mot de passe d'au moins 8 caractères");

const useSignupValidationClient = (user: IUserSignUpClient) => {
  const { email_clt, nom_clt, prenom_clt, tel_clt, password_clt } = user;

  const { success: isMailValid, error: mailError } =
    emailSchema.safeParse(email_clt);
  const { success: isNameValid, error: nameError } =
    firstNameSchema.safeParse(nom_clt);
  const { success: isLastNameValid, error: lastNameError } =
    lastNameSchema.safeParse(prenom_clt);

  const { success: isPhoneValid, error: phoneError } =
    phoneSchema.safeParse(tel_clt);
  const { success: isPasswordValid, error: passwordError } =
    passwordSchema.safeParse(password_clt);

  const isUserDatasValid =
    isMailValid && isNameValid && isPhoneValid && isPasswordValid;

  return {
    isMailValid,
    mailError: mailError?.issues[0].message,
    isNameValid,
    nameError: nameError?.issues[0].message,
    isLastNameValid,
    lastNameError: lastNameError?.issues[0].message,
    isPhoneValid,
    phoneError: phoneError?.issues[0].message,
    isPasswordValid,
    passwordError: passwordError?.issues[0].message,
    isUserDatasValid,
  };
};

export default useSignupValidationClient;
