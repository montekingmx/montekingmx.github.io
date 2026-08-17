import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, Gamepad2, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const PADS = [
  { id: 1, name: 'Kick 808', color: 'from-amber-500 to-yellow-600', key: 'Q' },
  { id: 2, name: 'Snare Memphis', color: 'from-gold to-gold-dark', key: 'W' },
  { id: 3, name: 'Hi-Hat Roll', color: 'from-yellow-400 to-amber-600', key: 'E' },
  { id: 4, name: 'Open Hat', color: 'from-amber-600 to-yellow-700', key: 'R' },
  { id: 5, name: 'Clap 13-11', color: 'from-yellow-500 to-amber-700', key: 'A' },
  { id: 6, name: 'Perc FX', color: 'from-gold-light to-gold', key: 'S' },
  { id: 7, name: 'Vocal Chant', color: 'from-amber-400 to-yellow-600', key: 'D' },
  { id: 8, name: '808 Sub Drop', color: 'from-red-600 to-amber-800', key: 'F' },
];

export default function Game() {
  const [activePad, setActivePad] = useState(null);

  const triggerPad = (pad) => {
    setActivePad(pad.id);
    setTimeout(() => setActivePad(null), 150);

    // Audio synth feedback via Web Audio API
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = pad.id % 2 === 0 ? 'square' : 'sine';
      osc.frequency.setValueAtTime(pad.id * 60 + 80, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-dark pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-gold uppercase mb-2 block">
            INTERACTIVO & BEATMAKING
          </span>
          <h1 className="font-cinzel font-black text-4xl sm:text-6xl text-white">
            BEATMAKER <span className="text-gold-gradient">13-11</span>
          </h1>
          <p className="text-sm text-gray-400 mt-3 max-w-lg mx-auto">
            Experimenta el ritmo. Presiona las almohadillas o usa las teclas (Q, W, E, R, A, S, D, F) para disparar sonidos.
          </p>
        </div>

        {/* MPC Drum Pad Grid */}
        <div className="glass-card rounded-3xl p-8 border border-gold/30 shadow-gold-intense max-w-2xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {PADS.map((pad) => {
              const isActive = activePad === pad.id;
              return (
                <motion.button
                  key={pad.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => triggerPad(pad)}
                  className={`aspect-square rounded-2xl p-4 flex flex-col justify-between items-start font-mono font-bold transition-all duration-100 border ${
                    isActive
                      ? 'bg-gradient-to-br from-gold-light via-gold to-gold-dark text-obsidian-dark border-gold shadow-gold-glow scale-105'
                      : 'bg-obsidian-dark/80 text-white border-gold/20 hover:border-gold/60 hover:bg-gold/10'
                  }`}
                >
                  <span className="text-xs px-2 py-0.5 rounded-md bg-black/40 text-gold font-mono">
                    [{pad.key}]
                  </span>
                  <span className="text-xs font-sans text-left leading-tight">
                    {pad.name}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gold/20 flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Gamepad2 className="w-4 h-4 text-gold" />
              Sintetizador Web Audio En Vivo
            </span>
            <span className="font-mono text-gold font-bold">140 BPM STANDBY</span>
          </div>
        </div>

      </div>
    </div>
  );
}
