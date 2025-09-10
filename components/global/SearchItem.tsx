import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity } from "react-native";

type SearchItemProps = {
  item: {
    id: number;
    title: string;
  };

  onPress: (item?: any) => void;
};

const SearchItem = ({ item, onPress }: SearchItemProps) => {
  const { title } = item;
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row w-full items-center   my-3"
      activeOpacity={0.4}>
      {/* <Image source={icons.search} className="w-[20px] h-[20px] mr-4" /> */}
      <Ionicons
        name="search-outline"
        size={20}
        color="black"
        className="mr-4"
      />
      <Text className="font-semibold font-raleway">{title}</Text>
    </TouchableOpacity>
  );
};

export default SearchItem;
