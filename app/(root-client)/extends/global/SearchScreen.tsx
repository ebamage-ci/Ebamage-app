import SearchItem from "@/components/global/SearchItem";
import { LegendList } from "@legendapp/list";
import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

// import { searchItems } from "@/constants/mockDatas";
// import { useRouter } from "expo-router";

// log item cliqued
const SearchScreen = () => {
  // const router = useRouter();
  const onSearchItemPress = (item: any) => {
    console.log(item);

    router.push(`/extends/SearchResultsScreen?keyword=${item?.title}`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}>
      <ScrollView
        className="h-screen bg-white px-5"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
        }}>
        <View className="h-full">
          <LegendList
            data={[
              {
                id: 1,
                title: "chemise",
              },
              {
                id: 2,
                title: "chaussure",
              },
            ]}
            renderItem={({ item }) => (
              <SearchItem item={item} onPress={() => onSearchItemPress(item)} />
            )}
            keyExtractor={(item, index) => index.toString()}
            // ListEmptyComponent={
            //   <View className="flex-1 justify-center items-center py-5">
            //     <Text
            //       className="text-gray-500 font-raleway-medium text-[16px]
            //     text-center
            //     ">
            //       Votre historique de recherche apparaitra ici
            //     </Text>
            //   </View>
            // }
            // keyExtractor={(item) => item.id.toString()}
            recycleItems
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              {
                // paddingBottom: 10,
                // gap: 15,
                // flex: 1,
              }
            }
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     backgroundColor: "#F9F9F9",
//   },
// });

export default SearchScreen;
