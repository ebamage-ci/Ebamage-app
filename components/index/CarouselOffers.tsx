import { memo, useCallback, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import Pub from "./Pub";

const data = [...new Array(3).keys()];
const width = Dimensions.get("window").width - 35;

// MEMO du composant enfant
const MemoizedPub = memo(Pub);

function CarouselOffers() {
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

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
    ({ index }: { index: number }) => (
      <View key={index.toString()} style={{ flex: 1, marginHorizontal: 3 }}>
        <MemoizedPub />
      </View>
    ),
    []
  );

  return (
    <View style={styles.wrapper}>
      {/* Images Carousel */}
      <Carousel
        ref={ref}
        width={width}
        height={200}
        autoPlayInterval={4000}
        data={data}
        loop
        autoPlay
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

      {/* Pagination */}
      <Pagination.Custom
        progress={progress}
        data={data}
        onPress={onPressPagination}
        size={10}
        activeDotStyle={{
          backgroundColor: "#108036",
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

export default CarouselOffers;
