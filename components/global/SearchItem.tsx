import { ISuggestion } from "@/types/ArticleSearchClient.type";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity } from "react-native";

type SearchItemProps = {
  item: ISuggestion;

  onPress: (item?: ISuggestion) => void;
};

const SearchItem = ({ item, onPress }: SearchItemProps) => {
  const { libelle } = item;
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      className="flex-row w-full items-center   my-3  bg-[#F2F2F2] rounded-full p-2"
      activeOpacity={0.4}>
      {/* <Image source={icons.search} className="w-[20px] h-[20px] mr-4" /> */}
      <Ionicons
        name="search-outline"
        size={20}
        color="black"
        className="mr-4"
      />
      <Text className="font-semibold font-raleway">{libelle}</Text>
    </TouchableOpacity>
  );
};

export default SearchItem;
