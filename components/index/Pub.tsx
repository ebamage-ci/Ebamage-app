import { images } from "@/constants/Images";
import { IPub } from "@/types/pubClient.type";
import { Image, StyleSheet, View } from "react-native";

const Pub = ({ pub }: { pub: IPub }) => {
  const { image_pub } = pub;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={image_pub ? { uri: image_pub } : images.pub}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});

export default Pub;
