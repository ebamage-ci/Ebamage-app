import { images } from "@/constants/Images";
import { IArticle } from "@/types/article.type";
import { getDiscount } from "@/utils/getDiscount";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MatchArticleWordItem = ({ article }: { article: IArticle }) => {
  const { description, image, nom_article, prix, hashid, old_price } = article;

  const onArticleClickHandle = () => {
    router.push(`/extends/ArticleDetailsScreen?id=${hashid}`);
  };

  return (
    <TouchableOpacity
      className="w-full  "
      activeOpacity={0.8}
      onPress={onArticleClickHandle}>
      <View className="rounded-md bg-white" style={styles.itemShadow}>
        <Image
          source={image ? { uri: image } : images.shoesarticle}
          className="rounded-md w-full h-[124px] overflow-hidden"
        />
        <View className="p-2 w-full">
          <Text
            className="text-[12px] font-raleway-medium"
            numberOfLines={2}
            ellipsizeMode="tail">
            {nom_article}
          </Text>
          <Text
            className="font-raleway text-[10px] text-gray-600 mt-1"
            numberOfLines={1}
            ellipsizeMode="tail">
            {description}
          </Text>
          <Text className="font-raleway-medium text-[12px] mt-1">
            {prix} FCFA
          </Text>

          {old_price && (
            <View className="flex-row items-center gap-x-2 mt-1 h-[16px]">
              <Text className="font-raleway-light text-[12px] text-gray-400 line-through">
                {old_price} FCFA
              </Text>
              <Text className="font-raleway text-[10px] text-primary-300">
                {-getDiscount(prix, old_price)}%
              </Text>
            </View>
          )}
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
    height: 241,
    marginBottom: 16,
  },
});

export default MatchArticleWordItem;
