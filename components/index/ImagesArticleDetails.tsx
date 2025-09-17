import icons from "@/constants/icons";
import React, { useCallback, useRef } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import ImageArticleItem from "./ImageArticleItem";
//
// const data = [...new Array(3).keys()];
const width = Dimensions.get("window").width - 35;

// MEMO du composant enfant
const MemoizedImageArticleItem = React.memo(ImageArticleItem);

type carouselProps = {
  images: string[];
};

function ImagesArticleDetails({ images }: carouselProps) {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  //  useCallback pour fonctions constantes
  const scrollToPrevious = useCallback(() => {
    ref.current?.prev();
  }, []);

  const scrollToNext = useCallback(() => {
    ref.current?.next();
  }, []);

  const onPressPagination = useCallback(
    (index: number) => {
      ref.current?.scrollTo({
        count: index - progress.value,
        animated: true,
      });
    },
    [progress]
  );

  // useCallback pour éviter de recréer renderItem
  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => (
      <View key={index.toString()} style={{ flex: 1, marginHorizontal: 3 }}>
        <MemoizedImageArticleItem imageUrl={item} />
      </View>
    ),
    []
  );

  return (
    <View style={styles.wrapper}>
      {/* Flèche gauche */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button, styles.leftButton]}
        onPress={scrollToPrevious}>
        <Image source={icons.left} style={styles.icon} />
      </TouchableOpacity>

      {/* Images Carousel */}
      <Carousel
        ref={ref}
        width={width}
        height={250}
        autoPlayInterval={4000}
        data={images}
        loop={images.length > 1}
        pagingEnabled
        snapEnabled={false}
        onProgressChange={progress}
        overscrollEnabled
        style={{ gap: 30 }}
        containerStyle={{
          gap: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
        renderItem={renderItem}
      />

      {/* Flèche droite */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button, styles.rightButton]}
        onPress={scrollToNext}>
        <Image source={icons.right} style={styles.icon} />
      </TouchableOpacity>

      {/* Pagination */}
      <Pagination.Custom
        progress={progress}
        data={images}
        onPress={onPressPagination}
        size={10}
        activeDotStyle={{
          backgroundColor: "green",
          width: 12,
          height: 12,
        }}
        dotStyle={{
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: 50,
        }}
        containerStyle={{ gap: 5, marginTop: 5, alignItems: "center" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    justifyContent: "center",
    width: "100%",
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

export default ImagesArticleDetails;
