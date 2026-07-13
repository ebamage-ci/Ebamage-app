import { images } from "@/constants/Images";
import { Image, StyleSheet, View } from "react-native";

const ImageArticleItem = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={imageUrl ? { uri: imageUrl } : images.imgarticleitem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});

export default ImageArticleItem;
