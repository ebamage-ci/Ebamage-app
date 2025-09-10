import { Platform, Pressable, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";

import icons from "@/constants/icons";
import { useRouter } from "expo-router";
import { useState } from "react";

import { useAuthClientStore } from "@/stores/useAuthClient.store";

const HeaderIndex = () => {
  const { user } = useAuthClientStore();

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <View className="bg-[#FDFDFD] p-5">
      <View className="flex-row justify-center items-center">
        {/** left */}
        <Text className="font-raleway-extra-bold text-[20px] text-primary">
          EBAMAGE{" "}
        </Text>
      </View>

      <Pressable
        onPress={() =>
          router.push("/(root-client)/extends/global/SearchScreen")
        }>
        <View className="mt-10">
          <Searchbar
            placeholder="Saisissez un article..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            iconColor="#797979"
            elevation={0}
            editable={Platform.OS === "android" ? false : true}
            onFocus={() =>
              router.push("/(root-client)/extends/global/SearchScreen")
            }
            inputStyle={{
              color: "#BBBBBB",
              fontSize: 14,
              fontFamily: "Montserrat-Regular",
            }}
            style={{
              backgroundColor: "#F8F8F8",
              borderColor: "#707070",
              borderWidth: 0.2,
              borderRadius: 20,
            }}
            clearIcon={icons.cancel}
            placeholderTextColor={"#BBBBBB"}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default HeaderIndex;
