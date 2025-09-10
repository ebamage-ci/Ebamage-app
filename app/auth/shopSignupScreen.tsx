import CustomInput from "@/components/global/CustomInput";
import icons from "@/constants/icons";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PaperProvider } from "react-native-paper";

import { useState } from "react";

import { CustomButton } from "@/components/global/CustomButton";

export default function ShopSignupScreen() {
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [shopName, setShopName] = useState("");

  const [isModePassword1, setIsModePassword1] = useState(false);
  const [isModePassword2, setIsModePassword2] = useState(false);

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
          className="flex-1 bg-white"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
          }}>
          <View className="flex-1 p-4">
            <Text className="font-raleway-bold text-[36px]">
              Créer votre compte
            </Text>

            {/** inputs form */}
            <View className="flex justify-center items-center">
              <View>
                <CustomInput
                  label="Nom de la boutique"
                  value={shopName}
                  onChangeText={setShopName}
                  placeholder="Boutique"
                  leftIcon={icons.shop}
                />

                <CustomInput
                  label="Adresse mail"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Votre email"
                  leftIcon={icons.user}
                />

                <CustomInput
                  label="Téléphone"
                  value={telephone}
                  onChangeText={setTelephone}
                  placeholder="Votre numéro de téléphone"
                  leftIcon={icons.phone}
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
                />

                <CustomInput
                  label="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Votre numéro de téléphone"
                  rightIcon={isModePassword2 ? "eye-off" : "eye"}
                  leftIcon={icons.group}
                  isPassword={isModePassword2}
                  onRightIconPress={() => {
                    setIsModePassword2((value) => !value);
                  }}
                />
              </View>
            </View>

            <View className="my-10">
              <CustomButton label="Créer mon compte" onPress={() => {}} />
            </View>

            <View className="flex-row justify-center items-center ">
              <Text className="text-[14px] text-gray-500 font-raleway-regular mr-2">
                Vous avez déjà un compte?
              </Text>
              <TouchableOpacity>
                <Text className="text-[14px] underline font-raleway-bold text-primary">
                  Connectez-vous
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}
