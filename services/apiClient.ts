import { BASE_URL } from "@/constants/api";
import { useAuthClientStore } from "@/stores/useAuthClient.store";
import axios from "axios";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthClientStore.getState().user?.token;

  if (token) {
    // Si AxiosHeaders => méthode .set
    if (config.headers && typeof config.headers.set === "function") {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    // Si headers est un simple objet => fallback
    else if (config.headers) {
      (config.headers as any)["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      try {
        await useAuthClientStore.getState().logout();
      } catch {}
    }

    return Promise.reject(error);
  }
);

export default apiClient;
