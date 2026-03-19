"use client";

import { useDesignStore } from "@/store/designStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function FloatingCartButton() {
  const { cart } = useDesignStore();
  const pathname = usePathname();
  
  // Hide on cart and customize pages
  if (pathname === '/cart' || pathname === '/customize') {
    return null;
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="md:hidden fixed bottom-6 right-6 z-40"
    >
      <Link 
        href="/cart"
        className="relative group"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 bg-gradient-to-br from-highlight to-cyan-400 rounded-full shadow-2xl flex items-center justify-center border-2 border-white/20 backdrop-blur-sm"
        >
          <ShoppingCart 
            size={24} 
            strokeWidth={2}
            className="text-primary-dark transition-transform group-hover:scale-110"
          />
          
          {/* Cart Badge */}
          {cart.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
            >
              {cart.length}
            </motion.div>
          )}
          
          {/* Pulse Effect */}
          {cart.length > 0 && (
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-highlight rounded-full -z-10"
            />
          )}
        </motion.div>
        
        {/* Hover Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-primary-dark text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/20">
          View Cart ({cart.length} items)
          <div className="absolute top-full right-4 -mt-1 w-2 h-2 bg-primary-dark border-r border-b border-white/20 transform rotate-45"></div>
        </div>
      </Link>
    </motion.div>
  );
}
