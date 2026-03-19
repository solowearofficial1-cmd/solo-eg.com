"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useDesignStore } from "@/store/designStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight, ShieldCheck, ChevronLeft, Star, Ruler } from "lucide-react";
import SizeChart from "@/components/SizeChart";
import WishlistButton from "@/components/WishlistButton";

const products = [
  { id: 1, name: "Minimalist Linen Shirt", price: "$120", category: "Shirts", image: "https://images.unsplash.com/photo-1594932224828-b4b057b7d6ee?auto=format&fit=crop&q=80&w=800", description: "Crafted from premium Italian linen, this shirt offers unparalleled breathability and a relaxed yet refined silhouette. Perfect for warm-weather elegance." },
  { id: 2, name: "Essential Wool Trousers", price: "$180", category: "Pants", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800", description: "Tailored from high-twist virgin wool, these trousers feature a modern tapered fit and natural crease resistance. An essential for the versatile wardrobe." },
  { id: 3, name: "Structured Cotton Blazer", price: "$320", category: "Outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800", description: "A contemporary take on a classic. This blazer is made from dense organic cotton with a soft structure that transitions seamlessly from day to evening." },
  { id: 4, name: "Premium Silk Scarf", price: "$85", category: "Accessories", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800", description: "Woven from 100% pure mulberry silk, this scarf adds a subtle touch of luxury with its unique hand-rolled edges and minimalist pattern." },
  { id: 5, name: "Relaxed Fit Cashmere Sweater", price: "$240", category: "Knitwear", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800", description: "Knitted from the finest Mongolian cashmere, this sweater provides exceptional warmth and a luxuriously soft feel against the skin." },
  { id: 6, name: "Classic Leather Belt", price: "$65", category: "Accessories", image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&q=80&w=800", description: "Handcrafted from full-grain vegetable-tanned leather with a minimalist solid brass buckle. Designed to age beautifully over time." },
  { id: 7, name: "SOLO Signature Tee", price: "$45", category: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800", description: "The foundation of the SOLO wardrobe. A heavy-weight organic cotton tee with a perfect boxy fit and reinforced neckline. Available in our signature palette." },
  { id: 8, name: "Graphic Concept 01 Tee", price: "$55", category: "T-Shirts", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800", description: "Part of our limited release series. This tee features a minimalist geometric screen print on our premium 240gsm jersey cotton base." },
  { id: 9, name: "Oversized Pique Tee", price: "$60", category: "T-Shirts", image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800", description: "A textured take on the classic T-shirt. Made from a unique pique-weave cotton that provides structure and a sophisticated matte finish." },
  { id: 10, name: "Raw Edge Modal Tee", price: "$50", category: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800", description: "An ultra-soft blend of organic cotton and modal. Features subtle raw-edge detailing at the sleeves and hem for a modern, deconstructed look." },
  { id: 11, name: "Pocket Detail Jersey Tee", price: "$48", category: "T-Shirts", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800", description: "Function meets minimalism. A classic fit tee featuring a clean, seamless chest pocket and a slightly elongated silhouette." },
  { id: 12, name: "Essential V-Neck Tee", price: "$45", category: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800", description: "The essential V-neck, refined. Featuring a shallow drop and a slim but not tight fit, crafted from our signature long-staple cotton." },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, cart } = useDesignStore();
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showSizeChart, setShowSizeChart] = useState(false);

  useEffect(() => {
    const productId = parseInt(params.id as string);
    const foundProduct = products.find(p => p.id === productId);
    setProduct(foundProduct || null);
    
    if (!foundProduct) {
      router.push('/products');
    }
  }, [params.id, router]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ 
        ...product, 
        timestamp: Date.now(),
        selectedSize,
        selectedColor,
        quantity
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
      // Redirect to cart after adding
      router.push('/cart');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-dark to-zinc-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "White", "Navy", "Gray", "Beige"];
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-dark via-zinc-900 to-zinc-800 mt-24">
      {/* Breadcrumb */}
      <section className="px-4 md:px-8 pt-0 pb-4 border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-white/40">
            <Link href="/" className="hover:text-highlight transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-highlight transition-colors">Products</Link>
            <span>/</span>
            <span className="text-highlight">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Product Images */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-[4/5] bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl overflow-hidden border border-white/10">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-highlight/20 text-highlight text-[10px] uppercase tracking-widest font-bold rounded-full backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>
                
                {/* Wishlist Button */}
                <WishlistButton 
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    category: product.category,
                    subcategory: product.category,
                    image: product.image,
                    description: product.description
                  }}
                  className="top-6 right-6"
                />
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex gap-4">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-[4/5] w-20 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg overflow-hidden border transition-all duration-300 ${
                      selectedImageIndex === index ? 'border-highlight' : 'border-white/10'
                    }`}
                  >
                    <img 
                      src={product.image} 
                      alt={`${product.name} ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white tracking-tight">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <p className="text-2xl md:text-3xl font-serif text-highlight font-bold">{product.price}</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={14} className="text-highlight fill-highlight" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Description</h3>
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Size</h3>
                  <button
                    onClick={() => setShowSizeChart(true)}
                    className="flex items-center gap-2 text-[8px] text-highlight/60 hover:text-highlight transition-colors"
                  >
                    <Ruler size={14} />
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-2 text-[9px] uppercase tracking-widest font-bold border rounded-full transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-highlight text-primary-dark border-highlight'
                          : 'border-white/20 hover:border-highlight hover:text-highlight'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <h3 className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-2 text-[9px] uppercase tracking-widest font-bold border rounded-full transition-all duration-300 ${
                        selectedColor === color
                          ? 'bg-highlight text-primary-dark border-highlight'
                          : 'border-white/20 hover:border-highlight hover:text-highlight'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <h3 className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-highlight hover:text-highlight transition-all duration-300"
                  >
                    -
                  </button>
                  <span className="text-white font-medium w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-highlight hover:text-highlight transition-all duration-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-6">
                <button
                  onClick={handleAddToCart}
                  className={`flex items-center justify-center gap-2 py-3 text-[9px] uppercase tracking-[0.2em] font-bold rounded-full transition-all duration-300 shadow-lg ${
                    addedToCart
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : 'bg-highlight text-primary-dark border-highlight hover:bg-white hover:shadow-xl hover:shadow-highlight/30'
                  }`}
                >
                  <ShoppingBag size={14} />
                  {addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
                </button>
                
                <Link 
                  href="/customize"
                  className="flex items-center justify-center gap-2 glass border border-white/20 text-white py-3 text-[9px] uppercase tracking-[0.2em] font-bold hover:bg-highlight hover:text-primary-dark transition-all duration-300 rounded-full"
                >
                  Customize <ArrowRight size={14} />
                </Link>
              </div>

              {/* Features */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                <h3 className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Features</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-highlight/60" />
                    <p className="text-[9px] text-white/60 uppercase tracking-widest">Premium Materials</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-highlight/60" />
                    <p className="text-[9px] text-white/60 uppercase tracking-widest">Ethically Sourced</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-highlight/60" />
                    <p className="text-[9px] text-white/60 uppercase tracking-widest">Lifetime Warranty</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="px-4 md:px-8 py-8 md:py-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-serif text-white mb-3">You May Also Like</h2>
              <div className="h-[1px] w-24 bg-highlight/40 mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group cursor-pointer"
                  onClick={() => router.push(`/products/${relatedProduct.id}`)}
                >
                  <div className="relative aspect-[4/5] bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl overflow-hidden mb-6 border border-white/10 transition-all duration-500 hover:border-highlight/30 hover:shadow-[0_0_40px_rgba(173,235,255,0.2)]">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xs font-serif text-white group-hover:text-highlight transition-colors line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-widest text-highlight/40">{relatedProduct.category}</span>
                      <span className="text-xs font-bold text-highlight">{relatedProduct.price}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Size Chart Modal */}
      <SizeChart isOpen={showSizeChart} onClose={() => setShowSizeChart(false)} />
    </div>
  );
}
