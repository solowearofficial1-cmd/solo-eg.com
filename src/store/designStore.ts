"use strict";

import { create } from 'zustand';

interface DesignState {
  color: string;
  logoDecal: string;
  fullDecal: string;
  isLogoTexture: boolean;
  isFullTexture: boolean;
  text: string;
  textColor: string;
  fontStyle: string;
  textScale: number;
  textPosition: [number, number, number];
  scale: number;
  size: string;
  setSize: (size: string) => void;
  logoScale: number;
  logoPosition: [number, number, number];
  setColor: (color: string) => void;
  setLogoDecal: (decal: string) => void;
  setFullDecal: (decal: string) => void;
  setText: (text: string) => void;
  setTextColor: (color: string) => void;
  setFontStyle: (font: string) => void;
  setTextScale: (scale: number) => void;
  setTextPosition: (position: [number, number, number]) => void;
  setScale: (scale: number) => void;
  setLogoScale: (scale: number) => void;
  setLogoPosition: (position: [number, number, number]) => void;
  toggleLogo: (val: boolean) => void;
  toggleFull: (val: boolean) => void;
  isLoggedIn: boolean;
  setLoggedIn: (val: boolean) => void;
  cart: any[];
  addToCart: (item: any) => void;
  removeFromCart: (timestamp: number) => void;
  clearCart: () => void;
  user: {
    name: string;
    email: string;
    joinDate: string;
    promoCode: string;
  } | null;
  setUser: (user: any) => void;
}

export const useDesignStore = create<DesignState>((set) => ({
  color: '#ffffff',
  logoDecal: '/next.svg',
  fullDecal: '/next.svg',
  isLogoTexture: false,
  isFullTexture: false,
  text: '',
  textColor: '#000000',
  fontStyle: 'Cormorant Garamond',
  textScale: 0.3,
  textPosition: [0, -0.1, 0.15],
  scale: 1.0,
  size: 'M',
  setSize: (size) => set({ size }),
  logoScale: 0.15,
  logoPosition: [0, 0.04, 0.15],
  setColor: (color) => set({ color }),
  setLogoDecal: (logoDecal) => set({ logoDecal }),
  setFullDecal: (fullDecal) => set({ fullDecal }),
  setText: (text) => set({ text }),
  setTextColor: (textColor) => set({ textColor }),
  setFontStyle: (fontStyle) => set({ fontStyle }),
  setTextScale: (textScale) => set({ textScale }),
  setTextPosition: (textPosition) => set({ textPosition }),
  setScale: (scale) => set({ scale }),
  setLogoScale: (logoScale) => set({ logoScale }),
  setLogoPosition: (logoPosition) => set({ logoPosition }),
  toggleLogo: (isLogoTexture) => set({ isLogoTexture }),
  toggleFull: (isFullTexture) => set({ isFullTexture }),
  isLoggedIn: false,
  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (timestamp) => set((state) => ({ cart: state.cart.filter((i) => i.timestamp !== timestamp) })),
  clearCart: () => set({ cart: [] }),
  user: null,
  setUser: (user) => set({ user }),
}));
