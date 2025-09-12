import { LegendList, LegendListRef, ViewToken } from "@legendapp/list";
import { memo, useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import TendanceItem from "./TendanceItem";

import { onlineManager } from "@tanstack/react-query";

//+++ datas api
import useClientFetchTendanceArticles from "@/hooks/useClientFetchTendanceArticles";

//+++ local datas
import { useLocalTendancesArticlesClient } from "@/stores/useLocalTendanceArticlesClient.store";

//+++ datas from api / localstore
import { useManageLoadTendanceArticlesClient } from "@/hooks/useManageLoadTendanceArticlesClient";
import { ITendanceArticleClient } from "@/types/tendanceArticleClient.type";
import { RenderEmptyTendanceArticleComponent } from "./RenderEmptyTendanceArticleComponent";

// memo du composant enfant
const MemoTendanceItem = memo(TendanceItem);

type viewabilityConfigProps = {
  changed: ViewToken[];
  viewableItems: ViewToken[];
};

const TendanceItems = () => {
  const listRef = useRef<LegendListRef>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // keyExtractor en callback
  const keyExtractor = useCallback(
    (item: ITendanceArticleClient, index: number) =>
      item?.hashid?.toString() ?? index.toString(),
    []
  );

  // renderItem mémoïsé
  const renderItem = useCallback(
    ({ item }: { item: ITendanceArticleClient }) => (
      <MemoTendanceItem article={item} />
    ),
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
  const { data, isLoading, isError } = useClientFetchTendanceArticles();
  const { errorLocal } = useLocalTendancesArticlesClient();

  const tendanceArticles = useManageLoadTendanceArticlesClient({
    tendanceArticlesDataApi: data?.data,
    loading: isLoading,
  });

  // console.log(
  //   "--tendances articles ===> ",
  //   JSON.stringify(tendanceArticles, null, 2)
  // );

  const hasTendanceArticles = tendanceArticles && tendanceArticles?.length > 0;
  const hasError =
    (onlineManager.isOnline() && isError) ||
    (!onlineManager.isOnline() && errorLocal);

  return (
    <View style={styles.wrapper}>
      <LegendList
        ref={listRef}
        data={tendanceArticles}
        numColumns={2}
        horizontal={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        recycleItems
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          !hasTendanceArticles && { width: "100%" },
        ]}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={
          <RenderEmptyTendanceArticleComponent
            isLoading={isLoading}
            hasTendanceArticles={hasTendanceArticles}
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
    // backgroundColor: "red",
  },

  columnWrapper: {
    justifyContent: "center",
    gap: 8,
  },
});

export default TendanceItems;
