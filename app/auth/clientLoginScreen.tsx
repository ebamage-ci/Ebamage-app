import CustomInput from "@/components/global/CustomInput";
import icons from "@/constants/icons";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PaperProvider } from "react-native-paper";

import { CustomButton } from "@/components/global/CustomButton";
import { useState } from "react";

import { useClientSignIn } from "@/hooks/useClientSignIn";
import useSignInValidationClient from "@/validations/useSignInValidationClient";

import { useAuthClientStore } from "@/stores/useAuthClient.store";
import { router } from "expo-router";

export default function ShopSignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsConnected, setUser } = useAuthClientStore();

  const [isModePassword1, setIsModePassword1] = useState(false);

  const { mutate, isPending } = useClientSignIn();

  // schemas
  const {
    isMailValid,
    mailError,
    isPasswordValid,
    passwordError,
    isUserDatasValid,
  } = useSignInValidationClient({
    email_clt: email,
    password_clt: password,
  });

  // États pour suivre si les champs ont été touchés
  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
  });

  // Fonction pour marquer un champ comme touché
  const handleBlur = (field: string) => {
    setTouchedFields((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleSubmit = () => {
    // Marquer tous les champs comme touchés pour afficher toutes les erreurs
    setTouchedFields({
      email: true,

      password: true,
    });

    //--- invalidation
    if (!isUserDatasValid) {
      Alert.alert(
        "Erreur de soumission",
        "veuillez respecter le format des données",
        [
          {
            text: "Retour",
            style: "cancel",
          },
        ]
      );

      return;
    }

    //--- validation
    const datas = {
      email_clt: email,
      password_clt: password,
    };

    // submit
    mutate(datas, {
      onSuccess: (data) => {
        // console.log("on success");

        // storage store
        setIsConnected(true);
        setUser({
          email_clt: data.data.email_clt,
          hashid_clt: data.data.hashid,
          nom_clt: data.data.nom_clt,
          solde_tdl: data.data.solde_tdl,
          tel_clt: data.data.tel_clt,
          token: data.token,
        });

        // router.replace("/(root-client)/(tabs)");
      },

      onError: (error: any) => {
        // console.log(error);
        Alert.alert(
          "Erreur de connexion ",
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
            paddingTop: 30,
          }}>
          <View className="bg-white h-full  p-4">
            <Text className="font-raleway-bold text-[36px]">Bon retour!</Text>

            {/** inputs form */}
            <View className=" justify-center items-center">
              <View>
                <CustomInput
                  label="Adresse mail"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Votre email"
                  leftIcon={icons.user}
                  error={touchedFields.email && !isMailValid}
                  errorMsg={mailError}
                  onBlur={() => handleBlur("email")}
                />

                <CustomInput
                  label="Mot de passe"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Confirmer le mot de psse"
                  rightIcon={isModePassword1 ? "eye-off" : "eye"}
                  leftIcon={icons.group}
                  isPassword={isModePassword1}
                  onRightIconPress={() => {
                    setIsModePassword1((value) => !value);
                  }}
                  error={touchedFields.password && !isPasswordValid}
                  errorMsg={passwordError}
                  onBlur={() => handleBlur("password")}
                />
              </View>

              {/* <View className="w-full items-end mt-2">
                <TouchableOpacity>
                  <Text className="text-[14px] font-raleway-bold text-primary">
                    mot de passe oublié ?
                  </Text>
                </TouchableOpacity>
              </View> */}
            </View>

            <View className="my-10">
              <CustomButton
                label={isPending ? "Connexion..." : "Se connecter"}
                onPress={handleSubmit}
                disabled={isPending}
              />
            </View>

            <View className="flex-row  flex-wrap">
              <Text className="text-[14px] text-gray-500 font-raleway-regular mr-2">
                Vous n&apos;avez pas de compte ?
              </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-[14px] underline font-raleway-bold text-primary">
                  Inscrivez-vous!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}
