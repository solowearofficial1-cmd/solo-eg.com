"use client";

import { useState } from 'react';
import { X, Ruler, Shirt } from 'lucide-react';

interface SizeChartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeChart({ isOpen, onClose }: SizeChartProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-primary-dark to-zinc-900 border border-highlight/20 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-highlight/20 rounded-full flex items-center justify-center">
              <Ruler size={20} className="text-highlight" />
            </div>
            <h3 className="text-xl font-serif text-white">Size Guide</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Size Chart */}
        <div className="space-y-6">
          {/* T-Shirt Sizes */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-sm font-bold text-highlight mb-4 flex items-center gap-2">
              <Shirt size={16} />
              Classic T-Shirts
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-3 text-white/60 uppercase tracking-widest">Size</th>
                    <th className="text-center p-3 text-white/60 uppercase tracking-widest">Chest (cm)</th>
                    <th className="text-center p-3 text-white/60 uppercase tracking-widest">Length (cm)</th>
                    <th className="text-center p-3 text-white/60 uppercase tracking-widest">US</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-3 font-bold text-highlight">XS</td>
                    <td className="p-3 text-center">84-89</td>
                    <td className="p-3 text-center">66</td>
                    <td className="p-3 text-center">34-36</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-3 font-bold text-highlight">S</td>
                    <td className="p-3 text-center">90-96</td>
                    <td className="p-3 text-center">68</td>
                    <td className="p-3 text-center">38-40</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-3 font-bold text-highlight">M</td>
                    <td className="p-3 text-center">101-107</td>
                    <td className="p-3 text-center">71</td>
                    <td className="p-3 text-center">42-44</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-3 font-bold text-highlight">L</td>
                    <td className="p-3 text-center">112-118</td>
                    <td className="p-3 text-center">74</td>
                    <td className="p-3 text-center">46-48</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="p-3 font-bold text-highlight">XL</td>
                    <td className="p-3 text-center">123-129</td>
                    <td className="p-3 text-center">76</td>
                    <td className="p-3 text-center">50-52</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-highlight">XXL</td>
                    <td className="p-3 text-center">134-140</td>
                    <td className="p-3 text-center">78</td>
                    <td className="p-3 text-center">54-56</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Fit Guide */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-sm font-bold text-highlight mb-4">Fit Guide</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <h5 className="font-bold text-white mb-2">Slim Fit</h5>
                <p className="text-white/60 leading-relaxed">
                  Close to the body, tailored silhouette. Recommended for a sleek, modern look.
                </p>
              </div>
              <div>
                <h5 className="font-bold text-white mb-2">Regular Fit</h5>
                <p className="text-white/60 leading-relaxed">
                  Standard cut with room for movement. Our most popular fit.
                </p>
              </div>
            </div>
          </div>

          {/* Measurement Tips */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-sm font-bold text-highlight mb-4">How to Measure</h4>
            <div className="space-y-3 text-xs text-white/60">
              <div className="flex items-start gap-3">
                <span className="font-bold text-highlight">1.</span>
                <p>Chest: Measure around the fullest part of your chest, keeping the tape measure level.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-highlight">2.</span>
                <p>Length: Measure from the highest point of the shoulder to the bottom hem.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-bold text-highlight">3.</span>
                <p>For best results, have someone else measure you while standing naturally.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="bg-highlight text-primary-dark px-8 py-3 text-xs uppercase tracking-widest font-bold rounded-full hover:bg-white transition-all duration-300"
          >
            Close Size Guide
          </button>
        </div>
      </div>
    </div>
  );
}
