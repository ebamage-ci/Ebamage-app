import { useAuthClientStore } from "@/stores/useAuthClient.store";
import { Redirect } from "expo-router";

export default function Index() {
  const { isConnected } = useAuthClientStore();

  // Si NON connecté → on affiche auth en premier
  if (!isConnected) {
    return <Redirect href="/auth" />;
  }

  // Si connecté → on va directement au root-client
  return <Redirect href="/(root-client)/(tabs)" />;
}
