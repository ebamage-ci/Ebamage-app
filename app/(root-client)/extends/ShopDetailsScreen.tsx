import ArticlesShopItems from "@/components/shop/ArticlesShopItems";
import useClientFetchArticlesShop from "@/hooks/useClientFetchArticlesShop";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

const ShopDetailsScreen = () => {
  const { id, keyword, image, description_btq } = useLocalSearchParams();

  const [isExpanded, setIsExpanded] = useState(false);

  const { data, isLoading, error } = useClientFetchArticlesShop(id as string);

  return (
    <ScrollView
      style={styles.container}
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 20,
      }}>
      <View style={styles.container} className="px-5 py-2 ">
        {/* Image du restaurant avec coins arrondis */}
        <View style={styles.imageContainer} className="border-primary">
          <Image
            source={
              image ? { uri: image } : require("@/assets/images/shop.png")
            }
            style={styles.shopImage}
            resizeMode="cover"
          />
        </View>

        {/* Contenu du restaurant */}
        <View className="m-2">
          {/* Nom du restaurant */}
          <Text style={styles.shopName} className="font-raleway-bold">
            {keyword}
          </Text>

          {/* Description du restaurant */}
          {description_btq && (
            <>
              <Text style={styles.shopDescription}>
                {isExpanded ? description_btq : description_btq.slice(0, 100)}
                {!isExpanded && `${description_btq}`.length > 100 && "..."}
              </Text>
              {`${description_btq}`.length > 100 && (
                <TouchableOpacity
                  onPress={() => setIsExpanded(!isExpanded)}
                  className="mt-1  self-start ">
                  <Text className="font-raleway-medium text-[13px] text-primary-300">
                    {isExpanded ? "Voir moins" : "Voir plus"}
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>

        <View className="my-2 ">
          <Text className="font-raleway-semibold text-[20px]">
            Articles de la boutique
          </Text>

          {/** ### AFFICHAGE CONDITIONNELLE */}

          {!isLoading && !error && (
            <>
              <View className="mb-3">
                <Text className="font-raleway-semibold text-[16px]">
                  {data?.data?.length ?? 0} Article(s)
                </Text>
              </View>
              <View className=" flex-1">
                {/* <ArticleItems /> */}
                <ArticlesShopItems data={data?.data ?? []} />
              </View>
            </>
          )}

          {isLoading && (
            <View className="flex-1 justify-center items-center my-2">
              <ActivityIndicator size="small" color="#007AFF" />
            </View>
          )}

          {error && (
            <View className="flex-1 justify-center items-center my-4">
              <Text className="text-red-500">
                {error.message || "Une erreur est survenue"}
              </Text>
            </View>
          )}
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
  imageContainer: {
    width: "100%",
    height: 180,
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  shopImage: {
    width: "100%",
    height: "100%",
  },

  shopName: {
    fontSize: 21,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
  shopDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginTop: 3,
    fontFamily: "Montserrat-Regular",
  },
});

export default ShopDetailsScreen;
