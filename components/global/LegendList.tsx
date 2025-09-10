import { FlatList, StyleSheet } from "react-native";
import ArticleItem from "../index/RecommendationItem";

const data = [...new Array(10).keys()];

const LegendListe = () => {
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => <ArticleItem />}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    overflow: "hidden",
    backgroundColor: "transparent",
    borderRadius: 6,
  },
});

export default LegendListe;
