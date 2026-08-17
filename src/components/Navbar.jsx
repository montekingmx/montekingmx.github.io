import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Disc, Music2, Video, Shirt, Crown, Menu, X, Sliders, Gamepad2, Image, Users, Sparkles, HelpCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'INICIO', path: '/', icon: Crown },
    { name: 'BEATS', path: '/beats', icon: Disc },
    { name: 'MÚSICA', path: '/music', icon: Music2 },
    { name: 'VIDEOS', path: '/videos', icon: Video },
    { name: 'SERVICIOS', path: '/services', icon: Sliders },
    { name: 'MERCH', path: '/merch', icon: Shirt },
  ];

  const extraLinks = [
    { name: 'BEATMAKER', path: '/game', icon: Gamepad2 },
    { name: 'GALERÍA', path: '/gallery', icon: Image },
    { name: 'LYRICS', path: '/lyric-video', icon: Music2 },
    { name: 'PROD. TIPS', path: '/prod-info', icon: Sparkles },
    { name: 'NOSOTROS', path: '/about', icon: Users },
    { name: 'MEMBRESÍA VIP', path: '/membership', icon: Crown },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-obsidian-dark/90 backdrop-blur-xl border-b border-gold/20 py-3 shadow-gold-glow' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand / Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-gold-light via-gold to-gold-dark p-[1px] shadow-gold-glow group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-obsidian-card rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-gold group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel font-black tracking-widest text-lg sm:text-xl text-gold-gradient group-hover:text-gold-glow transition-all">
                MONTEKING MX
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-gray-400 uppercase -mt-1">
                13-11 • MONTERREY, MX
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-obsidian-card/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-gold/20">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'text-gold'
                      : 'text-gray-300 hover:text-white hover:bg-gold/10'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gold' : 'text-gray-400'}`} />
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-gold/10 border border-gold/40 rounded-full shadow-gold-glow"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Cart & VIP Badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-obsidian-card border border-gold/20 hover:border-gold/60 text-gold hover:bg-gold/10 transition-all duration-300 shadow-md group"
              title="Carrito de Compras"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-ruby text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-obsidian-dark animate-pulse">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-obsidian-card border border-gold/20 text-gray-300 hover:text-gold"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile & Extended Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-obsidian-dark/95 backdrop-blur-2xl border-b border-gold/20 px-6 py-6"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-7xl mx-auto">
              {[...navLinks, ...extraLinks].map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold tracking-wider transition-all ${
                      isActive
                        ? 'bg-gold/20 text-gold border border-gold/40 shadow-gold-glow'
                        : 'bg-obsidian-card/60 text-gray-300 hover:bg-gold/10 hover:text-gold border border-gold/10'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-gold shrink-0" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
