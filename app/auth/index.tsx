import { Text, View } from "react-native";

import { CustomButton } from "@/components/global/CustomButton";
import { useRouter } from "expo-router";

export default function SignupMainScreen() {
  const router = useRouter();

  const clickSignupClient = () => {
    router.push("/auth/clientSignupScreen");
  };

  const clickSignupShop = () => {
    router.push("/auth/shopSignupScreen");
  };

  return (
    <View className="bg-white h-full items-center justify-center p-2">
      <Text className="font-raleway-extra-bold text-[45px] leading-[43px]">
        trucdelate.
      </Text>

      <Text className=" text-center pt-12 font-raleway-bold text-[36px] leading-[43px]">
        Créez un compte{" "}
      </Text>

      <View className="flex gap-8 justify-center items-center my-8 w-full px-4">
        <CustomButton
          label="Créer un compte client"
          onPress={clickSignupClient}
        />
        {/* <CustomButton
          label="Créer un compte boutique"
          onPress={clickSignupShop}
        /> */}
      </View>
    </View>
  );
}
