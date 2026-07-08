import { logoutClient } from "@/services/authServiceClient";

export const handleClientLogout = async () => {
  try {
    await logoutClient();
    return true;
  } catch (error) {
    console.log("Erreur handleClientLogout():", error);
    return false;
  }
};
