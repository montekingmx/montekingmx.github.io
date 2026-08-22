import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Minimize2, Maximize2, Music, ListMusic, Shuffle, Repeat, Repeat1, Disc3,
  ExternalLink, Sparkles
} from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { useAudio } from '@/context/AudioContext';
import { Link } from 'react-router-dom';

const LOGO = "assets/logo_1.png";

const fmt = (s) => {
  if (!s || isNaN(s)) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

export default function MusicPlayer() {
  const {
    playlist,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    shuffle,
    repeatMode,
    isPlayerMinimized,
    analyser,
    setVolume,
    setIsMuted,
    setShuffle,
    setRepeatMode,
    setIsPlayerMinimized,
    playTrack,
    togglePlayPause,
    nextTrack,
    prevTrack,
    seek,
  } = useAudio();

  const [showList, setShowList] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragValue, setDragValue] = useState(0);
  const canvasRef = useRef(null);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const coverArt = currentTrack?.cover || 'assets/cover_trap.jpg';

  // Smooth Glowing Neon Wave Curves Visualizer (Zero bars, zero glitch/vibration when paused)
  useEffect(() => {
    if (!canvasRef.current || isPlayerMinimized) return;
    let animId;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let phase = 0;

    const draw = () => {
      const displayWidth = canvas.offsetWidth;
      const displayHeight = canvas.offsetHeight;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }

      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      ctx.clearRect(0, 0, w, h);
      const midY = h / 2;

      // ── When Paused: Clean, Completely STILL Gold Laser Resting Line (Zero Glitch / Zero Vibration) ──
      if (!isPlaying) {
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.moveTo(0, midY);
        ctx.lineTo(w, midY);
        ctx.stroke();
        ctx.shadowBlur = 0;
        return; // Do not schedule next frame while paused to save 100% CPU
      }

      // ── When Playing: Real-time Audio Reactive Harmonic Neon Wave Curves ──
      animId = requestAnimationFrame(draw);

      let energy = 0;
      if (analyser) {
        const bufferLength = analyser.frequencyBinCount;
        const freqData = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(freqData);

        let sum = 0;
        for (let i = 0; i < Math.min(32, bufferLength); i++) {
          sum += freqData[i];
        }
        energy = (sum / (32 * 255));
      }

      phase += 0.05 + energy * 0.08;
      const amp = Math.max(6, energy * (h * 0.42) + 4);

      const waves = [
        { color: 'rgba(255, 215, 0, 0.95)', shadow: '#FFD700', freq: 0.014, speed: 1.0, offset: 0, lineWidth: 2.2 },
        { color: 'rgba(255, 140, 0, 0.75)', shadow: '#FF8C00', freq: 0.02, speed: -1.1, offset: Math.PI / 3, lineWidth: 1.8 },
        { color: 'rgba(0, 229, 255, 0.65)', shadow: '#00E5FF', freq: 0.011, speed: 0.8, offset: Math.PI / 1.5, lineWidth: 1.5 },
      ];

      waves.forEach((wv) => {
        ctx.strokeStyle = wv.color;
        ctx.shadowColor = wv.shadow;
        ctx.shadowBlur = 10;
        ctx.lineWidth = wv.lineWidth;
        ctx.beginPath();

        for (let x = 0; x <= w; x += 4) {
          const envelope = Math.sin((x / w) * Math.PI);
          const y = midY + Math.sin(x * wv.freq + phase * wv.speed + wv.offset) * (amp * envelope);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
      });
    };

    draw();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [analyser, isPlaying, isPlayerMinimized]);


  // ── Minimized Floating Pill (FAB)
  if (isPlayerMinimized) {
    return (
      <div 
        className="fixed bottom-6 right-6 z-50"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.button
          onClick={() => setIsPlayerMinimized(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-600 via-yellow-400 to-amber-300 text-black shadow-2xl shadow-yellow-500/40 flex items-center justify-center border border-yellow-200"
          title="Expandir Reproductor"
        >
          {isPlaying && (
            <motion.div 
              className="absolute inset-0 rounded-full bg-yellow-400 opacity-40"
              animate={{ scale: [1, 1.4, 1] }} 
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} 
            />
          )}
          {isPlaying ? (
            <Disc3 className="w-7 h-7 relative z-10 animate-spin text-black" style={{ animationDuration: '4s' }} />
          ) : (
            <Music className="w-6 h-6 relative z-10 text-black" />
          )}
        </motion.button>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-16 right-0 bg-zinc-950/95 backdrop-blur-2xl border border-yellow-500/30 rounded-2xl p-4 w-72 shadow-2xl shadow-black/80"
            >
              <div className="flex items-center gap-3 mb-3">
                <img src={coverArt} alt="" className="w-12 h-12 rounded-xl object-cover border border-zinc-800" />
                <div className="min-w-0 flex-1">
                  <p className="text-white text-xs font-bold truncate">{currentTrack?.title || 'Selecciona un Beat'}</p>
                  <p className="text-yellow-400 text-[11px] font-mono">{currentTrack?.album || 'Monteking MX'}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button onClick={togglePlayPause} className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold">
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <span className="text-[10px] font-mono text-zinc-400">{fmt(currentTime)} / {fmt(duration)}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── Full Bottom Bar Player (with Glowing Wave Curves Visualizer Canvas)
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-black/95 backdrop-blur-2xl border-t border-zinc-800 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      
      {/* Prominent Neon Wave Curves Visualizer Attached to Top of Player Bar */}
      <div className="h-9 sm:h-11 w-full relative overflow-hidden pointer-events-none border-b border-white/5">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Track Information & Artwork */}
        <div className="flex items-center gap-3 w-full md:w-1/3 min-w-0">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-700 shrink-0">
            <img src={coverArt} alt="" className="w-full h-full object-cover" />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Disc3 className="w-6 h-6 text-yellow-400 animate-spin" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-sm font-bold truncate font-oswald leading-tight">
              {currentTrack?.title || 'Selecciona un Beat'}
            </p>
            <p className="text-xs text-zinc-400 truncate flex items-center gap-1.5 mt-0.5">
              <span className="text-yellow-400 font-mono font-bold">{currentTrack?.bpm ? `${currentTrack.bpm} BPM` : '140 BPM'}</span>
              <span>•</span>
              <span className="truncate">{currentTrack?.album || 'Monteking Records'}</span>
            </p>
          </div>
        </div>

        {/* Center: Controls & Scrubber Progress */}
        <div className="flex flex-col items-center w-full md:w-1/3 max-w-md">
          {/* Action Buttons */}
          <div className="flex items-center gap-4 mb-1.5">
            <button
              onClick={() => setShuffle(!shuffle)}
              className={`p-1.5 rounded-lg transition-colors ${shuffle ? 'text-yellow-400' : 'text-zinc-500 hover:text-zinc-300'}`}
              title="Aleatorio"
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              onClick={prevTrack}
              className="text-zinc-300 hover:text-yellow-400 transition-colors p-1"
              title="Anterior"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>

            <button
              onClick={togglePlayPause}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:brightness-110 text-black flex items-center justify-center shadow-lg shadow-yellow-500/30 transition-transform active:scale-95"
              title={isPlaying ? "Pausar" : "Reproducir"}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
            </button>

            <button
              onClick={nextTrack}
              className="text-zinc-300 hover:text-yellow-400 transition-colors p-1"
              title="Siguiente"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>

            <button
              onClick={() => setRepeatMode((repeatMode + 1) % 3)}
              className={`p-1.5 rounded-lg transition-colors ${repeatMode > 0 ? 'text-yellow-400' : 'text-zinc-500 hover:text-zinc-300'}`}
              title={repeatMode === 2 ? "Repetir 1" : repeatMode === 1 ? "Repetir todo" : "Sin repetición"}
            >
              {repeatMode === 2 ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
            </button>
          </div>

          {/* Time Scrubber */}
          <div className="w-full flex items-center gap-2 text-[11px] font-mono text-zinc-400">
            <span className="w-8 text-right">{fmt(isDragging ? dragValue : currentTime)}</span>
            <div className="flex-1 relative cursor-pointer group">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={isDragging ? dragValue : currentTime}
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
                onChange={(e) => {
                  setDragValue(Number(e.target.value));
                }}
                onMouseUp={(e) => {
                  setIsDragging(false);
                  seek(Number(e.target.value));
                }}
                onTouchEnd={(e) => {
                  setIsDragging(false);
                  seek(Number(dragValue));
                }}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-400 group-hover:h-2 transition-all"
              />
            </div>
            <span className="w-8">{fmt(duration)}</span>
          </div>
        </div>

        {/* Right: Volume & Playlist toggle & Minimize */}
        <div className="flex items-center justify-end gap-3 w-full md:w-1/3">
          {/* Volume */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-zinc-400 hover:text-yellow-400 transition-colors"
            >
              {isMuted || volume[0] === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={isMuted ? 0 : volume[0]}
              onChange={(e) => {
                setVolume([Number(e.target.value)]);
                if (isMuted) setIsMuted(false);
              }}
              className="w-20 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
            />
          </div>

          {/* Playlist drawer toggle */}
          <button
            onClick={() => setShowList(!showList)}
            className={`p-2 rounded-xl border transition-colors ${showList ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400' : 'border-zinc-800 text-zinc-400 hover:text-white'}`}
            title="Ver Playlist"
          >
            <ListMusic className="w-4 h-4" />
          </button>

          {/* Minimize button */}
          <button
            onClick={() => setIsPlayerMinimized(true)}
            className="p-2 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
            title="Minimizar a botón flotante"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Playlist Drawer */}
      <AnimatePresence>
        {showList && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-zinc-800/80 bg-zinc-950/95 max-h-72 overflow-y-auto custom-scrollbar p-4"
          >
            <div className="max-w-4xl mx-auto space-y-1">
              {playlist.map((item, idx) => {
                const isCur = currentTrackIndex === idx;
                return (
                  <div
                    key={item.id || idx}
                    onClick={() => playTrack(item, playlist)}
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${isCur ? 'bg-yellow-500/15 text-yellow-400 font-bold border border-yellow-500/30' : 'hover:bg-zinc-900 text-zinc-300'}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-mono text-zinc-500 w-5">{idx + 1}</span>
                      <p className="text-sm truncate">{item.title}</p>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">{item.bpm ? `${item.bpm} BPM` : '140 BPM'}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}