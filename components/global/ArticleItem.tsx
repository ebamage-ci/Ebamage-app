// import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// import { images } from "@/constants/Images";
// import { IRecommandedArticleClient } from "@/types/recommandedArticleClient.type";
// import { getDiscount } from "@/utils/getDiscount";
// import { router } from "expo-router";

// const ArticleItem = ({ article }: { article: IRecommandedArticleClient }) => {
//   const { description, image, nom_article, prix, old_price, hashid } = article;

//   const onArticleClickHandle = () => {
//     router.push(`/extends/ArticleDetailsScreen?id=${hashid}`);
//   };

//   // const { title, description, image, price, oldPrice, discount } = article;
//   return (
//     <TouchableOpacity
//       className="  w-[170px]  "
//       activeOpacity={0.8}
//       onPress={onArticleClickHandle}>
//       <View
//         className="rounded-md bg-white overflow-hidden "
//         style={styles.itemShadow}>
//         <Image
//           source={image ? { uri: image } : images.shoesarticle}
//           className="rounded-md w-[170px] h-[124px]"
//         />
//         <View className="p-2 w-full ">
//           <Text
//             className="text-[12px] font-raleway-medium "
//             numberOfLines={2}
//             ellipsizeMode="tail">
//             {nom_article}
//           </Text>
//           <Text
//             className="font-raleway text-[10px] text-gray-600 mt-1"
//             numberOfLines={1}
//             ellipsizeMode="tail">
//             {description}
//           </Text>
//           <Text className="font-raleway-medium text-[12px]  mt-1">
//             {prix} FCFA
//           </Text>

//           <View className="flex-row items-center gap-x-2 mt-1 ">
//             {old_price && (
//               <>
//                 <Text className="font-raleway-light text-[12px] text-gray-400 line-through">
//                   {old_price} FCFA
//                 </Text>
//                 <Text className="font-raleway text-[10px] text-primary-300">
//                   {-getDiscount(prix, old_price)}%
//                 </Text>
//               </>
//             )}
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   itemShadow: {
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 5,
//     height: 230,
//   },
// });

// export default ArticleItem;

import { images } from "@/constants/Images";
import { IRecommandedArticleClient } from "@/types/recommandedArticleClient.type";
import { getDiscount } from "@/utils/getDiscount";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const ArticleItem = ({ article }: { article: IRecommandedArticleClient }) => {
  const { description, image, nom_article, prix, old_price, hashid } = article;

  const onArticleClickHandle = () => {
    router.push(`/extends/ArticleDetailsScreen?id=${hashid}`);
  };

  return (
    <Pressable
      android_ripple={{
        color: "#EAF9F1",
        foreground: true,
      }}
      onPress={onArticleClickHandle}
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }, { width: 142 }]}
      className="rounded-md">
      <View
        className="rounded-md bg-white overflow-hidden"
        style={styles.itemShadow}>
        <Image
          source={image ? { uri: image } : images.shoesarticle}
          className="rounded-[4px] w-full h-[100px]"
        />

        <View className="p-2 w-full h-[100px] bg-primary-50">
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

          <View className="flex-row items-center gap-x-2 mt-1 ">
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default ArticleItem;
