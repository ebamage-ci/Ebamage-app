import icons from "@/constants/icons";
import { useClientFetchOrderDetail } from "@/hooks/useClientFetchOrderDetail";
import { formatDate } from "@/utils/formatDate";
import { formatHour } from "@/utils/formatHour";
import { useFocusEffect } from "@react-navigation/native";
import { onlineManager } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const OrderDetailsScreen = () => {
  const { id, from } = useLocalSearchParams() as { id: string; from?: string };
  const router = useRouter();

  const { isLoading, isError, data } = useClientFetchOrderDetail(id);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (from === "delivery") {
          router.replace("/(root-client)/(tabs)/settings");
          return true;
        }
        return false;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [from, router])
  );

  const handleBackPress = () => {
    if (from === "delivery") {
      router.replace("/(root-client)/(tabs)/settings");
    } else {
      router.back();
    }
  };

  const OrderDetailsHeader = () => (
    <View className="bg-white px-5 py-4 border-b border-gray-200">
      <View className="flex-row items-center">
        <TouchableOpacity onPress={handleBackPress} className="mr-4 p-2 -ml-2">
          <Image
            source={icons.arrow_back}
            className="w-6 h-6"
            style={{ tintColor: "#374151" }}
          />
        </TouchableOpacity>
        <Text className="font-raleway-semibold text-lg text-gray-800 flex-1">
          Détails de la commande
        </Text>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <OrderDetailsHeader />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0a7ea4" />
          <Text className="mt-4 font-raleway-medium text-gray-600">
            Chargement des détails...
          </Text>
        </View>
      </View>
    );
  }

  if (isError || !onlineManager.isOnline()) {
    return (
      <View style={styles.container}>
        <OrderDetailsHeader />
        <View style={styles.errorContainer}>
          <Text className="font-raleway-semibold text-red-500 text-center">
            Erreur lors du chargement des détails de la commande
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container} className="flex-1">
      <OrderDetailsHeader />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 25 }}>
        <View className="px-5 py-4">
          <Text
            className="font-raleway-bold text-xl text-gray-800 flex-shrink"
            numberOfLines={1}
            ellipsizeMode="tail">
            Commande :
          </Text>
          <Text className="font-raleway-semibold text-lg text-gray-600 flex-shrink">
            {data?.code_commande}
          </Text>
          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="font-raleway-semibold text-lg text-gray-600 flex-shrink">
                {formatDate(data?.created_at || "")} à{" "}
                {formatHour(data?.created_at || "")}
              </Text>
              <View className="bg-primary-200 px-3 py-1 rounded-full ml-3">
                <Text
                  className="font-raleway-semibold text-xs text-primary"
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {data?.statut}
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <Text className="font-raleway-semibold text-base mb-3 text-gray-800">
              📍 Informations de livraison
            </Text>
            <View className="space-y-2">
              <View className="flex-row gap-3">
                <Text className="font-raleway-medium text-gray-500 ">
                  Ville:
                </Text>
                <Text
                  className="font-raleway text-gray-800 flex-1"
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {data?.localisation?.ville}
                </Text>
              </View>
              <View className="flex-row gap-3">
                <Text className="font-raleway-medium text-gray-500 ">
                  Commune:
                </Text>
                <Text
                  className="font-raleway text-gray-800 flex-1"
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {data?.localisation?.commune}
                </Text>
              </View>
              <View className="flex-row gap-3">
                <Text className="font-raleway-medium text-gray-500 ">
                  Quartier:
                </Text>
                <Text
                  className="font-raleway text-gray-800 flex-1"
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {data?.localisation?.quartier}
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <Text className="font-raleway-semibold text-base mb-3 text-gray-800">
              💳 Informations de paiement
            </Text>
            <View className="flex-row">
              <Text className="font-raleway-medium text-gray-500 w-32">
                Moyen de paiement:
              </Text>
              <Text
                className="font-raleway text-gray-800 flex-1"
                numberOfLines={1}
                ellipsizeMode="tail">
                {data?.moyen_de_paiement}
              </Text>
            </View>
          </View>

          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <Text className="font-raleway-semibold text-base mb-3 text-gray-800">
              🛍️ Articles commandés ({data?.articles?.length || 0})
            </Text>

            {data?.articles?.map((article, index) => (
              <View
                key={index}
                className="bg-gray-200 rounded-lg p-3 mb-3 border border-gray-300">
                <View className="flex-row">
                  <Image
                    source={{ uri: article?.image }}
                    className="w-15 h-15 rounded-lg bg-gray-300"
                    resizeMode="cover"
                  />

                  <View className="flex-1 ml-3">
                    <Text
                      className="font-raleway-semibold text-sm text-gray-800 mb-1"
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {article?.nom_article}
                    </Text>

                    <Text
                      className="font-raleway text-xs text-gray-500 mb-2"
                      numberOfLines={2}
                      ellipsizeMode="tail">
                      {article.description}
                    </Text>

                    {article.variations && article.variations.length > 0 && (
                      <View className="flex-row flex-wrap mb-2">
                        {article.variations.map((variation, vIndex) => {
                          const isColor = variation.nom_variation
                            ?.toLowerCase()
                            .includes("color");

                          return (
                            <View
                              key={vIndex}
                              className={`px-2 py-1 rounded mr-2 mb-1 flex-row items-center ${
                                isColor ? "" : "bg-gray-300"
                              }`}
                              style={
                                !isColor
                                  ? {}
                                  : { paddingHorizontal: 0, paddingVertical: 0 }
                              }>
                              {isColor ? (
                                <>
                                  <Text>Couleur : </Text>
                                  {/* <Text>{variation.nom_variation} : </Text> */}
                                  <View
                                    style={{
                                      width: 16,
                                      height: 16,
                                      borderRadius: 8,
                                      backgroundColor:
                                        variation.lib_variation || "#ccc",
                                      borderWidth: 1,
                                      borderColor: "#ddd",
                                    }}
                                  />
                                </>
                              ) : (
                                <Text className="font-raleway text-xs text-gray-500">
                                  {variation.nom_variation}:{" "}
                                  {variation.lib_variation}
                                </Text>
                              )}
                            </View>
                          );
                        })}
                      </View>
                    )}

                    <View className="flex-row items-center mb-2">
                      <Image source={icons.shop} className="w-3 h-3 mr-1" />
                      <Text
                        className="font-raleway text-xs text-gray-400"
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {article.boutique.nom_btq}
                      </Text>
                    </View>

                    <View className="flex-row justify-between items-center">
                      <Text className="font-raleway-medium text-xs text-gray-500">
                        Quantité: {article.quantite}
                      </Text>
                      <Text className="font-raleway-semibold text-sm text-gray-800">
                        {article.prix} FCFA
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <Text className="font-raleway-semibold text-base mb-3 text-gray-800">
              💰 Résumé des prix
            </Text>

            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="font-raleway-medium text-gray-500">
                  Sous-total articles:
                </Text>
                <Text className="font-raleway text-gray-800">
                  {data?.prix_total_articles} FCFA
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="font-raleway-medium text-gray-500">
                  Frais de livraison:
                </Text>
                <Text className="font-raleway text-gray-800">
                  {data?.livraison} FCFA
                </Text>
              </View>

              <View className="border-t border-gray-300 pt-2 mt-2">
                <View className="flex-row justify-between">
                  <Text className="font-raleway-bold text-base text-gray-800">
                    Total:
                  </Text>
                  <Text className="font-raleway-bold text-base text-primary">
                    {data?.prix_total_commande} FCFA
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* {data?.statut?.toLowerCase() === "en_attente" && (
            <View className="mt-2">
              <TouchableOpacity className="bg-white rounded-lg p-3 border border-primary-400">
                <Text className="font-raleway-semibold text-primary-400 text-center">
                  Annuler la commande
                </Text>
              </TouchableOpacity>
            </View>
          )} */}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDFDFD",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDFDFD",
    paddingHorizontal: 20,
  },
});
