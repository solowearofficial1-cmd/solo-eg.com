"use client";

import { useDesignStore } from "@/store/designStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { setLoggedIn, user } = useDesignStore();
  const router = useRouter();

  const handleLogout = () => {
    setLoggedIn(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark via-zinc-900 to-zinc-800 px-4 md:px-6 pt-24 pb-16 text-white">
      <motion.header 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-serif mb-2 tracking-tight uppercase">User Profile</h1>
        <div className="h-[1px] w-16 bg-highlight" />
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Profile Sidebar */}
        <div className="md:col-span-1 space-y-3">
          <div className="space-y-2">
            <h2 className="text-base md:text-lg font-serif italic">{user ? user.name : 'John Doe'}</h2>
            <p className="text-[9px] text-highlight/60 uppercase tracking-widest">Premium Member</p>
            {user?.promoCode && (
              <div className="p-2 bg-highlight/10 border border-highlight/30 rounded-lg">
                <p className="text-xs text-zinc-400 mb-1">Your Promo Code:</p>
                <p className="text-xs font-mono font-bold text-highlight">{user.promoCode}</p>
              </div>
            )}
          </div>
          
          {/* Account Details in Sidebar */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-highlight/80">Account Details</h3>
            <div className="space-y-1.5 border-t border-white/5 pt-2">
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Email</span>
                <span className="text-xs truncate ml-2">{user ? user.email : 'john.doe@example.com'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Joined</span>
                <span>{user ? user.joinDate : 'March 2026'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/40">Status</span>
                <span className="text-highlight uppercase tracking-widest">Premium</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full py-2 text-[8px] uppercase tracking-widest font-bold text-red-400 border border-red-400/20 rounded-lg hover:bg-red-400/10 transition-all"
          >
            Sign Out
          </button>
        </div>

        {/* Profile Content */}
        <div className="md:col-span-2 space-y-4">
          <section className="bg-white/5 border border-white/10 p-2 md:p-3 rounded-lg">
            <h3 className="text-xs uppercase tracking-[0.3em] font-bold mb-2 text-highlight/80">Saved Designs</h3>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="aspect-[3/4] bg-primary-dark border border-white/5 rounded-md flex items-center justify-center text-[7px] text-white/20 uppercase tracking-widest leading-tight text-center px-1">
                Summer 26
              </div>
              <div className="aspect-[3/4] bg-primary-dark border border-white/5 rounded-md flex items-center justify-center text-[7px] text-white/20 uppercase tracking-widest italic leading-tight text-center px-1">
                Empty
              </div>
              <div className="aspect-[3/4] bg-primary-dark border border-white/5 rounded-md flex items-center justify-center text-[7px] text-white/20 uppercase tracking-widest italic leading-tight text-center px-1">
                Empty
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
