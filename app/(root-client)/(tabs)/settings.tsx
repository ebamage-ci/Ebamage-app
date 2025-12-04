import HistoryIcon from "@/assets/svgs/HistoryIcon";
import LogoutIcon from "@/assets/svgs/LogoutIcon";
import NotifIcon from "@/assets/svgs/NotifIcon";
import SettingItem from "@/components/settings/SettingItem";
import { router } from "expo-router";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import { useClientDeleteAccount } from "@/hooks/useClientDeleteAccount";
import { useClientLogout } from "@/hooks/useClientLogout";
import { useAuthClientStore } from "@/stores/useAuthClient.store";

import AntDesign from "@expo/vector-icons/AntDesign";

export default function HomeScreen() {
  const { logout } = useAuthClientStore();
  const { mutate: logoutClient } = useClientLogout();
  const { mutate: deleteClientAccount } = useClientDeleteAccount();

  // logout
  const onLogoutClickHandler = async () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Se deconnecter",
        // onPress: async () => {
        //   await logout();
        // },

        onPress: async () => {
          logoutClient(undefined, {
            onSuccess: async () => {
              await logout(); // Zustand cleanup + navigation
              setTimeout(() => {
                router.replace("/auth");
                // console.log("success logout");
              }, 0);
            },
            onError: () => {
              Alert.alert("Erreur", "Impossible de vous déconnecter.");
            },
          });
        },
      },
    ]);
  };

  // delete account
  const onDeleteAccountClickHandler = async () => {
    Alert.alert(
      "Suppression de compte",
      "Êtes-vous sûr de vouloir supprimer votre compte ? cette action est irréversible",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          onPress: () => {
            deleteClientAccount(undefined, {
              onSuccess: () => {
                logout(); // Zustand cleanup + navigation
              },
              onError: () => {
                Alert.alert("Erreur", "Impossible de supprimer votre compte.");
              },
            });
          },
        },
      ]
    );
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
          {/* <SettingItem
            label="Mon compte"
            icon={<UserIcon fill={"#777E90"} />}
          /> */}
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
            label="Supprimer mon compte"
            icon={<AntDesign name="delete" size={20} color="#930e0e" />}
            onPress={onDeleteAccountClickHandler}
          />

          {/* <SettingItem
            label="Centre d'aide"
            icon={<HelpCenterIcon fill={"#777E90"} />}
          /> */}
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
