import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, ShoppingCart, Share2, 
  X, MessageCircle, CreditCard, Building, Sparkles, Check, Package, Download, Disc
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAudio } from '@/context/AudioContext';
import { ALBUMS, LICENSE_TIERS, BEATS_DATA } from '@/data/beatsData';
import { SAMPLE_PACKS } from '@/data/samplePacksData';

const WHATSAPP_PHONE = "5218180106247";

const THEME_PRESETS = {
  'ALL': { p: '#FFD700', g: 'rgba(255, 215, 0, 0.8)', t: 'rgba(20, 15, 0, 0.6)' },
  'TRAP-MEMPH': { p: '#39FF14', g: 'rgba(57, 255, 20, 0.8)', t: 'rgba(0, 25, 0, 0.7)' },
  'BOOMBAP': { p: '#FFD700', g: 'rgba(255, 215, 0, 0.8)', t: 'rgba(20, 15, 0, 0.6)' },
  'TECHNO': { p: '#00E5FF', g: 'rgba(0, 229, 255, 0.8)', t: 'rgba(0, 20, 35, 0.7)' },
  'SUAVE': { p: '#D500F9', g: 'rgba(213, 0, 249, 0.8)', t: 'rgba(25, 0, 25, 0.7)' },
};

export default function BeatsPage() {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useAudio();
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null); // Beat or Sample Pack
  const [selectedLicense, setSelectedLicense] = useState('standard');
  const [activeTab, setActiveTab] = useState('wa'); // 'wa' | 'paypal' | 'bank'
  const [copiedBank, setCopiedBank] = useState(false);

  // Set initial theme or update when playing track changes
  const applyTheme = (genreKey) => {
    const key = genreKey === 'TECHNO. MK' || genreKey === 'ELECTRO MK' ? 'TECHNO' : genreKey;
    const t = THEME_PRESETS[key] || THEME_PRESETS['ALL'];
    document.documentElement.style.setProperty('--theme-primary', t.p);
    document.documentElement.style.setProperty('--theme-glow', t.g);
    document.documentElement.style.setProperty('--theme-bg-tint', t.t);
  };

  const handleFilterClick = (genre) => {
    setActiveFilter(genre);
    applyTheme(genre);
  };

  // Sync theme when playing beat changes
  useEffect(() => {
    if (currentTrack?.album) {
      applyTheme(currentTrack.album);
    }
  }, [currentTrack]);

  // Filter beats list
  const filteredBeats = BEATS_DATA.filter(beat => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'TECHNO') return beat.album.includes('TECHNO') || beat.album.includes('ELECTRO');
    return beat.album === activeFilter;
  });

  const openBuyModal = (item, isSamplePack = false) => {
    setModalItem({ ...item, isSamplePack });
    setModalOpen(true);
  };

  const addToCartAndOpen = (item, isSamplePack = false) => {
    const itemWithLic = {
      ...item,
      isSamplePack,
      license: isSamplePack ? 'samplepack' : selectedLicense,
      finalPrice: isSamplePack ? item.price : (LICENSE_TIERS.find(l => l.id === selectedLicense)?.price || 500)
    };

    const exists = cart.find(c => c.id === item.id);
    if (!exists) {
      setCart([...cart, itemWithLic]);
    }
    openBuyModal(itemWithLic, isSamplePack);
  };

  const getTier = (id) => LICENSE_TIERS.find(l => l.id === id) || LICENSE_TIERS[0];

  const getPrice = () => {
    if (!modalItem) return 500;
    if (modalItem.isSamplePack) return modalItem.price;
    return getTier(selectedLicense).price;
  };

  const buildWhatsAppLink = () => {
    if (!modalItem) return `https://wa.me/${WHATSAPP_PHONE}`;
    
    if (modalItem.isSamplePack) {
      const msg = `¡Hola Monteking! 📦 Quiero comprar el Sample Pack: *${modalItem.title}* ($${modalItem.price} MXN). ¿Cómo procedo con el pago y descarga?`;
      return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
    }

    const tier = getTier(selectedLicense);
    const msg = `Hola Monteking, quiero comprar la instrumental: *${modalItem.title}* (${tier.label} - $${tier.price} MXN).`;
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
  };

  const copyBankCard = () => {
    navigator.clipboard?.writeText("5101 2537 8184 6961");
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  // PayPal Button Render
  useEffect(() => {
    if (modalOpen && activeTab === 'paypal' && window.paypal) {
      const container = document.getElementById('paypal-button-container');
      if (container) {
        container.innerHTML = '';
        try {
          window.paypal.Buttons({
            style: { layout: 'horizontal', color: 'gold', shape: 'rect', label: 'pay', height: 44 },
            createOrder: (d, a) => {
              return a.order.create({
                purchase_units: [{
                  amount: { value: String(getPrice()) },
                  description: modalItem?.title || "Beat Monteking"
                }]
              });
            },
            onApprove: (d, a) => {
              return a.order.capture().then(det => {
                alert('¡Pago completado con éxito! Contactando con Monteking para entrega inmediata...');
                window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Hola, envío comprobante de pago PayPal por: ${modalItem?.title}`)}`, '_blank');
              });
            }
          }).render('#paypal-button-container');
        } catch (e) {
          console.error("PayPal Error:", e);
        }
      }
    }
  }, [modalOpen, activeTab, selectedLicense, modalItem]);

  return (
    <div className="min-h-screen pt-20 pb-36 font-oswald select-none">
      
      {/* ── 1. Original Hanging Sign Banner ── */}
      <div className="text-center relative py-8 px-4">
        <div className="inline-block relative animate-swing">
          {/* Hanging Chains */}
          <div className="absolute -top-24 left-3 w-1.5 h-28 bg-gradient-to-b from-[#8a6e0e] via-[#ffd700] to-[#443707] border border-black transform rotate-12 -z-10 shadow" />
          <div className="absolute -top-24 right-3 w-1.5 h-28 bg-gradient-to-b from-[#8a6e0e] via-[#ffd700] to-[#443707] border border-black transform -rotate-12 -z-10 shadow" />

          {/* Gothic Title with Dynamic Glow */}
          <h1 className="font-pirata text-6xl sm:text-8xl md:text-9xl text-stroke-gold tracking-wider leading-none">
            MONTEKING MX
          </h1>
          <div className="text-xs sm:text-sm md:text-base tracking-[0.4em] sm:tracking-[0.5em] font-bold uppercase mt-3" style={{ color: 'var(--theme-primary)' }}>
            PREMIUM BEAT CATALOG [13-11]
          </div>
        </div>
      </div>

      {/* ── 2. Original Licenses & Pricing Box ── */}
      <section 
        id="licenses"
        className="w-[95%] max-w-4xl mx-auto my-8 p-6 sm:p-8 rounded-2xl backdrop-blur-xl border-2 transition-all shadow-2xl"
        style={{
          backgroundColor: 'rgba(5, 5, 5, 0.92)',
          borderColor: 'var(--theme-primary)',
          boxShadow: '0 0 35px var(--theme-glow)'
        }}
      >
        <h2 className="font-pirata text-3xl sm:text-4xl text-center mb-6 tracking-wide" style={{ color: 'var(--theme-primary)' }}>
          LICENCIAS & PRECIOS
        </h2>

        <div className="space-y-4 text-sm sm:text-base">
          <div className="border-b border-zinc-800 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
            <div>
              <b className="text-white text-base sm:text-lg">1. Licencia Estándar (WAV)</b>
              <p className="text-zinc-400 text-xs sm:text-sm">WAV Masterizado de alta fidelidad. Uso comercial no exclusivo.</p>
            </div>
            <span className="font-pirata text-2xl" style={{ color: 'var(--theme-primary)' }}>$500 MXN</span>
          </div>

          <div className="border-b border-zinc-800 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
            <div>
              <b className="text-white text-base sm:text-lg">2. Licencia Pro (Stems / Trackout)</b>
              <p className="text-zinc-400 text-xs sm:text-sm">Pistas separadas (Trackout) + WAV Master + MP3.</p>
            </div>
            <span className="font-pirata text-2xl" style={{ color: 'var(--theme-primary)' }}>$700 MXN</span>
          </div>

          <div className="pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
            <div>
              <b className="text-white text-base sm:text-lg">3. Licencia Exclusiva</b>
              <p className="text-zinc-400 text-xs sm:text-sm">Archivos completos multipista. El beat se retira del catálogo. *Precio base o % regalías.</p>
            </div>
            <span className="font-pirata text-2xl" style={{ color: 'var(--theme-primary)' }}>$1000 MXN*</span>
          </div>
        </div>

        <img 
          src="assets/signature.png" 
          alt="Represent." 
          className="w-40 sm:w-48 mx-auto mt-6 opacity-90 transition-all filter drop-shadow" 
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </section>

      {/* ── 3. Original Dynamic Genre Filters ── */}
      <div className="overflow-x-auto whitespace-nowrap px-4 sm:px-8 py-3 mb-6 scrollbar-none text-center">
        <div className="inline-flex gap-2.5 p-1 bg-black/60 backdrop-blur-md rounded-2xl border border-zinc-800">
          {[
            { key: 'ALL', label: 'ALL BEATS' },
            { key: 'TRAP-MEMPH', label: 'TRAP MEMPHIS' },
            { key: 'BOOMBAP', label: 'BOOMBAP' },
            { key: 'TECHNO', label: 'TECHNO' },
            { key: 'SUAVE', label: 'R&B SUAVE' },
          ].map(btn => {
            const isActive = activeFilter === btn.key;
            return (
              <button
                key={btn.key}
                onClick={() => handleFilterClick(btn.key)}
                className={`px-5 py-2.5 rounded-xl font-oswald text-xs sm:text-sm font-bold uppercase transition-all duration-300 ${
                  isActive
                    ? 'text-black shadow-lg'
                    : 'bg-zinc-900/80 border border-zinc-800 text-white hover:border-zinc-600'
                }`}
                style={isActive ? { backgroundColor: 'var(--theme-primary)', borderColor: 'var(--theme-primary)', boxShadow: '0 0 20px var(--theme-glow)' } : {}}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 4. Original Catalog Grid with 3D Tilt & Overlays ── */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredBeats.map((beat) => {
            const isPlayingThis = isPlaying && currentTrack?.url === beat.url;
            const coverArt = beat.cover || 'assets/cover_trap.jpg';

            return (
              <motion.div
                key={beat.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative h-[260px] sm:h-[380px] bg-black rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 group ${
                  isPlayingThis ? 'shadow-2xl' : 'border-zinc-800 hover:border-zinc-600'
                }`}
                style={isPlayingThis ? { borderColor: 'var(--theme-primary)', boxShadow: '0 0 25px var(--theme-glow)' } : {}}
                onClick={() => openBuyModal(beat)}
              >
                {/* Artwork with zoom */}
                <img
                  src={coverArt}
                  alt={beat.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-1 sm:gap-2">
                  
                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold font-mono tracking-wider" style={{ color: 'var(--theme-primary)' }}>
                      {beat.bpm ? `${beat.bpm} BPM` : '140 BPM'}
                    </span>

                    <div className="flex items-center gap-2">
                      {/* Play Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playTrack(beat, BEATS_DATA);
                        }}
                        className="w-8 h-8 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center text-sm sm:text-base bg-black/60 hover:scale-110 active:scale-95 transition-all shadow-lg"
                        style={{ borderColor: 'var(--theme-primary)', color: 'var(--theme-primary)' }}
                        title={isPlayingThis ? "Pausar" : "Reproducir Preview"}
                      >
                        {isPlayingThis ? <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 fill-current" />}
                      </button>

                      {/* Add Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCartAndOpen(beat);
                        }}
                        className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-xs sm:text-sm text-black font-bold hover:scale-110 active:scale-95 transition-all shadow-lg"
                        style={{ backgroundColor: 'var(--theme-primary)' }}
                        title="Comprar Licencia"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-black" />
                      </button>
                    </div>
                  </div>

                  {/* Title in Pirata One */}
                  <div className="font-pirata text-lg sm:text-2xl truncate text-stroke-card leading-tight">
                    {beat.title}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── 5. NEW: Official Sample Packs Section ── */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-8 mt-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-yellow-500/30 text-xs font-mono mb-3" style={{ color: 'var(--theme-primary)' }}>
            <Package className="w-3.5 h-3.5" /> PRODUCCIÓN & SOUND DESIGN
          </div>
          <h2 className="font-pirata text-4xl sm:text-6xl text-white tracking-wider">
            SAMPLE PACKS & <span style={{ color: 'var(--theme-primary)' }}>SOUND KITS</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Sonidos exclusivos diseñados en el estudio de Monteking Records: 808s procesados, drum breaks, loops y MIDI listos para tus producciones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_PACKS.map(pack => (
            <div
              key={pack.id}
              className="bg-zinc-950/90 border border-zinc-800 hover:border-yellow-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-2xl group"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-zinc-900 border border-zinc-800">
                  <img src={pack.cover} alt={pack.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-yellow-400 border border-yellow-500/30">
                    {pack.badge}
                  </div>
                </div>

                <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-500 block mb-1">{pack.category}</span>
                <h3 className="text-white text-lg font-bold font-oswald mb-1">{pack.title}</h3>
                <p className="text-zinc-400 text-xs mb-3">{pack.subtitle}</p>

                <div className="bg-zinc-900/60 rounded-xl p-3 mb-4 space-y-1 text-xs text-zinc-300 font-mono">
                  <p>📁 {pack.specs.samples}</p>
                  <p>🎛️ {pack.specs.format}</p>
                  <p>⚡ {pack.specs.bpmRange}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                <span className="font-pirata text-2xl text-yellow-400">${pack.price} MXN</span>
                <Button
                  onClick={() => openBuyModal(pack, true)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs rounded-xl px-4 py-2"
                >
                  <Download className="w-3.5 h-3.5 mr-1" /> OBTENER PACK
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Original Interactive Purchase Modal (Restored) ── */}
      <AnimatePresence>
        {modalOpen && modalItem && (
          <div 
            className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border-2 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row relative shadow-2xl custom-scrollbar"
              style={{ borderColor: 'var(--theme-primary)', boxShadow: '0 0 45px var(--theme-glow)' }}
            >
              {/* Close button */}
              <button 
                onClick={() => setModalOpen(false)} 
                className="absolute top-3 right-4 text-white text-3xl font-bold hover:text-red-400 z-20"
              >
                &times;
              </button>

              {/* Modal Left: Artwork & Meta */}
              <div className="w-full md:w-[40%] p-6 sm:p-8 bg-[#080808] border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col items-center justify-center text-center">
                <img 
                  src={modalItem.cover || 'assets/cover_trap.jpg'} 
                  alt={modalItem.title} 
                  className="w-48 sm:w-56 aspect-square object-cover rounded-xl border border-zinc-700 shadow-xl mb-4" 
                />
                <h2 className="font-pirata text-2xl sm:text-3xl leading-tight mb-2" style={{ color: 'var(--theme-primary)' }}>
                  {modalItem.title}
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm font-mono">
                  {modalItem.isSamplePack 
                    ? `${modalItem.category} | ${modalItem.specs.size}`
                    : `${modalItem.bpm || 140} BPM | ${modalItem.album}`
                  }
                </p>

                <div className="mt-4 pt-4 border-t border-zinc-800 w-full text-center">
                  <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">Precio Final</span>
                  <span className="font-pirata text-3xl sm:text-4xl text-white">
                    ${getPrice()} <span className="text-sm font-oswald text-yellow-400">MXN</span>
                  </span>
                </div>
              </div>

              {/* Modal Right: License selection & Payment tabs */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  {!modalItem.isSamplePack && (
                    <div className="mb-6">
                      <label className="block mb-2 text-zinc-300 text-xs font-bold uppercase tracking-wider">
                        SELECCIONA TIPO DE LICENCIA:
                      </label>
                      <select 
                        value={selectedLicense}
                        onChange={(e) => setSelectedLicense(e.target.value)}
                        className="w-full p-3.5 bg-[#222] text-white border border-zinc-700 rounded-xl text-sm font-oswald focus:border-yellow-400 outline-none"
                      >
                        <option value="standard">Licencia Estándar WAV ($500 MXN)</option>
                        <option value="pro">Licencia Pro Stems / Trackout ($700 MXN)</option>
                        <option value="exclusive">Licencia Exclusiva ($1000 MXN)</option>
                      </select>
                    </div>
                  )}

                  {/* Payment Tabs */}
                  <div className="flex border-b border-zinc-800 mb-6">
                    <button
                      onClick={() => setActiveTab('wa')}
                      className={`flex-1 py-3 text-xs sm:text-sm uppercase font-bold transition-all border-b-2 ${
                        activeTab === 'wa' 
                          ? 'border-yellow-400 text-yellow-400 font-bold' 
                          : 'border-transparent text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      WhatsApp
                    </button>
                    <button
                      onClick={() => setActiveTab('paypal')}
                      className={`flex-1 py-3 text-xs sm:text-sm uppercase font-bold transition-all border-b-2 ${
                        activeTab === 'paypal' 
                          ? 'border-yellow-400 text-yellow-400 font-bold' 
                          : 'border-transparent text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      PayPal / Tarjeta
                    </button>
                    <button
                      onClick={() => setActiveTab('bank')}
                      className={`flex-1 py-3 text-xs sm:text-sm uppercase font-bold transition-all border-b-2 ${
                        activeTab === 'bank' 
                          ? 'border-yellow-400 text-yellow-400 font-bold' 
                          : 'border-transparent text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      Transferencia
                    </button>
                  </div>

                  {/* Tab 1: WhatsApp */}
                  {activeTab === 'wa' && (
                    <div className="space-y-4">
                      <p className="text-zinc-300 text-sm">
                        Habla directamente conmigo para cerrar el trato y recibir tus archivos WAV / Stems de inmediato por Google Drive.
                      </p>
                      <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="block">
                        <Button className="w-full py-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm rounded-xl tracking-wider shadow-lg flex items-center justify-center gap-2">
                          <MessageCircle className="w-5 h-5" /> PEDIR POR WHATSAPP (${getPrice()} MXN)
                        </Button>
                      </a>
                    </div>
                  )}

                  {/* Tab 2: PayPal */}
                  {activeTab === 'paypal' && (
                    <div className="space-y-4">
                      <p className="text-zinc-300 text-sm">
                        Pago seguro instantáneo vía PayPal (Acepta tarjetas de débito y crédito).
                      </p>
                      <div id="paypal-button-container" className="min-h-[50px]"></div>
                    </div>
                  )}

                  {/* Tab 3: Bank Transfer */}
                  {activeTab === 'bank' && (
                    <div className="space-y-4">
                      <div className="bg-[#1a1a1a] p-4 rounded-xl border border-zinc-700 font-mono text-xs text-zinc-300 space-y-1.5">
                        <p><span className="text-zinc-500">BANCO:</span> NU</p>
                        <p><span className="text-zinc-500">TITULAR:</span> CASILA MONTEKING</p>
                        <div className="flex items-center justify-between pt-1">
                          <p><span className="text-zinc-500">TARJETA:</span> <span className="text-yellow-400 font-bold">5101 2537 8184 6961</span></p>
                          <button onClick={copyBankCard} className="text-xs bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded text-white font-sans">
                            {copiedBank ? '¡Copiado!' : 'Copiar'}
                          </button>
                        </div>
                      </div>
                      <a 
                        href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Hola, envío comprobante de pago por: ${modalItem.title} ($${getPrice()} MXN).`)}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block"
                      >
                        <Button className="w-full py-5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2">
                          <MessageCircle className="w-4 h-4" /> ENVIAR COMPROBANTE DE PAGO
                        </Button>
                      </a>
                    </div>
                  )}
                </div>

                <p className="text-zinc-500 text-[11px] text-center mt-6">
                  Entrega garantizada en menos de 24 hrs con licencia personalizada.
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}