import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Heart, Star, Truck, Shield, RefreshCw,
  X, MessageCircle, ChevronRight, Package, Download, Tag, ChevronLeft
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MERCH_PRODUCTS, CATEGORIES_MERCH } from '@/data/merchData';
import { SAMPLE_PACKS } from '@/data/samplePacksData';
import CheckoutModal from '@/components/shared/CheckoutModal';

const WHATSAPP_PHONE = "5218180106247";

const SHIPPING_FEATURES = [
  { icon: Truck, title: "Envío a Todo México", desc: "Paquetería Express con rastreo en tiempo real" },
  { icon: Shield, title: "Pago 100% Seguro", desc: "PayPal, Tarjeta, Transferencia, WhatsApp Pay" },
  { icon: RefreshCw, title: "Cambios Fáciles", desc: "30 días para cambio de talla o color" },
  { icon: Package, title: "Dropshipping Automático", desc: "Fulfillment directo sin intermediarios" },
];

const COLOR_HEX = {
  "Jet Black": "#111111",
  "Jet Black & Gold": "#111111",
  "Vintage Washed Dark Grey": "#4a4a4a",
  "Black Onyx": "#0d0d0d",
  "Charcoal Acid Wash": "#3a3a3a",
  "Bone White & Gold": "#f5f0e8",
  "All Black & Gold": "#111111",
  "Black / Gold Mesh": "#1a1a1a",
  "Negro / Oro / Esmeralda": "#1a1a1a",
  "Matte Tactical Black": "#0a0a0a",
  "Oro 18K Gold Plated": "#D4AF37",
};

