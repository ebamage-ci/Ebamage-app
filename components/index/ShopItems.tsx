import { LegendList, LegendListRef, ViewToken } from "@legendapp/list";
import { memo, useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import ShopSearchItem from "./ShopSearchItem";

import { onlineManager } from "@tanstack/react-query";

//+++ datas api
import useClientFetchShops from "@/hooks/useClientFetchShops";

//+++ local datas
import { useLocalShopsStore } from "@/stores/useLocalShops.store";

//+++ datas from api / localstore
import { useManageLoadShops } from "@/hooks/useManageLoadShops";
import { IShop } from "@/types/shop.type";
import { RenderEmptyShopsComponent } from "./RenderEmptyShopsComponent";
// memo du composant enfant
const MemoShopSearchItem = memo(ShopSearchItem);

type viewabilityConfigProps = {
  changed: ViewToken[];
  viewableItems: ViewToken[];
};

const ShopItems = () => {
  const listRef = useRef<LegendListRef>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // keyExtractor en callback
  const keyExtractor = useCallback(
    (item: IShop, index: number) =>
      item?.hashid?.toString() ?? index.toString(),
    []
  );

  // renderItem mémoïsé
  const renderItem = useCallback(
    ({ item }: { item: IShop }) => <MemoShopSearchItem item={item} />,
    []
  );

  // viewabilityHandler
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: viewabilityConfigProps) => {
      if (viewableItems?.length > 0) {
        const index = viewableItems[0].index ?? 0;
        setCurrentIndex(index);
      }
    },
    []
  );

  /// fetch data
  const { data, isLoading, isError } = useClientFetchShops();
  const { errorLocal } = useLocalShopsStore();

  const shops = useManageLoadShops({
    shopsDataApi: data?.data,
    loading: isLoading,
  });

  const hasShops = shops && shops?.length > 0;
  const hasError =
    (onlineManager.isOnline() && isError) ||
    (!onlineManager.isOnline() && errorLocal);

  return (
    <View style={styles.wrapper}>
      <LegendList
        ref={listRef}
        data={shops}
        numColumns={2}
        horizontal={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        recycleItems
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          !hasShops && { width: "100%" },
        ]}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={
          <RenderEmptyShopsComponent
            isLoading={isLoading}
            hasShops={hasShops}
            hasError={hasError}
          />
        }
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 30 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    gap: 8,
    padding: 4,
    flexGrow: 1,
    justifyContent: "center",
    borderRadius: 6,
  },
  columnWrapper: {
    justifyContent: "center",
    gap: 8,
  },
});

export default ShopItems;
