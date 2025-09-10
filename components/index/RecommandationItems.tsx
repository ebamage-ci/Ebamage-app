import icons from "@/constants/icons";
import { LegendList, LegendListRef } from "@legendapp/list";
import { useCallback, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import RecommendationItem from "./RecommendationItem";

const datas = [...new Array(10).keys()];

type viewabilityConfigProps = {
  changed: ViewToken[];
  viewableItems: ViewToken[];
};

const RecommandationItems = () => {
  const listRef = useRef<LegendListRef>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // fonction pour scroller jusqu'à un index donné
  const scrollToIndex = (index: number) => {
    listRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });

    // console.log("new current index : ", index);
  };

  // fonction pour scroller vers l'index suivant
  const scrollToNext = () => {
    scrollToIndex(currentIndex + 1);
  };

  // fonction pour scroller vers l'index précédent
  const scrollToPrevious = () => {
    scrollToIndex(currentIndex - 1);
  };

  // objet d'ensemble de conditions qui une fois remplis declenchent la fonction onViewableItemsChanged
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 30, //  quand 30% de l'item est visible
  };

  //  Callback pour récupérer l'élément visible
  const onViewableItemsChanged = useCallback(
    ({ viewableItems, changed }: viewabilityConfigProps) => {
      if (viewableItems?.length > 0) {
        const index = viewableItems[0].index || 0;

        // s'assurer que l'etat initial de currentIndex est 0

        if (!viewableItems[1]?.key) {
          // console.log("first");
          setCurrentIndex(0);
        }

        if (viewableItems[1]?.key) {
          // console.log("second");
          setCurrentIndex(index);
        }

        // console.log(" index : ", index);
        // console.log("currentIndex : ", currentIndex);

        // console.log(viewableItems);
      }
    },
    []
  );

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
        data={datas}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <RecommendationItem />}
        recycleItems
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
        //
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {/* flèche droite */}
      {currentIndex + 1 < datas.length - 1 && (
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

export default RecommandationItems;