export default function MerchPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [favorites, setFavorites] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mockupIndex, setMockupIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('merch'); // 'merch' | 'packs'
  const [checkoutPack, setCheckoutPack] = useState(null);

  const filteredProducts = MERCH_PRODUCTS.filter(p =>
    activeCategory === "Todos" || p.category === activeCategory
  );

  const toggleFav = (id) => setFavorites(prev => ({ ...prev, [id]: !prev[id] }));

  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0] || null);
    setSelectedColor(product.colors[0] || null);
    setMockupIndex(0);
  };

  const buildWhatsAppMerch = () => {
    if (!selectedProduct) return `https://wa.me/${WHATSAPP_PHONE}`;
    const msg = `¡Hola Monteking! 🛍️ Quiero ordenar:\n\n*${selectedProduct.name}*\n- Talla: ${selectedSize}\n- Color: ${selectedColor}\n- Precio: $${selectedProduct.price} MXN\n\n¿Cómo procedo con el pago?`;
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
  };

  const buildWhatsAppPack = (pack) => {
    const msg = `¡Hola! 📦 Quiero comprar el Sample Pack: *${pack.title}* ($${pack.price} MXN). ¿Cómo descargo los archivos después del pago?`;
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold font-mono uppercase tracking-widest mb-3">
            <ShoppingBag className="w-3.5 h-3.5" /> MONTEKING MX OFFICIAL STORE
          </div>
          <h1 className="font-pirata text-5xl sm:text-7xl text-white tracking-wider">
            MERCH & <span className="text-stroke-gold">SOUND KITS</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mt-3">
            Streetwear de casino barroco, sample packs exclusivos y accesorios de lujo nacidos en Monterrey.
          </p>
        </motion.div>

        {/* ── Motion Marquee Promo Banner for Sample Packs $500 MXN (Item 16) ── */}
        <div className="mb-10 overflow-hidden rounded-2xl border-2 border-yellow-400 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 p-[2px] shadow-2xl shadow-yellow-500/20">
          <div className="bg-black/90 py-3 px-4 flex items-center overflow-hidden">
            <motion.div
              className="flex items-center gap-8 whitespace-nowrap font-oswald text-sm sm:text-base font-black tracking-wider uppercase text-yellow-300"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
              <span>🔥 OFERTA LIMITADA: TODOS LOS SAMPLE PACKS A $500 MXN</span>
              <span className="text-white">⚡ WAV 24-BIT MASTERIZADO A -8 LUFS</span>
              <span>💎 100% ROYALTY FREE PARA PRODUCCIÓN COMERCIAL</span>
              <span className="text-yellow-400">💳 PAGOS CON PAYPAL, MERCADOPAGO, TARJETAS, SPEI Y OXXO</span>
              <span>👑 MONTEKING RECORDS 13-11 VAULT</span>
              <span>🔥 OFERTA LIMITADA: TODOS LOS SAMPLE PACKS A $500 MXN</span>
              <span className="text-white">⚡ WAV 24-BIT MASTERIZADO A -8 LUFS</span>
            </motion.div>
          </div>
        </div>

        {/* ── Top Tab Switcher: Merch vs Sample Packs ── */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('merch')}
            className={`px-7 py-3 rounded-2xl font-bold text-sm font-oswald uppercase tracking-wider transition-all border ${
              activeTab === 'merch'
                ? 'bg-yellow-500 text-black border-yellow-400 shadow-lg shadow-yellow-500/20'
                : 'bg-black/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
            }`}
          >
            <ShoppingBag className="w-4 h-4 inline-block mr-2" /> Ropa & Accesorios
          </button>
          <button
            onClick={() => setActiveTab('packs')}
            className={`px-7 py-3 rounded-2xl font-bold text-sm font-oswald uppercase tracking-wider transition-all border ${
              activeTab === 'packs'
                ? 'bg-yellow-500 text-black border-yellow-400 shadow-lg shadow-yellow-500/20'
                : 'bg-black/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
            }`}
          >
            <Download className="w-4 h-4 inline-block mr-2" /> Sample Packs ($500 MXN)
          </button>
        </div>

        {/* ── MERCH TAB ── */}
        {activeTab === 'merch' && (
          <>
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {CATEGORIES_MERCH.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-oswald uppercase tracking-wider transition-all border ${
                    activeCategory === cat
                      ? 'bg-yellow-500/20 border-yellow-500/60 text-yellow-400'
                      : 'bg-black/50 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  className="bg-zinc-950/90 border border-zinc-800 hover:border-yellow-500/40 rounded-2xl overflow-hidden group transition-all hover:shadow-2xl hover:shadow-yellow-500/10 flex flex-col"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-zinc-900 overflow-hidden">
                    <img
                      src={product.mockups[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.style.display = 'none'; 
                      }}
                    />
                    {/* Badges overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-yellow-500 text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {product.tag}
                      </span>
                    </div>
                    {/* Favorites Heart */}
                    <button
                      onClick={() => toggleFav(product.id)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Heart className={`w-4 h-4 ${favorites[product.id] ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>
                    {/* Original vs sale price */}
                    {product.originalPrice && (
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <span className="text-zinc-400 text-[10px] line-through">${product.originalPrice}</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <p className="text-zinc-500 text-[11px] uppercase font-bold tracking-wider mb-1">{product.subCategory}</p>
                      <h3 className="text-white font-bold font-oswald text-base leading-snug mb-2 group-hover:text-yellow-400 transition-colors">
                        {product.name}
                      </h3>

                      {/* Color Swatches mini-preview */}
                      <div className="flex gap-1.5 mb-3">
                        {product.colors.slice(0, 4).map((color) => (
                          <div
                            key={color}
                            title={color}
                            className="w-5 h-5 rounded-full border-2 border-zinc-700 shadow"
                            style={{ backgroundColor: COLOR_HEX[color] || '#333' }}
                          />
                        ))}
                        {product.colors.length > 4 && (
                          <span className="text-zinc-500 text-[10px] self-center">+{product.colors.length - 4}</span>
                        )}
                      </div>

                      {/* Size tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.sizes.slice(0, 5).map(s => (
                          <span key={s} className="text-[10px] font-mono font-bold text-zinc-400 border border-zinc-700 px-1.5 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                      <span className="font-pirata text-2xl text-yellow-400">${product.price} <span className="text-xs font-oswald text-zinc-500">MXN</span></span>
                      <Button
                        onClick={() => openModal(product)}
                        className="bg-gradient-to-r from-yellow-500 to-amber-400 hover:brightness-110 text-black font-bold text-xs rounded-xl px-4 py-2"
                      >
                        Ordenar <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* ── SAMPLE PACKS TAB ── */}
        {activeTab === 'packs' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAMPLE_PACKS.map((pack, idx) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-zinc-950/90 border border-zinc-800 hover:border-yellow-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-2xl group"
              >
                <div>
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-zinc-900 border border-zinc-800">
                    <img src={pack.cover} alt={pack.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-yellow-500 text-black text-[10px] font-black px-2.5 py-1 rounded-full">
                      {pack.badge}
                    </div>
                  </div>

                  <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-500 block mb-1">{pack.category}</span>
                  <h3 className="text-white text-base font-bold font-oswald mb-1 leading-snug">{pack.title}</h3>
                  <p className="text-zinc-400 text-xs mb-3">{pack.subtitle}</p>

                  <div className="bg-zinc-900/60 rounded-xl p-3 mb-4 space-y-1 text-xs text-zinc-300 font-mono">
                    <p>📁 {pack.specs.samples}</p>
                    <p>🎛️ {pack.specs.format}</p>
                    <p>⚡ {pack.specs.bpmRange}</p>
                    <p>💾 {pack.specs.size}</p>
                  </div>

                  <ul className="space-y-1 mb-4">
                    {pack.contents.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                        <span className="text-yellow-500 mt-0.5">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-zinc-500 line-through text-[11px] font-mono mr-1">${pack.originalPrice}</span>
                    <span className="font-pirata text-2xl text-yellow-400">${pack.price} <span className="text-xs font-oswald text-zinc-500">MXN</span></span>
                  </div>
                  <Button
                    onClick={() => setCheckoutPack(pack)}
                    className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:brightness-110 text-black font-bold font-oswald text-xs uppercase rounded-xl px-4 py-2 flex items-center gap-1.5 shadow-lg shadow-yellow-500/20 transition-transform active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" /> Comprar
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Shipping & Features Banner ── */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SHIPPING_FEATURES.map((feat) => (
            <div key={feat.title} className="bg-zinc-950/70 border border-zinc-800 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0">
                <feat.icon className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm font-oswald">{feat.title}</p>
                <p className="text-zinc-400 text-xs mt-0.5">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Product Order Modal ── */}
      <AnimatePresence>
        {selectedProduct && (
          <div
            className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border-2 border-yellow-500/40 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto flex flex-col lg:flex-row relative shadow-2xl shadow-yellow-500/10 custom-scrollbar"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-900 hover:bg-red-600/20 text-zinc-400 hover:text-white flex items-center justify-center z-20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left: Mockup Gallery */}
              <div className="w-full lg:w-[45%] bg-zinc-950 flex flex-col p-6 border-b lg:border-b-0 lg:border-r border-zinc-800">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 mb-3">
                  <img
                    src={selectedProduct.mockups[mockupIndex]}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.style.display = 'none'; 
                    }}
                  />
                </div>
                {/* Mockup thumbnail switcher */}
                {selectedProduct.mockups.length > 1 && (
                  <div className="flex gap-2 justify-center">
                    {selectedProduct.mockups.map((m, i) => (
                      <button
                        key={i}
                        onClick={() => setMockupIndex(i)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          mockupIndex === i ? 'border-yellow-400' : 'border-zinc-700 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={m} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Config & Checkout */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col">
                <div className="mb-4">
                  <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider font-mono block mb-1">
                    {selectedProduct.subCategory}
                  </span>
                  <h2 className="text-2xl font-black text-white font-oswald leading-tight mb-1">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{selectedProduct.description}</p>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-1.5 mb-5">
                    {selectedProduct.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-zinc-300 bg-zinc-900/60 rounded-lg px-3 py-2">
                        <span className="text-yellow-500">▸</span> {spec}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    TALLA: <span className="text-yellow-400">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedSize === s
                            ? 'bg-yellow-500 border-yellow-400 text-black'
                            : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selector */}
                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    COLOR: <span className="text-yellow-400">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedColor === color
                            ? 'border-yellow-400 bg-yellow-500/10 text-yellow-400'
                            : 'border-zinc-700 text-zinc-300 hover:border-zinc-500'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-zinc-600 shrink-0"
                          style={{ backgroundColor: COLOR_HEX[color] || '#333' }}
                        />
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="mt-auto pt-5 border-t border-zinc-800">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-zinc-500 text-xs block">Precio Final</span>
                      <span className="font-pirata text-3xl text-yellow-400">${selectedProduct.price} <span className="text-sm font-oswald text-zinc-400">MXN</span></span>
                    </div>
                    {selectedProduct.originalPrice && (
                      <span className="text-zinc-500 text-sm line-through">${selectedProduct.originalPrice} MXN</span>
                    )}
                  </div>

                  {/* WhatsApp CTA (Primary) */}
                  <a
                    href={buildWhatsAppMerch()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full py-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm rounded-xl tracking-wider shadow-lg flex items-center justify-center gap-2 mb-3">
                      <MessageCircle className="w-5 h-5" /> ORDENAR POR WHATSAPP
                    </Button>
                  </a>

                  <p className="text-zinc-500 text-[11px] text-center">
                    Fulfillment automático vía dropshipping · Entrega 3-7 días hábiles a todo México
                  </p>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Direct Checkout & Automated Download Modal ── */}
      <CheckoutModal
        isOpen={Boolean(checkoutPack)}
        onClose={() => setCheckoutPack(null)}
        item={checkoutPack}
        type="pack"
      />

    </div>
  );
}