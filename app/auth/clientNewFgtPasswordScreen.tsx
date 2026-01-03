import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
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
import CustomInput from "@/components/global/CustomInput";
import icons from "@/constants/icons";

import useNewPasswordFgtpassword from "@/hooks/useNewPasswordFgtpassword";
import { INewPasswordForgotPasswordPayload } from "@/types/authclient.type";
import useNewFgtPasswordValidation from "@/validations/useNewFgtPasswordValidation";

export default function ClientNewFgtPasswordScreen() {
  // params
  const { email } = useLocalSearchParams() as { email: string };

  // states
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [touchedFields, setTouchedFields] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleBlur = (field: "password" | "confirmPassword") => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  // validation
  const validation = useNewFgtPasswordValidation(password);

  const isConfirmPasswordValid = confirmPassword === password;
  const confirmPasswordError = isConfirmPasswordValid
    ? ""
    : "Les mots de passe ne correspondent pas";

  // mutation
  const { mutate: newPasswordFgtpassword, isPending } =
    useNewPasswordFgtpassword();

  const handleSubmit = () => {
    setTouchedFields({
      password: true,
      confirmPassword: true,
    });

    if (!validation.isPasswordValid || !isConfirmPasswordValid) {
      Alert.alert("Erreur", "Veuillez remplir correctement les champs");
      return;
    }

    const payload: INewPasswordForgotPasswordPayload = {
      email,
      password,
      password_confirmation: confirmPassword,
    };

    newPasswordFgtpassword(payload, {
      onSuccess: (data) => {
        Alert.alert(
          "Succès",
          data?.message ||
            "Mot de passe modifié avec succès, veuillez vous connecter à present"
        );
        router.replace("/auth/clientLoginScreen");
      },
      onError: (error: any) => {
        Alert.alert(
          "Erreur",
          error?.message || "Erreur lors de la mise à jour du mot de passe"
        );
      },
    });
  };

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}>
        <ScrollView
          className="flex-1 bg-white"
          contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
          <Text className="font-raleway-bold text-[30px] mb-10">
            Nouveau mot de passe
          </Text>

          {/* Nouveau mot de passe */}
          <CustomInput
            label="Nouveau mot de passe"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChangeText={setPassword}
            leftIcon={icons.group}
            rightIcon={showPassword ? "eye-off" : "eye"}
            isPassword={!showPassword}
            onRightIconPress={() => setShowPassword((v) => !v)}
            error={touchedFields.password && !validation.isPasswordValid}
            errorMsg={validation.passwordError}
            onBlur={() => handleBlur("password")}
          />

          {/* Confirmation */}
          <CustomInput
            label="Confirmation du mot de passe"
            placeholder="Confirmez le mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            leftIcon={icons.group}
            rightIcon={showConfirmPassword ? "eye-off" : "eye"}
            isPassword={!showConfirmPassword}
            onRightIconPress={() => setShowConfirmPassword((v) => !v)}
            error={touchedFields.confirmPassword && !isConfirmPasswordValid}
            errorMsg={confirmPasswordError}
            onBlur={() => handleBlur("confirmPassword")}
          />

          <View className="my-10">
            <CustomButton
              label={isPending ? "Enregistrement..." : "Enregistrer"}
              onPress={handleSubmit}
              disabled={isPending}
            />
          </View>

          <View className="flex-row justify-center">
            <Text className="text-gray-500 mr-2">
              Vous avez déjà un compte ?
            </Text>
            <TouchableOpacity
              onPress={() => router.replace("/auth/clientLoginScreen")}>
              <Text className="text-primary font-raleway-bold underline">
                Se connecter
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}
