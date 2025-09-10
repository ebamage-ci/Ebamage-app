// import icons from "@/constants/icons";
// import { LegendList, LegendListRef, ViewToken } from "@legendapp/list";
// import { memo, useCallback, useRef, useState } from "react";
// import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

// import TendanceItem from "./TendanceItem";

// ///
// import { onlineManager } from "@tanstack/react-query";

// //+++ empty components

// //+++ datas api

// //+ tendances articles from api
// import useClientFetchTendanceArticles from "@/hooks/useClientFetchTendanceArticles";

// //+++ local datas

// //+ local tendance articles
// import { useLocalTendancesArticlesClient } from "@/stores/useLocalTendanceArticlesClient.store";

// //+++ datas from api / localstore

// //+ tendance articles from api / localstore
// import { useManageLoadTendanceArticlesClient } from "@/hooks/useManageLoadTendanceArticlesClient";
// import { ITendanceArticleClient } from "@/types/tendanceArticleClient.type";
// import { RenderEmptyTendanceArticleComponent } from "./RenderEmptyTendanceArticleComponent";

// // memo du composant enfant
// const MemoTendanceItem = memo(TendanceItem);

// type viewabilityConfigProps = {
//   changed: ViewToken[];
//   viewableItems: ViewToken[];
// };

// const TendanceItems = () => {
//   const listRef = useRef<LegendListRef>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // useCallback sur scrollToIndex
//   const scrollToIndex = useCallback((index: number) => {
//     listRef.current?.scrollToIndex({
//       index,
//       animated: true,
//     });
//   }, []);

//   // useCallback
//   const scrollToNext = useCallback(() => {
//     scrollToIndex(currentIndex + 1);
//   }, [currentIndex, scrollToIndex]);

//   const scrollToPrevious = useCallback(() => {
//     scrollToIndex(currentIndex - 1);
//   }, [currentIndex, scrollToIndex]);

//   // keyExtractor en callback
//   const keyExtractor = useCallback(
//     (item: ITendanceArticleClient) => item?.hashid?.toString(),
//     []
//   );

//   // renderItem mémoïsé
//   const renderItem = useCallback(
//     ({ item }: { item: ITendanceArticleClient }) => (
//       <MemoTendanceItem article={item} />
//     ),
//     []
//   );

//   // viewabilityHandler
//   const onViewableItemsChanged = useCallback(
//     ({ viewableItems }: viewabilityConfigProps) => {
//       if (viewableItems?.length > 0) {
//         const index = viewableItems[0].index ?? 0;

//         if (!viewableItems[1]?.key) {
//           setCurrentIndex(0);
//         }

//         if (viewableItems[1]?.key) {
//           setCurrentIndex(index);
//         }
//       }
//     },
//     []
//   );

//   ///
//   const { data, isLoading, isError } = useClientFetchTendanceArticles();

//   // console.log("-- data -- ", JSON.stringify(data, null, 2));
//   // console.log("-- isLoading  -- ", isLoading);
//   // console.log("-- isError -- ", isError);

//   const { errorLocal } = useLocalTendancesArticlesClient();

//   //--> tendance articles depending of connection
//   const tendanceArticles = useManageLoadTendanceArticlesClient({
//     tendanceArticlesDataApi: data?.data,
//     loading: isLoading,
//   });

//   const hasTendanceArticles = tendanceArticles && tendanceArticles?.length > 0;
//   const hasError =
//     (onlineManager.isOnline() && isError) ||
//     (!onlineManager.isOnline() && errorLocal);

//   return (
//     <View style={styles.wrapper}>
//       {/* flèche gauche */}
//       {currentIndex > 0 && (
//         <TouchableOpacity
//           activeOpacity={0.7}
//           style={[styles.button, styles.leftButton]}
//           onPress={scrollToPrevious}>
//           <Image source={icons.left} style={styles.icon} />
//         </TouchableOpacity>
//       )}

//       <LegendList
//         ref={listRef}
//         data={tendanceArticles}
//         horizontal
//         keyExtractor={keyExtractor}
//         renderItem={renderItem}
//         ListEmptyComponent={
//           <RenderEmptyTendanceArticleComponent
//             isLoading={isLoading}
//             hasTendanceArticles={hasTendanceArticles}
//             hasError={hasError}
//           />
//         }
//         recycleItems
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={[
//           styles.container,
//           !hasTendanceArticles && { width: "100%" },
//         ]}
//         onViewableItemsChanged={onViewableItemsChanged}
//         viewabilityConfig={{ itemVisiblePercentThreshold: 30 }}
//       />

//       {/* flèche droite */}
//       {currentIndex + 1 < tendanceArticles.length - 1 && (
//         <TouchableOpacity
//           activeOpacity={0.7}
//           style={[styles.button, styles.rightButton]}
//           onPress={scrollToNext}>
//           <Image source={icons.right} style={styles.icon} />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   wrapper: {
//     position: "relative",
//     justifyContent: "center",
//   },
//   container: {
//     gap: 10,
//     padding: 1,
//     overflow: "hidden",
//     borderRadius: 6,
//   },
//   button: {
//     position: "absolute",
//     zIndex: 10,
//     width: 40,
//     height: 40,
//     top: "40%",
//     backgroundColor: "#BBBBBB",
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   leftButton: {
//     left: 0,
//   },
//   rightButton: {
//     right: 0,
//   },
//   icon: {
//     width: 24,
//     height: 24,
//   },
// });

// export default TendanceItems;

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
  const [currentIndex, setCurrentIndex] = useState(0);

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

  console.log(
    "--tendances articles ===> ",
    JSON.stringify(tendanceArticles, null, 2)
  );

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
        columnWrapperStyle={{
          gap: 8,
        }}
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
    borderRadius: 6,
    backgroundColor: "red",
  },
});

export default TendanceItems;
