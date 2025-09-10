import HelpIcon from "@/assets/svgs/HelpIcon";
import HistoryIcon from "@/assets/svgs/HistoryIcon";
import LogoutIcon from "@/assets/svgs/LogoutIcon";
import NotifIcon from "@/assets/svgs/NotifIcon";
import UserIcon from "@/assets/svgs/UserIcon";
import WalletIcon from "@/assets/svgs/WalletIcon";
import Profil from "@/components/settings/Profil";
import SettingItem from "@/components/settings/SettingItem";
import { router } from "expo-router";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

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
        {/** profil container */}
        <View className="flex-[0.4] justify-center items-center  ">
          <Profil />
        </View>

        {/** setting items */}

        <View className="gap-3 flex-[0.6] ">
          <SettingItem label="Gestion de compte" icon={<UserIcon />} />
          <SettingItem label="Notifications" icon={<NotifIcon />} />
          <SettingItem label="Compte TDLPay" icon={<WalletIcon />} />
          <SettingItem
            label="Historique des commandes"
            icon={<HistoryIcon />}
            onPress={() => router.push("/(root-client)/extends/OrdersScreen")}
          />
          <SettingItem label="Aide et assistance" icon={<HelpIcon />} />
          <SettingItem
            label="Déconnexion"
            icon={<LogoutIcon />}
            onPress={onLogoutClickHandler}
          />
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
