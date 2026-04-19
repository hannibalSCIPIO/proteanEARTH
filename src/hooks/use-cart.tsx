import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OrderItem } from "@workspace/api-client-react";

export interface CartItem {
  id: string; // unique ID for the cart item (since same product can have different photos)
  productId: number;
  productName: string;
  priceCents: number;
  quantity: number;
  photoUrl: string; // Base64 data URL
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          // If we add an item with the exact same photo and product, we could just bump quantity.
          // But with base64 data URLs, comparing them can be slow or exact match is unlikely if re-uploaded.
          // We'll treat every upload as a unique cart item for simplicity and correct display.
          const id = Math.random().toString(36).substring(2, 9);
          return { items: [...state.items, { ...item, id }] };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getCartTotal: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.priceCents * item.quantity, 0);
      },
      getItemCount: () => {
        const state = get();
        return state.items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "snapmagnet-cart",
    }
  )
);
