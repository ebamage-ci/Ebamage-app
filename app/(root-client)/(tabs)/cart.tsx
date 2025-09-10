import CartArticleItem from "@/components/cart/CartArticleItem";
import { CustomButton } from "@/components/global/CustomButton";
import PageWrapper from "@/components/global/PageWrapper";
import { LegendList } from "@legendapp/list";
import { useCallback, useEffect } from "react";
import { Alert, Text, View } from "react-native";

import { useAuthClientStore } from "@/stores/useAuthClient.store";

///
import { onlineManager } from "@tanstack/react-query";

//+++ empty components
import { RenderEmptyCartArticleComponent } from "../../../components/cart/RenderEmptyCartArticleComponent";

//+++ datas api

//+ cart articles from api
import useClientFetchArticleCart from "@/hooks/useClientFetchArticleCart";

//+++ datas from api / localstore

//+ cart articles from api / localstore
import { useManageLoadCartArtilcesClient } from "@/hooks/useManageLoadCartArtilcesClient";
import { useLocalCartArticlesClient } from "@/stores/useLocalCartArticlesClient.store";
import { articleItemCart } from "@/types/articlesCartClient.type";
import { router } from "expo-router";

const CartArticlesScreen = () => {
  const { user } = useAuthClientStore();

  ///
  const { data, isLoading, isError, isPaused } = useClientFetchArticleCart(
    user?.token + ""
  );

  const { errorLocal, setIdPanier, id_panier } = useLocalCartArticlesClient();

  useEffect(() => {
    if (data?.id_panier) {
      setIdPanier(data.id_panier);
    }
  }, [data?.id_panier, setIdPanier]);

  // keyExtractor en callback
  const keyExtractor = useCallback(
    (item: articleItemCart, index: number) =>
      item.hashid_panier_item || index.toString(),
    []
  );

  // renderItem mémoïsé
  const renderItem = useCallback(
    ({ item }: { item: articleItemCart }) => <CartArticleItem article={item} />,
    []
  );

  // console.log("-- data cart articles -- ", JSON.stringify(data, null, 2));
  // console.log("-- isLoading  -- ", isLoading);
  // console.log("-- isError -- ", isError);

  //--> cart articles depending of api / local store
  const cartArticles = useManageLoadCartArtilcesClient({
    cartArticlesDataApi: data?.cart,
  });

  // errs
  const hasCartArticles = cartArticles && cartArticles?.length > 0;
  const hasError =
    (onlineManager.isOnline() && isError) ||
    (!onlineManager.isOnline() && errorLocal);

  return (
    <PageWrapper>
      {/** articles */}
      <View className=" mb-6">
        <LegendList
          data={cartArticles}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={
            <RenderEmptyCartArticleComponent
              isLoading={isLoading}
              hasCartArticles={hasCartArticles}
              hasError={hasError}
            />
          }
          recycleItems
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 10,
            gap: 15,
          }}
        />
      </View>

      {/** bottom */}
      <View className="flex-1 gap-5">
        <Text className="font-raleway-semibold text-[25px]  text-center">
          Prix total:{" "}
          {cartArticles?.reduce((acc, cur) => acc + cur.prix_avec_quantite, 0)}{" "}
          FCFA
        </Text>

        <CustomButton
          label="Valider mon panier"
          disabled={!hasCartArticles}
          onPress={() => {
            // console.log("local id_panier", id_panier);
            // Check if we have a valid id_panier from either data or local storage
            const validIdPanier = data?.id_panier || id_panier;

            if (!validIdPanier) {
              Alert.alert(
                "Erreur",
                // `erreur survenue car id_panier ---> ${validIdPanier ?? "null"}`
                `erreur survenue `
              );
              return;
            }
            router.push({
              pathname: "/extends/DeliveryScreen",
              params: {
                id_panier: data?.id_panier || id_panier,
                prix_total:
                  cartArticles?.reduce(
                    (acc, cur) => acc + cur.prix_avec_quantite,
                    0
                  ) + "",
              },
            });
          }}
        />
      </View>
    </PageWrapper>
  );
};

export default CartArticlesScreen;
