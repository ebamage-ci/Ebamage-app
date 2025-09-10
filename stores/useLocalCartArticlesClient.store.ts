import { articleItemCart } from "@/types/articlesCartClient.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface LocalCartClient {
  cart: articleItemCart[];
  prix_total: number;
  errorLocal: boolean;
  id_panier: string;
  setIdPanier: (id_panier: string) => void;
  setCart: (cart: articleItemCart[]) => Promise<void>;
  setPrixTotal: (prix_total: number) => void;
  loadCart: () => Promise<void>;
  resetCart: () => Promise<void>;
  setErrorLocal: (val: boolean) => void;
}

// fn calculate total price of cart
const calculateTotal = (cart: articleItemCart[]): number => {
  return cart.reduce((total, item) => total + item.prix_avec_quantite, 0);
};

export const useLocalCartArticlesClient = create<LocalCartClient>((set) => ({
  cart: [],
  id_panier: "",
  prix_total: 0,
  errorLocal: false,

  loadCart: async () => {
    try {
      // taking cart from asyncstorage and set cart to state
      const dataCart = await AsyncStorage.getItem("@cart");
      const cart = dataCart ? JSON.parse(dataCart) : [];
      const prix_total = calculateTotal(cart);
      set({ cart, prix_total, errorLocal: false });

      const id_panier = await AsyncStorage.getItem("@id_panier");
      set({ id_panier: id_panier || "" });
    } catch (error) {
      console.log("Erreur loadCart():", error);
      set({ errorLocal: true });
    }
  },

  setErrorLocal: (val: boolean) => {
    set({ errorLocal: val });
  },

  setCart: async (cart: articleItemCart[]) => {
    try {
      await AsyncStorage.setItem("@cart", JSON.stringify(cart));
      const prix_total = calculateTotal(cart);
      set({ cart, prix_total });
    } catch (error) {
      console.log("Erreur setCart():", error);
      set({ errorLocal: true });
    }
  },

  setPrixTotal: (prix_total: number) => {
    set({ prix_total });
  },

  resetCart: async () => {
    try {
      await AsyncStorage.removeItem("@cart");
      await AsyncStorage.removeItem("@id_panier");
      set({ cart: [], prix_total: 0, id_panier: "", errorLocal: false });
    } catch (error) {
      console.log("Erreur resetCart():", error);
      set({ errorLocal: true });
    }
  },

  setIdPanier: async (id: string) => {
    try {
      await AsyncStorage.setItem("@id_panier", id);
      set({ id_panier: id });
    } catch (error) {
      console.log("Erreur setIdPanier():", error);
      set({ errorLocal: true });
    }
  },
}));
