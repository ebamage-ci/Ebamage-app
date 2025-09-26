import { IOrder } from "@/types/ordersClient.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface LocalOrdersClient {
  orders: IOrder[];
  errorLocal: boolean;
  setOrders: (orders: IOrder[]) => Promise<void>;
  loadOrders: () => Promise<void>;
  resetOrders: () => Promise<void>;
  setErrorLocal: (val: boolean) => void;
}

export const useLocalOrdersClient = create<LocalOrdersClient>((set) => ({
  orders: [],
  errorLocal: false,

  setErrorLocal: (val: boolean) => {
    set({ errorLocal: val });
  },

  setOrders: async (orders: IOrder[]) => {
    try {
      await AsyncStorage.setItem("@orders", JSON.stringify(orders));
      set({ orders });
    } catch (error) {
      console.log("Erreur setOrders():", error);
      set({ errorLocal: true });
    }
  },

  loadOrders: async () => {
    try {
      const data = await AsyncStorage.getItem("@orders");
      const orders = data ? JSON.parse(data) : [];
      set({ orders, errorLocal: false });
    } catch (error) {
      console.log("Erreur loadOrders():", error);
      set({ errorLocal: true });
    }
  },

  resetOrders: async () => {
    try {
      await AsyncStorage.removeItem("@orders");
      set({ orders: [] });
    } catch (error) {
      console.log("Erreur resetOrders():", error);
      set({ errorLocal: true });
    }
  },
}));
