import { LegendList, LegendListRef, ViewToken } from "@legendapp/list";
import { memo, useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ITendanceArticleClient } from "@/types/tendanceArticleClient.type";
import { RenderEmptyTendanceArticleComponent } from "../index/RenderEmptyTendanceArticleComponent";
import TendanceItem from "../index/TendanceItem";

// memo du composant enfant
const MemoTendanceItem = memo(TendanceItem);

type viewabilityConfigProps = {
  changed: ViewToken[];
  viewableItems: ViewToken[];
};

type TendanceItemsProps = {
  data: ITendanceArticleClient[]; // 🔥 uniquement les données passées en props
  isLoading?: boolean; // optionnel pour EmptyComponent
  hasError?: boolean; // optionnel pour EmptyComponent
};

const ArticlesShopItems = ({
  data,
  isLoading = false,
  hasError = false,
}: TendanceItemsProps) => {
  const listRef = useRef<LegendListRef>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // keyExtractor
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

  const hasTendanceArticles = data && data.length > 0;

  return (
    <View style={styles.wrapper}>
      <LegendList
        ref={listRef}
        data={data}
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
            hasError={hasError}
            hasTendanceArticles={hasTendanceArticles}
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

export default ArticlesShopItems;
