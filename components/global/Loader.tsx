import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Loader({
  message = "Chargement...",
  size = "large",
  color = "#108036",
}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size as "large" | "small"} color={color} />
      {message ? <Text style={styles.text}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // occupe tout l’écran
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: "#333",
  },
});
