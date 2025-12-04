import { logoutClient } from "@/services/authServiceClient";

export const handleClientLogout = async () => {
  try {
    // 1. Appel API logout
    await logoutClient();

    // // 2. Nettoyage storage
    // await AsyncStorage.clear();

    return true;
  } catch (error) {
    console.log("Erreur handleClientLogout():", error);
    return false;
  }
};
