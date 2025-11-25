import icons from "@/constants/icons";
import { LegendList, LegendListRef } from "@legendapp/list";
import { memo, useCallback, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";

import ArticleItem from "./ArticleItem";

///
import { onlineManager } from "@tanstack/react-query";

//+++ empty components
import { RenderEmptyRcmdArticleComponent } from "../index/RenderEmptyRcmdArticleComponent";

//+++ datas api

//+ rcmd articles from api
import useClientFetchRecommandedArticles from "@/hooks/useClientFetchRecommandedArticles";

//+++ local datas

//+ local rcmd articles
import { useLocalRecmdArticlesClient } from "@/stores/useLocalRecmdArticlesClient.store";

//+++ datas from api / localstore

//+ rcmd articles from api / localstore
import { useManageLoadRcmdArticlesClient } from "@/hooks/useManageLoadRcmdArticlesClient";
import { IRecommandedArticleClient } from "@/types/recommandedArticleClient.type";

// memo du composant enfant
const MemoArticleItem = memo(ArticleItem);

type viewabilityConfigProps = {
  changed: ViewToken[];
  viewableItems: ViewToken[];
};

const ArticleItems = () => {
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
    (item: IRecommandedArticleClient) => item?.hashid?.toString(),
    []
  );

  // renderItem mémoïsé
  const renderItem = useCallback(
    ({ item }: { item: IRecommandedArticleClient }) => (
      <MemoArticleItem article={item} />
    ),
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

  ///
  const { data, isLoading, isError } = useClientFetchRecommandedArticles(1);

  // console.log("-- data -- ", JSON.stringify(data, null, 2));
  // console.log("-- isLoading  -- ", isLoading);
  // console.log("-- isError -- ", isError);

  const { errorLocal } = useLocalRecmdArticlesClient();

  //--> rcmd articles depending of connection
  const rcmdArticles = useManageLoadRcmdArticlesClient({
    rcmdArticlesDataApi: data?.data,
    loading: isLoading,
  });

  const hasRcmdArticles = rcmdArticles && rcmdArticles?.length > 0;
  const hasError =
    (onlineManager.isOnline() && isError) ||
    (!onlineManager.isOnline() && errorLocal);

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
        data={rcmdArticles}
        horizontal
        // style={{
        //   backgroundColor: "#FDcD",
        // }}
        // keyExtractor={(item) => item?.hashid?.toString()}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={
          <RenderEmptyRcmdArticleComponent
            isLoading={isLoading}
            hasRcmdArticles={hasRcmdArticles}
            hasError={hasError}
          />
        }
        recycleItems
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          !hasRcmdArticles && { width: "100%" },
        ]}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 30 }}
      />

      {/* flèche droite */}
      {currentIndex + 1 < rcmdArticles.length - 1 && (
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
    // backgroundColor: "red",
    borderRadius: 6,
    height: 180,
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

export default ArticleItems;
