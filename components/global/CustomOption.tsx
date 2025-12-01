import { ILocationCity } from "@/types/location.type";
import { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type CustomOptionProps = {
  item: ILocationCity;
  onPress: (emplacement: ILocationCity) => void;
  isSelected: boolean;
};

function CustomOption({ item, onPress, isSelected }: CustomOptionProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      className="flex-row items-center gap-3 px-4 py-3 rounded-[12px] bg-white ">
      <View className="w-6 h-6 rounded-full border border-[#D3D5DA] justify-center items-center">
        {isSelected && <View className="w-4 h-4 rounded-full bg-primary-500" />}
      </View>
      <Text className="text-[14px] font-raleway-medium text-black">
        {item.lib_ville}
      </Text>
    </TouchableOpacity>
  );
}

export default memo(CustomOption, (prev, next) => {
  return (
    prev.isSelected === next.isSelected &&
    prev.item.hashid === next.item.hashid &&
    prev.item.lib_ville === next.item.lib_ville
  );
});
