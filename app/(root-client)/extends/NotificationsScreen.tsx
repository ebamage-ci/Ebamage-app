import PageWrapper from "@/components/global/PageWrapper";
import { useAuthClientStore } from "@/stores/useAuthClient.store";
import { View } from "react-native";

///
import { onlineManager } from "@tanstack/react-query";

//+++ empty components
import { RenderEmptyNotificationsComponent } from "@/components/settings/RenderEmptyNotifications";

//+++ datas api

//+ notifs from api
import useClientFetchNotifs from "@/hooks/useClientFetchNotifs";
//+++ datas from api / localstore

//+ notifs from api / localstore
import NotifItem from "@/components/settings/NotifItem";
import { useManageLoadNotifsClient } from "@/hooks/useManageLoadNotifsClient";
import { useLocalNotifsClient } from "@/stores/useLocalNotifsClient.store";
import { INotif } from "@/types/notifClient.type";
import { LegendList } from "@legendapp/list";
import { useCallback } from "react";

const NotifsScreen = () => {
  const { user } = useAuthClientStore();

  // keyExtractor en callback
  const keyExtractor = useCallback(
    (item: INotif, index: number) => index.toString(),
    []
  );

  // renderItem mémoïsé
  const renderItem = useCallback(
    ({ item }: { item: INotif }) => <NotifItem notif={item} />,
    []
  );

  ///
  const { data, isLoading, isError } = useClientFetchNotifs(user?.token + "");

  // console.log("-- data notifs -- ", JSON.stringify(data, null, 2));
  // console.log("-- isLoading  -- ", isLoading);
  // console.log("-- isError -- ", isError);

  const { errorLocal } = useLocalNotifsClient();

  //--> notifs depending of api / local store
  const notifs = useManageLoadNotifsClient({
    notifsDataApi: data?.data,
    loading: isLoading,

    // connected: onlineManager.isOnline(),
  });

  // errs
  const hasNotifs = notifs && notifs?.length > 0;
  const hasError =
    (onlineManager.isOnline() && isError) ||
    (!onlineManager.isOnline() && errorLocal);

  return (
    <PageWrapper>
      <View>
        <LegendList
          //   data={[1, 2, 3]}
          data={notifs}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          //   renderItem={({ item }: { item: number }) => (
          //     <NotifItem notif={item} />
          //   )}
          ListEmptyComponent={
            <RenderEmptyNotificationsComponent
              isLoading={isLoading}
              hasNotifs={hasNotifs}
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

export default NotifsScreen;
