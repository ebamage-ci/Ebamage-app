import MatchArticleWordItem from "@/components/index/MatchArticleWordItem";
import { useClientFetchSearchedArticles } from "@/hooks/useClientFetchSearchedArticles";
import { LegendList } from "@legendapp/list";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const ArticlesCategoryScreen = () => {
  const { keyword } = useLocalSearchParams() as { keyword: string };
  const { data, isLoading, isError } = useClientFetchSearchedArticles(keyword);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>Une erreur s&apos;est produite</Text>;
  }

  return (
    <ScrollView
      style={styles.container}
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 20,
      }}>
      <View style={styles.container} className="px-5 py-2 ">
        {/** nb articles -- filter button */}
        <View className="flex-row justify-between items-center flex-[.1] ">
          <Text className="font-raleway-semibold text-[18px]  ">
            {data?.data.articles.length} Articles
          </Text>
        </View>

        {/** list articles */}
        <View className=" flex-[.3] mt-10">
          <LegendList
            data={data?.data.articles || []}
            numColumns={2}
            horizontal={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <MatchArticleWordItem article={item} />
            )}
            recycleItems
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listStyleContent}
            columnWrapperStyle={{
              // justifyContent: "space-between",
              gap: 4,
              // marginBottom: 12,
              // backgroundColor: "red",
            }}
            ListEmptyComponent={() => (
              <View className="flex-1 items-center justify-center">
                <Text className="font-raleway text-[14px] text-[#797979]">
                  Aucun article trouvé
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#FDFDFD",
  },

  listStyleContent: {
    // gap: 10,
    padding: 1,
    overflow: "hidden",

    paddingTop: 4,
    borderRadius: 6,
  },
});

export default ArticlesCategoryScreen;
