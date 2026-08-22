import React from 'react';
import { motion } from 'framer-motion';
import { Play, Crown, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const IMAGES = {
  wallpaper: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6947f4b3e4453a62be1b6258/cbbfe1eb3_WALLPAPERBRANDNEWMACHORIZONTAL.jpg",
  logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6947f4b3e4453a62be1b6258/44aaf3b36_MKLOGORMS.png",
  title: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6947f4b3e4453a62be1b6258/14ca8c5db_STICKERTITULOMONEDAALAIRE.png",
  coin: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6947f4b3e4453a62be1b6258/edbd0a328_1311MONEDABACKDISENO-Recuperado-Recuperado-Recuperado.png"
};

export default function HeroSection() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${IMAGES.wallpaper})` }}>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </div>

      {/* Floating Coin Animation - Right */}
      <motion.div
        className="absolute right-10 top-1/4 w-32 h-32 md:w-48 md:h-48 opacity-70"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          y: [0, -20, 0],
          rotateY: [0, 360]
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 8, repeat: Infinity, ease: "linear" }
        }}>
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/a75fec195_13-11MONEDADISENO1.png" 
          alt="Moneda Frente" 
          className="absolute inset-0 w-full h-full object-contain backface-hidden" 
        />
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/b84b3cca8_1311MONEDABACKDISENO-Recuperado-Recuperado-Recuperado.png" 
          alt="Moneda Reverso" 
          className="absolute inset-0 w-full h-full object-contain"
          style={{ transform: "rotateY(180deg)" }}
        />
      </motion.div>

      {/* Floating Coin Animation - Left */}
      <motion.div
        className="absolute left-10 top-1/4 w-32 h-32 md:w-48 md:h-48 opacity-70"
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          y: [0, -20, 0],
          rotateY: [0, 360]
        }}
        transition={{
          y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
          rotateY: { duration: 8, repeat: Infinity, ease: "linear", delay: 1.5 }
        }}>
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/a75fec195_13-11MONEDADISENO1.png" 
          alt="Moneda Frente" 
          className="absolute inset-0 w-full h-full object-contain backface-hidden" 
        />
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/b84b3cca8_1311MONEDABACKDISENO-Recuperado-Recuperado-Recuperado.png" 
          alt="Moneda Reverso" 
          className="absolute inset-0 w-full h-full object-contain"
          style={{ transform: "rotateY(180deg)" }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8">

          <img
            src={IMAGES.logo}
            alt="Monteking Logo"
            className="h-32 md:h-40 w-auto mx-auto drop-shadow-2xl object-contain" />

        </motion.div>

        {/* Title Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6">

          <img
            src={IMAGES.title}
            alt="Moneda Al Aire - Casila OG"
            className="max-w-full md:max-w-2xl mx-auto drop-shadow-2xl" />

        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/80 text-lg md:text-xl font-light tracking-[0.3em] uppercase mb-10">

          Monteking Records • 13-11
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link to={createPageUrl('Music')}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-8 py-6 text-lg rounded-full shadow-xl shadow-yellow-500/25 transition-all duration-300 hover:scale-105">

              <Play className="w-5 h-5 mr-2 fill-current" />
              Escuchar Ahora
            </Button>
          </Link>
          <Link to={createPageUrl('Beats')}>
            <Button
              size="lg"
              variant="outline" className="bg-background text-stone-950 px-8 py-6 text-lg font-medium rounded-full inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm hover:text-accent-foreground h-10 border-2 border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105">

              <Crown className="w-5 h-5 mr-2" />
              Comprar Beats
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-yellow-500 transition-colors cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}>

        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </section>);

}