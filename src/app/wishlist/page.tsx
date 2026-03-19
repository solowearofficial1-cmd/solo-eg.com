"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWishlistStore } from "@/store/wishlistStore";
import { useDesignStore } from "@/store/designStore";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, ArrowRight, X, Trash2 } from "lucide-react";
import WishlistButton from "@/components/WishlistButton";

export default function WishlistPage() {
  const router = useRouter();
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addToCart } = useDesignStore();
  const [addedIds, setAddedIds] = useState<number[]>([]);

  const handleAddToCart = (product: any) => {
    setAddedIds((prev) => [...prev, product.id]);
    addToCart({ ...product, timestamp: Date.now() });
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((item) => item !== product.id));
    }, 3000);
    // Remove from wishlist after adding to cart
    removeFromWishlist(product.id);
    // Redirect to cart after adding
    setTimeout(() => router.push('/cart'), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark via-zinc-900 to-zinc-800 pt-24">
      {/* Hero Section */}
      <section className="relative px-8 py-16 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(173,235,255,0.08)_0%,transparent_70%)]" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="text-red-500 fill-red-500" size={32} />
            <h1 className="text-5xl md:text-7xl font-serif tracking-tight text-white">My Wishlist</h1>
          </div>
          <p className="text-highlight/60 uppercase tracking-widest text-[10px] mb-8">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
          </p>
          <div className="h-[1px] w-32 bg-highlight/40 mx-auto" />
        </motion.div>
      </section>

      {/* Wishlist Content */}
      <section className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24"
            >
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                <Heart size={40} className="text-white/20" />
              </div>
              <h3 className="text-2xl font-serif text-white mb-4">Your wishlist is empty</h3>
              <p className="text-white/60 mb-8">Start adding products you love for later consideration</p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/products"
                  className="inline-block bg-highlight text-primary-dark px-8 py-3 text-xs uppercase tracking-widest font-bold rounded-full hover:bg-white transition-all duration-300"
                >
                  Browse Products
                </Link>
                <Link
                  href="/customize"
                  className="inline-block glass border border-white/20 text-white px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-highlight hover:text-primary-dark transition-all duration-300 rounded-full"
                >
                  Customize Design
                </Link>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Actions Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-8"
              >
                <p className="text-white/60">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in your wishlist
                </p>
                <button
                  onClick={clearWishlist}
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm"
                >
                  <Trash2 size={16} />
                  Clear All
                </button>
              </motion.div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {items.map((product, index) => {
                  const isAdded = addedIds.includes(product.id);
                  
                  return (
                    <motion.article 
                      key={product.id} 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="group"
                    >
                      <div className="relative aspect-[4/5] bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl overflow-hidden mb-6 border border-white/10 transition-all duration-500 hover:border-highlight/30 hover:shadow-[0_0_40px_rgba(173,235,255,0.2)]">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-500/30 flex items-center justify-center transition-all duration-300 hover:bg-red-500/30 hover:scale-110 z-10"
                        >
                          <X size={18} className="text-red-400" />
                        </button>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-highlight/20 text-highlight text-[8px] uppercase tracking-widest font-bold rounded-full backdrop-blur-sm">
                            {product.category}
                          </span>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Link
                            href={`/products/${product.id}`}
                            className="glass px-4 py-2 text-[8px] uppercase tracking-widest shadow-lg border border-white/20 hover:bg-highlight hover:text-primary-dark whitespace-nowrap rounded-full"
                          >
                            View Details
                          </Link>
                          <button 
                            onClick={() => handleAddToCart(product)}
                            className={`${isAdded ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-highlight text-primary-dark border-highlight hover:bg-white'} px-4 py-2 text-[8px] uppercase tracking-widest font-bold shadow-lg border transition-all duration-300 whitespace-nowrap rounded-full`}
                          >
                            {isAdded ? 'Added ✓' : 'Move to Cart'}
                          </button>
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-serif text-white group-hover:text-highlight transition-colors line-clamp-2">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-widest text-highlight/40">{product.category}</span>
                          <span className="text-sm font-bold text-highlight">{product.price}</span>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
