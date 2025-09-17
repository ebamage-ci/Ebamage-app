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

import NotifIcon from "@/assets/svgs/NotifIcon";
import { useAuthClientStore } from "@/stores/useAuthClient.store";

type HeaderResultSearchProps = {
  keyword?: string;
};

const HeaderResultSearch = ({ keyword = "" }: HeaderResultSearchProps) => {
  const { user } = useAuthClientStore();
  const router = useRouter();

  return (
    <View className="bg-[#FDFDFD] p-5">
      <View className="flex-row justify-between items-center">
        {/** left */}
        <Text className="font-raleway-extra-bold text-[20px] text-primary">
          EBAMAGE{" "}
        </Text>

        {/** right */}
        <View className=" justify-center items-center">
          <TouchableOpacity
            className="bg-[#F2F2F2] rounded-full p-2"
            onPress={() => {
              router.push("/(root-client)/(tabs)/cart");
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

      <Pressable onPress={() => router.back()}>
        <View className="mt-10">
          <Searchbar
            placeholder="Rechercher un article..."
            value={keyword}
            iconColor="#797979"
            elevation={0}
            editable={Platform.OS === "android" ? false : true}
            onFocus={() => router.back()}
            inputStyle={{
              color: "#000",
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
            icon={icons.arrow_back}
            onClearIconPress={() => router.back()}
            placeholderTextColor={"#BBBBBB"}
            right={() => null}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default HeaderResultSearch;
