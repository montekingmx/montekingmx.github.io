import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Home, Music, ShoppingBag, Users, Image,
  Gamepad2, HelpCircle, Crown, Instagram, Youtube, Music2 } from
'lucide-react';
import { Button } from "@/components/ui/button";
import MusicPlayer from '@/components/shared/MusicPlayer';
import NewsletterForm from '@/components/shared/NewsletterForm';

const NAV_ITEMS = [
{ name: 'Inicio', href: 'Home', icon: Home },
{ name: 'Música', href: 'Music', icon: Music },
{ name: 'Videos', href: 'Videos', icon: Music2 },
{ name: 'Beats', href: 'Beats', icon: Crown },
{ name: 'Lyric Clips ✨', href: 'LyricVideo', icon: Music2 },
{ name: 'Prod. Tips', href: 'ProdInfo', icon: Music },
{ name: 'Servicios', href: 'Services', icon: Music },
{ name: 'Merch', href: 'Merch', icon: ShoppingBag },
{ name: 'Galería', href: 'Gallery', icon: Image },
{ name: 'Juego', href: 'Game', icon: Gamepad2 },
{ name: 'Nosotros', href: 'About', icon: Users },
{ name: 'La Banda', href: 'Team', icon: Users }];

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/66ca3a969_LOGO-MK-COLOR-SH.png";

export default function Layout({ children, currentPageName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(true);
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
  }, [location]);

  const isHome = currentPageName === 'Home';

  const pageBg = {
    Home: 'bg-black',
    Music: 'bg-gradient-to-br from-black via-zinc-950 to-yellow-950/10',
    Videos: 'bg-gradient-to-br from-black via-zinc-950 to-red-950/10',
    Beats: 'bg-gradient-to-br from-black via-zinc-950 to-purple-950/10',
    Game: 'bg-gradient-to-br from-black via-zinc-950 to-blue-950/10',
    Gallery: 'bg-gradient-to-br from-black via-zinc-950 to-pink-950/10',
    Merch: 'bg-gradient-to-br from-black via-zinc-950 to-amber-950/10',
    Services: 'bg-gradient-to-br from-black via-zinc-950 to-green-950/10',
    About: 'bg-gradient-to-br from-black via-zinc-950 to-zinc-900',
    Team: 'bg-gradient-to-br from-black via-zinc-950 to-yellow-950/10',
    Membership: 'bg-gradient-to-br from-black via-zinc-950 to-purple-950/10',
  };
  const bgClass = pageBg[currentPageName] || 'bg-black';

  return (
    <div className={`min-h-screen ${bgClass} text-white transition-colors duration-700`}>
      <style>{`
        :root {
          --monteking-gold: #D4AF37;
          --monteking-yellow: #FFD700;
          --monteking-black: #0A0A0A;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212,175,55,0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212,175,55,0.5);
        }
        
        body {
          background-color: #0A0A0A;
        }
      `}</style>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHome ?
        'bg-black/90 backdrop-blur-xl border-b border-zinc-800/50' :
        'bg-transparent'}`
        }>

        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3 group">
              <img
                src={LOGO_URL}
                alt="Monteking"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-110" />

              <div className="hidden sm:block">
                <span className="text-white text-xl font-semibold text-left uppercase tracking-wider group-hover:text-yellow-500 transition-colors">MONTEKING MX. [13-11]

                </span>
                <span className="text-zinc-500 text-xs font-semibold tracking-widest block">13-11 - REPRESENT

                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) =>
              <Link
                key={item.name}
                to={createPageUrl(item.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentPageName === item.href ?
                'text-yellow-500 bg-yellow-500/10' :
                'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`
                }>

                  {item.name}
                </Link>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex text-zinc-400 hover:text-yellow-500"
                onClick={() => setIsPlayerMinimized(!isPlayerMinimized)}>

                <Music className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white"
                onClick={() => setIsMenuOpen(true)}>

                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen &&
        <>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden" />

            <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-zinc-900 z-50 lg:hidden overflow-y-auto">

              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <img src={LOGO_URL} alt="Monteking" className="h-10 w-auto" />
                  <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-zinc-400">

                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {NAV_ITEMS.map((item) =>
                <Link
                  key={item.name}
                  to={createPageUrl(item.href)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  currentPageName === item.href ?
                  'bg-yellow-500/10 text-yellow-500' :
                  'text-zinc-300 hover:bg-zinc-800'}`
                  }>

                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                )}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-zinc-800">
                  <p className="text-zinc-500 text-sm mb-4">Síguenos</p>
                  <div className="flex gap-3">
                    <a href="https://www.instagram.com/monteking.mx" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="border-zinc-700 text-zinc-400 hover:text-pink-400 hover:border-pink-400">
                        <Instagram className="w-5 h-5" />
                      </Button>
                    </a>
                    <a href="https://www.youtube.com/@MONTEKINGMX" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="border-zinc-700 text-zinc-400 hover:text-red-400 hover:border-red-400">
                        <Youtube className="w-5 h-5" />
                      </Button>
                    </a>
                    <a href="https://open.spotify.com/artist/6JkL5fiPkUG49eUzwKE5bW" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="border-zinc-700 text-zinc-400 hover:text-green-400 hover:border-green-400">
                        <Music2 className="w-5 h-5" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>

      {/* Main Content */}
      <main className={isHome ? '' : 'pt-20'}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 py-12 pb-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={LOGO_URL} alt="Monteking" className="h-12 w-auto" />
                <div>
                  <span className="text-xl font-bold text-white">MONTEKING</span>
                  <span className="block text-sm text-yellow-500">Records • 13-11</span>
                </div>
              </div>
              <p className="text-zinc-500 text-sm max-w-md">Monteking Mx es una Bandera, Comunidad, Movimiento, Marca, Empresa y Sello Discográfico independiente de Monterrey, NL,  México. Representamos el Sonido Cardiaco que creamos para ustedes, nosotros, y para el mundo.

              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Enlaces</h4>
              <div className="space-y-2">
                {NAV_ITEMS.slice(0, 5).map((item) =>
                <Link
                  key={item.name}
                  to={createPageUrl(item.href)}
                  className="block text-zinc-500 hover:text-yellow-500 text-sm transition-colors">

                    {item.name}
                  </Link>
                )}
              </div>
            </div>

            {/* Newsletter + Contact */}
            <div className="space-y-5">
              <div>
                <h4 className="text-white font-semibold mb-3">🔔 Nuevos lanzamientos</h4>
                <NewsletterForm source="footer" compact />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">Contacto</h4>
                <div className="space-y-1 text-zinc-500 text-sm">
                  <p>Monterrey, Nuevo León</p>
                  <p>IG - @monteking.records @monteking.mx</p>
                  <a href="mailto:monteking1311@gmail.com" className="hover:text-yellow-500 transition-colors block">monteking1311@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-600 text-sm">© 2017 Monteking Mx. Todos los derechos reservados.</p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/monteking.mx" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-pink-400">
                  <Instagram className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://www.youtube.com/@MONTEKINGMX" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-red-400">
                  <Youtube className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://open.spotify.com/artist/6JkL5fiPkUG49eUzwKE5bW" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="text-zinc-600 hover:text-green-400">
                  <Music2 className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Music Player */}
      <MusicPlayer
        isMinimized={isPlayerMinimized}
        onToggleMinimize={() => setIsPlayerMinimized(!isPlayerMinimized)} />

    </div>);

}