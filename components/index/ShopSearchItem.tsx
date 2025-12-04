// ShopSearchItem.tsx
import { images } from "@/constants/Images";
import { IShop } from "@/types/shop.type";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";

type ShopSearchItemProps = {
  item: IShop;
};

const ShopSearchItem = ({ item }: ShopSearchItemProps) => {
  const { nom_btq, image_btq } = item;
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      className="items-center bg-white rounded-lg p-3 m-2 shadow-sm border border-gray-100 w-43 h-43"
      onPress={() => {
        // console.log(item);

        router.push({
          pathname: "/(root-client)/extends/ShopDetailsScreen",
          params: {
            keyword: nom_btq,
            id: item?.hashid,
            image: image_btq,
            description: item?.description_btq,
          },
        });
      }}>
      <Image
        className="w-20 h-20 rounded-md mb-2"
        source={image_btq ? { uri: image_btq } : images.shop}
        resizeMode="cover"
      />
      <Text
        className="text-center text-sm font-raleway-semibold text-gray-800"
        numberOfLines={2}
        ellipsizeMode="tail">
        {nom_btq}
      </Text>
    </TouchableOpacity>
  );
};

export default ShopSearchItem;
