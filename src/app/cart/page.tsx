"use client";

import { useDesignStore } from "@/store/designStore";
import { Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, user } = useDesignStore();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  const subtotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return acc + price;
  }, 0);
  
  const total = subtotal - discount;

  const applyPromoCode = () => {
    setPromoError('');
    
    // Check if user has a promo code and if it matches
    if (user?.promoCode && promoCode.trim().toUpperCase() === user.promoCode.toUpperCase()) {
      // Valid promo code matches user's code
      const discountAmount = subtotal * 0.15;
      setDiscount(discountAmount);
    } else {
      setPromoError('Invalid promo code. Check your profile for your code.');
      setDiscount(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark via-zinc-900 to-zinc-800 px-8 pt-24 pb-24 text-white">
      <header className="mb-10">
        <h1 className="text-4xl font-serif mb-3 tracking-tight uppercase">Your Cart</h1>
        <div className="flex items-center gap-4">
          <div className="h-[1px] w-24 bg-highlight" />
          <p className="text-[10px] uppercase tracking-widest text-highlight/60">
            {cart.length} {cart.length === 1 ? 'Item' : 'Items'} Selected
          </p>
        </div>
      </header>

      {cart.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-24 space-y-8 bg-white/5 border border-white/10 rounded-3xl"
        >
          <div className="flex justify-center text-highlight/20">
            <ShoppingBag size={64} strokeWidth={1} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-serif italic">Your cart is empty</h2>
            <p className="text-xs text-white/40 uppercase tracking-widest">Discover our latest collection</p>
          </div>
          <div className="flex justify-center pt-4">
            <Link 
              href="/products"
              className="inline-flex items-center gap-3 bg-highlight text-primary-dark px-10 py-4 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all duration-300 rounded-full shadow-lg"
            >
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {cart.map((item, idx) => (
                <motion.div 
                  key={`${item.id}-${item.timestamp || idx}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group flex items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-highlight/20 transition-all"
                >
                  <div className="w-24 aspect-[4/5] bg-secondary-dark/30 rounded-lg overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-serif">{item.name}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-highlight/40">{item.category}</p>
                    <p className="text-sm font-medium text-highlight">{item.price}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.timestamp)}
                    className="p-3 text-white/20 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} strokeWidth={1.5} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <button 
              onClick={clearCart}
              className="text-[10px] uppercase tracking-widest text-white/20 hover:text-red-400 transition-colors pt-4"
            >
              Clear All Items
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 p-8 bg-white/5 border border-white/10 rounded-3xl space-y-8">
              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-highlight/80">Order Summary</h3>
              
              <div className="space-y-4 border-y border-white/5 py-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400 flex items-center gap-2">
                      <Tag size={14} />
                      Discount (SOLO15)
                    </span>
                    <span className="text-green-400">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Shipping</span>
                  <span className="text-highlight text-[10px] uppercase tracking-widest">Complimentary</span>
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-highlight/80">Promo Code</h4>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-highlight transition-colors"
                  />
                  <button 
                    onClick={applyPromoCode}
                    className="px-6 py-3 bg-highlight text-primary-dark text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-white transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-xs text-red-400 uppercase tracking-widest">{promoError}</p>
                )}
                {discount > 0 && (
                  <p className="text-xs text-green-400 uppercase tracking-widest">🎉 Promo code applied!</p>
                )}
              </div>

              <div className="flex justify-between items-end">
                <span className="text-xs uppercase tracking-widest text-white/40">Total</span>
                <span className="text-3xl font-serif text-highlight">${total.toFixed(2)}</span>
              </div>

              <button className="w-full bg-highlight text-primary-dark py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all duration-300 shadow-lg glass-hover rounded-full">
                Checkout
              </button>
              
              <p className="text-[8px] text-center text-white/20 uppercase tracking-[0.2em]">
                Secure Payment • Global Shipping
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
