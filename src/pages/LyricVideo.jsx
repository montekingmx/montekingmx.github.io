import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Sparkles, Play, Pause, Download, Volume2, Palette, Type,
  Film, Music2, RefreshCw, Sliders, Upload, Radio, FileAudio,
  CheckCircle2, Clock, Video, Eye, Layers, Settings, Share2
} from 'lucide-react';
import { CASILA_ALBUM } from '@/data/musicData';

const BACKGROUND_THEMES = [
  { id: 'radial-wave', name: 'Radial Gold Audio Wave', bg: '#080808', particle: '#FFD700' },
  { id: 'particle-warp', name: 'Hyperspace Starfield Warp', bg: '#04020a', particle: '#00E5FF' },
  { id: 'retro-grid', name: 'Synthwave 3D Neon Horizon', bg: '#0b001a', particle: '#FF0055' },
  { id: 'smoke-fire', name: 'Trap Smoke & Dark Embers', bg: '#100303', particle: '#FF4500' },
  { id: 'crocodile-gold', name: '13-11 Luxury Crocodile Vault', bg: '#0a0905', particle: '#FFD700' }
];

const FONTS = [
  { id: 'pirata', name: 'Pirata One Gothic', font: 'Pirata One, serif' },
  { id: 'oswald', name: 'Oswald Bold Heavy', font: 'Oswald, sans-serif' },
  { id: 'impact', name: 'Impact Studio', font: 'Impact, sans-serif' },
  { id: 'mono', name: 'Cyber Monospace', font: 'Courier New, monospace' },
  { id: 'space', name: 'Space Modern', font: 'Space Grotesk, sans-serif' }
];

const TEXT_COLORS = [
  { name: 'Oro Puro 13-11', hex: '#FFD700', shadow: '#FFA500' },
  { name: 'Cyan Neón', hex: '#00E5FF', shadow: '#0099FF' },
  { name: 'Rojo Carmesí', hex: '#FF3366', shadow: '#CC0033' },
  { name: 'Blanco Estudio', hex: '#FFFFFF', shadow: '#888888' },
  { name: 'Verde Matrix', hex: '#39FF14', shadow: '#00CC00' }
];

const DEFAULT_LRC = `[00:01.50] MONTEKING RECORDS 13-11
[00:04.20] CASILA OG — MONEDA AL AIRE
[00:08.00] 201 POR CIENTO EN EL MICROFONO
[00:12.50] DE MONTERREY PARA EL MUNDO ENTERO
[00:16.80] RETUMBANDO EL BAJO EN EL PECHO
[00:21.00] SIN LIMITES EN LA PRODUCCION`;

