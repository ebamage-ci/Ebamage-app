import { images } from "@/constants/Images";
import {
  articleItemCart,
  IListCartResponseClient,
  variation,
} from "@/types/articlesCartClient.type";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { memo, useCallback, useMemo } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

import { queryClient } from "@/app/_layout";
import { useClientDecrementArticleCart } from "@/hooks/useClientDecrementArticleCart";
import { useClientDeleteArticleCart } from "@/hooks/useClientDeleteArticleCart";
import { useClientIncrementArticleCart } from "@/hooks/useClientIncrementArticleCart";
import { useAuthClientStore } from "@/stores/useAuthClient.store";
import { useLocalCartArticlesClient } from "@/stores/useLocalCartArticlesClient.store";

// ========== Composant principal ==========
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

  //--> increment
  const addQty = useCallback(() => {
    mutateIncrementArticle(
      {
        data: {
          hashid_panier_item,
        },
        token: user?.token || "",
      },
      {
        onSuccess: (data) => {
          // console.log(
          //   "-- data increment success ----> ",
          //   JSON.stringify(data, null, 2)
          // );

          setCart(data.cart);
          setIdPanier(data.id_panier);

          queryClient.setQueryData(
            ["cart", "client"],
            (oldData: IListCartResponseClient) => data
          );
        },

        onError: (error) => {
          Alert.alert(
            "Erreur",
            error.message || "Impossible d'ajouter l'article au panier"
          );
        },
      }
    );
  }, [
    hashid_panier_item,
    mutateIncrementArticle,
    setCart,
    setIdPanier,
    user?.token,
  ]);

  //--> decrement

  const removeQty = useCallback(() => {
    mutateDecrementArticle(
      {
        data: {
          hashid_panier_item,
        },
        token: user?.token || "",
      },
      {
        onSuccess: (data) => {
          // console.log(
          //   "-- data decrement success ----> ",
          //   JSON.stringify(data, null, 2)
          // );
          setCart(data.cart);
          setIdPanier(data.id_panier);

          queryClient.setQueryData(
            ["cart", "client"],
            (oldData: IListCartResponseClient) => data
          );
        },

        onError: (error) => {
          Alert.alert(
            "Erreur",
            error.message || "Impossible de diminuer la quantité de l'article"
          );
        },
      }
    );
  }, [
    hashid_panier_item,
    mutateDecrementArticle,
    setCart,
    setIdPanier,
    user?.token,
  ]);

  //--> delete article
  const onDelete = useCallback(() => {
    mutateDeleteArticle(
      {
        data: {
          hashid_panier_item,
        },
        token: user?.token || "",
      },
      {
        onSuccess: (data) => {
          // console.log(
          //   "-- data delete success ----> ",
          //   JSON.stringify(data, null, 2)
          // );

          resetCart();
          setIdPanier(data.id_panier);

          queryClient.setQueryData(
            ["cart", "client"],
            (oldData: IListCartResponseClient) => data
          );
        },

        onError: (error) => {
          Alert.alert(
            "Erreur",
            error.message || "Impossible de supprimer l'article"
          );
        },
      }
    );
  }, [
    hashid_panier_item,
    mutateDeleteArticle,
    // setCart,
    setIdPanier,
    user?.token,
    resetCart,
  ]);

  // ========== Child: ChoiceItem ==========
  const ChoiceItem = ({ choice }: { choice: variation }) => {
    if (
      choice.nom_variation.toLowerCase() === "color" ||
      choice.nom_variation.includes("color")
    ) {
      return (
        <View className="flex-row items-center self-start bg-gray-200 rounded my-1 px-2 py-1">
          <Text className="font-raleway text-[14px]">
            {choice.nom_variation} :{" "}
          </Text>
          <View
            style={{ backgroundColor: choice.lib_variation }}
            className="w-5 h-5 rounded-full ml-1"
          />
        </View>
      );
    }

    return (
      <View className="flex-row items-center self-start bg-gray-200 rounded my-1 px-2 py-1">
        <Text className="font-raleway text-[14px]">
          {choice.nom_variation} :{" "}
        </Text>
        <Text
          className="font-raleway-medium text-[14px] ml-1 flex-1"
          ellipsizeMode="tail"
          numberOfLines={1}>
          {choice.lib_variation}
        </Text>
      </View>
    );
  };

  const ChoiceItemMemo = memo(ChoiceItem);

  // choices
  const renderedChoices = useMemo(
    () =>
      variations.map((choice, index) => (
        <ChoiceItemMemo key={index.toString()} choice={choice} />
      )),
    [variations, ChoiceItemMemo]
  );

  // ========== Child: Quantity ==========
  const Quantity = () => {
    // const [quantity, setQuantity] = useState(quantite);

    return (
      <View className="flex-row items-center self-start bg-gray-200 rounded px-2 py-1 my-2 justify-between">
        <Text className="font-raleway text-[14px]">Qté :</Text>
        <View className="flex-row items-center gap-2 ml-2">
          <TouchableOpacity
            disabled={quantite <= 1 || isPending}
            onPress={removeQty}
            className="items-center justify-center">
            <Ionicons
              name="remove-circle-outline"
              size={18}
              color={isPending || quantite <= 1 ? "#B6B09F" : "#FF3B30"}
            />
          </TouchableOpacity>
          <Text className="font-raleway-medium text-[14px]">{quantite}</Text>
          <TouchableOpacity
            disabled={quantite >= 10 || isPending}
            onPress={addQty}
            className="items-center justify-center">
            <Ionicons
              name="add-circle-outline"
              size={18}
              color={isPending || quantite >= 10 ? "#B6B09F" : "#000"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const QuantityMemo = memo(Quantity);

  return (
    <View
      className={`flex-row rounded-2xl overflow-hidden border-2  w-full ${
        isPending ? "border-gray-300" : "border-primary-300"
      }`}>
      <Image
        source={image ? { uri: image } : images.imgarticleitem}
        className="w-2/5 h-full"
        resizeMode="cover"
      />
      <View className="py-4 px-3 w-3/5">
        <Text className="font-raleway-medium text-[16px] mb-2">
          {nom_article}
        </Text>

        {/* Choices */}
        <View>{renderedChoices}</View>

        {/* Quantity */}
        <QuantityMemo />

        {/* price - delete */}
        <View className="flex-row justify-between items-center mt-2">
          <Text className="font-raleway-semibold text-[16px]">
            {prix_avec_quantite} FCFA
          </Text>
          <TouchableOpacity
            onPress={onDelete}
            disabled={isPending}
            className={`border-2  rounded-full p-1 ${
              isPending ? "border-gray-300" : "border-primary-300"
            }`}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={22}
              color={isPending ? "#B6B09F" : "#FF3B30"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default memo(CartArticleItem);
