import ShopItems from "@/components/index/ShopItems";
import icons from "@/constants/icons";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const shop = () => {
  return (
    <ScrollView style={styles.container}>
      <View className="flex-1 p-4">
        {/* Titre des boutiques */}
        <View className="flex-1 my-4 flex-row justify-between items-center p-3 rounded-lg bg-primary-300">
          <View>
            <Text className="font-raleway-medium text-[16px] text-white">
              Boutiques disponibles
            </Text>
            <Text className="font-raleway text-[12px] text-white">
              Découvrez nos boutiques partenaires
            </Text>
          </View>

          <View className="border border-white py-2 px-4 flex-row rounded-md justify-between items-center">
            <Image
              style={{ width: 15, height: 15 }}
              source={icons.arrow_down}
              resizeMode="contain"
              tintColor={"#fff"}
            />
          </View>
        </View>

        {/* Liste des boutiques */}
        <View className="flex-1 p-1 ">
          <ShopItems />
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
});

export default shop;
