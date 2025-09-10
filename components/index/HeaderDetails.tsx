import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
const HeaderDetails = () => {
  return (
    <View className="bg-[#F9F9F9] p-5">
      <View className="flex-row justify-between items-center">
        {/** left */}
        <View className="flex-row justify-center items-center gap-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="font-raleway-semibold text-[20px]">Détails</Text>
        </View>

        {/** right */}
        <View className=" justify-center items-center">
          <TouchableOpacity
            className="bg-[#F2F2F2] rounded-full p-2"
            onPress={() => {
              router.push("/(root-client)/(tabs)/cart");
            }}>
            <MaterialCommunityIcons
              name="cart-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeaderDetails;
