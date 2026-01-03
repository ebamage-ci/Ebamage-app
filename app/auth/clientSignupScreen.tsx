import CustomInput from "@/components/global/CustomInput";
import icons from "@/constants/icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { PaperProvider } from "react-native-paper";

import { CustomButton } from "@/components/global/CustomButton";

// useSignup
import { useClientSignUp } from "@/hooks/useClientSignUp";

//
import useSignupValidationClient from "../../validations/useSignupValidationClient";

export default function ClientSignupScreen() {
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // hide/show password

  const [isModePassword1, setIsModePassword1] = useState(false);
  const [isModePassword2, setIsModePassword2] = useState(false);

  // États pour suivre si les champs ont été touchés
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    telephone: false,
    password: false,
    confirmPassword: false,
  });

  // Fonction pour marquer un champ comme touché
  const handleBlur = (field: string) => {
    setTouchedFields((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  // Validation pour confirmPassword
  const isConfirmPasswordValid = confirmPassword === password;
  const confirmPasswordError = !isConfirmPasswordValid
    ? "Les mots de passe ne correspondent pas"
    : "";

  // useSignup
  const { mutate, isPending } = useClientSignUp();

  // validations

  const {
    isMailValid,
    isNameValid,
    isPasswordValid,
    isPhoneValid,
    lastNameError,
    isUserDatasValid,
    mailError,
    nameError,
    passwordError,
    phoneError,
    isLastNameValid,
  } = useSignupValidationClient({
    email_clt: email,
    password_clt: password,
    tel_clt: telephone,
    nom_clt: `${firstName}`,
    prenom_clt: lastName,
  });

  // submitting form
  const handleSubmit = () => {
    // Marquer tous les champs comme touchés pour afficher toutes les erreurs
    setTouchedFields({
      firstName: true,
      lastName: true,
      email: true,
      telephone: true,
      password: true,
      confirmPassword: true,
    });

    //--- invalidation
    if (!isUserDatasValid || !isConfirmPasswordValid) {
      Alert.alert(
        "Erreur de soumission",
        "veuillez respecter le format des données",
        [
          {
            text: "Retour",
            // onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]
      );

      return;
    }

    //--- validation
    const datas = {
      nom_clt: `${firstName}`,
      prenom_clt: lastName,
      email_clt: email,
      password_clt: password,
      tel_clt: telephone,
    };

    // submit
    mutate(datas, {
      onSuccess: (data) => {
        const { email_clt } = data.data;

        // redirect to verif mail screen
        router.push(`/auth/clientOtpScreen?email=${email_clt}`);
      },

      onError: (error: any) => {
        Alert.alert(
          "Erreur d'inscription",
          error?.message || " une erreur s'est produite ",
          [
            {
              text: "Retour",
              style: "cancel",
            },
          ]
        );
      },
    });
  };

  return (
    <PaperProvider
      theme={{
        dark: false,
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}>
        <ScrollView
          className="h-full bg-white"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
          }}>
          <View className="bg-white flex-1 h-full  p-4">
            <Text className="font-raleway-bold text-[36px]">
              Créer votre compte
            </Text>

            {/** inputs form */}
            <View className="flex justify-center items-center">
              <View>
                <CustomInput
                  label="Nom"
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Votre nom"
                  leftIcon={icons.user}
                  error={touchedFields.firstName && !isNameValid}
                  errorMsg={nameError}
                  onBlur={() => handleBlur("firstName")}
                />

                <CustomInput
                  label="Prénoms"
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Votre prénom"
                  leftIcon={icons.user}
                  error={touchedFields.lastName && !isLastNameValid}
                  errorMsg={lastNameError}
                  onBlur={() => handleBlur("lastName")}
                />

                <CustomInput
                  label="Adresse mail"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Votre email"
                  leftIcon={icons.email}
                  error={touchedFields.email && !isMailValid}
                  errorMsg={mailError}
                  onBlur={() => handleBlur("email")}
                  keyboardType="email-address"
                />

                <CustomInput
                  label="Téléphone"
                  value={telephone}
                  onChangeText={setTelephone}
                  placeholder="Votre numéro de téléphone"
                  leftIcon={icons.phone}
                  error={touchedFields.telephone && !isPhoneValid}
                  errorMsg={phoneError}
                  onBlur={() => handleBlur("telephone")}
                  keyboardType="number-pad"
                />

                <CustomInput
                  label="Mot de passe"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Entrez votre mot de passe"
                  rightIcon={isModePassword1 ? "eye-off" : "eye"}
                  leftIcon={icons.group}
                  error={touchedFields.password && !isPasswordValid}
                  errorMsg={passwordError}
                  isPassword={isModePassword1}
                  onRightIconPress={() => {
                    setIsModePassword1((value) => !value);
                  }}
                  onBlur={() => handleBlur("password")}
                />

                <CustomInput
                  label="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirmez votre mot de passe"
                  rightIcon={isModePassword2 ? "eye-off" : "eye"}
                  leftIcon={icons.group}
                  isPassword={isModePassword2}
                  error={
                    touchedFields.confirmPassword && !isConfirmPasswordValid
                  }
                  errorMsg={confirmPasswordError}
                  onRightIconPress={() => {
                    setIsModePassword2((value) => !value);
                  }}
                  onBlur={() => handleBlur("confirmPassword")}
                />
              </View>
            </View>

            <View className="my-10">
              <CustomButton
                label={`${isPending ? "Création..." : "Créer mon compte"}`}
                onPress={handleSubmit}
                disabled={isPending}
              />
            </View>

            {/** */}
            <View className="flex-row justify-center items-center ">
              <Text className="text-[14px] text-gray-500 font-raleway-regular mr-2">
                Vous avez déjà un compte?
              </Text>
              <Link
                href="/auth/clientLoginScreen"
                className="text-[14px] underline font-raleway-bold text-primary">
                Connectez-vous
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}
