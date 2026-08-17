import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Crown, Sparkles, Flame, ArrowRight, Disc } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export function HeroSection({ featuredBeat, beatList }) {
  const { currentBeat, isPlaying, playBeat } = useAudio();
  const { openLicenseModal } = useCart();

  const isThisPlaying = currentBeat?.id === featuredBeat?.id && isPlaying;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      
      {/* Dark & Gold Ambient Background */}
      <div className="absolute inset-0 bg-obsidian-dark">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold-dark/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-ruby/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-casino-pattern opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Brand Intro & Taglines */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 backdrop-blur-md self-center lg:self-start"
          >
            <Crown className="w-4 h-4 text-gold animate-bounce" />
            <span className="text-xs font-bold font-mono tracking-widest text-gold uppercase">
              Monteking Mx • Luxury Beatstore 2030
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cinzel font-black text-4xl sm:text-6xl lg:text-7xl leading-none text-white tracking-tight"
          >
            EL SONIDO <br />
            <span className="text-gold-gradient text-gold-glow">DEL IMPERIO</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed"
          >
            Producción musical de alta gama desde <strong className="text-gold">Monterrey, Mexico</strong>. 
            Trap, Memphis, Boom Bap & Sonidos Exóticos diseñados para dominar la escena. Licencias instantáneas 24/7.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
          >
            <Link
              to="/beats"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-light via-gold to-gold-dark text-obsidian-dark font-bold text-sm tracking-wider uppercase shadow-gold-intense hover:scale-105 transition-all"
            >
              <Disc className="w-5 h-5" />
              <span>Explorar Beatstore</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/music"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl glass-card border border-gold/30 text-white font-bold text-sm tracking-wider uppercase hover:border-gold hover:bg-gold/10 transition-all"
            >
              <span>Discografía & Lanzamientos</span>
            </Link>
          </motion.div>

        </div>

        {/* Right Column: Trending Featured Beat Card */}
        {featuredBeat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5"
          >
            <div className="relative glass-card rounded-3xl p-6 border border-gold/40 shadow-gold-intense overflow-hidden group">
              
              {/* Badge Overlay */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-ruby/20 text-ruby border border-ruby/40">
                  <Flame className="w-3.5 h-3.5 fill-ruby" />
                  BEAT DESTACADO
                </span>
                <span className="font-mono text-xs text-gold font-bold">
                  {featuredBeat.bpm} BPM
                </span>
              </div>

              {/* Cover & Play */}
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-5 group">
                <img
                  src={featuredBeat.coverUrl}
                  alt={featuredBeat.cleanTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-obsidian-dark/40 flex items-center justify-center">
                  <button
                    onClick={() => playBeat(featuredBeat, beatList)}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-gold-light via-gold to-gold-dark p-[1px] shadow-gold-glow hover:scale-110 transition-transform"
                  >
                    <div className="w-full h-full bg-obsidian-dark rounded-full flex items-center justify-center">
                      {isThisPlaying ? (
                        <Pause className="w-7 h-7 text-gold fill-gold" />
                      ) : (
                        <Play className="w-7 h-7 text-gold fill-gold ml-1" />
                      )}
                    </div>
                  </button>
                </div>
              </div>

              {/* Beat Info & License Button */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-cinzel font-bold text-lg text-white">
                    {featuredBeat.cleanTitle}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {featuredBeat.genre} • {featuredBeat.artist}
                  </p>
                </div>

                <button
                  onClick={() => openLicenseModal(featuredBeat)}
                  className="px-4 py-2.5 rounded-xl bg-gold text-obsidian-dark font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 transition-all"
                >
                  Licenciar ${featuredBeat.priceBasic}
                </button>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
