import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { images } from "@/constants/Images";
import { ITendanceArticleClient } from "@/types/tendanceArticleClient.type";
import { getDiscount } from "@/utils/getDiscount";
import { router } from "expo-router";
type TendanceItemProps = {
  article: ITendanceArticleClient;
};

const TendanceItem = ({ article }: TendanceItemProps) => {
  const { hashid, image, nom_article, prix, old_price } = article;

  const onArticleClickHandle = () => {
    router.push(`/extends/ArticleDetailsScreen?id=${hashid}`);
  };

  return (
    <TouchableOpacity
      className="w-[142px] "
      activeOpacity={0.8}
      onPress={onArticleClickHandle}>
      <View
        className="rounded-md bg-white overflow-hidden "
        style={styles.itemShadow}>
        <Image
          source={image ? { uri: image } : images.watch}
          className="rounded-[4px] w-[142px] h-[100px]"
        />

        {/** Bottom */}
        <View className="p-2 w-full h-[100px]">
          <Text
            className="text-[12px] font-raleway "
            numberOfLines={2}
            ellipsizeMode="tail">
            {nom_article}
          </Text>

          <Text className="font-raleway-medium text-[12px]  mt-1">
            {prix} FCFA
          </Text>
          <View className="flex-row items-center gap-x-2 mt-1 h-[15px]">
            {old_price && (
              <>
                <Text className="font-raleway-light text-[12px] text-gray-400 line-through">
                  {old_price} FCFA
                </Text>
                <Text className="font-raleway text-[10px] text-primary-300">
                  {-getDiscount(prix, old_price)}%
                </Text>
              </>
            )}
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

export default TendanceItem;
