import { LegendList, LegendListRef, ViewToken } from "@legendapp/list";
import { memo, useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import useClientFetchRecommandedArticles from "@/hooks/useClientFetchRecommandedArticles";
import { useManageLoadRcmdArticlesClient } from "@/hooks/useManageLoadRcmdArticlesClient";
import { useLocalRecmdArticlesClient } from "@/stores/useLocalRecmdArticlesClient.store";
import { IRecommandedArticleClient } from "@/types/recommandedArticleClient.type";
import { onlineManager } from "@tanstack/react-query";
import ArticleItem from "../global/ArticleItem";
import { RenderEmptyRcmdArticleComponent } from "./RenderEmptyRcmdArticleComponent";

const MemoArticleItem = memo(ArticleItem);

type viewabilityConfigProps = {
  changed: ViewToken[];
  viewableItems: ViewToken[];
};

export default function RecommandedArticles() {
  const listRef = useRef<LegendListRef>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const {
    data,

    fetchNextPage,
    hasNextPage,

    isFetchingNextPage,
    status,
  } = useClientFetchRecommandedArticles();

  //   console.log("rcmd ---> ", JSON.stringify(data, null, 2));

  const rcmdData = data?.pages.flatMap((p) => p.data) ?? [];

  const { errorLocal } = useLocalRecmdArticlesClient();

  const rcmdArticles = useManageLoadRcmdArticlesClient({
    rcmdArticlesDataApi: rcmdData,
    loading: status === "pending",
  });

  const keyExtractor = useCallback(
    (item: IRecommandedArticleClient, index: number) =>
      `${item?.hashid?.toString()}-${index}`, //
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: IRecommandedArticleClient }) => (
      <MemoArticleItem article={item} />
    ),
    []
  );

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: viewabilityConfigProps) => {
      if (viewableItems?.length > 0) {
        const index = viewableItems[0].index ?? 0;
        setCurrentIndex(index);
      }
    },
    []
  );

  const hasRcmdArticles = rcmdArticles && rcmdArticles.length > 0;
  const hasError =
    (onlineManager.isOnline() && status === "error") ||
    (!onlineManager.isOnline() && errorLocal);

  return (
    <View style={styles.wrapper}>
      <LegendList
        ref={listRef}
        data={rcmdArticles}
        numColumns={2}
        horizontal={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        recycleItems
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          !hasRcmdArticles && { width: "100%" },
        ]}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={
          <RenderEmptyRcmdArticleComponent
            isLoading={status === "pending"}
            hasRcmdArticles={hasRcmdArticles}
            hasError={hasError}
          />
        }
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 30 }}
      />

      {/*  Pagination corrigée */}
      <View className="flex-row justify-center items-center gap-2 my-4">
        {hasNextPage && (
          <TouchableOpacity
            className="bg-primary-300 py-3 px-6 rounded-full flex-row items-center gap-2"
            onPress={() => fetchNextPage()}
            disabled={isFetchingNextPage}>
            {isFetchingNextPage ? (
              <>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text className="text-white font-raleway-medium text-[14px]">
                  Chargement...
                </Text>
              </>
            ) : (
              <Text className="text-white font-raleway-medium text-[14px]">
                Voir plus
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

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
