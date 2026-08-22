import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ExternalLink, Music, Disc3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useAudio } from '@/context/AudioContext';
import { CASILA_ALBUM } from '@/data/musicData';

export default function FeaturedAlbum() {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useAudio();

  const handlePlaySong = (track) => {
    const formatted = {
      id: `music-${track.id}`,
      title: track.title,
      artist: track.artist || "Casila OG",
      album: CASILA_ALBUM.title,
      url: track.audioUrl || track.url,
      cover: CASILA_ALBUM.cover,
      bpm: 120
    };

    if (currentTrack?.id === formatted.id) {
      togglePlayPause();
    } else {
      playTrack(formatted);
    }
  };

  const isAlbumPlaying = isPlaying && currentTrack?.album === CASILA_ALBUM.title;

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Disc3 className="w-3.5 h-3.5 animate-spin" /> DISCOGRAFÍA OFICIAL
          </div>
          <h2 className="font-pirata text-4xl sm:text-6xl text-white tracking-wider">
            MONEDA AL AIRE — <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-yellow-500">CASILA OG</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            14 tracks inéditos de trap, boom bap clásico y ritmos suabes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Album Cover 3D Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-yellow-500/30 bg-black">
              <img
                src={CASILA_ALBUM.cover}
                alt={CASILA_ALBUM.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  onClick={() => handlePlaySong(CASILA_ALBUM.tracks[0])}
                  className="w-20 h-20 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black shadow-2xl flex items-center justify-center"
                >
                  {isAlbumPlaying ? (
                    <Pause className="w-8 h-8 fill-current" />
                  ) : (
                    <Play className="w-8 h-8 fill-current ml-1" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Tracklist & Controls */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-black/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-zinc-800 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <Music className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-bold font-oswald text-white uppercase tracking-wide">
                  Tracklist del Álbum
                </h3>
              </div>
              <span className="text-zinc-500 font-mono text-xs">
                {CASILA_ALBUM.tracks.length} tracks · {CASILA_ALBUM.totalDuration}
              </span>
            </div>

            {/* Scrollable Tracklist with Direct Audio Playback */}
            <div className="space-y-1.5 max-h-[360px] overflow-y-auto custom-scrollbar pr-2">
              {CASILA_ALBUM.tracks.map((track, index) => {
                const isThisPlaying = isPlaying && currentTrack?.title === track.title;
                return (
                  <div
                    key={track.id}
                    onClick={() => handlePlaySong(track)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                      isThisPlaying
                        ? 'bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 font-bold'
                        : 'hover:bg-zinc-900/80 text-zinc-300 hover:text-white'
                    }`}
                  >
                    <span className="text-zinc-500 font-mono text-xs w-6 text-center">
                      {isThisPlaying ? '▶' : String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm truncate flex-1 font-sans">
                      {track.title}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      {track.duration}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-wrap gap-3">
              <Button
                onClick={() => handlePlaySong(CASILA_ALBUM.tracks[0])}
                className="flex-1 py-5 bg-gradient-to-r from-amber-400 via-yellow-300 to-yellow-500 hover:from-yellow-400 hover:to-yellow-600 text-black font-black text-xs font-oswald tracking-widest uppercase rounded-xl shadow-lg"
              >
                <Play className="w-4 h-4 mr-2 fill-current" />
                {isAlbumPlaying ? "Pausar Álbum" : "Reproducir Álbum"}
              </Button>
              <Link to={createPageUrl('Music')}>
                <Button variant="outline" className="border-zinc-700 hover:border-yellow-400 text-zinc-300 hover:text-yellow-400 py-5 rounded-xl text-xs font-bold font-mono">
                  Ver Todo <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}