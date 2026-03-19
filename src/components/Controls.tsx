"use client";

import { useRef, useState } from 'react';
import { useDesignStore } from '@/store/designStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useRouter } from 'next/navigation';
import { Ruler } from 'lucide-react';
import SizeChart from '@/components/SizeChart';

const colors = [
  '#ffffff', '#000000', '#808080'
];

export default function Controls() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [wishlistSuccess, setWishlistSuccess] = useState(false);
  const { 
    color, setColor, 
    setLogoDecal,
    text, setText,
    textColor, setTextColor,
    fontStyle, setFontStyle,
    textScale, setTextScale,
    textPosition, setTextPosition,
    scale, setScale,
    size, setSize,
    logoScale, setLogoScale,
    logoPosition, setLogoPosition,
    toggleLogo, isLogoTexture,
    addToCart
  } = useDesignStore();
  const { addToWishlist } = useWishlistStore();

  const sizes = ['M', 'L', 'XL', '2XL', '3XL'];

  const fonts = [
    'Cormorant Garamond',
    'Inter',
    'Arial',
    'Georgia',
    'Courier New'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoDecal(reader.result as string);
        toggleLogo(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const captureDesign = () => {
    // Try to capture the canvas or create a representation
    const canvas = document.querySelector('canvas');
    if (canvas) {
      try {
        const dataURL = canvas.toDataURL('image/png');
        return dataURL;
      } catch (error) {
        console.log('Could not capture canvas, using placeholder');
      }
    }
    // Fallback to a colored placeholder based on design
    return `data:image/svg+xml;base64,${btoa(
      `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="${color || '#ffffff'}"/>
        <text x="100" y="100" text-anchor="middle" fill="${textColor || '#000000'}" font-size="20" font-family="${fontStyle || 'Arial'}">
          ${text || 'Custom Design'}
        </text>
      </svg>`
    )}`;
  };

  return (
    <div className="flex flex-col space-y-4 p-4 md:p-5 bg-secondary-dark h-full overflow-y-auto border-l border-white/5 shadow-xl text-white scrollbar-hide">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-serif tracking-tight uppercase">Customize Your Piece</h2>
        <div className="hidden md:block text-[10px] text-highlight/60 uppercase tracking-widest">
          Design Studio
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Size Selector Row */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-highlight/80">Size</h3>
            <button
              onClick={() => setShowSizeChart(true)}
              className="flex items-center gap-2 text-[8px] text-highlight/60 hover:text-highlight transition-colors"
            >
              <Ruler size={14} />
              <span className="hidden sm:inline">Size Guide</span>
              <span className="sm:hidden">Guide</span>
            </button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-2 py-2 text-[10px] uppercase tracking-widest font-bold rounded border transition-all duration-300 ${
                  size === s 
                    ? 'bg-highlight text-primary-dark border-highlight' 
                    : 'bg-white/5 text-white/60 border-white/10 hover:border-highlight/50 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Color Picker & Mock-up Size Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-highlight/80">Base Color</h3>
            <div className="flex gap-3">
              {colors.map((c) => (
                <button
                  key={c}
                  className={`w-8 h-8 rounded-full border border-white/10 transition-transform hover:scale-110 ${color.toLowerCase() === c.toLowerCase() ? 'scale-110 border-highlight shadow-lg' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                  title={c === '#ffffff' ? 'White' : c === '#000000' ? 'Black' : 'Gray'}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-highlight/80">Mock-up Scale</h3>
              <span className="text-[9px] font-mono text-highlight">{(scale * 100).toFixed(0)}%</span>
            </div>
            <input 
              type="range" min="0.5" max="1.5" step="0.01" value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-highlight"
            />
          </div>
        </div>

        {/* Upload Button Row */}
        <div className="grid grid-cols-1 gap-3">
          <div className="relative overflow-hidden group">
            <input 
              type="file" accept="image/*"
              onChange={(e) => handleImageUpload(e)}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <div className="bg-highlight/10 border border-highlight/20 text-highlight py-3 px-4 text-[10px] uppercase tracking-widest font-bold text-center group-hover:bg-highlight group-hover:text-primary-dark transition-all duration-300 rounded">
              Upload Logo
            </div>
          </div>
        </div>

        {/* Text Overlay Section */}
        <div className="space-y-3 pt-3 border-t border-white/5">
          <h3 className="text-[10px] uppercase tracking-widest font-bold text-highlight/80">Custom Text</h3>
          <input 
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type here..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded text-sm text-white placeholder-white/40 focus:outline-none focus:border-highlight transition-all"
          />
          
          {text && (
            <div className="space-y-3 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <h4 className="text-[9px] uppercase tracking-widest font-bold text-highlight/60">Font</h4>
                  <select 
                    value={fontStyle}
                    onChange={(e) => setFontStyle(e.target.value)}
                    className="w-full bg-primary-dark border border-white/10 rounded text-[10px] py-2 px-3 focus:outline-none focus:border-highlight"
                  >
                    {fonts.map(f => <option key={f} value={f} style={{fontFamily: f}}>{f}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <h4 className="text-[9px] uppercase tracking-widest font-bold text-highlight/60">Color</h4>
                  <div className="flex items-center gap-2">
                    <div className="relative w-full">
                      <input 
                        type="text" value={textColor.replace('#', '').toUpperCase()}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val.length <= 6) setTextColor(`#${val}`);
                        }}
                        className="w-full pl-4 pr-1 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-mono uppercase text-white focus:outline-none"
                      />
                      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-highlight/40 text-[9px]">#</span>
                    </div>
                    <div className="relative flex-shrink-0">
                      <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <div className="w-5 h-5 rounded border border-white/20" style={{ backgroundColor: textColor }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-[9px] text-white/40 uppercase">Size</label>
                  </div>
                  <input 
                    type="range" min="0.1" max="1" step="0.01" value={textScale}
                    onChange={(e) => setTextScale(parseFloat(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-highlight"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-[9px] text-white/40 uppercase">Left/Right</label>
                  </div>
                  <input 
                    type="range" min="-0.2" max="0.2" step="0.01" value={textPosition[0]}
                    onChange={(e) => setTextPosition([parseFloat(e.target.value), textPosition[1], textPosition[2]])}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-highlight"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-[9px] text-white/40 uppercase">Up/Down</label>
                  </div>
                  <input 
                    type="range" min="-0.3" max="0.3" step="0.01" value={textPosition[1]}
                    onChange={(e) => setTextPosition([textPosition[0], parseFloat(e.target.value), textPosition[2]])}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-highlight"
                  />
                </div>
                <div className="flex items-end">
                  <button onClick={() => setText('')} className="w-full py-1 text-[9px] uppercase tracking-widest font-bold text-pink-400 hover:bg-pink-400/10 transition-colors border border-pink-400/20 rounded">
                    Remove Text
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Logo Controls Section */}
        {isLogoTexture && (
          <div className="space-y-3 p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded shadow-sm">
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-highlight/60 italic">Logo Adjustments</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-[9px] text-white/40 uppercase">Scale</label>
                </div>
                <input 
                  type="range" min="0.05" max="0.5" step="0.01" value={logoScale}
                  onChange={(e) => setLogoScale(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-highlight"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-[9px] text-white/40 uppercase">Left/Right</label>
                </div>
                <input 
                  type="range" min="-0.2" max="0.2" step="0.01" value={logoPosition[0]}
                  onChange={(e) => setLogoPosition([parseFloat(e.target.value), logoPosition[1], logoPosition[2]])}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-highlight"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-[9px] text-white/40 uppercase">Up/Down</label>
                </div>
                <input 
                  type="range" min="-0.2" max="0.2" step="0.01" value={logoPosition[1]}
                  onChange={(e) => setLogoPosition([logoPosition[0], parseFloat(e.target.value), logoPosition[2]])}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-highlight"
                />
              </div>
              <div className="flex items-end">
                <button 
                  onClick={() => { setLogoDecal('/next.svg'); toggleLogo(false); }}
                  className="w-full py-1 text-[9px] uppercase tracking-widest font-bold text-pink-400 hover:bg-pink-400/10 transition-colors border border-pink-400/20 rounded"
                >
                  Remove Logo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-2 mt-auto">
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => {
              // Add current design to wishlist
              addToWishlist({
                id: Date.now(),
                name: `Custom ${size} T-Shirt`,
                price: '$45',
                category: 'T-Shirts',
                subcategory: 'T-Shirts',
                image: captureDesign(), // Use captured design image
                description: 'Custom designed T-shirt with your unique style',
                customDesign: {
                  color,
                  text,
                  textColor,
                  fontStyle,
                  textScale,
                  textPosition,
                  size,
                  logoScale,
                  logoPosition,
                  isLogoTexture
                }
              });
              
              // Show success feedback
              setWishlistSuccess(true);
              setTimeout(() => setWishlistSuccess(false), 2000);
            }}
            className={`${wishlistSuccess ? 'bg-pink-500/20 text-pink-400 border-pink-500/30' : 'bg-pink-500/20 text-pink-400 border-pink-500/30 hover:bg-pink-500/30'} py-4 text-[12px] md:text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-lg rounded`}
          >
            {wishlistSuccess ? 'Loved ✓' : 'Add to Favorites'}
          </button>
          
          <button 
            onClick={() => {
              // Add current design to cart
              addToCart({
                id: Date.now(),
                name: `Custom ${size} T-Shirt`,
                price: '$45',
                category: 'T-Shirts',
                image: captureDesign(), // Use captured design image
                customDesign: {
                  color,
                  text,
                  textColor,
                  fontStyle,
                  textScale,
                  textPosition,
                  size,
                  logoScale,
                  logoPosition,
                  isLogoTexture
                },
                timestamp: Date.now()
              });
              // Redirect to cart
              router.push('/cart');
            }}
            className="bg-highlight text-primary-dark py-4 text-[12px] md:text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-all duration-300 shadow-lg glass-hover rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
      
      {/* Size Chart Modal */}
      <SizeChart isOpen={showSizeChart} onClose={() => setShowSizeChart(false)} />
    </div>
  );
}
