import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ShoppingCart, Disc, Tag } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useCart } from '../context/CartContext';

export function BeatCard({ beat, beatList = [] }) {
  const { currentBeat, isPlaying, playBeat } = useAudio();
  const { openLicenseModal } = useCart();

  const isCurrent = currentBeat?.id === beat.id;
  const isThisPlaying = isCurrent && isPlaying;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className={`group relative rounded-2xl glass-card overflow-hidden transition-all duration-300 ${
        isCurrent ? 'border-gold shadow-gold-glow bg-gold/5' : 'hover:border-gold/50'
      }`}
    >
      {/* Cover Image & Hover Overlay */}
      <div className="relative aspect-square overflow-hidden bg-obsidian-dark">
        <img
          src={beat.coverUrl}
          alt={beat.cleanTitle}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isThisPlaying ? 'scale-110' : 'group-hover:scale-105'
          }`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-obsidian-dark via-obsidian-dark/40 to-transparent transition-opacity duration-300 ${
          isThisPlaying ? 'opacity-80' : 'opacity-40 group-hover:opacity-75'
        }`} />

        {/* Play/Pause Center Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => playBeat(beat, beatList)}
            className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r from-gold-light via-gold to-gold-dark p-[1px] shadow-gold-intense transition-all duration-300 ${
              isThisPlaying ? 'scale-110 shadow-gold-glow' : 'opacity-90 group-hover:scale-110 group-hover:opacity-100'
            }`}
          >
            <div className="w-full h-full bg-obsidian-dark rounded-full flex items-center justify-center">
              {isThisPlaying ? (
                <Pause className="w-6 h-6 text-gold fill-gold" />
              ) : (
                <Play className="w-6 h-6 text-gold fill-gold ml-1" />
              )}
            </div>
          </button>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-obsidian-dark/80 text-gold border border-gold/40 backdrop-blur-md">
            ⚡ {beat.bpm} BPM
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-obsidian-dark/80 text-gray-200 border border-white/10 backdrop-blur-md uppercase">
            {beat.genre}
          </span>
        </div>
      </div>

      {/* Details Footer */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-col">
          <h3 className="font-cinzel font-bold text-base text-white group-hover:text-gold transition-colors line-clamp-1">
            {beat.cleanTitle}
          </h3>
          <span className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
            <Disc className="w-3 h-3 text-gold/70" />
            {beat.artist}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-gold/10">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Desde</span>
            <span className="font-mono font-bold text-sm text-gold-gradient">
              ${beat.priceBasic} USD
            </span>
          </div>

          <button
            onClick={() => openLicenseModal(beat)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gold/15 hover:bg-gold text-gold hover:text-obsidian-dark font-bold text-xs border border-gold/40 hover:border-gold shadow-gold-glow transition-all duration-300"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Licenciar</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
