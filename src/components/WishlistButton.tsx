"use client";

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { motion } from 'framer-motion';

interface WishlistButtonProps {
  product: {
    id: number;
    name: string;
    price: string;
    category: string;
    subcategory: string;
    image: string;
    description: string;
  };
  className?: string;
}

export default function WishlistButton({ product, className = "" }: WishlistButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const isInWishlistLocal = isInWishlist(product.id);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent product card click
    
    if (isInWishlistLocal) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };
  
  return (
    <motion.button
      onClick={handleClick}
      className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 z-10 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Heart
        size={18}
        className={`transition-all duration-300 ${
          isInWishlistLocal
            ? 'fill-red-500 text-red-500'
            : 'text-white/60 hover:text-red-400'
        }`}
      />
      
      {isAnimating && !isInWishlistLocal && (
        <motion.div
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 pointer-events-none"
        >
          <Heart
            size={18}
            className="fill-red-500 text-red-500"
          />
        </motion.div>
      )}
    </motion.button>
  );
}
