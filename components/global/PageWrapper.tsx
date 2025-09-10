import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}>
      <ScrollView
        style={styles.container}
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 25,
        }}>
        <View style={styles.container} className="px-5 py-2 ">
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
  },
});

export default PageWrapper;
