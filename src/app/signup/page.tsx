"use client";

import { useDesignStore } from "@/store/designStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";

export default function SignUpPage() {
  const { setLoggedIn, setUser } = useDesignStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const generatePromoCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'SOLO15-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const copyPromoCode = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(promoCode);
      } else {
        // Fallback for older browsers and mobile
        const textArea = document.createElement("textarea");
        textArea.value = promoCode;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Fallback copy failed:', err);
          return;
        }
        
        document.body.removeChild(textArea);
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy promo code:', err);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate promo code after successful signup
    const newPromoCode = generatePromoCode();
    setPromoCode(newPromoCode);
    setShowSuccess(true);
    
    // Save user data to store
    const userData = {
      name: formData.name,
      email: formData.email,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      promoCode: newPromoCode
    };
    setUser(userData);
    setLoggedIn(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark to-zinc-900 flex items-start justify-center px-4 py-8 pt-24 relative overflow-hidden">
      {/* Background accents for glass effect */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-highlight/3 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md glass p-6 md:p-8 rounded-2xl shadow-2xl border border-highlight/20 relative z-10">
        {!showSuccess ? (
          <>
            <header className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-serif mb-2 tracking-tight uppercase">Join SOLO</h1>
              <p className="text-[9px] text-highlight/60 uppercase tracking-[0.2em] font-light">Become part of the movement</p>
            </header>

            <form className="space-y-4" onSubmit={handleAuth}>
              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest font-bold text-zinc-400">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border-b border-white/10 py-2 text-sm focus:outline-none focus:border-highlight transition-colors bg-transparent text-white placeholder-zinc-500" 
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest font-bold text-zinc-400">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border-b border-white/10 py-2 text-sm focus:outline-none focus:border-highlight transition-colors bg-transparent text-white placeholder-zinc-500" 
                  placeholder="name@email.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[8px] uppercase tracking-widest font-bold text-zinc-400">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full border-b border-white/10 py-2 text-sm focus:outline-none focus:border-highlight transition-colors bg-transparent text-white placeholder-zinc-500" 
                  placeholder="Create a secure password"
                />
              </div>

              <div className="pt-2">
                <button 
                  disabled={isLoading}
                  className="w-full bg-highlight text-primary-dark py-3 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all duration-300 shadow-lg disabled:opacity-50"
                >
                  {isLoading ? 'Creating Account...' : 'SIGN UP'}
                </button>
              </div>
            </form>

            <footer className="mt-6 text-center">
              <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Already have an account? <button onClick={handleAuth} className="text-highlight underline underline-offset-4 hover:text-white transition-colors">Log In</button></p>
            </footer>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 mx-auto bg-highlight/20 rounded-full flex items-center justify-center">
                <span className="text-xl">🎉</span>
              </div>
              <h2 className="text-xl md:text-2xl font-serif text-white">Welcome to SOLO!</h2>
              <p className="text-sm text-zinc-300">Your account has been created successfully</p>
            </div>
            
            <div className="p-4 bg-highlight/10 border border-highlight/30 rounded-xl space-y-3">
              <h3 className="text-base font-serif text-white">🎁 Your Exclusive Gift</h3>
              <p className="text-sm text-zinc-300">Here's your 15% discount code:</p>
              <div className="bg-primary-dark border-2 border-dashed border-highlight/50 rounded-lg p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-lg font-mono font-bold text-highlight tracking-wider">{promoCode}</p>
                  <button
                    onClick={copyPromoCode}
                    className="flex items-center gap-2 px-4 py-2 bg-highlight/20 hover:bg-highlight/30 text-highlight rounded-lg transition-all duration-300 group active:scale-95 touch-manipulation"
                  >
                    <Copy size={18} className="transition-transform group-hover:scale-110" />
                    <span className="text-xs font-medium">
                      {copied ? 'Copied!' : 'Copy'}
                    </span>
                  </button>
                </div>
              </div>
              <p className="text-xs text-zinc-400 uppercase tracking-widest">Valid for 30 days • Use at checkout</p>
            </div>
            
            <div className="space-y-2">
              <button 
                onClick={() => router.push('/products')}
                className="w-full bg-highlight text-primary-dark py-2.5 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-all duration-300 shadow-lg"
              >
                Start Shopping
              </button>
              <button 
                onClick={() => router.push('/profile')}
                className="w-full glass border border-white/20 text-white py-2.5 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-highlight hover:text-primary-dark transition-all duration-300"
              >
                Go to Profile
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
