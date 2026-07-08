import { IOrder } from "@/types/ordersClient.type";
import { storage } from "@/stores/mmkv";
import { create } from "zustand";

interface LocalOrdersClient {
  orders: IOrder[];
  errorLocal: boolean;
  setOrders: (orders: IOrder[]) => void;
  loadOrders: () => void;
  resetOrders: () => void;
  setErrorLocal: (val: boolean) => void;
}

export const useLocalOrdersClient = create<LocalOrdersClient>((set) => ({
  orders: [],
  errorLocal: false,

  setErrorLocal: (val: boolean) => {
    set({ errorLocal: val });
  },

  setOrders: (orders: IOrder[]) => {
    try {
      const limited = Array.isArray(orders) ? orders.slice(0, 10) : [];
      storage.set("@orders", JSON.stringify(limited));
      set({ orders: limited });
    } catch (error) {
      console.log("Erreur setOrders():", error);
      set({ errorLocal: true });
    }
  },

  loadOrders: () => {
    try {
      const data = storage.getString("@orders");
      const orders = data ? JSON.parse(data) : [];
      set({ orders, errorLocal: false });
    } catch (error) {
      console.log("Erreur loadOrders():", error);
      set({ errorLocal: true });
    }
  },

  resetOrders: () => {
    try {
      storage.remove("@orders");
      set({ orders: [] });
    } catch (error) {
      console.log("Erreur resetOrders():", error);
      set({ errorLocal: true });
    }
  },
}));
