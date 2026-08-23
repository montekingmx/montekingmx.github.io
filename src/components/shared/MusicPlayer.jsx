import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Minimize2, Maximize2, Music, ListMusic, Shuffle, Repeat, Repeat1, Disc3,
  ExternalLink, Sparkles, Activity, Zap, BarChart3, Sliders, Layers
} from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { useAudio } from '@/context/AudioContext';
import { Link } from 'react-router-dom';

const LOGO = "assets/logo_1.png";

const fmt = (s) => {
  if (!s || isNaN(s)) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

export const SPECTRUM_MODES = [
  { id: 'waves', name: 'Ondas Armónicas', short: 'ONDAS', icon: Activity, desc: 'Ondas neón multicapa por frecuencias (20Hz - 15kHz)' },
  { id: 'oscilloscope', name: 'Osciloscopio Láser', short: 'LÁSER PCM', icon: Zap, desc: 'Vector analógico de audio en tiempo real' },
  { id: 'aurora', name: 'Seda Líquida / Aurora', short: 'AURORA', icon: Sparkles, desc: 'Gradiente de oro líquido con pulsación de sub-bass' },
  { id: 'bars', name: 'Micro-Segmentos Pro', short: 'HARDWARE', icon: BarChart3, desc: 'Barras simétricas de alta precisión con picos de gravedad' },
  { id: 'particles', name: 'Constelación Stardust', short: 'STARDUST', icon: Disc3, desc: 'Partículas y nodos enlazados reactivos al golpe' },
  { id: 'hybrid', name: 'Híbrido Master', short: 'HÍBRIDO', icon: Layers, desc: 'Osciloscopio láser + aura espectral reactiva' },
];

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
  const [showModesMenu, setShowModesMenu] = useState(false);
  const [spectrumMode, setSpectrumMode] = useState(() => {
    return localStorage.getItem('mk_spectrum_mode') || 'waves';
  });
  const [modeNotice, setModeNotice] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragValue, setDragValue] = useState(0);
  const canvasRef = useRef(null);
  const peakDotsRef = useRef(new Array(64).fill(0));
  const particleNodesRef = useRef(null);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const coverArt = currentTrack?.cover || 'assets/cover_trap.jpg';

  // Save selected mode to localStorage
  const handleSelectMode = (modeId) => {
    setSpectrumMode(modeId);
    localStorage.setItem('mk_spectrum_mode', modeId);
    const found = SPECTRUM_MODES.find(m => m.id === modeId);
    if (found) {
      setModeNotice(found.name);
      setTimeout(() => setModeNotice(null), 2500);
    }
  };

  // Cycle through spectrum modes on button click
  const cycleSpectrumMode = () => {
    const currIdx = SPECTRUM_MODES.findIndex(m => m.id === spectrumMode);
    const nextIdx = (currIdx + 1) % SPECTRUM_MODES.length;
    handleSelectMode(SPECTRUM_MODES[nextIdx].id);
  };

  // ── Multi-Mode Spectrum Visualizer Engine ──
  useEffect(() => {
    if (!canvasRef.current || isPlayerMinimized) return;
    let animId;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let phase = 0;

    // Initialize particle constellation nodes
    if (!particleNodesRef.current) {
      particleNodesRef.current = Array.from({ length: 42 }, (_, idx) => ({
        baseX: idx / 42,
        yOffset: 0,
        vy: 0,
        size: Math.random() * 2 + 1.5,
        phase: Math.random() * Math.PI * 2
      }));
    }

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

      // ── When Paused: Completely STILL, Pure Gold Laser Guide Line (0% CPU, 0 vibration) ──
      if (!isPlaying) {
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.moveTo(0, midY);
        ctx.lineTo(w, midY);
        ctx.stroke();
        ctx.shadowBlur = 0;
        return;
      }

      // ── When Playing: Real-time Audio Spectrum Rendering Loop ──
      animId = requestAnimationFrame(draw);

      let subBass = 0;    // 20Hz - 120Hz (Kicks & 808s)
      let punchBass = 0;  // 120Hz - 350Hz (Basslines & punch)
      let vocalsMid = 0;  // 350Hz - 3000Hz (Vocals & instruments)
      let snapHighs = 0;  // 3000Hz - 7500Hz (Snares & claps)
      let shimmer = 0;    // 7500Hz - 15000Hz (Hi-hats, cymbals & air)

      const bufferLength = analyser ? analyser.frequencyBinCount : 512;
      const freqData = new Uint8Array(bufferLength);
      const timeData = new Uint8Array(bufferLength);

      if (analyser) {
        analyser.getByteFrequencyData(freqData);
        analyser.getByteTimeDomainData(timeData);

        // Sub Bass
        let sSum = 0;
        for (let i = 0; i <= 3; i++) sSum += freqData[i];
        subBass = sSum / (4 * 255);

        // Punch Bass
        let pSum = 0;
        for (let i = 4; i <= 9; i++) pSum += freqData[i];
        punchBass = pSum / (6 * 255);

        // Vocals / Mids
        let vSum = 0;
        for (let i = 10; i <= 70; i++) vSum += freqData[i];
        vocalsMid = vSum / (61 * 255);

        // Snap Highs
        let snSum = 0;
        for (let i = 71; i <= 175; i++) snSum += freqData[i];
        snapHighs = snSum / (105 * 255);

        // Shimmer Highs
        let shSum = 0;
        for (let i = 176; i <= 360; i++) shSum += freqData[i];
        shimmer = shSum / (185 * 255);
      } else {
        subBass = 0.35;
        punchBass = 0.3;
        vocalsMid = 0.25;
        snapHighs = 0.2;
        shimmer = 0.15;
      }

      phase += 0.04 + (subBass * 0.07) + (vocalsMid * 0.04);

      // ─────────────────────────────────────────────────────────────
      // MODE 1: MULTI-BAND NEON HARMONIC WAVES (Default)
      // ─────────────────────────────────────────────────────────────
      if (spectrumMode === 'waves') {
        const waveLayers = [
          { color: 'rgba(255, 215, 0, 0.95)', shadow: '#FFD700', freq: 0.009, speed: 1.0, offset: 0, lineWidth: 3.0, amp: Math.max(6, subBass * (h * 0.46) + 4) },
          { color: 'rgba(255, 130, 0, 0.85)', shadow: '#FF8200', freq: 0.016, speed: -1.25, offset: Math.PI / 3, lineWidth: 2.2, amp: Math.max(5, (punchBass * 0.6 + vocalsMid * 0.4) * (h * 0.40) + 3) },
          { color: 'rgba(236, 72, 153, 0.75)', shadow: '#EC4899', freq: 0.024, speed: 1.5, offset: Math.PI / 1.8, lineWidth: 1.8, amp: Math.max(4, (vocalsMid * 0.5 + snapHighs * 0.5) * (h * 0.34) + 2) },
          { color: 'rgba(0, 229, 255, 0.75)', shadow: '#00E5FF', freq: 0.038, speed: -1.8, offset: Math.PI / 1.2, lineWidth: 1.4, amp: Math.max(3, shimmer * (h * 0.30) + 2) },
        ];

        waveLayers.forEach((wv) => {
          ctx.strokeStyle = wv.color;
          ctx.shadowColor = wv.shadow;
          ctx.shadowBlur = 10;
          ctx.lineWidth = wv.lineWidth;
          ctx.beginPath();

          for (let x = 0; x <= w; x += 2) {
            const envelope = Math.sin((x / w) * Math.PI);
            const y = midY + Math.sin(x * wv.freq + phase * wv.speed + wv.offset) * (wv.amp * envelope);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        });
      }

      // ─────────────────────────────────────────────────────────────
      // MODE 2: ANALOG VECTOR OSCILLOSCOPE (Time-Domain PCM Laser)
      // ─────────────────────────────────────────────────────────────
      else if (spectrumMode === 'oscilloscope') {
        ctx.strokeStyle = 'rgba(255, 230, 80, 0.95)';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 14;
        ctx.lineWidth = 2.5;
        ctx.beginPath();

        const sliceWidth = w / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = timeData[i] / 128.0; // 0.0 to 2.0
          const y = (v * midY) * 0.85 + (midY * 0.15);

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          x += sliceWidth;
        }

        ctx.stroke();
        ctx.shadowBlur = 0;

        // Overlay sharp core laser line
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // ─────────────────────────────────────────────────────────────
      // MODE 3: LIQUID AUDIO SILK / FILLED GOLDEN AURORA
      // ─────────────────────────────────────────────────────────────
      else if (spectrumMode === 'aurora') {
        const amp = Math.max(8, subBass * (h * 0.45) + vocalsMid * (h * 0.25) + 4);
        
        // Fluid filled top/bottom aurora gradient
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, `rgba(255, 140, 0, ${0.15 + subBass * 0.3})`);
        grad.addColorStop(0.5, `rgba(255, 215, 0, ${0.45 + subBass * 0.4})`);
        grad.addColorStop(1, `rgba(255, 70, 0, ${0.15 + subBass * 0.3})`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, midY);

        for (let x = 0; x <= w; x += 3) {
          const envelope = Math.sin((x / w) * Math.PI);
          const y = midY - Math.sin(x * 0.012 + phase * 1.2) * (amp * envelope);
          ctx.lineTo(x, y);
        }

        for (let x = w; x >= 0; x -= 3) {
          const envelope = Math.sin((x / w) * Math.PI);
          const y = midY + Math.sin(x * 0.015 - phase * 0.9) * (amp * 0.8 * envelope);
          ctx.lineTo(x, y);
        }

        ctx.closePath();
        ctx.fill();

        // Edge Laser Ribbon
        ctx.strokeStyle = 'rgba(255, 240, 180, 0.95)';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 12;
        ctx.lineWidth = 2.0;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // ─────────────────────────────────────────────────────────────
      // MODE 4: SYMMETRIC FLOATING NEON MICRO-SEGMENTS (Hardware Bars)
      // ─────────────────────────────────────────────────────────────
      else if (spectrumMode === 'bars') {
        const numBars = Math.min(54, Math.floor(w / 8));
        const barWidth = Math.max(3, (w / numBars) - 3);
        const peakDots = peakDotsRef.current;

        for (let i = 0; i < numBars; i++) {
          const freqIdx = Math.floor((i / numBars) * (bufferLength * 0.65));
          const val = freqData[freqIdx] / 255.0; // 0 to 1
          const barHeight = Math.max(3, val * (h * 0.42));

          const x = i * (barWidth + 3) + 2;

          // Peak dot gravity physics
          if (barHeight > peakDots[i]) {
            peakDots[i] = barHeight;
          } else {
            peakDots[i] = Math.max(0, peakDots[i] - 0.8);
          }

          // Draw Symmetric Top and Bottom Bars
          const barGrad = ctx.createLinearGradient(0, midY - barHeight, 0, midY + barHeight);
          barGrad.addColorStop(0, '#FFD700');
          barGrad.addColorStop(0.5, '#FFA500');
          barGrad.addColorStop(1, '#FF4500');

          ctx.fillStyle = barGrad;
          ctx.fillRect(x, midY - barHeight, barWidth, barHeight * 2);

          // Draw Floating Gravity Peak Dot
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 6;
          ctx.fillRect(x, midY - peakDots[i] - 3, barWidth, 2);
          ctx.fillRect(x, midY + peakDots[i] + 1, barWidth, 2);
          ctx.shadowBlur = 0;
        }
      }

      // ─────────────────────────────────────────────────────────────
      // MODE 5: STARDUST PARTICLE CONSTELLATION
      // ─────────────────────────────────────────────────────────────
      else if (spectrumMode === 'particles') {
        const nodes = particleNodesRef.current;
        const totalEnergy = subBass * 1.5 + vocalsMid * 0.8;

        nodes.forEach((node, i) => {
          node.phase += 0.05;
          const targetY = (Math.sin(node.phase) * 8) - (totalEnergy * (h * 0.36) * Math.sin(node.baseX * Math.PI));
          node.yOffset += (targetY - node.yOffset) * 0.25;

          const px = node.baseX * w;
          const py = midY + node.yOffset;

          // Draw Star Node
          ctx.fillStyle = i % 2 === 0 ? '#FFD700' : '#00E5FF';
          ctx.shadowColor = i % 2 === 0 ? '#FFD700' : '#00E5FF';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(px, py, node.size + (subBass * 2), 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Draw connecting constellation lines
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let i = 0; i < nodes.length; i++) {
          const px = nodes[i].baseX * w;
          const py = midY + nodes[i].yOffset;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // ─────────────────────────────────────────────────────────────
      // MODE 6: DUAL HYBRID MASTER (Vector + Multi-Band Aura)
      // ─────────────────────────────────────────────────────────────
      else if (spectrumMode === 'hybrid') {
        // 1. Ambient Background Multi-Band Frequency Aura
        const bgGrad = ctx.createRadialGradient(
          w / 2, midY, 0,
          w / 2, midY, w * 0.45
        );
        bgGrad.addColorStop(0, `rgba(255, 215, 0, ${0.15 + subBass * 0.35})`);
        bgGrad.addColorStop(0.5, `rgba(255, 100, 0, ${0.08 + punchBass * 0.2})`);
        bgGrad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // 2. Real-time PCM Oscilloscope Beam
        ctx.strokeStyle = 'rgba(255, 240, 100, 0.95)';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 12;
        ctx.lineWidth = 2.2;
        ctx.beginPath();

        const sliceWidth = w / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = timeData[i] / 128.0;
          const y = (v * midY) * 0.8 + (midY * 0.2);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          x += sliceWidth;
        }

        ctx.stroke();
        ctx.shadowBlur = 0;

        // Core white electron thread
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }
    };

    draw();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [analyser, isPlaying, isPlayerMinimized, spectrumMode]);


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
      <div className="h-10 sm:h-12 w-full relative overflow-hidden border-b border-white/5 group">
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Visualizer Mode Badge & Switcher Button */}
        <div className="absolute top-2 right-4 flex items-center gap-2 z-10">
          <AnimatePresence>
            {modeNotice && (
              <motion.span
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.9 }}
                className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-yellow-400 text-black text-[10px] font-mono font-bold tracking-wider shadow-lg shadow-yellow-500/30"
              >
                ✓ {modeNotice}
              </motion.span>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowModesMenu(!showModesMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/80 hover:bg-zinc-900 border border-yellow-500/40 hover:border-yellow-400 text-yellow-400 text-[11px] font-mono font-bold tracking-wider backdrop-blur-md shadow-md transition-all active:scale-95"
            title="Cambiar tipo de visualizador de espectro"
          >
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden xs:inline">{SPECTRUM_MODES.find(m => m.id === spectrumMode)?.short || 'ESPECTRO'}</span>
            <span className="text-zinc-500 text-[9px]">▾</span>
          </button>
        </div>
      </div>

      {/* Spectrum Modes Popover Drawer */}
      <AnimatePresence>
        {showModesMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="border-b border-zinc-800 bg-black/95 backdrop-blur-2xl px-4 py-3"
          >
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-mono font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" /> Selecciona el Estilo de Espectro Reactivo
                </span>
                <button
                  onClick={() => setShowModesMenu(false)}
                  className="text-zinc-400 hover:text-white text-xs font-mono"
                >
                  ✕ Cerrar
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {SPECTRUM_MODES.map((m) => {
                  const active = spectrumMode === m.id;
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        handleSelectMode(m.id);
                        setShowModesMenu(false);
                      }}
                      className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all ${
                        active
                          ? 'bg-gradient-to-b from-yellow-500/25 to-yellow-500/5 border-yellow-400 shadow-md shadow-yellow-500/20'
                          : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 w-full mb-1">
                        <Icon className={`w-3.5 h-3.5 ${active ? 'text-yellow-400' : 'text-zinc-400'}`} />
                        <span className={`text-xs font-bold truncate ${active ? 'text-yellow-400' : 'text-white'}`}>
                          {m.short}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400 line-clamp-2 leading-tight">
                        {m.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

          {/* Spectrum Visualizer Modes toggle */}
          <button
            onClick={() => setShowModesMenu(!showModesMenu)}
            className={`p-2 rounded-xl border transition-colors ${showModesMenu ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400' : 'border-zinc-800 text-zinc-400 hover:text-white'}`}
            title="Cambiar Estilo de Espectro Reactivo"
          >
            <Activity className="w-4 h-4" />
          </button>

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