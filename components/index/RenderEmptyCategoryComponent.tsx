import { onlineManager } from "@tanstack/react-query";
import { ActivityIndicator, Text } from "react-native";

type Props = {
  isLoading: boolean;
  hasCategories: boolean;
  hasError: boolean;
  online?: boolean;
};

export const RenderEmptyCategoryComponent = ({
  isLoading,
  hasCategories,
  hasError,
  online = onlineManager.isOnline(),
}: Props) => {
  if (isLoading) {
    return <ActivityIndicator color="red" />;
  }

  if (hasCategories) return null;

  if (hasError) {
    return (
      <Text className="text-red-500 text-center">
        Une erreur est survenue lors du chargement des catégories.
      </Text>
    );
  }

  if (!online) {
    return (
      <Text className="text-center">
        Mode hors ligne – aucune catégorie n&apos;est enregistrée.
      </Text>
    );
  }

  return <Text className="text-center">Aucune catégorie trouvée.</Text>;
};
