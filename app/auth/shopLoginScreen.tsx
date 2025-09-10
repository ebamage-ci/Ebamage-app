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

  const [password, setPassword] = useState("");

  const [isModePassword1, setIsModePassword1] = useState(false);

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
          <View className="bg-white flex-1 h-screen  p-4">
            <Text className="font-raleway-bold text-[36px]">Bon retour!</Text>

            {/** inputs form */}
            <View className="flex justify-center items-center">
              <View>
                <CustomInput
                  label="Adresse mail"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Votre email"
                  leftIcon={icons.user}
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
              </View>

              <View className="w-full items-end mt-2">
                <TouchableOpacity>
                  <Text className="text-[14px] font-raleway-bold text-primary">
                    mot de passe oublié ?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="my-10">
              <CustomButton label="Se connecter" onPress={() => {}} />
            </View>

            <View className="flex-row  flex-wrap">
              <Text className="text-[14px] text-gray-500 font-raleway-regular mr-2">
                Vous n&apos;avez pas de compte ?
              </Text>
              <TouchableOpacity>
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
