import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Minimize2, Music, ListMusic, Shuffle, Repeat, Repeat1
} from 'lucide-react';
import { Slider } from "@/components/ui/slider";

// Real MP3 files from montekingmx.github.io — these actually play!
const PLAYLIST = [
  { id: 1,  title: "Yyy Sour Play",          artist: "Monteking Mx",  url: "https://montekingmx.github.io/TRAP-MEMPH/yyy_sour_play_||_beat_||_116bpm.mp3",             bpm: 116 },
  { id: 2,  title: "What U Need",            artist: "Monteking Mx",  url: "https://montekingmx.github.io/TRAP-MEMPH/what_u_need_||_beat_||_trap_monteking_121bpm.mp3",  bpm: 121 },
  { id: 3,  title: "Gota De Hielo",          artist: "Monteking Mx",  url: "https://montekingmx.github.io/TRAP-MEMPH/gota_de_hielo_||_beat_||_trap_tumbado_113bpm.mp3",  bpm: 113 },
  { id: 4,  title: "Devil",                  artist: "Monteking Mx",  url: "https://montekingmx.github.io/BOOMBAP/devil_||_beat_||_boombap_154bpm.mp3",                  bpm: 154 },
  { id: 5,  title: "Falling Harp",           artist: "Monteking Mx",  url: "https://montekingmx.github.io/BOOMBAP/falling_harp_||_beat_||_boombap_dark_||_115bpm_114bpm.mp3", bpm: 115 },
  { id: 6,  title: "Slow Reflex",            artist: "Monteking Mx",  url: "https://montekingmx.github.io/BOOMBAP/slow_reflex_||_beat_||_boombap_deep_monteking_134bpm.mp3",  bpm: 134 },
  { id: 7,  title: "Arriba De Ti",           artist: "Monteking Mx",  url: "https://montekingmx.github.io/SUAVE/arriba_de_ti_||_beat_||_lofi_rnb_boombap_114bpm.mp3",    bpm: 114 },
  { id: 8,  title: "Flavors",                artist: "Monteking Mx",  url: "https://montekingmx.github.io/SUAVE/flavors_||_beat_||_hot_trap_||_144bpm_127bpm.mp3",         bpm: 144 },
  { id: 9,  title: "Margott",                artist: "Monteking Mx",  url: "https://montekingmx.github.io/TECHNO. MK/margott_||_techno_mk_||_104bpm_107bpm.mp3",           bpm: 104 },
  { id: 10, title: "Necromancer",            artist: "Monteking Mx",  url: "https://montekingmx.github.io/TRAP-MEMPH/necromancer_||_beat_||_trap_memphis_monteking_||_125bpm_121bpm.mp3", bpm: 125 },
];

const LOGO = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/66ca3a969_LOGO-MK-COLOR-SH.png";

const fmt = (s) => {
  if (!s || isNaN(s)) return '0:00';
  return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
};

