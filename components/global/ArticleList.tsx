import icons from "@/constants/icons";
import { LegendList, LegendListRef, ViewToken } from "@legendapp/list";
import { memo, useCallback, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ArticleItem from "./ArticleItem";

import { IArticle } from "@/types/article.type";

// memo du composant enfant
const MemoArticleItem = memo(ArticleItem);

type viewabilityConfigProps = {
  changed: ViewToken[];
  viewableItems: ViewToken[];
};

type ArticleListProps = {
  data: IArticle[];
};

const ArticleList = ({ data }: ArticleListProps) => {
  const listRef = useRef<LegendListRef>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // useCallback sur scrollToIndex
  const scrollToIndex = useCallback((index: number) => {
    listRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  }, []);

  // useCallback
  const scrollToNext = useCallback(() => {
    scrollToIndex(currentIndex + 1);
  }, [currentIndex, scrollToIndex]);

  const scrollToPrevious = useCallback(() => {
    scrollToIndex(currentIndex - 1);
  }, [currentIndex, scrollToIndex]);

  // keyExtractor en callback
  const keyExtractor = useCallback(
    (item: IArticle) => item?.hashid?.toString(),
    []
  );

  // renderItem mémoïsé
  const renderItem = useCallback(
    ({ item }: { item: IArticle }) => <MemoArticleItem article={item} />,
    []
  );

  // viewabilityHandler
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: viewabilityConfigProps) => {
      if (viewableItems?.length > 0) {
        const index = viewableItems[0].index ?? 0;

        if (!viewableItems[1]?.key) {
          setCurrentIndex(0);
        }

        if (viewableItems[1]?.key) {
          setCurrentIndex(index);
        }
      }
    },
    []
  );

  const hasArticles = data && data?.length > 0;

  return (
    <View style={styles.wrapper}>
      {/* flèche gauche */}
      {currentIndex > 0 && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.button, styles.leftButton]}
          onPress={scrollToPrevious}>
          <Image source={icons.left} style={styles.icon} />
        </TouchableOpacity>
      )}

      <LegendList
        ref={listRef}
        data={data}
        horizontal
        // style={{
        //   width: "100%",
        // }}
        // keyExtractor={(item) => item?.hashid?.toString()}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-center font-raleway-medium">
              Aucun article trouvé.
            </Text>
          </View>
        }
        recycleItems
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          !hasArticles && { width: "100%" },
        ]}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 30 }}
      />

      {/* flèche droite */}
      {currentIndex + 1 < data.length - 1 && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.button, styles.rightButton]}
          onPress={scrollToNext}>
          <Image source={icons.right} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    justifyContent: "center",
  },
  container: {
    gap: 10,
    padding: 1,
    overflow: "hidden",
    backgroundColor: "transparent",
    borderRadius: 6,
    // width: "100%",
  },
  button: {
    position: "absolute",
    zIndex: 10,
    width: 40,
    height: 40,
    top: "40%",
    backgroundColor: "#BBBBBB",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  leftButton: {
    left: 0,
  },
  rightButton: {
    right: 0,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default ArticleList;
