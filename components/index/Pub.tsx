import { images } from "@/constants/Images";
import { Image, StyleSheet, View } from "react-native";

const Pub = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} resizeMode="cover" source={images.pub} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
});

export default Pub;
