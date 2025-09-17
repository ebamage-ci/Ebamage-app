import icons from "@/constants/icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";
import { Searchbar } from "react-native-paper";

const HeaderSearch = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <View className="bg-[#FDFDFD] px-5">
      <View className="mt-10">
        <Searchbar
          placeholder="Rechercher un article..."
          onChangeText={setSearchQuery}
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
