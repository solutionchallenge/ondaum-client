import { create } from "zustand";

type KeyboardStore = {
  isKeyboardOpen: boolean;
  setKeyboardOpen: (val: boolean) => void;
};

export const useKeyboardStore = create<KeyboardStore>((set) => ({
  isKeyboardOpen: false,
  setKeyboardOpen: (val) => set({ isKeyboardOpen: val }),
}));
