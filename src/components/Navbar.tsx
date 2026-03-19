"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useDesignStore } from "@/store/designStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { ShoppingCart, User, UserPlus, Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { isLoggedIn, cart } = useDesignStore();
  const { getWishlistCount } = useWishlistStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const wishlistCount = getWishlistCount();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/products", label: "PRODUCTS" },
    { href: "/customize", label: "WEAR YOUR DESIGN" },
    { href: "/about", label: "WHO ARE WE ?" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-all duration-500 text-white ${
      scrolled 
        ? 'glass-dark border-b border-highlight/20 shadow-lg backdrop-blur-md' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <Link href="/" className="group text-2xl font-serif tracking-[0.2em] font-medium uppercase transition-all duration-300 hover:text-highlight">
        SOLO
      </Link>
      
      <div className="hidden md:flex items-center space-x-6 text-xs font-medium tracking-widest uppercase">
        <Link href="/" className="relative px-4 py-2 rounded-full transition-all duration-300 hover:text-highlight hover:bg-highlight/10">
          HOME
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-8" />
        </Link>
        <Link href="/products" className="relative px-4 py-2 rounded-full transition-all duration-300 hover:text-highlight hover:bg-highlight/10">
          PRODUCTS
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-8" />
        </Link>
        <Link href="/customize" className="relative px-4 py-2 rounded-full transition-all duration-300 hover:text-highlight hover:bg-highlight/10">
          WEAR YOUR DESIGN
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-8" />
        </Link>
        <Link href="/about" className="relative px-4 py-2 rounded-full transition-all duration-300 hover:text-highlight hover:bg-highlight/10">
          WHO ARE WE ?
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-highlight transition-all duration-300 group-hover:w-8" />
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/cart" className="hidden md:block group relative p-2 rounded-full hover:bg-highlight/10 transition-all duration-300">
          <ShoppingCart size={20} strokeWidth={1.5} className="transition-transform group-hover:scale-110" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-highlight text-primary-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              {cart.length}
            </span>
          )}
        </Link>
        
        <Link href="/wishlist" className="hidden md:block group relative p-2 rounded-full hover:bg-highlight/10 transition-all duration-300">
          <Heart size={20} strokeWidth={1.5} className="transition-transform group-hover:scale-110" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              {wishlistCount}
            </span>
          )}
        </Link>
        
        <div className="hidden md:flex items-center space-x-3 text-xs font-medium uppercase tracking-widest">
          {isLoggedIn ? (
            <Link href="/profile" className="group flex items-center gap-2 px-4 py-2 rounded-full text-highlight border border-highlight/20 hover:bg-highlight hover:text-primary-dark transition-all duration-300">
              <User size={14} />
              <span className="hidden sm:inline">PROFILE</span>
            </Link>
          ) : (
            <Link href="/signup" className="group flex items-center gap-2 px-5 py-2.5 bg-highlight text-primary-dark rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <UserPlus size={14} />
              <span>SIGN UP</span>
            </Link>
          )}
        </div>

        <button 
          className="md:hidden p-3 rounded-full hover:bg-highlight/10 transition-all duration-300 hover:scale-110"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5 flex flex-col justify-between">
            <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-full bg-current transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 glass-dark border-b border-highlight/20 md:hidden z-50"
          >
            <div className="flex flex-col items-center py-8 space-y-6 text-xs font-medium tracking-widest uppercase">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link 
                    href={item.href} 
                    className="px-8 py-4 rounded-xl transition-all duration-300 text-sm hover:bg-highlight/10 hover:text-highlight"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                {isLoggedIn ? (
                  <Link href="/profile" className="flex items-center gap-3 px-8 py-4 rounded-xl text-highlight border border-highlight/20 hover:bg-highlight hover:text-primary-dark transition-all duration-300 text-sm" onClick={() => setMobileMenuOpen(false)}>
                    <User size={16} />
                    <span>PROFILE</span>
                  </Link>
                ) : (
                  <Link href="/signup" className="px-8 py-4 rounded-xl hover:bg-highlight/10 hover:text-highlight transition-all duration-300 text-sm" onClick={() => setMobileMenuOpen(false)}>SIGN UP</Link>
                )}
              </motion.div>
              
              {/* Mobile Cart & Wishlist */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="flex items-center gap-6"
              >
                <Link 
                  href="/wishlist" 
                  className="flex items-center gap-2 px-8 py-4 rounded-xl hover:bg-highlight/10 hover:text-highlight transition-all duration-300 text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="relative">
                    <Heart size={18} strokeWidth={1.5} />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] font-bold w-3 h-3 rounded-full flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </div>
                  <span>WISHLIST</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
