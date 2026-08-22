import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ExternalLink, Disc3, Radio, Music2, Heart, Sparkles, Volume2, RotateCcw, Sliders } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAudio } from '@/context/AudioContext';
import { CASILA_ALBUM } from '@/data/musicData';
import { Link } from 'react-router-dom';

export default function SpotifySection() {
  const { currentTrack, isPlaying, playTrack, togglePlayPause, seek, currentTime, setPlaybackRate, audioRef } = useAudio();
  const [selectedTrackIdx, setSelectedTrackIdx] = useState(0);
  const [rpmMode, setRpmMode] = useState('33'); // '33' (Normal 1.0x) or '45' (Rebajada 0.82x)
  const [isScratching, setIsScratching] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  
  const vinylRef = useRef(null);
  const lastAngleRef = useRef(0);
  const animFrameRef = useRef(null);

  const activeTrack = CASILA_ALBUM.tracks[selectedTrackIdx] || CASILA_ALBUM.tracks[0];
  const isThisAlbumPlaying = isPlaying && (currentTrack?.album === CASILA_ALBUM.title || currentTrack?.title === activeTrack.title);

  // Apply RPM speed & rebajada pitch
  const handleSetRpm = (mode) => {
    setRpmMode(mode);
    if (mode === '45') {
      // Rebajada mode: Slowed down to 0.82x with deep pitch
      setPlaybackRate(0.82);
    } else {
      // Normal mode: 1.0x
      setPlaybackRate(1.0);
    }
  };

  // Continuous vinyl rotation loop when playing
  useEffect(() => {
    if (!isThisAlbumPlaying || isScratching) return;
    const speed = rpmMode === '45' ? 1.6 : 2.2; // degrees per frame
    let localId;
    const loop = () => {
      setRotationAngle(prev => (prev + speed) % 360);
      localId = requestAnimationFrame(loop);
    };
    localId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(localId);
  }, [isThisAlbumPlaying, isScratching, rpmMode]);

  // Vinyl Drag & Scratch Pointer Interaction
  const handlePointerDown = (e) => {
    setIsScratching(true);
    const rect = vinylRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    lastAngleRef.current = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
  };

  const handlePointerMove = (e) => {
    if (!isScratching || !vinylRef.current) return;
    const rect = vinylRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    
    let delta = currentAngle - lastAngleRef.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    lastAngleRef.current = currentAngle;
    setRotationAngle(prev => prev + delta);

    // Scratch audio scrubbing in real-time
    if (audioRef?.current) {
      const scrubSeconds = (delta / 360) * 1.5;
      const target = Math.max(0, audioRef.current.currentTime + scrubSeconds);
      seek(target);
    }
  };

  const handlePointerUp = () => {
    if (isScratching) {
      setIsScratching(false);
      // Restore playback rate
      setPlaybackRate(rpmMode === '45' ? 0.82 : 1.0);
    }
  };

  const handlePlaySong = (track, idx) => {
    setSelectedTrackIdx(idx);
    const formatted = {
      id: `music-${track.id}`,
      title: track.title,
      artist: track.artist || "Casila OG",
      album: CASILA_ALBUM.title,
      url: track.audioUrl || track.url,
      cover: CASILA_ALBUM.cover,
      bpm: 120
    };

    if (currentTrack?.title === track.title) {
      togglePlayPause();
    } else {
      playTrack(formatted);
      setPlaybackRate(rpmMode === '45' ? 0.82 : 1.0);
    }
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 w-full"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Disc3 className="w-3.5 h-3.5 animate-spin" /> ESTACIÓN AUDIÓFILA 3D & STREAMING
          </div>
          <h2 className="font-pirata text-3xl sm:text-5xl lg:text-6xl text-white tracking-wider cursor-default break-words">
            TOCADISCOS 3D & <span className="title-hover-gold">DISCOGRAFÍA</span>
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-sans px-2">
            Interactúa con el reproductor de vinilo tridimensional: haz scratch arrastrando el disco y cambia entre velocidad normal (33 RPM) o rebajada (45 RPM).
          </p>
        </motion.div>

        {/* Dual Panels Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch w-full">
          
          {/* Panel 1: 3D INTERACTIVE VINYL TURNTABLE DECK WITH REAL SCRATCH */}
          <div className="lg:col-span-7 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 rounded-3xl p-5 sm:p-8 border-2 border-yellow-500/30 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between relative overflow-hidden w-full">
            
            {/* Ambient gold glow */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Turntable Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping" />
                <span className="text-xs font-mono font-bold uppercase text-yellow-400 tracking-wider">
                  MK-1311 DIRECT DRIVE VINYL DECK
                </span>
              </div>
              
              {/* 33 RPM (Normal) vs 45 RPM (Rebajada) Selector */}
              <div className="flex items-center gap-1.5 bg-black/90 p-1 rounded-xl border border-zinc-800 text-xs font-mono">
                <button
                  onClick={() => handleSetRpm('33')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    rpmMode === '33' ? 'bg-yellow-400 text-black shadow-md' : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Velocidad normal (1.0x)"
                >
                  33 RPM (NORMAL)
                </button>
                <button
                  onClick={() => handleSetRpm('45')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    rpmMode === '45' ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Modo Rebajada (0.82x Slowed & Pitch)"
                >
                  45 RPM (REBAJADA)
                </button>
              </div>
            </div>

            {/* 3D Turntable Platter with Drag & Scratch */}
            <div className="relative py-4 flex flex-col items-center justify-center select-none">
              
              {/* Platter Base */}
              <div 
                ref={vinylRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className={`relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-950 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.95)] border-4 border-zinc-700 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none ${
                  isScratching ? 'ring-4 ring-yellow-400/60 scale-[1.02]' : ''
                } transition-transform`}
              >
                
                {/* Vinyl Record */}
                <div
                  className="relative w-full h-full rounded-full bg-black border-2 border-zinc-800 overflow-hidden flex items-center justify-center shadow-2xl will-change-transform"
                  style={{
                    transform: `rotate(${rotationAngle}deg)`,
                    backgroundImage: `
                      radial-gradient(circle, transparent 28%, rgba(255,255,255,0.03) 29%, transparent 30%),
                      radial-gradient(circle, transparent 45%, rgba(255,255,255,0.04) 46%, transparent 47%),
                      radial-gradient(circle, transparent 65%, rgba(255,255,255,0.05) 66%, transparent 67%),
                      radial-gradient(circle, transparent 82%, rgba(255,255,255,0.04) 83%, transparent 84%)
                    `
                  }}
                >
                  {/* Vinyl Sheen Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/15 pointer-events-none rounded-full" />

                  {/* Center Label (Album Art Cover) */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-yellow-400/80 shadow-2xl relative z-10 pointer-events-none">
                    <img
                      src={CASILA_ALBUM.cover}
                      alt="Center Label"
                      className="w-full h-full object-cover"
                    />
                    {/* Spindle hole */}
                    <div className="absolute inset-0 m-auto w-3.5 h-3.5 bg-zinc-900 rounded-full border border-yellow-200" />
                  </div>
                </div>

                {/* Tonearm (Pivots automatically when playing) */}
                <motion.div
                  className="absolute -top-4 -right-2 sm:-right-4 w-32 h-44 pointer-events-none origin-top-right z-20"
                  animate={{
                    rotate: isThisAlbumPlaying ? 24 : 0
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 18
                  }}
                >
                  {/* Arm Base Pivot */}
                  <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-gradient-to-br from-zinc-400 to-zinc-800 border border-yellow-400/60 shadow-lg" />
                  {/* Arm Bar */}
                  <div className="absolute top-4 right-4 w-1.5 h-36 bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-600 shadow-md origin-top rotate-[-12deg]" />
                  {/* Cartridge & Needle */}
                  <div className="absolute bottom-2 left-6 w-5 h-7 bg-yellow-400 rounded-sm border border-black shadow-md flex items-center justify-center rotate-[-15deg]">
                    <div className="w-1 h-2 bg-black" />
                  </div>
                </motion.div>

              </div>

              <span className="text-[11px] font-mono text-zinc-500 mt-3 block">
                {isScratching ? '⚡ HACIENDO SCRATCH EN VIVO' : '👆 Arrastra el vinilo para hacer DJ Scratch'}
              </span>
            </div>

            {/* Currently Selected Song Bar & Direct Playback Controls */}
            <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left min-w-0">
                <span className="text-[11px] font-mono text-yellow-400 font-bold uppercase">
                  TRACK #{selectedTrackIdx + 1} • {CASILA_ALBUM.artist}
                </span>
                <p className="text-white font-oswald text-lg font-bold truncate">
                  {activeTrack.title}
                </p>
                <span className="text-xs text-zinc-500 font-mono">{activeTrack.duration}</span>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={() => handlePlaySong(activeTrack, selectedTrackIdx)}
                  className="py-6 px-7 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:brightness-110 text-black font-black font-oswald text-sm uppercase rounded-2xl shadow-xl shadow-yellow-500/25 transition-transform active:scale-95 flex items-center gap-2"
                >
                  {isThisAlbumPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  {isThisAlbumPlaying ? "PAUSAR VINILO" : "TOCAR VINILO"}
                </Button>
              </div>
            </div>

            {/* Tracklist Selector Pills */}
            <div className="mt-4 pt-3 flex gap-2 overflow-x-auto custom-scrollbar pb-1">
              {CASILA_ALBUM.tracks.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => handlePlaySong(t, idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedTrackIdx === idx
                      ? 'bg-yellow-400 text-black font-bold shadow-md'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  <span>{idx + 1}.</span>
                  <span className="truncate max-w-[120px]">{t.title}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Panel 2: Monteking MX Top Hits & Spotify Embedded Profile */}
          <div className="lg:col-span-5 bg-gradient-to-b from-zinc-950 to-black rounded-3xl p-6 sm:p-8 border-2 border-zinc-800 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-bold text-green-400 font-mono tracking-widest">PERFIL OFICIAL SPOTIFY</span>
                <Disc3 className="w-5 h-5 text-yellow-400 animate-spin" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-oswald mb-1">Monteking MX</h3>
              <p className="text-zinc-400 text-xs mb-5">Reproduce directamente la discografía y playlists oficiales en Spotify.</p>

              {/* Spotify Embed Widget */}
              <div className="rounded-2xl overflow-hidden shadow-xl border border-zinc-800 bg-black">
                <iframe
                  style={{ borderRadius: '16px' }}
                  src="https://open.spotify.com/embed/artist/6JkL5fiPkUG49eUzwKE5bW?utm_source=generator&theme=0"
                  width="100%"
                  height="360"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-500">
              <span>Actualizado semanalmente</span>
              <a href="https://open.spotify.com/artist/6JkL5fiPkUG49eUzwKE5bW" target="_blank" rel="noopener noreferrer" className="text-green-400 font-bold hover:underline">
                Seguir en Spotify →
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}