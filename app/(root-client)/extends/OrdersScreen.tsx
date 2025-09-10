import PageWrapper from "@/components/global/PageWrapper";
import OrderItem from "@/components/settings/OrderItem";
import { View } from "react-native";

import { useAuthClientStore } from "@/stores/useAuthClient.store";

///
import { onlineManager } from "@tanstack/react-query";

//+++ empty components
import { RenderEmptyOrdersComponent } from "../../../components/settings/RenderEmptyOrdersComponent";

//+++ datas api

//+ orders from api
import useClientFetchOrders from "@/hooks/useClientFetchOrders";

//+++ datas from api / localstore

//+ orders from api / localstore
import { useManageLoadOrdersClient } from "@/hooks/useManageLoadOrdersClient";
import { useLocalOrdersClient } from "@/stores/useLocalOrdersClient.store";
import { IOrder } from "@/types/ordersClient.type";
import { LegendList } from "@legendapp/list";
import { useCallback } from "react";

const OrdersScreen = () => {
  const { user } = useAuthClientStore();

  // keyExtractor en callback
  const keyExtractor = useCallback(
    (item: IOrder, index: number) => index.toString(),
    []
  );

  // renderItem mémoïsé
  const renderItem = useCallback(
    ({ item }: { item: IOrder }) => <OrderItem order={item} />,
    []
  );

  ///
  const { data, isLoading, isError } = useClientFetchOrders(user?.token + "");

  // console.log("-- data cart articles -- ", JSON.stringify(data, null, 2));
  // console.log("-- isLoading  -- ", isLoading);
  // console.log("-- isError -- ", isError);

  const { errorLocal } = useLocalOrdersClient();

  //--> cart articles depending of api / local store
  const orders = useManageLoadOrdersClient({
    ordersDataApi: data?.data,
    loading: isLoading,

    // connected: onlineManager.isOnline(),
  });

  // errs
  const hasOrders = orders && orders?.length > 0;
  const hasError =
    (onlineManager.isOnline() && isError) ||
    (!onlineManager.isOnline() && errorLocal);

  return (
    <PageWrapper>
      <View>
        <LegendList
          data={orders}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={
            <RenderEmptyOrdersComponent
              isLoading={isLoading}
              hasOrders={hasOrders}
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
    </PageWrapper>
  );
};

export default OrdersScreen;
