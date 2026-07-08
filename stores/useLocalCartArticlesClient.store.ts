import { storage } from "@/stores/mmkv";
import { articleItemCart } from "@/types/articlesCartClient.type";
import { create } from "zustand";

interface LocalCartClient {
  cart: articleItemCart[];
  prix_total: number;
  errorLocal: boolean;
  id_panier: string;
  setIdPanier: (id_panier: string) => void;
  setCart: (cart: articleItemCart[]) => void;
  setPrixTotal: (prix_total: number) => void;
  loadCart: () => void;
  resetCart: () => void;
  setErrorLocal: (val: boolean) => void;
}

const calculateTotal = (cart: articleItemCart[]): number => {
  return cart.reduce((total, item) => total + item.prix_avec_quantite, 0);
};

export const useLocalCartArticlesClient = create<LocalCartClient>((set) => ({
  cart: [],
  id_panier: "",
  prix_total: 0,
  errorLocal: false,

  loadCart: () => {
    try {
      const dataCart = storage.getString("@cart");
      const cart = dataCart ? JSON.parse(dataCart) : [];
      const prix_total = calculateTotal(cart);
      const id_panier = storage.getString("@id_panier") || "";
      set({ cart, prix_total, id_panier, errorLocal: false });
    } catch (error) {
      console.log("Erreur loadCart():", error);
      set({ errorLocal: true });
    }
  },

  setErrorLocal: (val: boolean) => {
    set({ errorLocal: val });
  },

  setCart: (cart: articleItemCart[]) => {
    try {
      storage.set("@cart", JSON.stringify(cart));
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

  resetCart: () => {
    try {
      storage.remove("@cart");
      storage.remove("@id_panier");
      set({ cart: [], prix_total: 0, id_panier: "", errorLocal: false });
    } catch (error) {
      console.log("Erreur resetCart():", error);
      set({ errorLocal: true });
    }
  },

  setIdPanier: (id: string) => {
    try {
      storage.set("@id_panier", id);
      set({ id_panier: id });
    } catch (error) {
      console.log("Erreur setIdPanier():", error);
      set({ errorLocal: true });
    }
  },
}));
