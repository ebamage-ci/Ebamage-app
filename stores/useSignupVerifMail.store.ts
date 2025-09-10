import { create } from "zustand";

export const useSignupVerifMailStore = create((set) => ({
  email: "",
  setMail: (email: string) => set({ email }),
}));
