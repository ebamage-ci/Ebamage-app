import { images } from "@/constants/Images";
import { Image, StyleSheet, View } from "react-native";

const ImageArticleItem = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={imageUrl ? { uri: imageUrl } : images.imgarticleitem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginVertical: 10,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});

export default ImageArticleItem;
