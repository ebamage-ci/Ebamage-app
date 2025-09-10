import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
const Header = ({
  title,
  shevronLeft = true,
}: {
  title?: string;
  shevronLeft?: boolean;
}) => {
  return (
    <View className="bg-[#F9F9F9] p-5 flex-row  ">
      {/** left */}
      {shevronLeft && (
        <View className="  justify-center">
          <TouchableOpacity
            className=" justify-center  "
            onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}

      {/** center */}
      <View className="  flex-1">
        <Text className="text-center font-raleway-semibold text-[18px]">
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Header;
