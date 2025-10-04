import {
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Searchbar } from "react-native-paper";

import icons from "@/constants/icons";
import { useRouter } from "expo-router";
import { useState } from "react";

import NotifIcon from "@/assets/svgs/NotifIcon";
// import { useAuthClientStore } from "@/stores/useAuthClient.store";

const HeaderIndex = () => {
  // const { user } = useAuthClientStore();

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <View className="bg-[#FDFDFD] p-5">
      <View className="flex-row justify-between items-center">
        {/** left */}
        <Text className="font-raleway-extra-bold text-[20px] text-primary">
          EBAMAGE
        </Text>

        {/** right */}
        <View className=" justify-center items-center">
          <TouchableOpacity
            className="bg-[#F2F2F2] rounded-full p-2"
            onPress={() => {
              router.push("/extends/NotificationsScreen");
            }}>
            <NotifIcon
              width={24}
              height={24}
              stroke={"#108036"}
              fill={"#108036"}
            />
          </TouchableOpacity>
        </View>
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
              fontFamily: "Raleway-Regular",
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
