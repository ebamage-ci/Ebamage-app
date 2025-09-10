import Octicons from "@expo/vector-icons/Octicons";
import { Text, View } from "react-native";

const PlaceShop = ({ name }: { name: string }) => {
  return (
    <View className="max-w-[255px] flex-row items-center justify-center border border-black rounded p-1 bg-white overflow-hidden">
      <View className="w-[16px] h-[16px] justify-center items-center">
        <Octicons name="location" size={16} color="black" />
      </View>
      <Text
        className="font-raleway-medium ml-2 max-w-[220px]"
        numberOfLines={1}
        ellipsizeMode="tail">
        {name}
      </Text>
    </View>
  );
};

export default PlaceShop;
