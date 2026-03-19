"use client";

import { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from top of viewport
      if (e.clientY <= 0 && !hasShown) {
        setShowPopup(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-primary-dark to-zinc-900 border border-highlight/20 rounded-2xl p-6 max-w-md w-full glass"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-highlight/20 rounded-full flex items-center justify-center">
                  <Gift size={20} className="text-highlight" />
                </div>
                <h3 className="text-lg font-serif text-white">Wait! 🎁</h3>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-white/80">
                Before you go, get <span className="text-highlight font-bold">15% OFF</span> your first order!
              </p>
              
              <div className="bg-highlight/10 border border-highlight/30 rounded-xl p-3">
                <p className="text-xs text-zinc-400 mb-1">Your exclusive offer:</p>
                <p className="text-sm font-mono font-bold text-highlight">SOLO15-XXXX</p>
                <p className="text-xs text-zinc-400 mt-1">Generated when you sign up</p>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/signup"
                  onClick={() => setShowPopup(false)}
                  className="flex-1 bg-highlight text-primary-dark py-2.5 text-[9px] uppercase tracking-widest font-bold rounded-full hover:bg-white transition-all duration-300 text-center"
                >
                  Sign Up & Get Code
                </Link>
                <button
                  onClick={() => setShowPopup(false)}
                  className="flex-1 glass border border-white/20 text-white py-2.5 text-[9px] uppercase tracking-widest font-bold hover:bg-white/10 transition-all duration-300 rounded-full"
                >
                  No Thanks
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
