import { images } from "@/constants/Images";
import { Category } from "@/types/categoryClient.type";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";

type CategoryItemProps = {
  item: Category;
};

const CategoryItem = ({ item }: CategoryItemProps) => {
  const { nom_categorie, image_categorie } = item;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      className="flex gap-3 justify-center items-center  "
      onPress={() => {
        router.push(
          `/(root-client)/extends/ArticlesCategoryScreen?keyword=${nom_categorie}`
        );
      }}>
      <Image
        className="w-14 h-14 rounded-full border-[0.5px] border-primary-200"
        source={image_categorie ? { uri: image_categorie } : images.shoes}
        // source={images.shoes}
      />
      <Text
        className="font-raleway  text-[10px] text-center"
        numberOfLines={2}
        ellipsizeMode="tail">
        {nom_categorie}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;
