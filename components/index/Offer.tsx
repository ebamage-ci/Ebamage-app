import { images } from "@/constants/Images";
import icons from "@/constants/icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Offer = () => {
  return (
    <View
      className="flex-1 flex-row w-full h-[172px] bg-white  overflow-hidden"
      style={styles.offer}>
      {/* Bande jaune */}
      <View className="w-[11px] bg-[#EFAD18]" />

      {/* Contenu de l'offre */}
      <View className="w-full bg-white py-4 pr-4">
        <View className="flex-1 flex-row items-center justify-between  bg-[#F9F9F9]">
          {/* left */}
          <Image source={images.manette} className="w-[144px] h-[108px]" />

          {/* right */}
          <View className="flex-1 ">
            <Text className="font-raleway-medium text-[16px]">
              Articles gaming
            </Text>
            <TouchableOpacity className="my-5  py-2 px-4  flex-row  rounded-md justify-between items-center  bg-[#F83758] ">
              <Text className="text-white font-raleway-semibold text-[10px]  ">
                Voir Maintenant
              </Text>

              <Image
                style={{ width: 20, height: 20 }}
                source={icons.arrowRight}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Offer;

const styles = StyleSheet.create({
  offer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
});
