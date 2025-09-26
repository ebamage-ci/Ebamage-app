import Header from "@/components/global/Header";
import HeaderArticlesCategory from "@/components/index/HeaderArticlesCategory";
import HeaderDetails from "@/components/index/HeaderDetails";
import HeaderResultSearch from "@/components/index/HeaderResultSearch";
import HeaderSearch from "@/components/index/HeaderSearch";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="global/SearchScreen"
        options={{ header: () => <HeaderSearch /> }}
      />
      <Stack.Screen
        name="SearchResultsScreen"
        options={({ route }) => ({
          header: () => (
            <HeaderResultSearch
              keyword={(route.params as { keyword: string })?.keyword}
            />
          ),
        })}
      />

      <Stack.Screen
        name="ArticlesCategoryScreen"
        options={({ route }) => ({
          header: () => (
            <HeaderArticlesCategory
              keyword={(route.params as { keyword: string }).keyword}
            />
          ),
        })}
      />

      <Stack.Screen
        name="ArticleDetailsScreen"
        options={{ header: () => <HeaderDetails /> }}
      />

      <Stack.Screen
        name="OrderDetailsScreen"
        options={{
          header: () => <Header title="Détails de la Commande" />,
          headerShown: false,
        }}
      />

      {/* <Stack.Screen
        name="CartArticlesScreen"
        options={{ header: () => <Header title="Panier" /> }}
      /> */}

      <Stack.Screen
        name="DeliveryScreen"
        options={{ header: () => <Header title="Livraison" /> }}
      />
      <Stack.Screen
        name="OrdersScreen"
        options={{ header: () => <Header title="Commandes" /> }}
      />
      <Stack.Screen
        name="NotificationsScreen"
        options={{ header: () => <Header title="Notifications" /> }}
      />
    </Stack>
  );
}
