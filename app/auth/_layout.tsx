import { Slot } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function IndexLayout() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Redirect href="/(root)/auth/otpScreen" /> */}
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
