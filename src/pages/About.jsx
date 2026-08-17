import React from 'react';
import { motion } from 'framer-motion';
import { Crown, MapPin, Award, Flame, Users, Radio } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-obsidian-dark pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-gold uppercase mb-2 block">
            13-11 REPRESENT
          </span>
          <h1 className="font-cinzel font-black text-4xl sm:text-6xl text-white">
            SOBRE <span className="text-gold-gradient">MONTEKING</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-4" />
        </div>

        {/* Main Content Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-gold/30 shadow-gold-intense space-y-8">
          
          <div className="flex flex-col md:flex-row items-center gap-8 border-b border-gold/20 pb-8">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-gold-light via-gold to-gold-dark p-[1px] shrink-0 shadow-gold-glow">
              <div className="w-full h-full bg-obsidian-dark rounded-3xl flex items-center justify-center">
                <Crown className="w-16 h-16 text-gold" />
              </div>
            </div>

            <div className="flex flex-col gap-2 text-center md:text-left">
              <h2 className="font-cinzel font-bold text-2xl text-white">
                MONTEKING MX. [13-11]
              </h2>
              <p className="text-gold font-mono text-xs font-bold tracking-wider">
                PRODUCTOR INDEPENDIENTE & ARTISTA • MONTERREY, NL, MÉXICO
              </p>
              <p className="text-xs text-gray-400 leading-relaxed mt-2">
                Sello discográfico, marca, comunidad y movimiento independiente nacido en Monterrey. 
                Representamos el sonido cardíaco que creamos para ustedes, nosotros y para el mundo.
              </p>
            </div>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-obsidian-dark/60 border border-gold/15 flex flex-col gap-2">
              <MapPin className="w-6 h-6 text-gold" />
              <h3 className="font-cinzel font-bold text-base text-white">Monterrey, MX</h3>
              <p className="text-xs text-gray-400">Raíces del norte combinando el sonido callejero con alta tecnología y producción exótica.</p>
            </div>

            <div className="p-6 rounded-2xl bg-obsidian-dark/60 border border-gold/15 flex flex-col gap-2">
              <Flame className="w-6 h-6 text-gold" />
              <h3 className="font-cinzel font-bold text-base text-white">Trap & Memphis</h3>
              <p className="text-xs text-gray-400">Especializados en atmósferas oscuras, bombos pesados y patrones barrocos de lujo.</p>
            </div>

            <div className="p-6 rounded-2xl bg-obsidian-dark/60 border border-gold/15 flex flex-col gap-2">
              <Radio className="w-6 h-6 text-gold" />
              <h3 className="font-cinzel font-bold text-base text-white">Impacto Global</h3>
              <p className="text-xs text-gray-400">Plataforma e-commerce 24/7 con licencias de beats para artistas de todo el mundo.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
