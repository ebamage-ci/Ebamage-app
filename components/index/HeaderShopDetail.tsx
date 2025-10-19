import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type HeaderShopDetailProps = {
  keyword?: string;
};

const HeaderShopDetail = ({
  keyword = "Détail boutique",
}: HeaderShopDetailProps) => {
  return (
    <View className="bg-[#F9F9F9] p-5">
      <View className="flex-row justify-between items-center">
        {/** left */}
        <View className="flex-row justify-center items-center gap-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="font-raleway-semibold text-[20px]">{keyword}</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderShopDetail;
