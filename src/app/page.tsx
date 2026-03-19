"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ExitIntentPopup from "@/components/ExitIntentPopup";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4, ease: "easeOut" as const }
  };

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Promo Code Announcement Banner */}
      <section className="bg-highlight/10 border-b border-highlight/20 py-2 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
          <span className="text-[8px] uppercase tracking-widest text-highlight font-bold">🎟️ Limited Time:</span>
          <span className="text-[8px] text-white/80">Sign up now and get <strong className="text-highlight">15% OFF</strong> your first order</span>
          <Link 
            href="/signup"
            className="text-[8px] uppercase tracking-widest text-highlight underline underline-offset-2 hover:text-white transition-colors"
          >
            Get Code →
          </Link>
        </div>
      </section>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-dark via-primary-dark to-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(173,235,255,0.1)_0%,transparent_70%)]" />
        <motion.div 
          className="z-10 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-highlight mb-6 block">Est. 2026</span>
          <h1 className="text-7xl md:text-9xl font-serif mb-8 tracking-tighter text-white">
            SOLO
          </h1>
          <p className="text-sm md:text-base text-white/70 mb-12 max-w-md mx-auto font-light tracking-[0.2em] uppercase">
            ONE OF A KIND
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link 
              href="/customize" 
              className="group px-12 py-4 bg-highlight text-primary-dark text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all duration-300 shadow-lg shadow-highlight/20 hover:shadow-xl hover:shadow-highlight/30 transform hover:scale-105"
            >
              Customize Now
            </Link>
            <Link 
              href="/products" 
              className="group px-12 py-4 glass text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Shop Now
            </Link>
          </div>
        </motion.div>
        
        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-[8px] uppercase tracking-[0.4em] text-highlight/60">Scroll</span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-highlight/60 to-transparent" />
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto w-full bg-primary-dark relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-highlight/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-highlight/3 rounded-full blur-3xl" />
        
        <motion.div 
          className="text-center mb-16 relative z-10"
          {...fadeInUp}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-highlight/60 mb-4 block">Process</span>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-white">How It Works</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          <motion.div 
            className="group text-center p-8 border border-white/10 rounded-xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm transition-all duration-700 hover:bg-gradient-to-br hover:from-highlight/10 hover:to-transparent hover:border-highlight/30 hover:shadow-[0_0_40px_rgba(173,235,255,0.2)] hover:scale-[1.03] hover:-translate-y-2"
            {...fadeInUp}
            transition={{ delay: 0.1 }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-highlight/10 flex items-center justify-center group-hover:bg-highlight/20 transition-colors">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-highlight">YOU</span>
            </div>
            <h3 className="text-xl font-serif text-white mb-2">Choose Your Design</h3>
            <div className="h-[1px] w-12 bg-highlight/50 mx-auto my-4" />
            <p className="text-[11px] uppercase tracking-widest text-white/60">Personalize every detail</p>
          </motion.div>

          <motion.div 
            className="group text-center p-8 border border-white/10 rounded-xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm transition-all duration-700 hover:bg-gradient-to-br hover:from-highlight/10 hover:to-transparent hover:border-highlight/30 hover:shadow-[0_0_40px_rgba(173,235,255,0.2)] hover:scale-[1.03] hover:-translate-y-2"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-highlight/10 flex items-center justify-center group-hover:bg-highlight/20 transition-colors">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-highlight">WE</span>
            </div>
            <h3 className="text-xl font-serif text-white mb-2">Create Your Premium Product</h3>
            <div className="h-[1px] w-12 bg-highlight/50 mx-auto my-4" />
            <p className="text-[11px] uppercase tracking-widest text-white/60">Crafted with precision</p>
          </motion.div>

          <motion.div 
            className="group text-center p-8 border border-white/10 rounded-xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm transition-all duration-700 hover:bg-gradient-to-br hover:from-highlight/10 hover:to-transparent hover:border-highlight/30 hover:shadow-[0_0_40px_rgba(173,235,255,0.2)] hover:scale-[1.03] hover:-translate-y-2"
            {...fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-highlight/10 flex items-center justify-center group-hover:bg-highlight/20 transition-colors">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-highlight">DELIVER</span>
            </div>
            <h3 className="text-xl font-serif text-white mb-2">Receive Within 3-7 Days</h3>
            <div className="h-[1px] w-12 bg-highlight/50 mx-auto my-4" />
            <p className="text-[11px] uppercase tracking-widest text-white/60">Fast worldwide shipping</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Collections Grid */}
      <section className="py-32 px-8 max-w-7xl mx-auto w-full bg-gradient-to-b from-primary-dark to-zinc-900">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
          {...fadeInUp}
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-highlight/60 mb-4 block underline underline-offset-8">Featured</span>
            <h2 className="text-5xl font-serif tracking-tight text-white">Curated Collections</h2>
          </div>
          <Link href="/products" className="group text-[10px] uppercase tracking-[0.3em] font-bold border-b border-highlight/50 pb-2 hover:text-highlight hover:border-highlight transition-all">
            Explore All
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div 
            className="group cursor-pointer space-y-8"
            {...fadeInUp}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl">
              <div className="absolute inset-0 flex items-center justify-center text-zinc-300 italic font-serif text-lg">
                Essential Line / 26
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-highlight/30 transition-all duration-700" />
            </div>
            <div className="flex justify-between items-center border-b border-zinc-700 pb-6">
              <h3 className="text-2xl font-serif italic text-white">Essential Line</h3>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400">01 / SS26</span>
            </div>
          </motion.div>

          <motion.div 
            className="group cursor-pointer space-y-8 md:mt-24"
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -8 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl">
              <div className="absolute inset-0 flex items-center justify-center text-zinc-300 italic font-serif text-lg">
                Structured Evening
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-highlight/30 transition-all duration-700" />
            </div>
            <div className="flex justify-between items-center border-b border-zinc-700 pb-6">
              <h3 className="text-2xl font-serif italic text-white">Structured Evening</h3>
              <span className="text-[10px] uppercase tracking-widest text-zinc-400">02 / LIMITED</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section - Full Width Editorial */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 text-white overflow-hidden px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(173,235,255,0.15)_0%,transparent_50%)]" />
        <motion.div 
          className="max-w-3xl mx-auto text-center z-10"
          {...fadeInUp}
        >
          <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-highlight/60 mb-12 block">Philosophy</span>
          <h2 className="text-4xl md:text-6xl font-serif mb-12 leading-tight">
            "In a world of noise, <br />true elegance lies in the quiet."
          </h2>
          <p className="text-lg font-light leading-relaxed mb-16 text-white/70 max-w-2xl mx-auto">
            SOLO is an intentional aesthetic for the modern wardrobe. We believe in pieces that define power through simplicity and quality in every thread.
          </p>
          <Link href="/about" className="inline-block border border-highlight/50 px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-highlight hover:text-primary-dark transition-all duration-500 hover:shadow-lg hover:shadow-highlight/20">
            Our Story
          </Link>
        </motion.div>
        
        {/* Enhanced decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-highlight/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-r from-highlight/3 to-transparent" />
      </section>

      {/* Shop the Essentials - Product Carousel style grid */}
      <section className="py-32 px-8 max-w-7xl mx-auto w-full bg-gradient-to-b from-zinc-800 to-zinc-900">
        <motion.div 
          className="text-center mb-24"
          {...fadeInUp}
        >
          <h2 className="text-sm uppercase tracking-[0.5em] font-bold text-highlight mb-6">Shop the Essentials</h2>
          <div className="h-[1px] w-24 bg-highlight/30 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { name: "Linen Shirt", price: "$120", category: "Essential" },
            { name: "Cotton Blazer", price: "$320", category: "Structured" },
            { name: "Wool Trousers", price: "$180", category: "Tailored" },
            { name: "Silk Scarf", price: "$85", category: "Accessory" }
          ].map((item, i) => (
            <motion.div 
              key={item.name}
              className="group cursor-pointer"
              {...fadeInUp}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative aspect-[3/4] bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-xl mb-6 overflow-hidden border border-zinc-600">
                <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-zinc-400 italic font-serif opacity-50">
                  {item.name}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 border border-zinc-600 rounded-xl group-hover:border-highlight/30 transition-all duration-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-serif text-white">{item.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase tracking-widest text-zinc-400">{item.category}</span>
                  <span className="text-[10px] font-medium text-highlight">{item.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-8 bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <h2 className="text-3xl font-serif tracking-[0.3em] uppercase">SOLO</h2>
            <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] leading-relaxed max-w-xs">
              Defining high-end minimalism for the modern era. Designed in Paris, Made for Everyone.
            </p>
          </div>
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-highlight">Navigation</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] text-white/60">
              <li><Link href="/" className="hover:text-highlight transition-colors">Home Page</Link></li>
              <li><Link href="/products" className="hover:text-highlight transition-colors">Products</Link></li>
              <li><Link href="/customize" className="hover:text-highlight transition-colors">Wear Your Design</Link></li>
              <li><Link href="/about" className="hover:text-highlight transition-colors">Who Are We ?</Link></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-highlight">Connect</h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] text-white/60">
              <li><a href="#" className="hover:text-highlight transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-highlight transition-colors">Pinterest</a></li>
              <li><a href="#" className="hover:text-highlight transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">
            &copy; 2026 SOLO. All rights reserved.
          </p>
          <div className="flex space-x-12 text-[9px] uppercase tracking-[0.2em] text-white/40">
            <Link href="#" className="hover:text-highlight transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-highlight transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
      
      {/* Exit Intent Popup */}
      <ExitIntentPopup />
    </div>
  );
}
