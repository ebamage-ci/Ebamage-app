import Loader from "@/components/global/Loader";
import MatchArticleWordItem from "@/components/index/MatchArticleWordItem";
import ShopSearchItem from "@/components/index/ShopSearchItem";
import { useClientFetchSearchedArticles } from "@/hooks/useClientFetchSearchedArticles";
import { LegendList } from "@legendapp/list";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const SearchResultsScreen = () => {
  const { keyword } = useLocalSearchParams() as { keyword: string };
  const { data, isLoading, isError } = useClientFetchSearchedArticles(keyword);

  if (isLoading) {
    return <Loader />;
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
      <View className="px-5 py-2 gap-5">
        {/** boutiques */}
        <View>
          <Text className="font-raleway-semibold text-[18px] mb-2">
            {data?.data?.boutiques?.length || 0} Boutique(s)
          </Text>

          <View className="min-h-[180px] ">
            <LegendList
              data={data?.data?.boutiques || []}
              renderItem={({ item }) => <ShopSearchItem item={item} />}
              keyExtractor={(item) => item?.hashid?.toString()}
              ListEmptyComponent={
                <View className=" w-full flex-1 items-center justify-center py-10 ">
                  <Text className="font-raleway text-[14px] text-[#797979] ">
                    Aucune boutique trouvée
                  </Text>
                </View>
              }
              recycleItems
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 10,
                gap: 15,
                flexGrow: 1,
              }}
            />
          </View>
        </View>

        {/** articles */}
        <View>
          {/** nb articles */}
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-raleway-semibold text-[18px]">
              {data?.data?.articles?.length || 0} Article(s)
            </Text>
          </View>

          {/** list articles */}
          <View className="mt-4 min-h-[180px] ">
            <LegendList
              data={data?.data?.articles || []}
              numColumns={2}
              horizontal={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <MatchArticleWordItem article={item} />}
              recycleItems
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
              }}
              columnWrapperStyle={{
                gap: 12,
                // marginBottom: 12,
                // flexGrow: 1,
              }}
              ListEmptyComponent={() => (
                <View className="w-full h-full items-center justify-center">
                  <Text className="font-raleway text-[14px] text-[#797979]">
                    Aucun article trouvé
                  </Text>
                </View>
              )}
            />
          </View>
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
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default SearchResultsScreen;
