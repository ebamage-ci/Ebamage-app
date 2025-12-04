import { IArticleDetailResponseClient } from "@/types/articleDetailClient.type";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Alert, Text, TouchableOpacity, View } from "react-native";

//
import { useClientAddArticleCart } from "@/hooks/useClientAddArticleCart";
import { useAuthClientStore } from "@/stores/useAuthClient.store";
import { useLocalCartArticlesClient } from "@/stores/useLocalCartArticlesClient.store";
import { variation } from "@/types/articlesCartClient.type";
import { router } from "expo-router";

interface ArticleActionsProps {
  article?: IArticleDetailResponseClient["data"];
  selectedVariations?: Record<string, string>;
}

// reformater l'objet
function formatVariations(variations: Record<string, string>): variation[] {
  return Object.entries(variations).map(([key, value]) => ({
    nom_variation: key,
    lib_variation: value,
  }));
}

const ArticleActions = ({
  article,
  selectedVariations = {},
}: ArticleActionsProps) => {
  const { user, isConnected } = useAuthClientStore();
  const { setCart, setIdPanier } = useLocalCartArticlesClient();

  const { mutate: mutateCart, isPending } = useClientAddArticleCart();

  // Utiliser isAddingToCart s'il est fourni, sinon utiliser isPending

  // add to cart
  const handleAddToCart = () => {
    // si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
    if (!isConnected) {
      Alert.alert(
        "Connexion nécessaire",
        "Vous devez être connecté pour ajouter des articles au panier.",
        [
          {
            text: "Se connecter",
            onPress: () => {
              // Naviguer vers la page de connexion
              router.push("/auth");
            },
          },
          {
            text: "Annuler",
            style: "cancel",
          },
        ]
      );
      return;
    }

    if (article) {
      const data = {
        id_article: article?.hashid,
        variations: formatVariations(selectedVariations) || [],
      };

      // mutate
      mutateCart(
        {
          data,
          token: user?.token || "",
        },
        {
          onSuccess: (data) => {
            setCart(data.cart);
            setIdPanier(data.id_panier);

            Alert.alert(
              "Succès",
              "L'article a été ajouté avec succès au panier.",
              [
                {
                  text: "Retour",
                  style: "cancel",
                },
              ]
            );
          },

          onError: (error) => {
            // console.log("add cart error", error);

            Alert.alert(
              "Erreur d'ajout au panier ",
              error?.message || " une erreur s'est produite ",
              [
                {
                  text: "Retour",
                  style: "cancel",
                },
              ]
            );
          },
        }
      );
    }
  };

  return (
    <View className="my-5">
      <View className="flex-row justify-between gap-3 my-5">
        <TouchableOpacity
          activeOpacity={isPending ? 1 : 0.8}
          onPress={handleAddToCart}
          disabled={isPending}
          className={`w-full flex-row gap-2 rounded p-1 items-center justify-center ${
            isPending ? "bg-primary/50" : "bg-primary"
          }`}>
          <MaterialCommunityIcons name="cart-outline" size={20} color="white" />
          <Text
            className="font-raleway-semibold text-white text-[19px] "
            numberOfLines={1}
            ellipsizeMode="tail">
            {isPending ? "Ajout en cours..." : "Ajouter au panier"}
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          activeOpacity={0.6}
          className=" w-[20%] border-2 border-primary rounded-[10px] p-1 items-center justify-center ">
          <Feather name="phone" size={24} color="#FF3D00" />
        </TouchableOpacity> */}
      </View>

      {/** chat */}
      {/* <TouchableOpacity
        activeOpacity={0.8}
        className="  w-full h-[60px]  flex-row rounded p-1 items-center justify-between bg-primary-200  ">
        <Feather name="message-square" size={36} color="black" />
        <Text
          className="font-raleway-semibold  text-[18px] "
          numberOfLines={1}
          ellipsizeMode="tail">
          Chat avec le service client
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default ArticleActions;
