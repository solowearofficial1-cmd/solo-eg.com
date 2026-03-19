"use client";

import { useState, useEffect } from 'react';
import CanvasModel from '@/components/CanvasModel';
import Controls from '@/components/Controls';
import { ChevronUp, ChevronDown, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomizePage() {
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative pt-20 h-screen bg-primary-dark overflow-hidden">
      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-20 left-0 right-0 z-40 bg-secondary-dark/90 backdrop-blur-sm border-b border-white/5">
          <button
            onClick={() => setIsControlsOpen(!isControlsOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-white"
          >
            <div className="flex items-center gap-2">
              <Palette size={18} />
              <span className="text-sm font-medium">Design Controls</span>
            </div>
            {isControlsOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row h-full">
        {/* 3D Model Area */}
        <div className={`flex-1 bg-primary-dark transition-all duration-300 ${
          isMobile && isControlsOpen ? 'h-[50vh]' : isMobile ? 'h-[70vh]' : 'h-full'
        }`}>
          <CanvasModel />
        </div>

        {/* Control Panel Area */}
        <AnimatePresence>
          {(!isMobile || isControlsOpen) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`bg-secondary-dark border-t md:border-t-0 md:border-l border-white/5 ${
                isMobile ? 'h-[50vh]' : 'w-1/3'
              } overflow-hidden`}
            >
              <div className="h-full overflow-y-auto">
                <Controls />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
