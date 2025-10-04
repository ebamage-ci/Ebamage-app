import CategoryItem from "@/components/index/CategoryItem";
import TendanceItems from "@/components/index/TendanceItems";
import icons from "@/constants/icons";
import { LegendList } from "@legendapp/list";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import ArticleItems from "@/components/global/ArticleItems";
import CarouselOffers from "@/components/index/CarouselOffers";

import { onlineManager } from "@tanstack/react-query";

//+++ empty components
import { RenderEmptyCategoryComponent } from "@/components/index/RenderEmptyCategoryComponent";

//+++ datas api

//+ categories from api
import useClientFetchCategories from "@/hooks/useClientFetchCategories";

//+++ local datas

//+ local categories
import { useLocalCategoryClientStore } from "@/stores/useLocalCategoryClient.store";

//+++ datas from api / localstore

//+ categories from api / localstore
import { useClientUpdateDeviceToken } from "@/hooks/useClientUpdateDeviceToken";
import { useManageLoadCategoriesClient } from "@/hooks/useManageLoadCategoriesClient";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useAuthClientStore } from "@/stores/useAuthClient.store";
import { useEffect } from "react";

export default function HomeScreen() {
  const { user } = useAuthClientStore();
  const { expoPushToken } = usePushNotifications();
  const { mutate: updateDeviceToken } = useClientUpdateDeviceToken();

  useEffect(() => {
    // console.log(">>> useEffect triggered");
    // console.log("expoPushToken =", expoPushToken);
    // console.log("user?.hashid_clt =", user?.hashid_clt);
    if (expoPushToken && user?.hashid_clt) {
      console.log("gooooooooooo");

      // update
      updateDeviceToken({
        token: user?.token || "",
        data: {
          hashid: user?.hashid_clt,
          deviceToken: expoPushToken,
        },
      });
    }
  }, [expoPushToken, user?.token, user?.hashid_clt, updateDeviceToken]);

  // console.log("-- expoPushToken --> ", expoPushToken);

  const { data, isLoading, isError } = useClientFetchCategories();

  // console.log("-- data -- ", JSON.stringify(data, null,2));
  // console.log("-- isLoading  -- ", isLoading);
  // console.log("-- isError -- ", isError);

  const { errorLocal } = useLocalCategoryClientStore();

  //--> categories depending of connection
  const categories = useManageLoadCategoriesClient({
    categoriesDataApi: data?.data,
    loading: isLoading,

    // connected: onlineManager.isOnline(),
  });

  const hasCategories = categories && categories.length > 0;
  const hasError =
    (onlineManager.isOnline() && isError) ||
    (!onlineManager.isOnline() && errorLocal);

  return (
    <ScrollView
      style={styles.container}
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 20,
      }}>
      {/* Carousel */}
      <View className="flex-[0.3] ">
        <CarouselOffers />
      </View>

      <View style={styles.container} className="px-5 py-2 ">
        <Text className="font-raleway-semibold text-[18px] mb-4">
          Catégories
        </Text>

        {/* Category list */}
        <View className="h-[100px]">
          <LegendList
            data={categories}
            renderItem={({ item }) => <CategoryItem item={item} />}
            keyExtractor={(item) => item?.hashid?.toString()}
            ListEmptyComponent={
              <RenderEmptyCategoryComponent
                isLoading={isLoading}
                hasCategories={hasCategories}
                hasError={hasError}
              />
            }
            recycleItems
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 10,
              gap: 15,
            }}
          />
        </View>

        {/* Recommandations */}
        <View className=" my-2 flex-1">
          <Text className="font-raleway-semibold">PRODUITS RÉCENTS</Text>
        </View>

        {/* Articles Recocommandations list */}
        <View className=" flex-1 ">
          {/* <RecommandationItems /> */}
          <ArticleItems />
        </View>

        {/** tendance */}

        <View className="flex-1 my-4 flex-row justify-between items-center p-3 rounded-lg bg-primary-300">
          <View>
            <Text className="font-raleway-medium text-[16px] text-white">
              Produits en tendance
            </Text>
            <Text className="font-raleway text-[12px] text-white">
              Articles du moment
            </Text>
          </View>

          <View className=" border border-white  py-2 px-4  flex-row  rounded-md justify-between items-center   ">
            <Image
              style={{ width: 15, height: 15 }}
              source={icons.arrow_down}
              resizeMode="contain"
              tintColor={"#fff"}
            />
          </View>
        </View>

        {/* tendance list */}
        <View className=" flex-1 p-1 ">
          <TendanceItems />
        </View>

        {/* <View className="max-h-[241px] flex-1">
          <ArticleList data={data?.communs ?? []} />
        </View> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#FDFDFD",
  },

  offer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
});
