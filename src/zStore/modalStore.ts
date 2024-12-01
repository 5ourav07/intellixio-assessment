import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

interface ModalState {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

export const useModalStore = create<ModalState>()(
  persist(
    (set) => ({
      selectedProduct: null,
      setSelectedProduct: (product) => set({ selectedProduct: product }),
    }),
    {
      name: "modal-state", // Key for localStorage
    }
  )
);
