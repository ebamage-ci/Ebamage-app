import { images } from "@/constants/Images";
import { articleItemCart, variation } from "@/types/articlesCartClient.type";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { memo, useCallback, useMemo } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useClientDecrementArticleCart } from "@/hooks/useClientDecrementArticleCart";
import { useClientDeleteArticleCart } from "@/hooks/useClientDeleteArticleCart";
import { useClientIncrementArticleCart } from "@/hooks/useClientIncrementArticleCart";
import { useAuthClientStore } from "@/stores/useAuthClient.store";
import { useLocalCartArticlesClient } from "@/stores/useLocalCartArticlesClient.store";
import { queryClient } from "@/utils/queryClient";

const CartArticleItem = ({ article }: { article: articleItemCart }) => {
  const { mutate: mutateIncrementArticle, isPending: isPendingIncrement } =
    useClientIncrementArticleCart();
  const { mutate: mutateDecrementArticle, isPending: isPendingDecrement } =
    useClientDecrementArticleCart();
  const { mutate: mutateDeleteArticle, isPending: isPendingDelete } =
    useClientDeleteArticleCart();

  const isPending = isPendingIncrement || isPendingDecrement || isPendingDelete;

  const { setCart, setIdPanier, resetCart } = useLocalCartArticlesClient();
  const { user } = useAuthClientStore();

  const {
    image,
    nom_article,
    variations,
    prix_avec_quantite,
    quantite,
    hashid_panier_item,
  } = article;

  // ----- actions panier -----
  const addQty = useCallback(() => {
    mutateIncrementArticle(
      { data: { hashid_panier_item }, token: user?.token || "" },
      {
        onSuccess: (data) => {
          setCart(data.cart);
          setIdPanier(data.id_panier);
          queryClient.setQueryData(["cart", "client"], () => data);
        },
        onError: (error) => {
          Alert.alert(
            "Erreur",
            error.message || "Impossible d'ajouter l'article au panier",
          );
        },
      },
    );
  }, [
    hashid_panier_item,
    mutateIncrementArticle,
    setCart,
    setIdPanier,
    user?.token,
  ]);

  const removeQty = useCallback(() => {
    mutateDecrementArticle(
      { data: { hashid_panier_item }, token: user?.token || "" },
      {
        onSuccess: (data) => {
          setCart(data.cart);
          setIdPanier(data.id_panier);
          queryClient.setQueryData(["cart", "client"], () => data);
        },
        onError: (error) => {
          Alert.alert(
            "Erreur",
            error.message || "Impossible de diminuer la quantité",
          );
        },
      },
    );
  }, [
    hashid_panier_item,
    mutateDecrementArticle,
    setCart,
    setIdPanier,
    user?.token,
  ]);

  const onDelete = useCallback(() => {
    mutateDeleteArticle(
      { data: { hashid_panier_item }, token: user?.token || "" },
      {
        onSuccess: (data) => {
          resetCart();
          setIdPanier(data.id_panier);
          queryClient.setQueryData(["cart", "client"], () => data);
        },
        onError: (error) => {
          Alert.alert(
            "Erreur",
            error.message || "Impossible de supprimer l'article",
          );
        },
      },
    );
  }, [
    hashid_panier_item,
    mutateDeleteArticle,
    setIdPanier,
    user?.token,
    resetCart,
  ]);

  // ----- sous-composants -----
  const ChoiceItem = ({ choice }: { choice: variation }) => (
    <View className="flex-row items-center bg-gray-200 rounded-full px-3 py-1 mr-2 mb-2">
      {choice.nom_variation.toLowerCase().includes("color") ? (
        <>
          <Text className="font-raleway text-[13px]">
            {choice.nom_variation} :
          </Text>
          <View
            style={{ backgroundColor: choice.lib_variation }}
            className="w-4 h-4 rounded-full ml-2"
          />
        </>
      ) : (
        <>
          <Text className="font-raleway text-[13px]">
            {choice.nom_variation} :
          </Text>
          <Text
            className="font-raleway-medium text-[13px] ml-1 max-w-[80px]"
            numberOfLines={1}>
            {choice.lib_variation}
          </Text>
        </>
      )}
    </View>
  );

  const renderedChoices = useMemo(
    () =>
      variations.map((choice, index) => (
        <ChoiceItem key={index.toString()} choice={choice} />
      )),
    [variations],
  );

  // ----- rendu -----
  return (
    <View
      style={{
        borderRadius: 16,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
        marginVertical: 8,
      }}
      className="flex-row overflow-hidden">
      {/** image produit */}
      <Image
        source={image ? { uri: image } : images.imgarticleitem}
        className="w-28 h-28 rounded-l-2xl"
        resizeMode="cover"
      />

      {/** contenu */}
      <View className="flex-1 p-3">
        {/** titre + delete */}
        <View className="flex-row justify-between items-start mb-2">
          <Text
            className="font-raleway-semibold text-[15px] flex-1"
            numberOfLines={2}
            ellipsizeMode="tail">
            {nom_article}
          </Text>
          <TouchableOpacity onPress={onDelete} disabled={isPending}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={22}
              color={isPending ? "#B6B09F" : "#FF3B30"}
            />
          </TouchableOpacity>
        </View>

        {/** variations scrollables */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-2">
          {renderedChoices}
        </ScrollView>

        {/** quantité + prix */}
        <View className="flex-row justify-between items-center mt-auto">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              disabled={quantite <= 1 || isPending}
              onPress={removeQty}>
              <Ionicons
                name="remove-circle-outline"
                size={20}
                color={isPending || quantite <= 1 ? "#B6B09F" : "#FF3B30"}
              />
            </TouchableOpacity>
            <Text className="font-raleway-medium text-[14px]">{quantite}</Text>
            <TouchableOpacity
              disabled={quantite >= 10 || isPending}
              onPress={addQty}>
              <Ionicons
                name="add-circle-outline"
                size={20}
                color={isPending || quantite >= 10 ? "#B6B09F" : "#000"}
              />
            </TouchableOpacity>
          </View>

          <Text className="font-raleway-bold text-[15px] text-primary-500">
            {prix_avec_quantite} FCFA
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(CartArticleItem);
