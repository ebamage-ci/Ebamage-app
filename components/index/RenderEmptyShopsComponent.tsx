import { onlineManager } from "@tanstack/react-query";
import { ActivityIndicator, Text, View } from "react-native";

type Props = {
  isLoading: boolean;
  hasShops: boolean;
  hasError: boolean;
  online?: boolean;
};

export const RenderEmptyShopsComponent = ({
  isLoading,
  hasShops,
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

  if (hasShops) return null;

  if (hasError) {
    return (
      <View className="w-full">
        <Text className="text-red-500 text-center">
          Aucune boutique trouvée.
        </Text>
      </View>
    );
  }

  if (!online) {
    return (
      <Text className="text-center">
        Mode hors ligne – aucune boutique n&apos;est enregistrée.
      </Text>
    );
  }

  return <Text className="text-center">Aucune boutique trouvée.</Text>;
};
