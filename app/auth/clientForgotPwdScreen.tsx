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

import useForgotPassword from "@/hooks/useForgotPassword";
import useForgotPasswordValidation from "@/validations/useForgotPasswordValidation";
import { router } from "expo-router";

export default function ClientForgotPwdScreen() {
  const [email, setEmail] = useState("");

  const { mutate, isPending } = useForgotPassword();

  // schemas
  const { isMailValid, mailError } = useForgotPasswordValidation({
    email,
  });

  // États pour suivre si les champs ont été touchés
  const [touchedFields, setTouchedFields] = useState({
    email: false,
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
    });

    //--- invalidation
    if (!isMailValid) {
      Alert.alert("Erreur d'email", "veuillez entrer un mail correcte", [
        {
          text: "Retour",
          style: "cancel",
        },
      ]);

      return;
    }

    // submit
    mutate(
      {
        email,
      },
      {
        onSuccess: (data) => {
          // go to otp form
          router.push({
            pathname: "/auth/clientVerifOtpFgtPasswordScreen",
            params: {
              email,
            },
          });
        },

        onError: (error: any) => {
          // error
          Alert.alert(
            "Erreur",
            error.message || "Une erreur est survenue, veuillez réessayer."
          );
        },
      }
    );
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
            <Text className="font-raleway-bold text-[36px]">
              Entrez votre mail pour réinitialiser votre mot de passe!
            </Text>

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
                label={isPending ? "Verification..." : "Verifier"}
                onPress={handleSubmit}
                disabled={isPending}
              />
            </View>

            <View className="flex-row  flex-wrap">
              <Text className="text-[14px] text-gray-500 font-raleway-regular mr-2">
                Vous n&apos;avez pas de compte ?
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/auth/clientSignupScreen")}>
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
