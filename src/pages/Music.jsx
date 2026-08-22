import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Heart, ExternalLink, Clock, Disc3, Youtube, Music2, Radio, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAudio } from '@/context/AudioContext';
import { CASILA_ALBUM, CASILA_SINGLES_VAULT, MONTEKING_HITS } from '@/data/musicData';

export default function MusicPage() {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useAudio();
  const [liked, setLiked] = useState({});
  const [hoveredTrack, setHoveredTrack] = useState(null);

  const toggleLike = (id) => setLiked(prev => ({ ...prev, [id]: !prev[id] }));

  const handlePlayTrack = (track) => {
    const formatted = {
      id: `music-${track.id}`,
      title: track.title,
      artist: track.artist || "Casila OG",
      album: track.album || CASILA_ALBUM.title,
      url: track.audioUrl || track.url || "",
      cover: track.cover || CASILA_ALBUM.cover,
      bpm: 120
    };

    if (currentTrack?.id === formatted.id) {
      togglePlayPause();
    } else {
      playTrack(formatted);
    }
  };

  const isTrackPlaying = (track) =>
    isPlaying && currentTrack?.id === `music-${track.id}`;

  return (
    <div className="min-h-screen pt-24 pb-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> REPRODUCTOR COMPLETO SIN LÍMITES
          </div>
          <h1 className="font-pirata text-5xl sm:text-7xl text-white tracking-wider">
            DISCOGRAFÍA <span className="text-stroke-gold">OFICIAL</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mt-3 font-sans">
            Escucha el álbum completo 'Moneda Al Aire', sencillos oficiales y producciones exclusivas masterizadas a -8 LUFS.
          </p>
        </motion.div>

        {/* ── Album Header Card ── */}
        <motion.section
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-zinc-950 via-black to-zinc-950 rounded-3xl p-6 sm:p-10 border border-zinc-800 mb-12 overflow-hidden shadow-2xl"
        >
          <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-yellow-500/10 blur-3xl pointer-events-none" />

          <div className="relative grid sm:grid-cols-[auto_1fr] gap-8 items-center">
            {/* Album Art */}
            <div className="flex-shrink-0">
              <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-2xl border border-zinc-700/60">
                <img
                  src={CASILA_ALBUM.cover}
                  alt={CASILA_ALBUM.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Album Metadata */}
            <div>
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1 font-mono">Álbum Debut Oficial · {CASILA_ALBUM.year}</p>
              <h2 className="font-pirata text-4xl sm:text-5xl text-white mb-1">{CASILA_ALBUM.title}</h2>
              <p className="text-yellow-400 font-bold font-oswald text-lg tracking-wide mb-2">{CASILA_ALBUM.artist}</p>
              <p className="text-zinc-500 text-xs mb-4">
                {CASILA_ALBUM.tracks.length} canciones · {CASILA_ALBUM.totalDuration} · {CASILA_ALBUM.genre}
              </p>

              {/* Streaming CTA Buttons */}
              <div className="flex flex-wrap gap-2">
                <a href={CASILA_ALBUM.spotifyUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="bg-[#1DB954] hover:bg-[#1aa34a] text-black font-bold text-xs rounded-full px-4 gap-1.5">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Spotify
                  </Button>
                </a>
                <a href={CASILA_ALBUM.youtubeUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-full px-4 gap-1.5">
                    <Youtube className="w-3.5 h-3.5" /> YouTube
                  </Button>
                </a>
                {CASILA_ALBUM.appleMusicUrl && (
                  <a href={CASILA_ALBUM.appleMusicUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="border-zinc-700 text-zinc-300 hover:border-zinc-500 text-xs rounded-full px-4 gap-1.5">
                      <Music2 className="w-3.5 h-3.5" /> Apple Music
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Album Tracklist ── */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-black font-oswald text-xl uppercase tracking-wide">
              Tracklist Oficial: Moneda Al Aire (14 Tracks)
            </h3>
            <span className="text-zinc-500 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 inline-block mr-1" />{CASILA_ALBUM.totalDuration}
            </span>
          </div>

          <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-zinc-800 overflow-hidden divide-y divide-zinc-900 shadow-2xl">
            {CASILA_ALBUM.tracks.map((track, idx) => {
              const playing = isTrackPlaying(track);
              return (
                <div
                  key={track.id}
                  onMouseEnter={() => setHoveredTrack(track.id)}
                  onMouseLeave={() => setHoveredTrack(null)}
                  onClick={() => handlePlayTrack(track)}
                  className={`flex items-center justify-between px-4 sm:px-6 py-3.5 cursor-pointer group transition-all ${
                    playing ? 'bg-yellow-500/15 border-l-4 border-yellow-400' : 'hover:bg-zinc-900/70'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-7 text-center shrink-0">
                      {playing ? (
                        <Disc3 className="w-4 h-4 text-yellow-400 animate-spin mx-auto" />
                      ) : hoveredTrack === track.id ? (
                        <Play className="w-4 h-4 text-white mx-auto fill-current" />
                      ) : (
                        <span className="text-xs font-mono text-zinc-500">{String(idx + 1).padStart(2, '0')}</span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className={`text-sm font-bold truncate ${playing ? 'text-yellow-400' : 'text-white group-hover:text-yellow-400 transition-colors'}`}>
                        {track.title}
                        {track.isBonus && (
                          <span className="ml-2 text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded-full font-mono">BONUS</span>
                        )}
                      </p>
                      <p className="text-zinc-500 text-xs">{CASILA_ALBUM.artist}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleLike(track.id); }}
                      className={`opacity-0 group-hover:opacity-100 transition-opacity ${liked[track.id] ? 'opacity-100' : ''}`}
                    >
                      <Heart className={`w-4 h-4 ${liked[track.id] ? 'fill-red-500 text-red-500' : 'text-zinc-500 hover:text-red-400'}`} />
                    </button>
                    <span className="text-xs font-mono text-zinc-500">{track.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Bóveda de Sencillos & Inéditos de Casila OG (Item 12) ── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 rounded-full bg-amber-400" />
            <h3 className="text-white font-black font-oswald text-xl uppercase tracking-wide">
              Sencillos Oficiales & Inéditos de Casila OG
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CASILA_SINGLES_VAULT.map((single, idx) => {
              const playing = isPlaying && currentTrack?.id === `music-${single.id}`;
              return (
                <motion.div
                  key={single.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  onClick={() => handlePlayTrack(single)}
                  className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border transition-all group ${
                    playing
                      ? 'bg-yellow-500/15 border-yellow-400 shadow-lg shadow-yellow-500/20'
                      : 'bg-zinc-950/80 border-zinc-800 hover:border-yellow-500/40 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800">
                    <img src={single.cover} alt={single.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    {playing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Pause className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`font-bold text-sm truncate ${playing ? 'text-yellow-400' : 'text-white group-hover:text-yellow-400 transition-colors'}`}>
                      {single.title}
                    </p>
                    <p className="text-zinc-400 text-xs">{single.artist}</p>
                    <span className="text-[10px] font-mono text-zinc-500">{single.year} • {single.duration}</span>
                  </div>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    playing
                      ? 'border-yellow-400 bg-yellow-400 text-black'
                      : 'border-zinc-700 text-zinc-400 group-hover:border-yellow-400 group-hover:text-yellow-400'
                  }`}>
                    {playing ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── Monteking Top Hits ── */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 rounded-full bg-yellow-500" />
            <h3 className="text-white font-black font-oswald text-xl uppercase tracking-wide">Top Producciones Monteking Records</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MONTEKING_HITS.map((hit, idx) => {
              const playing = isPlaying && currentTrack?.id === `music-${hit.id}`;
              return (
                <motion.div
                  key={hit.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  onClick={() => handlePlayTrack(hit)}
                  className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer border transition-all group ${
                    playing
                      ? 'bg-yellow-500/10 border-yellow-500/40'
                      : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-900 shrink-0">
                    <img src={hit.cover || 'assets/cover_trap.jpg'} alt={hit.title} className="w-full h-full object-cover" />
                    {playing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Pause className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`font-bold text-sm truncate ${playing ? 'text-yellow-400' : 'text-white group-hover:text-yellow-400 transition-colors'}`}>
                      {hit.title}
                    </p>
                    <p className="text-zinc-400 text-xs">{hit.artist}</p>
                    <p className="text-zinc-600 text-[10px] font-mono">{hit.duration}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    playing
                      ? 'border-yellow-400 bg-yellow-500/20 text-yellow-400'
                      : 'border-zinc-700 text-zinc-500 group-hover:border-yellow-400 group-hover:text-yellow-400'
                  }`}>
                    {playing ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}