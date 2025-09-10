import { images } from "@/constants/Images";
import {
  Image,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Searchbar } from "react-native-paper";

import icons from "@/constants/icons";
import { useRouter } from "expo-router";

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
        <Text className="font-raleway-extra-bold text-[20px]">trucdelate.</Text>

        {/** right */}
        <View className="flex-row gap-3 justify-center items-center">
          <TouchableOpacity activeOpacity={0.7}>
            <View className="bg-primary rounded-3xl  w-[140px] pr-7">
              <Text className="text-white p-1 text-center ">
                {user?.solde_tdl?.toFixed(2)} FCFA
              </Text>

              <View className="p-1 bg-[#007AFF] justify-center items-center rounded-full px-3 absolute right-0  ">
                <Text>+</Text>
              </View>
            </View>
          </TouchableOpacity>

          <Image className="w-10 h-10 rounded-full" source={images.profile} />
        </View>
      </View>

      <Pressable onPress={() => router.back()}>
        <View className="mt-10">
          <Searchbar
            placeholder="Rechercher un article..."
            value={keyword}
            iconColor="#797979"
            elevation={1}
            editable={Platform.OS === "android" ? false : true}
            onFocus={() => router.back()}
            inputStyle={{
              color: "#BBBBBB",
              fontSize: 14,
              fontFamily: "Raleway-Regular",
            }}
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#797979",
              borderWidth: 0.2,
              borderRadius: 6,
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
