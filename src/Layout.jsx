import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Home, Music, ShoppingBag,
  Gamepad2, Crown, Instagram, Youtube, Music2, Disc3, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import MusicPlayer from '@/components/shared/MusicPlayer';
import AtmosphereFX from '@/components/shared/AtmosphereFX';
import { useAudio } from '@/context/AudioContext';

const NAV_ITEMS = [
  { name: 'Inicio', href: 'Home', icon: Home },
  { name: 'Beats & Catálogo', href: 'Beats', icon: Crown },
  { name: 'Música', href: 'Music', icon: Music },
  { name: 'Videos', href: 'Videos', icon: Music2 },
  { name: 'Lyric Clips ✨', href: 'LyricVideo', icon: Sparkles },
  { name: 'Merch Oficial', href: 'Merch', icon: ShoppingBag },
  { name: 'Servicios', href: 'Services', icon: Music },
  { name: 'Prod. Tips', href: 'ProdInfo', icon: Music },
  { name: 'Juegos Retro', href: 'Game', icon: Gamepad2 },
  { name: 'Nosotros', href: 'About', icon: Crown },
];

const LOGO_URL = "assets/logo_1.png";

export default function Layout({ children, currentPageName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isPlaying, isPlayerMinimized, setIsPlayerMinimized } = useAudio();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const isHome = currentPageName === 'Home';

  return (
    <div className="min-h-screen text-white font-sans selection:bg-yellow-500 selection:text-black relative">
      
      {/* Atmosphere FX: Crocodile Texture, Parallax, Smoke, Luciérnagas, Cursor, Live Ticker */}
      <AtmosphereFX />

      {/* Fixed Navbar Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled || !isHome
            ? 'bg-black/90 backdrop-blur-xl border-b border-zinc-800/80 shadow-2xl'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center justify-between h-20">
            
            {/* Brand Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-black/60 border border-yellow-500/30 p-1 flex items-center justify-center shadow-lg group-hover:border-yellow-400 transition-colors">
                <img
                  src={LOGO_URL}
                  alt="Monteking MX"
                  className="w-full h-full object-contain"
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23FFD700' font-family='sans-serif' font-weight='bold'%3EMK%3C/text%3E%3C/svg%3E"; 
                  }}
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-white text-lg font-black tracking-wider uppercase group-hover:text-yellow-400 transition-colors block leading-tight font-oswald">
                  MONTEKING MX. <span className="text-yellow-400">[13-11]</span>
                </span>
                <span className="text-zinc-400 text-[10px] font-bold tracking-widest block uppercase">
                  Sonido Cardíaco • Represent
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Single Clean Row) */}
            <div className="hidden lg:flex items-center gap-1 overflow-x-auto no-scrollbar whitespace-nowrap">
              {[
                { name: 'Inicio', href: 'Home' },
                { name: 'Beats', href: 'Beats' },
                { name: 'Música', href: 'Music' },
                { name: 'Videos', href: 'Videos' },
                { name: 'Lyric Clips', href: 'LyricVideo' },
                { name: 'Merch', href: 'Merch' },
                { name: 'Servicios', href: 'Services' },
                { name: 'Prod Tips', href: 'ProdInfo' },
                { name: 'Juegos', href: 'Game' },
                { name: 'Nosotros', href: 'About' },
              ].map((item) => {
                const isActive = currentPageName === item.href;
                return (
                  <Link
                    key={item.name}
                    to={createPageUrl(item.href)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 uppercase tracking-wider font-oswald whitespace-nowrap ${
                      isActive
                        ? 'text-yellow-400 bg-yellow-400/15 border border-yellow-400/30 shadow-sm'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Quick Actions & Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Beats Quick Link */}
              <Link to="/Beats">
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 hover:brightness-110 text-black font-black text-xs rounded-xl shadow-lg shadow-yellow-500/25 hidden sm:inline-flex items-center gap-1.5 border border-yellow-300"
                >
                  <Crown className="w-3.5 h-3.5" /> CATÁLOGO DE BEATS
                </Button>
              </Link>

              {/* Player Floating Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-xl transition-colors border border-zinc-800 bg-black/40 ${isPlaying ? 'text-yellow-400 border-yellow-500/50 bg-yellow-400/10' : 'text-zinc-400 hover:text-yellow-400'}`}
                onClick={() => setIsPlayerMinimized(!isPlayerMinimized)}
                title={isPlayerMinimized ? "Mostrar Reproductor" : "Minimizar Reproductor"}
              >
                {isPlaying ? <Disc3 className="w-5 h-5 animate-spin text-yellow-400" /> : <Music className="w-5 h-5" />}
              </Button>

              {/* Mobile Menu Hamburger */}
              <Button
                variant="ghost"
                size="icon"
                className="xl:hidden text-white rounded-xl hover:bg-zinc-800 border border-zinc-800"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>

          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 xl:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-zinc-950 border-l border-zinc-800 z-50 xl:hidden overflow-y-auto p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <img src={LOGO_URL} alt="Monteking" className="h-9 w-auto" />
                    <div>
                      <span className="text-white font-bold text-sm block font-oswald">MONTEKING MX</span>
                      <span className="text-yellow-500 text-[11px] font-mono">13-11 Records</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-zinc-400 hover:text-white rounded-xl"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = currentPageName === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={createPageUrl(item.href)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                          isActive
                            ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30'
                            : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                        }`}
                      >
                        <item.icon className="w-4 h-4 text-yellow-500" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Socials in drawer */}
              <div className="pt-6 border-t border-zinc-800">
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">Redes Oficiales</p>
                <div className="flex gap-2">
                  <a href="https://instagram.com/casilaog" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full border-zinc-800 text-zinc-400 hover:text-pink-400 rounded-xl">
                      <Instagram className="w-4 h-4 mr-1.5" /> @casilaog
                    </Button>
                  </a>
                  <a href="https://youtube.com/@montekingmx" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full border-zinc-800 text-zinc-400 hover:text-red-400 rounded-xl">
                      <Youtube className="w-4 h-4 mr-1.5" /> YouTube
                    </Button>
                  </a>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <main className={isHome ? '' : 'pt-4'}>
        {children}
      </main>

      {/* Global Footer (Privacy Protected: No Raw Phone Exposed) */}
      <footer className="bg-black/90 backdrop-blur-xl border-t border-zinc-800/80 py-16 pb-36 text-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            
            {/* Brand column */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <img src={LOGO_URL} alt="Monteking" className="h-12 w-auto" />
                <div>
                  <h3 className="text-xl font-black tracking-wider text-white font-pirata text-2xl">MONTEKING MX</h3>
                  <span className="text-xs text-yellow-400 font-bold tracking-widest block font-mono">RECORDS • 13-11</span>
                </div>
              </div>
              <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
                Monteking MX es una Bandera, Comunidad, Movimiento, Sello y Productora de Monterrey, NL, México. Representamos el Sonido Cardíaco para todo el mundo.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-oswald">Navegación</h4>
              <div className="space-y-2.5">
                {NAV_ITEMS.slice(0, 6).map((item) => (
                  <Link
                    key={item.name}
                    to={createPageUrl(item.href)}
                    className="block text-zinc-400 hover:text-yellow-400 text-sm transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact & Orders (Privacy-Safe WhatsApp Link) */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider font-oswald">Contacto & Pedidos</h4>
              <div className="text-zinc-400 text-sm space-y-2">
                <p>📍 Monterrey, Nuevo León, México</p>
                <p>
                  📱 WhatsApp:{' '}
                  <a
                    href="https://wa.me/5218180106247"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:underline inline-flex items-center gap-1.5 font-bold"
                  >
                    Atención & Pedidos Directos{' '}
                    <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/40">
                      ONLINE
                    </span>
                  </a>
                </p>
                <p>
                  ✉️{' '}
                  <a href="mailto:monteking1311@gmail.com" className="text-zinc-300 hover:text-yellow-400 transition-colors">
                    monteking1311@gmail.com
                  </a>
                </p>
              </div>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
            <p>© 2017 - 2026 Monteking MX [13-11]. Todos los derechos reservados.</p>
            <div className="flex gap-4 text-zinc-400">
              <a href="https://instagram.com/casilaog" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                @casilaog
              </a>
              <span>•</span>
              <a href="https://instagram.com/monteking.records" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                @montekingrecords
              </a>
              <span>•</span>
              <a href="https://youtube.com/@montekingmx" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                YouTube
              </a>
              <span>•</span>
              <a href="https://open.spotify.com/artist/6JkL5fiPkUG49eUzwKE5bW" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">
                Spotify
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Persistent Audio Player */}
      <MusicPlayer />

    </div>
  );
}