import PlaceShop from "@/components/global/PlaceShop";
import ArticleActions from "@/components/index/ArticleActions";
import ChoicesGroup from "@/components/index/ChoicesGroup";
import ImagesArticleDetails from "@/components/index/ImagesArticleDetails";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ArticleList from "@/components/global/ArticleList";
import Loader from "@/components/global/Loader";
import ColorsGroup from "@/components/index/ColorsGroup";
import { useClientFetchArticleDetail } from "@/hooks/useClientFetchArticleDetail";
import { getDiscount } from "@/utils/getDiscount";
import { onlineManager } from "@tanstack/react-query";

const ArticleDetailsScreen = () => {
  const { id } = useLocalSearchParams() as { id: string };
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedVariations, setSelectedVariations] = useState<
    Record<string, string>
  >({});

  // console.log("--- id Article --- ", id);

  // Récupération des détails de l'article
  const { isLoading, isError, data } = useClientFetchArticleDetail(id);

  const handleVariationChange = useCallback(
    (variationName: string, variationValue: string) => {
      setSelectedVariations((prev) => ({
        ...prev,
        [variationName]: variationValue,
      }));
    },
    []
  );

  if (isLoading) {
    return <Loader />;
  }
  if (isError || !onlineManager.isOnline()) {
    return <Text>Error</Text>;
  }

  return (
    <ScrollView
      style={styles.container}
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 5,
      }}>
      <View style={styles.container} className="px-5 py-2 ">
        {/** carousel catalog */}
        <View className="h-[271px]">
          <ImagesArticleDetails images={data?.data?.images ?? []} />
        </View>

        {/** choices ( color & others) */}
        <View>
          {data?.data.variations.map((variation) =>
            variation?.nom_variation === "color" ||
            variation?.nom_variation.includes("color") ? (
              <ColorsGroup
                key={variation.nom_variation}
                variation={variation}
                onVariationChange={(value) =>
                  handleVariationChange(variation.nom_variation, value)
                }
              />
            ) : (
              <ChoicesGroup
                key={variation.nom_variation}
                variation={variation}
                onVariationChange={(value) =>
                  handleVariationChange(variation.nom_variation, value)
                }
              />
            )
          )}
        </View>

        {/** title - label */}
        <View className="mt-5">
          <Text className=" text-[20px] font-raleway-semibold ">
            {data?.data.nom_article}
          </Text>
        </View>

        {/** Description */}
        <View className="mt-5">
          <Text className=" text-[14px] font-raleway-medium ">Description</Text>
          <View>
            <Text className="font-raleway text-[12px] text-[#828282]">
              {isExpanded
                ? data?.data.description
                : data?.data.description.slice(0, 100)}
              {!isExpanded && `${data?.data.description}`.length > 100 && "..."}
            </Text>
            {`${data?.data.description}`.length > 100 && (
              <TouchableOpacity
                onPress={() => setIsExpanded(!isExpanded)}
                className="mt-1  self-start ">
                <Text className="font-raleway-medium text-[12px] text-primary-300">
                  {isExpanded ? "Moins" : "Plus"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/** Price */}
        <View className="flex-row gap-3 items-center mb-4 ">
          {data?.data.old_price && (
            <Text className="text-[#808488] font-raleway-light line-through">
              {data?.data.old_price} FCFA
            </Text>
          )}
          <Text className="text-[20px] font-raleway-medium ">
            {data?.data.prix} FCFA
          </Text>
          {data?.data.old_price && (
            <Text className=" text-[16px] font-raleway-medium text-primary ">
              {-getDiscount(data?.data.prix, data?.data.old_price)}%
            </Text>
          )}
        </View>

        {/** lieu */}
        <PlaceShop name={data?.data.nom_btq ?? ""} />

        {/** Action article */}
        <ArticleActions
          article={data?.data}
          selectedVariations={selectedVariations}
          // isAddingToCart={isAddingToCart}
        />

        {/** same shop */}
        <View className="my-2">
          <View className="mb-3">
            <Text className="font-raleway-semibold text-[20px]">
              Du même magasin
            </Text>
            <Text className="font-raleway-semibold text-[16px]">
              {`${data?.communs.length}`.padStart(2, "0")} Articles
            </Text>
          </View>
          <View className="max-h-[241px] flex-1">
            <ArticleList data={data?.communs ?? []} />
          </View>
        </View>

        {/** similar */}
        <View className="my-2 ">
          <View className="mb-3">
            <Text className="font-raleway-semibold text-[20px]">
              De la même catégorie
            </Text>
            <Text className="font-raleway-semibold text-[16px]">
              {`${data?.similaires.length}`.padStart(2, "0")} Articles
            </Text>
          </View>
          <View className=" flex-1">
            {/* <ArticleItems /> */}
            <ArticleList data={data?.similaires ?? []} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
});

export default ArticleDetailsScreen;
