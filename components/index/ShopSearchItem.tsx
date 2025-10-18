// ShopSearchItem.tsx
import { images } from "@/constants/Images";
import { IShop } from "@/types/shop.type";
import { Image, Text, TouchableOpacity } from "react-native";

type ShopSearchItemProps = {
  item: IShop;
};

const ShopSearchItem = ({ item }: ShopSearchItemProps) => {
  const { nom_btq, image_btq } = item;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      className="items-center bg-white rounded-lg p-3 m-2 shadow-sm border border-gray-100 w-43 h-43"
      onPress={() => {
        console.log(item);
      }}>
      <Image
        className="w-20 h-20 rounded-md mb-2"
        source={image_btq ? { uri: image_btq } : images.shop}
        resizeMode="cover"
      />
      <Text
        className="text-center text-sm font-raleway-semibold text-gray-800"
        numberOfLines={2}>
        {nom_btq}
      </Text>
    </TouchableOpacity>
  );
};

export default ShopSearchItem;
