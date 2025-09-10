import { onlineManager } from "@tanstack/react-query";
import { ActivityIndicator, Text, View } from "react-native";

type Props = {
  isLoading: boolean;
  hasTendanceArticles: boolean;
  hasError: boolean;
  online?: boolean;
};

export const RenderEmptyTendanceArticleComponent = ({
  isLoading,
  hasTendanceArticles,
  hasError,
  online = onlineManager.isOnline(),
}: Props) => {
  if (isLoading) {
    return (
      <View className="w-full h-40 items-center justify-center">
        <ActivityIndicator color="red" className="h-4 w-4" />
      </View>
    );
  }

  if (hasTendanceArticles) return null;

  if (hasError) {
    return (
      <View className="w-full">
        <Text className="text-red-500 text-center">
          Aucun article tendance trouvé.
        </Text>
      </View>
    );
  }

  if (!online) {
    return (
      <Text className="text-center">
        Mode hors ligne – aucun article n&apos;est enregistré.
      </Text>
    );
  }

  return <Text className="text-center">Aucun article tendance trouvé.</Text>;
};