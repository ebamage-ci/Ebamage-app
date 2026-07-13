import { Image } from "expo-image";
import { Text, View } from "react-native";

import { CustomButton } from "@/components/global/CustomButton";
import icons from "@/constants/icons";
import { useRouter } from "expo-router";

export default function SignupMainScreen() {
  const router = useRouter();

  const clickSignupClient = () => {
    router.push("/auth/clientSignupScreen");
  };

  // const clickSignupShop = () => {
  //   router.push("/auth/shopSignupScreen");
  // };

  return (
    <View className="bg-white h-full items-center justify-center p-2">
      <Image
        source={icons.iconlogo}
        style={{ width: 200, height: 200 }}
        contentFit="contain"
      />

      <Text className=" text-center pt-12 font-raleway-bold text-[36px] ">
        Bienvenue
      </Text>

      <View className="flex gap-8 justify-center items-center my-8 w-full px-4">
        <CustomButton
          label="Créer un compte client"
          onPress={clickSignupClient}
        />
        <CustomButton
          label="Continuer en tant que visiteur"
          className="bg-primary-300"
          onPress={() => router.push("/(root-client)/(tabs)")}
        />
      </View>
    </View>
  );
}
