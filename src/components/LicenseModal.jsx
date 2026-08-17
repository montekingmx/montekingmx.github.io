import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShieldCheck, Music, Sparkles, Layers, Crown, MessageSquare, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function LicenseModal() {
  const {
    selectedBeatForLicense,
    isLicenseModalOpen,
    closeLicenseModal,
    addToCart,
    generateWhatsAppLink,
    LICENSES,
  } = useCart();

  const [selectedLicense, setSelectedLicense] = useState(LICENSES[1]); // Default WAV Premium
  const [artistNotes, setArtistNotes] = useState('');

  if (!isLicenseModalOpen || !selectedBeatForLicense) return null;

  const iconMap = {
    Music: Music,
    Sparkles: Sparkles,
    Layers: Layers,
    Crown: Crown,
  };

  const handleWhatsAppBuy = () => {
    const link = generateWhatsAppLink(
      `Me interesa adquirir la licencia "${selectedLicense.name}" para el beat "${selectedBeatForLicense.cleanTitle}". ${artistNotes}`
    );
    window.open(link, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLicenseModal}
          className="fixed inset-0 bg-obsidian-dark/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl glass-card rounded-3xl border border-gold/40 shadow-gold-intense overflow-hidden z-10 my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gold/20 bg-gradient-to-r from-obsidian-card via-gold/5 to-obsidian-card">
            <div className="flex items-center gap-4">
              <img
                src={selectedBeatForLicense.coverUrl}
                alt={selectedBeatForLicense.cleanTitle}
                className="w-14 h-14 rounded-2xl object-cover border border-gold/40 shadow-gold-glow"
              />
              <div>
                <span className="text-xs text-gold uppercase tracking-widest font-mono">Selección de Licencia</span>
                <h2 className="font-cinzel font-bold text-xl text-white">
                  {selectedBeatForLicense.cleanTitle}
                </h2>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{selectedBeatForLicense.artist}</span> •
                  <span className="text-gold font-mono">{selectedBeatForLicense.bpm} BPM</span> •
                  <span>{selectedBeatForLicense.genre}</span>
                </div>
              </div>
            </div>

            <button
              onClick={closeLicenseModal}
              className="p-2 rounded-full bg-obsidian-light text-gray-400 hover:text-gold hover:bg-gold/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: License Options Grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
            {LICENSES.map((lic) => {
              const Icon = iconMap[lic.icon] || Music;
              const isSelected = selectedLicense.id === lic.id;

              return (
                <div
                  key={lic.id}
                  onClick={() => setSelectedLicense(lic)}
                  className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-gold/15 border-gold shadow-gold-glow'
                      : 'bg-obsidian-card/60 border-gold/15 hover:border-gold/40 hover:bg-obsidian-card'
                  }`}
                >
                  {lic.popular && (
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold text-obsidian-dark uppercase tracking-wider">
                      {lic.tag}
                    </span>
                  )}
                  {lic.exclusive && (
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-ruby text-white uppercase tracking-wider animate-pulse">
                      {lic.tag}
                    </span>
                  )}

                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-gold text-obsidian-dark' : 'bg-gold/10 text-gold'}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-base text-white">{lic.name}</h3>
                      <div className="font-mono font-bold text-xl text-gold-gradient my-1">
                        ${lic.price} <span className="text-xs text-gray-400 font-normal">USD</span>
                      </div>
                      
                      <p className="text-xs text-gray-300 font-medium mt-2 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                        {lic.format}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                        {lic.usage}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer & Action CTAs */}
          <div className="p-6 border-t border-gold/20 bg-obsidian-dark/95 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-5 h-5 text-gold" />
              <span>Entrega inmediata + Contrato de licencia oficial incluido.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => addToCart(selectedBeatForLicense, selectedLicense)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-obsidian-card border border-gold/40 hover:border-gold text-gold font-bold text-xs uppercase tracking-wider transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Agregar al Carrito</span>
              </button>

              <button
                onClick={handleWhatsAppBuy}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Comprar por WhatsApp</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