export default function MusicPlayer({ isMinimized, onToggleMinimize }) {
  const [isPlaying, setIsPlaying]   = useState(false);
  const [trackIdx, setTrackIdx]     = useState(0);
  const [volume, setVolume]         = useState([75]);
  const [isMuted, setIsMuted]       = useState(false);
  const [elapsed, setElapsed]       = useState(0);
  const [duration, setDuration]     = useState(0);
  const [shuffle, setShuffle]       = useState(false);
  const [repeat, setRepeat]         = useState(0);
  const [showList, setShowList]     = useState(false);
  const [hovered, setHovered]       = useState(false);
  const audioRef = useRef(null);

  const track = PLAYLIST[trackIdx];
  const progress = duration > 0 ? (elapsed / duration) * 100 : 0;

  // Sync audio element volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : (volume[0] / 100);
    }
  }, [volume, isMuted]);

  // Load new track when index changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = track.url;
    audioRef.current.load();
    setElapsed(0);
    setDuration(0);
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [trackIdx]);

  // Play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) setElapsed(audioRef.current.currentTime);
  };
  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };
  const handleEnded = () => nextTrack();

  const nextTrack = useCallback(() => {
    if (repeat === 2) {
      if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play().catch(() => {}); }
      return;
    }
    if (shuffle) {
      let n; do { n = Math.floor(Math.random() * PLAYLIST.length); } while (n === trackIdx && PLAYLIST.length > 1);
      setTrackIdx(n);
    } else {
      setTrackIdx(i => (i + 1) % PLAYLIST.length);
    }
  }, [repeat, shuffle, trackIdx]);

  const prevTrack = () => {
    if (elapsed > 3) {
      if (audioRef.current) audioRef.current.currentTime = 0;
      return;
    }
    setTrackIdx(i => (i === 0 ? PLAYLIST.length - 1 : i - 1));
  };

  const seek = (pct) => {
    if (audioRef.current && duration) {
      audioRef.current.currentTime = (pct / 100) * duration;
    }
  };

  const selectTrack = (i) => {
    setTrackIdx(i);
    setIsPlaying(true);
  };

  // ── Hidden audio element (always mounted)
  const audioEl = (
    <audio
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={handleEnded}
      preload="metadata"
      crossOrigin="anonymous"
    />
  );

  // ── Minimized FAB
  if (isMinimized) return (
    <>
      {audioEl}
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        <motion.button
          onClick={onToggleMinimize}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          className="relative w-14 h-14 rounded-full bg-yellow-500 text-black shadow-2xl shadow-yellow-500/40 flex items-center justify-center">
          {isPlaying && (
            <motion.div className="absolute inset-0 rounded-full bg-yellow-400 opacity-40"
              animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          )}
          <Music className="w-6 h-6 relative z-10" />
        </motion.button>

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="absolute bottom-16 right-0 bg-zinc-900/98 backdrop-blur-xl border border-zinc-700 rounded-2xl p-3 w-60 shadow-2xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                  <img src={LOGO} alt="" className="w-full h-full object-contain p-1" />
                </div>
                <div className="min-w-0">
                  <p className="text-white text-xs font-semibold truncate">{track.title}</p>
                  <p className="text-zinc-500 text-xs">{track.bpm} BPM</p>
                </div>
              </div>
              {/* mini progress */}
              <div className="h-0.5 bg-zinc-700 rounded-full mb-3">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <button onClick={prevTrack} className="p-1.5 text-zinc-400 hover:text-white"><SkipBack className="w-4 h-4" /></button>
                <button onClick={() => setIsPlaying(p => !p)}
                  className="w-9 h-9 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black flex items-center justify-center">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button onClick={nextTrack} className="p-1.5 text-zinc-400 hover:text-white"><SkipForward className="w-4 h-4" /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );

  // ── Full bar
  return (
    <>
      {audioEl}
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-0 right-0 z-50">
        {/* Playlist */}
        <AnimatePresence>
          {showList && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="bg-zinc-900/98 backdrop-blur-xl border-t border-zinc-700 overflow-hidden">
              <div className="max-w-4xl mx-auto p-3 max-h-52 overflow-y-auto custom-scrollbar">
                <p className="text-zinc-500 text-xs mb-2 px-1 flex items-center gap-1">
                  <ListMusic className="w-3 h-3" /> Beat Catalog Preview — <a href="/Beats" className="text-yellow-500 hover:underline">ver tienda completa</a>
                </p>
                <div className="space-y-0.5">
                  {PLAYLIST.map((item, i) => (
                    <button key={item.id} onClick={() => selectTrack(i)}
                      className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-left transition-colors ${
                        trackIdx === i ? 'bg-yellow-500/15 border border-yellow-500/25' : 'hover:bg-zinc-800 border border-transparent'
                      }`}>
                      <span className={`text-xs w-5 text-center ${trackIdx === i ? 'text-yellow-500' : 'text-zinc-600'}`}>
                        {trackIdx === i && isPlaying ? '▶' : i + 1}
                      </span>
                      <span className={`flex-1 text-sm truncate ${trackIdx === i ? 'text-yellow-400 font-medium' : 'text-zinc-300'}`}>{item.title}</span>
                      <span className="text-zinc-600 text-xs">{item.bpm} BPM</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full-width seek */}
        <div className="relative h-1 bg-zinc-800 cursor-pointer group"
          onClick={e => {
            const r = e.currentTarget.getBoundingClientRect();
            seek(((e.clientX - r.left) / r.width) * 100);
          }}>
          <div className="h-full bg-yellow-500 relative transition-all" style={{ width: `${progress}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-yellow-400 opacity-0 group-hover:opacity-100 -translate-x-1/2 shadow" />
          </div>
        </div>

        {/* Bar */}
        <div className="bg-zinc-900/98 backdrop-blur-xl border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-3 py-2">
            <div className="flex items-center gap-2 md:gap-4">
              {/* Track info */}
              <div className="flex items-center gap-2 w-36 md:w-52 min-w-0 shrink-0">
                <div className="w-9 h-9 rounded-lg bg-zinc-800 overflow-hidden border border-zinc-700 shrink-0">
                  <img src={LOGO} alt="MK" className="w-full h-full object-contain p-1" />
                </div>
                <div className="min-w-0 hidden sm:block">
                  <p className="text-white text-xs font-semibold truncate">{track.title}</p>
                  <p className="text-zinc-500 text-xs">{track.bpm} BPM</p>
                </div>
              </div>

              {/* Center */}
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="flex items-center gap-0.5 md:gap-1">
                  <button onClick={() => setShuffle(s => !s)}
                    className={`p-1.5 rounded ${shuffle ? 'text-yellow-500' : 'text-zinc-600 hover:text-zinc-400'}`}>
                    <Shuffle className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={prevTrack} className="p-1.5 text-zinc-400 hover:text-white">
                    <SkipBack className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <motion.button
                    onClick={() => setIsPlaying(p => !p)} whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black flex items-center justify-center shadow-lg shadow-yellow-500/20">
                    {isPlaying ? <Pause className="w-4 h-4 md:w-5 md:h-5" /> : <Play className="w-4 h-4 md:w-5 md:h-5 ml-0.5" />}
                  </motion.button>
                  <button onClick={nextTrack} className="p-1.5 text-zinc-400 hover:text-white">
                    <SkipForward className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button onClick={() => setRepeat(r => (r + 1) % 3)}
                    className={`p-1.5 rounded ${repeat > 0 ? 'text-yellow-500' : 'text-zinc-600 hover:text-zinc-400'}`}>
                    {repeat === 2 ? <Repeat1 className="w-3.5 h-3.5" /> : <Repeat className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {/* Time + seek */}
                <div className="hidden md:flex items-center gap-2 w-full max-w-xs">
                  <span className="text-zinc-600 text-xs font-mono w-8 text-right">{fmt(elapsed)}</span>
                  <div className="flex-1 h-1 bg-zinc-700 rounded-full cursor-pointer group/seek"
                    onClick={e => {
                      const r = e.currentTarget.getBoundingClientRect();
                      seek(((e.clientX - r.left) / r.width) * 100);
                    }}>
                    <div className="h-full bg-zinc-400 group-hover/seek:bg-yellow-500 rounded-full transition-colors" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-zinc-600 text-xs font-mono w-8">{fmt(duration)}</span>
                </div>
              </div>

              {/* Right */}
              <div className="hidden sm:flex items-center gap-1 md:gap-2 shrink-0">
                <button onClick={() => setIsMuted(m => !m)} className="p-1.5 text-zinc-400 hover:text-white">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <div className="w-16 md:w-20 hidden md:block">
                  <Slider value={isMuted ? [0] : volume} onValueChange={setVolume} max={100} step={1} />
                </div>
                <button onClick={() => setShowList(s => !s)}
                  className={`p-1.5 rounded ${showList ? 'text-yellow-500' : 'text-zinc-500 hover:text-white'}`}>
                  <ListMusic className="w-4 h-4" />
                </button>
                <button onClick={onToggleMinimize} className="p-1.5 text-zinc-600 hover:text-white">
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}