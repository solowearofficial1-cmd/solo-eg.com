"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDesignStore } from "@/store/designStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight, ShieldCheck, Palette, GraduationCap, Briefcase, Heart, Gamepad2, Snowflake, Sun, Camera, Palette as Paintbrush, Moon, Plane, Footprints, Shirt, Home } from "lucide-react";
import WishlistButton from "@/components/WishlistButton";

const products = [
  { id: 1, name: "Minimalist Linen Shirt", price: "$120", category: "SOLO for Professionals", subcategory: "Shirts", image: "https://images.unsplash.com/photo-1594932224828-b4b057b7d6ee?auto=format&fit=crop&q=80&w=800", description: "Crafted from premium Italian linen, this shirt offers unparalleled breathability and a relaxed yet refined silhouette. Perfect for warm-weather elegance." },
  { id: 2, name: "Essential Wool Trousers", price: "$180", category: "SOLO for Professionals", subcategory: "Pants", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800", description: "Tailored from high-twist virgin wool, these trousers feature a modern tapered fit and natural crease resistance. An essential for the versatile wardrobe." },
  { id: 3, name: "Structured Cotton Blazer", price: "$320", category: "SOLO for Professionals", subcategory: "Outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800", description: "A contemporary take on a classic. This blazer is made from dense organic cotton with a soft structure that transitions seamlessly from day to evening." },
  { id: 4, name: "Premium Silk Scarf", price: "$85", category: "SOLO for Creatives", subcategory: "Accessories", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800", description: "Woven from 100% pure mulberry silk, this scarf adds a subtle touch of luxury with its unique hand-rolled edges and minimalist pattern." },
  { id: 5, name: "Relaxed Fit Cashmere Sweater", price: "$240", category: "SOLO for Students", subcategory: "Knitwear", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800", description: "Knitted from the finest Mongolian cashmere, this sweater provides exceptional warmth and a luxuriously soft feel against the skin." },
  { id: 6, name: "Classic Leather Belt", price: "$65", category: "SOLO for Professionals", subcategory: "Accessories", image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=800", description: "Handcrafted from full-grain vegetable-tanned leather with a minimalist solid brass buckle. Designed to age beautifully over time." },
  { id: 7, name: "SOLO Signature Tee", price: "$45", category: "SOLO for Creatives", subcategory: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800", description: "The foundation of the SOLO wardrobe. A heavy-weight organic cotton tee with a perfect boxy fit and reinforced neckline. Available in our signature palette." },
  { id: 8, name: "Graphic Concept 01 Tee", price: "$55", category: "SOLO for Gamers", subcategory: "T-Shirts", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800", description: "Part of our limited release series. This tee features a minimalist geometric screen print on our premium 240gsm jersey cotton base." },
  { id: 9, name: "Oversized Pique Tee", price: "$60", category: "SOLO for Gamers", subcategory: "T-Shirts", image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800", description: "A textured take on the classic T-shirt. Made from a unique pique-weave cotton that provides structure and a sophisticated matte finish." },
  { id: 10, name: "Raw Edge Modal Tee", price: "$50", category: "SOLO for Creatives", subcategory: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800", description: "An ultra-soft blend of organic cotton and modal. Features subtle raw-edge detailing at the sleeves and hem for a modern, deconstructed look." },
  { id: 11, name: "Pocket Detail Jersey Tee", price: "$48", category: "SOLO for Students", subcategory: "T-Shirts", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800", description: "Function meets minimalism. A classic fit tee featuring a clean, seamless chest pocket and a slightly elongated silhouette." },
  { id: 12, name: "Essential V-Neck Tee", price: "$45", category: "SOLO for Creatives", subcategory: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800", description: "The essential V-neck, refined. Featuring a shallow drop and a slim but not tight fit, crafted from our signature long-staple cotton." },
  { id: 13, name: "Gamer Elite Hoodie", price: "$75", category: "SOLO for Gamers", subcategory: "Knitwear", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a1?auto=format&fit=crop&q=80&w=800", description: "Engineered for extended gaming sessions. Premium fleece with ergonomic design and subtle tech-inspired details." },
  { id: 14, name: "Designer Studio Jacket", price: "$280", category: "SOLO for Creatives", subcategory: "Outerwear", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800", description: "The perfect companion for creative minds. Water-resistant fabric with ample pocket space for sketchbooks and tools." },
  { id: 15, name: "Student Backpack Essential", price: "$95", category: "SOLO for Students", subcategory: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800", description: "Minimalist design meets maximum functionality. Laptop compartment, water bottle holder, and clean aesthetic." },
  { id: 16, name: "Professional Power Suit", price: "$450", category: "SOLO for Professionals", subcategory: "Outerwear", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800", description: "Command presence with this tailored suit. Premium wool blend with modern slim fit and subtle SOLO branding." },
  { id: 17, name: "Winter Insulated Parka", price: "$280", category: "SOLO Winter", subcategory: "Outerwear", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800", description: "Ultimate winter protection with premium insulation and weather-resistant shell. Designed for extreme cold conditions." },
  { id: 18, name: "Merino Wool Thermal Sweater", price: "$195", category: "SOLO Winter", subcategory: "Knitwear", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800", description: "Luxurious merino wool with thermal properties. Perfect base layer for winter adventures and daily warmth." },
  { id: 19, name: "Winter Accessories Set", price: "$75", category: "SOLO Winter", subcategory: "Accessories", image: "https://images.unsplash.com/photo-1604671809082-238b3b6347ba?auto=format&fit=crop&q=80&w=800", description: "Complete winter kit with wool beanie, touch-screen gloves, and insulated scarf. Coordinated minimalist design." },
  { id: 20, name: "Summer Breeze Linen Shirt", price: "$95", category: "SOLO Summer", subcategory: "Shirts", image: "https://images.unsplash.com/photo-1596755094415-a1f1e92788a0?auto=format&fit=crop&q=80&w=800", description: "Ultra-lightweight linen with natural cooling properties. Perfect for hot summer days and beach outings." },
  { id: 21, name: "Breathable Performance Shorts", price: "$65", category: "SOLO Summer", subcategory: "Pants", image: "https://images.unsplash.com/photo-1586790170083-2f9bada758c3?auto=format&fit=crop&q=80&w=800", description: "Quick-dry fabric with built-in UV protection. Ideal for summer sports and outdoor activities." },
  { id: 22, name: "Summer Mesh Tank Top", price: "$45", category: "SOLO Summer", subcategory: "T-Shirts", image: "https://images.unsplash.com/photo-1578632292458-2d98eb4fec5c?auto=format&fit=crop&q=80&w=800", description: "Lightweight mesh construction for maximum airflow. Minimalist design with subtle SOLO branding." },
  { id: 23, name: "Creator Studio Shirt", price: "$85", category: "SOLO for Content Creators", subcategory: "Shirts", image: "https://images.unsplash.com/photo-1590736969224-4f6c79ba6dc3?auto=format&fit=crop&q=80&w=800", description: "Camera-friendly fabric with anti-glare finish. Perfect lighting for video content and photoshoots." },
  { id: 24, name: "Streamer Comfort Hoodie", price: "$110", category: "SOLO for Content Creators", subcategory: "Knitwear", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a1?auto=format&fit=crop&q=80&w=800", description: "Designed for long streaming sessions. Noise-reducing hood and microphone-friendly fabric." },
  { id: 25, name: "Creator Travel Jacket", price: "$195", category: "SOLO for Content Creators", subcategory: "Outerwear", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800", description: "Multi-pocket design for gear storage. Weather-resistant for outdoor shoots and events." },
  { id: 26, name: "Artist Studio Apron", price: "$55", category: "SOLO for Artists", subcategory: "Accessories", image: "https://images.unsplash.com/photo-1618441402516-a93294918ebf?auto=format&fit=crop&q=80&w=800", description: "Protective canvas apron with tool pockets. Minimalist design for creative professionals." },
  { id: 27, name: "Creative Freedom Shirt", price: "$95", category: "SOLO for Artists", subcategory: "Shirts", image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&q=80&w=800", description: "Stain-resistant fabric with articulated sleeves. Designed for unrestricted creative movement." },
  { id: 28, name: "Studio Comfort Pants", price: "$85", category: "SOLO for Artists", subcategory: "Pants", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800", description: "Flexible waistband with reinforced knees. Perfect for long studio sessions and installations." },
  { id: 29, name: "Nightlife Statement Blazer", price: "$285", category: "SOLO for Nightlife", subcategory: "Outerwear", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800", description: "Sophisticated evening wear with subtle sheen. Tailored fit for club and lounge settings." },
  { id: 30, name: "Evening Social Shirt", price: "$125", category: "SOLO for Nightlife", subcategory: "Shirts", image: "https://images.unsplash.com/photo-1596755094415-a1f1e92788a0?auto=format&fit=crop&q=80&w=800", description: "Premium fabric with elegant draping. Perfect for upscale venues and social events." },
  { id: 31, name: "Travel Wrinkle-Resistant Shirt", price: "$110", category: "SOLO for Travelers", subcategory: "Shirts", image: "https://images.unsplash.com/photo-1596755094415-a1f1e92788a0?auto=format&fit=crop&q=80&w=800", description: "Advanced wrinkle-free technology with quick-dry fabric. Essential for business travel and adventures." },
  { id: 32, name: "Adventure Convertible Pants", price: "$125", category: "SOLO for Travelers", subcategory: "Pants", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800", description: "Zip-off design converts to shorts. Multiple pockets and water-resistant treatment." },
  { id: 33, name: "Athletic Performance Tee", price: "$65", category: "SOLO for Athletes", subcategory: "T-Shirts", image: "https://images.unsplash.com/photo-1578632292458-2d98eb4fec5c?auto=format&fit=crop&q=80&w=800", description: "Moisture-wicking fabric with four-way stretch. Designed for peak performance and comfort." },
  { id: 34, name: "Training Gym Shorts", price: "$55", category: "SOLO for Athletes", subcategory: "Pants", image: "https://images.unsplash.com/photo-1586790170083-2f9bada758c3?auto=format&fit=crop&q=80&w=800", description: "Lightweight construction with built-in compression liner. Perfect for gym sessions and running." },
  { id: 35, name: "Pro Training Jacket", price: "$145", category: "SOLO for Athletes", subcategory: "Outerwear", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a1?auto=format&fit=crop&q=80&w=800", description: "Weather-resistant shell with thermal lining. Designed for outdoor training in all conditions." },
];

export default function ProductsPage() {
  const router = useRouter();
  const [addedIds, setAddedIds] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProductType, setSelectedProductType] = useState("All");
  const { addToCart } = useDesignStore();

  const categories = [
    { id: "All", name: "All Collections", icon: Heart, color: "text-highlight" },
    { id: "SOLO for Gamers", name: "SOLO for Gamers", icon: Gamepad2, color: "text-purple-400" },
    { id: "SOLO for Creatives", name: "SOLO for Creatives", icon: Palette, color: "text-pink-400" },
    { id: "SOLO for Students", name: "SOLO for Students", icon: GraduationCap, color: "text-blue-400" },
    { id: "SOLO for Professionals", name: "SOLO for Professionals", icon: Briefcase, color: "text-green-400" },
    { id: "SOLO Winter", name: "SOLO Winter", icon: Snowflake, color: "text-cyan-400" },
    { id: "SOLO Summer", name: "SOLO Summer", icon: Sun, color: "text-yellow-400" },
    { id: "SOLO for Content Creators", name: "SOLO for Creators", icon: Camera, color: "text-red-400" },
    { id: "SOLO for Artists", name: "SOLO for Artists", icon: Paintbrush, color: "text-orange-400" },
    { id: "SOLO for Nightlife", name: "SOLO for Nightlife", icon: Moon, color: "text-indigo-400" },
    { id: "SOLO for Travelers", name: "SOLO for Travelers", icon: Plane, color: "text-teal-400" },
    { id: "SOLO for Athletes", name: "SOLO for Athletes", icon: Footprints, color: "text-emerald-400" },
  ];

  const productTypes = [
    { id: "All", name: "All Types", icon: Heart, color: "text-highlight" },
    { id: "T-Shirts", name: "T-Shirts", icon: Shirt, color: "text-blue-400" },
    { id: "Hoodies", name: "Hoodies", icon: Home, color: "text-purple-400" },
    { id: "Caps", name: "Caps", icon: Home, color: "text-green-400" },
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const typeMatch = selectedProductType === "All" || 
      (selectedProductType === "T-Shirts" && product.subcategory === "T-Shirts") ||
      (selectedProductType === "Hoodies" && product.subcategory === "Knitwear") ||
      (selectedProductType === "Caps" && product.subcategory === "Accessories");
    return categoryMatch && typeMatch;
  });

  const handleAddToCart = (product: any) => {
    setAddedIds((prev) => [...prev, product.id]);
    addToCart({ ...product, timestamp: Date.now() });
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((item) => item !== product.id));
    }, 4000);
    // Redirect to cart after adding
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark via-zinc-900 to-zinc-800">
      {/* Hero Section */}
      <section className="relative px-8 py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(173,235,255,0.08)_0%,transparent_70%)]" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-serif mb-6 tracking-tight text-white">Collection</h1>
          <p className="text-highlight/60 uppercase tracking-widest text-[10px] mb-8">Curated essentials for the modern wardrobe</p>
          <div className="h-[1px] w-32 bg-highlight/40 mx-auto" />
        </motion.div>
      </section>

      {/* Professional Category Filter */}
      <section className="px-8 py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-serif mb-3 text-white">Choose Your SOLO Collection</h2>
            <p className="text-sm text-white/60">Curated essentials designed for your lifestyle</p>
          </motion.div>
          
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
              {categories.map((category, index) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;
                const productCount = category.id === "All" 
                  ? products.length 
                  : products.filter(p => p.category === category.id).length;
                
                return (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`relative group flex-shrink-0 w-32 p-4 rounded-2xl border transition-all duration-300 snap-center ${
                      isSelected
                        ? 'bg-highlight/20 border-highlight shadow-lg shadow-highlight/20'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-highlight/50'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-highlight text-primary-dark' : 'bg-white/10'
                      }`}>
                        <Icon size={20} className={isSelected ? 'text-primary-dark' : category.color} />
                      </div>
                      <div className="text-center">
                        <h3 className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                          isSelected ? 'text-highlight' : 'text-white'
                        }`}>
                          {category.name.split('for ')[1] || category.name.split(' ')[1]}
                        </h3>
                        <p className="text-[8px] text-white/40">
                          {productCount} items
                        </p>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute inset-0 rounded-2xl border-2 border-highlight pointer-events-none"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
            
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-primary-dark to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-primary-dark to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Product Type Filter */}
      <section className="px-8 py-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-6"
          >
            <h3 className="text-lg font-serif mb-2 text-white">Choose Product Type</h3>
            <p className="text-sm text-white/60">Filter by specific product categories</p>
          </motion.div>
          
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
              {productTypes.map((productType, index) => {
                const Icon = productType.icon;
                const isSelected = selectedProductType === productType.id;
                const productCount = productType.id === "All" 
                  ? filteredProducts.length 
                  : filteredProducts.filter(p => 
                      (productType.id === "T-Shirts" && p.subcategory === "T-Shirts") ||
                      (productType.id === "Hoodies" && p.subcategory === "Knitwear") ||
                      (productType.id === "Caps" && p.subcategory === "Accessories")
                    ).length;
                
                return (
                  <motion.button
                    key={productType.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.3, duration: 0.3 }}
                    onClick={() => setSelectedProductType(productType.id)}
                    className={`relative group flex-shrink-0 w-28 p-3 rounded-xl border transition-all duration-300 snap-center ${
                      isSelected
                        ? 'bg-highlight/20 border-highlight shadow-lg shadow-highlight/20'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-highlight/50'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-highlight text-primary-dark' : 'bg-white/10'
                      }`}>
                        <Icon size={18} className={isSelected ? 'text-primary-dark' : productType.color} />
                      </div>
                      <div className="text-center">
                        <h4 className={`text-[10px] font-bold uppercase tracking-widest ${
                          isSelected ? 'text-highlight' : 'text-white'
                        }`}>
                          {productType.name}
                        </h4>
                        <p className="text-[7px] text-white/40">
                          {productCount} items
                        </p>
                      </div>
                    </div>
                    
                    {isSelected && (
                      <motion.div
                        layoutId="activeProductType"
                        className="absolute inset-0 rounded-xl border-2 border-highlight pointer-events-none"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
            
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-primary-dark to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-primary-dark to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Results Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h3 className="text-lg font-serif text-white">
                {selectedCategory === "All" ? "All Collections" : selectedCategory}
                {selectedProductType !== "All" && ` - ${selectedProductType}`}
              </h3>
              <p className="text-sm text-white/60">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            {(selectedCategory !== "All" || selectedProductType !== "All") && (
              <div className="flex gap-3">
                {selectedProductType !== "All" && (
                  <button
                    onClick={() => setSelectedProductType("All")}
                    className="text-sm text-highlight/60 hover:text-highlight transition-colors"
                  >
                    All Types
                  </button>
                )}
                {selectedCategory !== "All" && (
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="text-sm text-highlight/60 hover:text-highlight transition-colors"
                  >
                    All Collections
                  </button>
                )}
              </div>
            )}
          </motion.div>

          {/* Empty State */}
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} className="text-white/20" />
              </div>
              <h3 className="text-xl font-serif text-white mb-2">No items found</h3>
              <p className="text-sm text-white/60 mb-6">Try adjusting your filters or browse all collections</p>
              <div className="flex gap-3 justify-center">
                {selectedProductType !== "All" && (
                  <button
                    onClick={() => setSelectedProductType("All")}
                    className="inline-block bg-highlight/20 text-highlight px-6 py-3 text-xs uppercase tracking-widest font-bold rounded-full hover:bg-highlight/30 transition-all duration-300"
                  >
                    All Types
                  </button>
                )}
                {selectedCategory !== "All" && (
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="inline-block bg-highlight text-primary-dark px-6 py-3 text-xs uppercase tracking-widest font-bold rounded-full hover:bg-white transition-all duration-300"
                  >
                    All Collections
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => {
              const isAdded = addedIds.includes(product.id);
              
              return (
                <motion.article 
                  key={product.id} 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group cursor-pointer"
                  onClick={() => router.push(`/products/${product.id}`)}
                >
                  <div className="relative aspect-[4/5] bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl overflow-hidden mb-6 border border-white/10 transition-all duration-500 hover:border-highlight/30 hover:shadow-[0_0_40px_rgba(173,235,255,0.2)]">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Wishlist Button */}
                    <WishlistButton product={product} />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-highlight/20 text-highlight text-[8px] uppercase tracking-widest font-bold rounded-full backdrop-blur-sm">
                        {product.category}
                      </span>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                        className="glass px-4 py-2 text-[8px] uppercase tracking-widest shadow-lg border border-white/20 hover:bg-highlight hover:text-primary-dark whitespace-nowrap rounded-full"
                      >
                        Quick View
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                        className={`${isAdded ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-highlight text-primary-dark border-highlight hover:bg-white'} px-4 py-2 text-[8px] uppercase tracking-widest font-bold shadow-lg border transition-all duration-300 whitespace-nowrap rounded-full`}
                      >
                        {isAdded ? 'Added ✓' : 'Add to Cart'}
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
          )}
        </div>
      </section>

      {/* Enhanced Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-primary-dark/95 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-6xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-highlight/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 p-3 text-white/40 hover:text-highlight transition-all duration-300 hover:bg-white/10 rounded-full z-10 lg:hidden"
              >
                <X size={20} />
              </button>

              {/* Product Image Section */}
              <div className="w-full lg:w-1/2 aspect-square lg:aspect-auto bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden relative">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-highlight/20 text-highlight text-[10px] uppercase tracking-widest font-bold rounded-full backdrop-blur-sm">
                    {selectedProduct.category}
                  </span>
                </div>
                
                {/* Image Navigation Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  <div className="w-2 h-2 bg-highlight rounded-full" />
                  <div className="w-2 h-2 bg-white/30 rounded-full" />
                  <div className="w-2 h-2 bg-white/30 rounded-full" />
                </div>
              </div>

              {/* Product Details Section */}
              <div className="w-full lg:w-1/2 p-8 lg:p-12 space-y-8 flex flex-col">
                {/* Close Button for Desktop */}
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 p-3 text-white/40 hover:text-highlight transition-all duration-300 hover:bg-white/10 rounded-full z-10 hidden lg:block"
                >
                  <X size={20} />
                </button>

                {/* Product Header */}
                <motion.header 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-highlight/60 font-bold">{selectedProduct.category}</p>
                  <h2 className="text-4xl lg:text-5xl font-serif text-white tracking-tight">{selectedProduct.name}</h2>
                  <p className="text-3xl lg:text-4xl font-serif text-highlight font-bold">{selectedProduct.price}</p>
                </motion.header>

                {/* Product Description */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6 flex-1"
                >
                  <div className="space-y-4">
                    <h3 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Description</h3>
                    <p className="text-sm text-white/70 leading-relaxed font-light">
                      {selectedProduct.description}
                    </p>
                  </div>
                  
                  {/* Product Features */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Features</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-highlight rounded-full" />
                        <p className="text-[10px] text-white/60 uppercase tracking-widest">Premium Materials</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-highlight rounded-full" />
                        <p className="text-[10px] text-white/60 uppercase tracking-widest">Ethically Sourced</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-highlight rounded-full" />
                        <p className="text-[10px] text-white/60 uppercase tracking-widest">Lifetime Warranty</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Trust Badge */}
                  <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                    <ShieldCheck size={18} className="text-highlight/60" />
                    <p className="text-[10px] uppercase tracking-widest text-white/50">Ethically Sourced • Premium Quality • Lifetime Warranty</p>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4 pt-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <button 
                      onClick={() => handleAddToCart(selectedProduct)}
                      className="flex items-center justify-center gap-3 bg-highlight text-primary-dark py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 rounded-full shadow-lg shadow-highlight/20 hover:shadow-xl hover:shadow-highlight/30"
                    >
                      <ShoppingBag size={16} /> 
                      {addedIds.includes(selectedProduct.id) ? 'Added to Cart ✓' : 'Add to Cart'}
                    </button>
                    
                    <Link 
                      href="/customize"
                      onClick={() => setSelectedProduct(null)}
                      className="flex items-center justify-center gap-3 glass border border-white/20 text-white py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-highlight hover:text-primary-dark transition-all duration-300 rounded-full"
                    >
                      Customize <ArrowRight size={16} />
                    </Link>
                  </div>
                  
                  {/* Size/Color Options Preview */}
                  <div className="flex items-center justify-center gap-4 pt-4">
                    <span className="text-[8px] uppercase tracking-widest text-white/40">Available in multiple sizes & colors</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