export default function LyricVideoPage() {
  // Audio state
  const [audioSrc, setAudioSrc] = useState('assets/songs/01_papaya_y_betabel.mp3');
  const [audioName, setAudioName] = useState('01_papaya_y_betabel.mp3 (Default)');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);

  // Configuration
  const [lyricsText, setLyricsText] = useState(DEFAULT_LRC);
  const [selectedBg, setSelectedBg] = useState(BACKGROUND_THEMES[0]);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [selectedColor, setSelectedColor] = useState(TEXT_COLORS[0]);
  const [aspectRatio, setAspectRatio] = useState('9:16'); // '9:16' or '16:9' or '1:1'
  const [fontSize, setFontSize] = useState(32);
  const [animStyle, setAnimStyle] = useState('pop'); // 'pop', 'karaoke', 'glow-pulse', 'glitch'
  const [isRecording, setIsRecording] = useState(false);

  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  // Parse lyrics timestamps
  const parsedLyrics = lyricsText.split('\n').map((line, idx) => {
    const match = line.match(/\[(\d+):(\d+\.?\d*)\](.*)/);
    if (match) {
      const min = parseFloat(match[1]);
      const sec = parseFloat(match[2]);
      return { time: min * 60 + sec, text: match[3].trim() };
    }
    return { time: idx * 4, text: line.replace(/\[.*?\]/, '').trim() };
  }).filter(l => l.text.length > 0);

  // Handle Custom Audio File Upload
  const handleAudioUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAudioSrc(url);
    setAudioName(file.name);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Tag Current Timestamp onto lyric line
  const handleTagTimestamp = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const min = String(Math.floor(cur / 60)).padStart(2, '0');
    const sec = (cur % 60).toFixed(2).padStart(5, '0');
    const stamp = `[${min}:${sec}]`;

    setLyricsText(prev => {
      const lines = prev.split('\n');
      return lines.map((l, i) => i === 0 ? `${stamp} ${l.replace(/\[.*?\]/, '').trim()}` : l).join('\n');
    });
  };

  // Audio Play/Pause Sync
  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Canvas Video Lyric Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (aspectRatio === '9:16') {
      canvas.width = 450;
      canvas.height = 800;
    } else if (aspectRatio === '16:9') {
      canvas.width = 800;
      canvas.height = 450;
    } else {
      canvas.width = 600;
      canvas.height = 600;
    }

    let frame = 0;
    let animId;

    // Stars for warp background
    const stars = Array.from({ length: 90 }, () => ({
      x: (Math.random() - 0.5) * canvas.width,
      y: (Math.random() - 0.5) * canvas.height,
      z: Math.random() * canvas.width
    }));

    const render = () => {
      frame++;
      animId = requestAnimationFrame(render);

      const w = canvas.width;
      const h = canvas.height;
      const timeVal = audioRef.current ? audioRef.current.currentTime : currentTime;

      // 1. Draw Selected Animated Background
      ctx.fillStyle = selectedBg.bg;
      ctx.fillRect(0, 0, w, h);

      if (selectedBg.id === 'radial-wave') {
        // Glowing Radial Audio Rings
        ctx.strokeStyle = selectedColor.hex;
        ctx.lineWidth = 2;
        ctx.shadowColor = selectedColor.shadow;
        ctx.shadowBlur = 15;
        for (let r = 50; r < 280; r += 45) {
          const pulse = Math.sin(frame * 0.05 + r * 0.02) * 12;
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, r + pulse, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      } else if (selectedBg.id === 'particle-warp') {
        // Hyperspace Starfield Warp
        ctx.fillStyle = selectedColor.hex;
        stars.forEach(st => {
          st.z -= isPlaying ? 5 : 1;
          if (st.z <= 0) {
            st.z = w;
            st.x = (Math.random() - 0.5) * w;
            st.y = (Math.random() - 0.5) * h;
          }
          const k = 180 / st.z;
          const px = st.x * k + w / 2;
          const py = st.y * k + h / 2;
          const sz = Math.max(1, (1 - st.z / w) * 4);
          ctx.beginPath();
          ctx.arc(px, py, sz, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (selectedBg.id === 'retro-grid') {
        // Synthwave 3D Horizon Grid
        const horizon = h * 0.55;
        ctx.strokeStyle = selectedColor.hex;
        ctx.lineWidth = 1.5;
        const gridOff = (frame * (isPlaying ? 3 : 0.8)) % 30;
        for (let x = 0; x <= w; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, horizon);
          ctx.lineTo(w / 2 + (x - w / 2) * 3, h);
          ctx.stroke();
        }
        for (let y = horizon + gridOff; y < h; y += 22) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      }

      // 2. Active Lyric Line Calculation
      let activeIdx = 0;
      for (let i = 0; i < parsedLyrics.length; i++) {
        if (timeVal >= parsedLyrics[i].time) activeIdx = i;
      }

      const activeLine = parsedLyrics[activeIdx]?.text || "MONTEKING MX";
      const nextLine = parsedLyrics[activeIdx + 1]?.text || "";

      // 3. Render Lyric Motion Text
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `900 ${fontSize}px ${selectedFont.font}`;

      // Animation Pop & Glow
      const popScale = animStyle === 'pop' ? 1 + Math.sin(frame * 0.1) * 0.04 : 1;
      ctx.save();
      ctx.translate(w / 2, h / 2 - 20);
      ctx.scale(popScale, popScale);

      // Chromatic Glitch effect on demand
      if (animStyle === 'glitch' && frame % 12 === 0) {
        ctx.fillStyle = '#00E5FF';
        ctx.fillText(activeLine.toUpperCase(), -3, 0);
        ctx.fillStyle = '#FF0055';
        ctx.fillText(activeLine.toUpperCase(), 3, 0);
      }

      ctx.fillStyle = selectedColor.hex;
      ctx.shadowColor = selectedColor.shadow;
      ctx.shadowBlur = 25;
      ctx.fillText(activeLine.toUpperCase(), 0, 0);
      ctx.restore();

      // Next line hint
      if (nextLine) {
        ctx.font = `600 ${fontSize * 0.55}px ${selectedFont.font}`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.shadowBlur = 0;
        ctx.fillText(nextLine.toUpperCase(), w / 2, h / 2 + 55);
      }

      // 4. Studio Overlay Watermark
      ctx.font = 'bold 11px monospace';
      ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
      ctx.fillText('MONTEKING RECORDS 13-11 • STUDIO MASTER', w / 2, h - 35);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, selectedBg, selectedFont, selectedColor, aspectRatio, fontSize, animStyle, parsedLyrics]);

  // Video Recording in Browser
  const startRecording = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    recordedChunksRef.current = [];
    const stream = canvas.captureStream(30);

    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `MK_Lyric_Video_${selectedBg.id}.webm`;
      a.click();
      setIsRecording(false);
    };

    recorder.start();
    setIsRecording(true);
    mediaRecorderRef.current = recorder;

    // Start playback
    if (audioRef.current) audioRef.current.play();
    setIsPlaying(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const downloadFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `MK_Lyric_Frame.png`;
    a.click();
  };

  return (
    <div className="min-h-screen py-16">
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 180);
          }
        }}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Studio Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-yellow-400 uppercase tracking-[0.3em] text-xs font-bold font-mono">
            MONTEKING FILMS & MOTION ENGINE
          </span>
          <h1 className="font-pirata text-5xl sm:text-7xl font-bold text-white tracking-wider mt-2 mb-3">
            VIDEO LYRIC <span className="text-stroke-gold">PRO STUDIO</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto font-sans">
            Sube tu propia canción o selecciona un tema de Monteking, edita y sincroniza la letra en tiempo real y genera videos cinematográficos con fondos reactivos.
          </p>
        </motion.div>

        {/* Studio Main Workspace */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls & Audio Ingestion Column */}
          <div className="lg:col-span-6 bg-zinc-950/95 rounded-3xl p-6 sm:p-8 border-2 border-zinc-800 shadow-2xl space-y-6">
            
            {/* Audio Upload Box */}
            <div className="p-5 rounded-2xl bg-black border-2 border-dashed border-yellow-500/40 hover:border-yellow-400 transition-colors">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
                    <FileAudio className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block font-bold">CANCIÓN EN EDICIÓN</span>
                    <p className="text-white text-xs font-bold font-oswald truncate">{audioName}</p>
                  </div>
                </div>

                <label className="cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-xl text-xs font-bold font-oswald uppercase tracking-wider shrink-0 transition-transform active:scale-95">
                  <Upload className="w-3.5 h-3.5 inline-block mr-1.5" /> Subir Audio
                  <input type="file" accept="audio/*" onChange={handleAudioUpload} className="hidden" />
                </label>
              </div>

              {/* Scrubber & Play Bar */}
              <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center gap-3">
                <button
                  onClick={togglePlayAudio}
                  className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-yellow-400 hover:text-black text-white flex items-center justify-center font-bold shrink-0 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (audioRef.current) audioRef.current.currentTime = val;
                    setCurrentTime(val);
                  }}
                  className="flex-1 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
                <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                  {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Aspect Ratio & Format */}
            <div>
              <label className="text-xs font-mono text-zinc-400 font-bold uppercase block mb-2">Formato & Relación de Aspecto</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '9:16', label: '📱 9:16 Reels / TikTok' },
                  { id: '16:9', label: '🖥️ 16:9 YouTube 4K' },
                  { id: '1:1', label: '🔲 1:1 Feed Post' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setAspectRatio(item.id)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold font-oswald border transition-all truncate ${
                      aspectRatio === item.id ? 'bg-yellow-400 text-black border-yellow-300 shadow-md' : 'bg-black text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Background Theme Preset */}
            <div>
              <label className="text-xs font-mono text-zinc-400 font-bold uppercase block mb-2">Fondo Cinemático Animado</label>
              <div className="grid grid-cols-2 gap-2">
                {BACKGROUND_THEMES.map(th => (
                  <button
                    key={th.id}
                    onClick={() => setSelectedBg(th)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedBg.id === th.id ? 'border-yellow-400 bg-yellow-500/15 text-white' : 'border-zinc-800 bg-black text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-bold font-oswald block truncate">{th.name}</span>
                    <span className="text-[10px] font-mono text-yellow-400">FX Animado</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Typography & Palettes */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-zinc-400 font-bold uppercase block mb-2">Tipografía</label>
                <select
                  value={selectedFont.id}
                  onChange={e => setSelectedFont(FONTS.find(f => f.id === e.target.value) || FONTS[0])}
                  className="w-full bg-black border border-zinc-800 text-white rounded-xl p-2.5 text-xs font-bold focus:border-yellow-400"
                >
                  {FONTS.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 font-bold uppercase block mb-2">Color & Neón</label>
                <select
                  value={selectedColor.name}
                  onChange={e => setSelectedColor(TEXT_COLORS.find(c => c.name === e.target.value) || TEXT_COLORS[0])}
                  className="w-full bg-black border border-zinc-800 text-white rounded-xl p-2.5 text-xs font-bold focus:border-yellow-400"
                >
                  {TEXT_COLORS.map(c => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Animation Style & Size */}
            <div className="grid grid-cols-2 gap-4 items-center">
              <div>
                <label className="text-xs font-mono text-zinc-400 font-bold uppercase block mb-1">Efecto de Animación</label>
                <select
                  value={animStyle}
                  onChange={e => setAnimStyle(e.target.value)}
                  className="w-full bg-black border border-zinc-800 text-white rounded-xl p-2 text-xs font-bold focus:border-yellow-400"
                >
                  <option value="pop">Kinetic Pop Pulse</option>
                  <option value="karaoke">Smooth Flow</option>
                  <option value="glitch">Cyberpunk Glitch</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-mono text-zinc-400 font-bold uppercase">Tamaño</label>
                  <span className="text-xs font-mono text-yellow-400">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={52}
                  value={fontSize}
                  onChange={e => setFontSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
              </div>
            </div>

            {/* Lyrics Timestamps Editor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-zinc-400 font-bold uppercase">
                  Letra Sincronizada (LRC Timestamps)
                </label>
                <button
                  onClick={handleTagTimestamp}
                  className="text-[11px] font-mono font-bold text-yellow-400 hover:underline flex items-center gap-1"
                >
                  <Clock className="w-3.5 h-3.5" /> Sincronizar Timestamp Actual
                </button>
              </div>
              <Textarea
                rows={6}
                value={lyricsText}
                onChange={e => setLyricsText(e.target.value)}
                className="bg-black/90 border-zinc-800 text-zinc-200 font-mono text-xs rounded-2xl p-3 focus:border-yellow-400"
              />
            </div>

          </div>

          {/* Right Live Visualizer & Export Column */}
          <div className="lg:col-span-6 bg-zinc-950/95 rounded-3xl p-6 sm:p-8 border-2 border-yellow-500/30 shadow-2xl flex flex-col items-center justify-between">
            
            <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping" />
                <span className="text-xs font-mono font-bold text-yellow-400 uppercase">
                  MONITOR DE ESTUDIO EN VIVO
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-500">{aspectRatio}</span>
            </div>

            {/* Canvas Screen */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-zinc-800 bg-black flex items-center justify-center max-w-full">
              <canvas ref={canvasRef} className="block max-w-full" />
            </div>

            {/* Render & Export Actions */}
            <div className="w-full mt-6 pt-4 border-t border-zinc-800 space-y-3">
              <div className="flex gap-3">
                {!isRecording ? (
                  <Button
                    onClick={startRecording}
                    className="flex-1 py-6 bg-gradient-to-r from-red-600 to-amber-500 hover:brightness-110 text-white font-black font-oswald text-sm uppercase rounded-2xl shadow-xl shadow-red-600/30 flex items-center justify-center gap-2"
                  >
                    <Video className="w-4 h-4" /> Grabar Video (WebM 4K)
                  </Button>
                ) : (
                  <Button
                    onClick={stopRecording}
                    className="flex-1 py-6 bg-red-600 hover:bg-red-700 text-white font-black font-oswald text-sm uppercase rounded-2xl animate-pulse flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Detener & Descargar Video
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={downloadFrame}
                  className="border-zinc-700 text-zinc-300 hover:border-yellow-400 hover:text-yellow-400 py-6 px-5 rounded-2xl text-xs font-bold font-mono"
                >
                  <Download className="w-4 h-4 mr-1.5" /> PNG Frame
                </Button>
              </div>

              <p className="text-[11px] font-mono text-zinc-500 text-center">
                Renderizado directo en tu tarjeta gráfica GPU con sincronización de audio en tiempo real.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}