import HistoryIcon from "@/assets/svgs/HistoryIcon";
import LogoutIcon from "@/assets/svgs/LogoutIcon";
import NotifIcon from "@/assets/svgs/NotifIcon";
import UserIcon from "@/assets/svgs/UserIcon";
import SettingItem from "@/components/settings/SettingItem";
import { router } from "expo-router";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import HelpCenterIcon from "@/assets/svgs/HelpCenterIcon";
import { useAuthClientStore } from "@/stores/useAuthClient.store";

export default function HomeScreen() {
  const { logout } = useAuthClientStore();

  // logout
  const onLogoutClickHandler = async () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Se deconnecter",
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 20,
        backgroundColor: "white",
      }}>
      <View style={styles.container}>
        {/** setting items */}

        <View className="gap-3 flex-[0.7] ">
          <SettingItem
            label="Mon compte"
            icon={<UserIcon fill={"#777E90"} />}
          />
          <SettingItem
            label="Notifications"
            icon={<NotifIcon fill={"#777E90"} stroke={"#fff"} />}
            onPress={() =>
              router.push("/(root-client)/extends/NotificationsScreen")
            }
          />
          <SettingItem
            label="Mes commandes"
            icon={<HistoryIcon fill={"#777E90"} />}
            onPress={() => router.push("/(root-client)/extends/OrdersScreen")}
          />
          <SettingItem
            label="Centre d'aide"
            icon={<HelpCenterIcon fill={"#777E90"} />}
          />
          <SettingItem
            label="Déconnexion"
            icon={<LogoutIcon fill={"#ED1010"} />}
            onPress={onLogoutClickHandler}
          />
        </View>

        {/** app name and version */}

        <View className="flex-[0.3] items-start">
          <Text className="text-[#20202073] font-raleway-extra-bold text-[20px] ">{`${"Ebamage"} `}</Text>
          <Text className="text-[#000] font-raleway text-[12px] ">{`v${"1.0.0"}`}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
});
