import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants/Images";
// type ArticleItemProps = {
//   article: {
//     title: string;
//     description: string;
//     image: ImageSourcePropType;
//     price: number;
//     oldPrice: number;
//     discount: number;
//   };
// };

const RecommendationItem = () => {
  // const { title, description, image, price, oldPrice, discount } = article;
  return (
    <TouchableOpacity className="w-[170px] h-[241px]" activeOpacity={0.8}>
      <View className="rounded-md bg-white" style={styles.itemShadow}>
        <Image
          source={images.shoesarticle}
          className="rounded-md w-[170px] h-[124px]"
        />
        <View className="p-2 w-full ">
          <Text className="text-[12px] font-raleway-medium ">
            Article Random
          </Text>
          <Text className="font-raleway text-[10px] text-gray-600 mt-1">
            Neque porro quisquam est qui dolorem ipsum quia
          </Text>
          <Text className="font-raleway-medium text-[12px]  mt-1">XX FCFA</Text>
          <View className="flex-row items-center gap-x-2 mt-1">
            <Text className="font-raleway-light text-[12px] text-gray-400 line-through">
              XX FCFA
            </Text>
            <Text className="font-raleway text-[10px] text-primary-300">
              -40%
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default RecommendationItem;
