import { Slot } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Redirect href="/(root-client)/extends/DeliveryScreen" /> */}

        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
