import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  customDesign?: {
    color: string;
    text: string;
    textColor: string;
    fontStyle: string;
    textScale: number;
    textPosition: number[];
    size: string;
    logoScale: number;
    logoPosition: number[];
    isLogoTexture: boolean;
  };
}

interface WishlistItem extends Product {
  addedAt: number;
}

interface WishlistStore {
  items: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToWishlist: (product) => {
        const { items, isInWishlist } = get();
        if (!isInWishlist(product.id)) {
          const wishlistItem: WishlistItem = {
            ...product,
            addedAt: Date.now(),
          };
          set({ items: [...items, wishlistItem] });
        }
      },
      
      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },
      
      isInWishlist: (productId) => {
        const { items } = get();
        return items.some((item) => item.id === productId);
      },
      
      clearWishlist: () => {
        set({ items: [] });
      },
      
      getWishlistCount: () => {
        const { items } = get();
        return items.length;
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
