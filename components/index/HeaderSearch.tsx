import icons from "@/constants/icons";
import { useClientFetchSuggestions } from "@/hooks/useClientFetchSuggestions";
import { useSearchSuggestByQueryClientStore } from "@/stores/useSearchSuggestByQueryClient.store";

import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Searchbar } from "react-native-paper";

const HeaderSearch = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { setSuggestions } = useSearchSuggestByQueryClientStore();

  const { refetch } = useClientFetchSuggestions(searchQuery);

  // debounce search query
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(() => {
      console.log("query :", searchQuery);
      refetch().then((res) => {
        // if (!res?.data?.data) return;

        setSuggestions(res?.data?.data || []);
      });
    }, 200);

    return () => clearTimeout(handler); // nettoie à chaque changement
  }, [searchQuery, refetch, setSuggestions]);

  // submit search query
  const handleSearchSubmit = () => {
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery.length < 2) {
      Alert.alert(
        "Recherche invalide",
        "Veuillez entrer au moins 2 lettres pour effectuer une recherche."
      );
      return;
    }

    router.push(`/extends/SearchResultsScreen?keyword=${trimmedQuery}`);
  };
  const onChangeTextQueryHandler = (text: string) => {
    setSearchQuery(text);
  };

  return (
    <View className="bg-[#FDFDFD] px-5">
      <View className="mt-10">
        <Searchbar
          placeholder="Rechercher quelque chose ..."
          onChangeText={onChangeTextQueryHandler}
          value={searchQuery}
          iconColor="#797979"
          elevation={0}
          autoFocus={true}
          inputStyle={{
            color: "black",
            fontWeight: "500",
            fontSize: 14,
            fontFamily: "Raleway-Regular",
          }}
          icon="arrow-left"
          onIconPress={() => router.back()}
          onSubmitEditing={handleSearchSubmit}
          style={{
            backgroundColor: "#F8F8F8",
            borderColor: "#707070",
            borderWidth: 0.2,
            borderRadius: 20,
          }}
          clearIcon={icons.cancel}
          placeholderTextColor={"#BBBBBB"}
        />
      </View>
    </View>
  );
};

export default HeaderSearch;
