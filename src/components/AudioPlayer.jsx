import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ShoppingCart, Disc } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useCart } from '../context/CartContext';

export function AudioPlayer() {
  const {
    currentBeat,
    isPlaying,
    currentTime,
    duration,
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    togglePlay,
    playNext,
    playPrevious,
    seek,
  } = useAudio();

  const { openLicenseModal } = useCart();

  if (!currentBeat) return null;

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pt-1 pointer-events-auto"
      >
        <div className="max-w-7xl mx-auto glass-card rounded-2xl p-3 sm:p-4 border border-gold/30 shadow-gold-glow flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 relative overflow-hidden">
          
          {/* Audio Scrubber Bar across top of player */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-obsidian-dark cursor-pointer group" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            seek(pos * duration);
          }}>
            <div
              className="h-full bg-gradient-to-r from-gold-light via-gold to-gold-dark transition-all duration-100 group-hover:brightness-125"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Left: Beat Artwork & Info */}
          <div className="flex items-center gap-3 w-full md:w-1/3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gold/30 shrink-0 group">
              <img
                src={currentBeat.coverUrl}
                alt={currentBeat.cleanTitle}
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-110' : ''}`}
              />
              <div className={`absolute inset-0 bg-obsidian-dark/40 flex items-center justify-center ${isPlaying ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                <Disc className={`w-6 h-6 text-gold ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white truncate hover:text-gold transition-colors">
                  {currentBeat.cleanTitle}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-gold/15 text-gold border border-gold/30 shrink-0">
                  {currentBeat.bpm} BPM
                </span>
              </div>
              <span className="text-xs text-gray-400 truncate">
                {currentBeat.artist} • <span className="text-gold-glow">{currentBeat.genre}</span>
              </span>
            </div>
          </div>

          {/* Center: Controls & Audio Waveform Visualizer */}
          <div className="flex flex-col items-center gap-1.5 w-full md:w-1/3">
            <div className="flex items-center gap-4">
              <button
                onClick={playPrevious}
                className="text-gray-400 hover:text-gold transition-colors p-1.5"
                title="Beat Anterior"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-gold-light via-gold to-gold-dark p-[1px] shadow-gold-glow hover:scale-105 transition-transform"
                title={isPlaying ? 'Pausar' : 'Reproducir'}
              >
                <div className="w-full h-full bg-obsidian-dark rounded-full flex items-center justify-center">
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-gold fill-gold" />
                  ) : (
                    <Play className="w-5 h-5 text-gold fill-gold ml-0.5" />
                  )}
                </div>
              </button>

              <button
                onClick={playNext}
                className="text-gray-400 hover:text-gold transition-colors p-1.5"
                title="Siguiente Beat"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Waveform visualizer & Time display */}
            <div className="flex items-center gap-3 w-full max-w-xs">
              <span className="text-[11px] font-mono text-gray-400">{formatTime(currentTime)}</span>
              
              {/* Simulated Audio Bars */}
              <div className="flex-1 flex items-center justify-center gap-0.5 h-4">
                {[40, 70, 30, 90, 60, 100, 45, 80, 50, 95, 35, 75, 60, 40, 85].map((val, idx) => (
                  <div
                    key={idx}
                    className={`w-0.5 rounded-full transition-all duration-300 ${
                      isPlaying ? 'bg-gold animate-pulse' : 'bg-gray-600'
                    }`}
                    style={{
                      height: isPlaying ? `${Math.max(20, (val * (idx % 3 + 1)) % 100)}%` : '20%',
                      animationDelay: `${idx * 0.1}s`,
                    }}
                  />
                ))}
              </div>

              <span className="text-[11px] font-mono text-gray-400">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right: Volume & Buy License CTA */}
          <div className="flex items-center justify-end gap-3 w-full md:w-1/3">
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-gray-400 hover:text-gold transition-colors"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-16 h-1 bg-obsidian-light rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>

            <button
              onClick={() => openLicenseModal(currentBeat)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-obsidian-dark font-bold text-xs tracking-wider uppercase hover:brightness-110 shadow-gold-glow transition-all shrink-0"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Licenciar ${currentBeat.priceBasic}</span>
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
