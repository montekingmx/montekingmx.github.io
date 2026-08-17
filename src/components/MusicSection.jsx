import React from 'react';
import { motion } from 'framer-motion';
import { Music2, ExternalLink, Play, Disc, Sparkles } from 'lucide-react';

const RELEASES = [
  {
    id: 'release-1',
    title: 'Moneda al Aire (Álbum)',
    type: 'Álbum Completo',
    year: '2025',
    cover: 'MONEDA AL AIRE ALBUM COVER FRONT.png',
    fallbackCover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    spotifyUrl: 'https://open.spotify.com/artist/monteking',
    tracksCount: '12 Tracks',
  },
  {
    id: 'release-2',
    title: 'Mala o Buena Época',
    type: 'Sencillo Oficial',
    year: '2026',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    spotifyUrl: 'https://open.spotify.com/artist/monteking',
    tracksCount: 'Single',
  },
  {
    id: 'release-3',
    title: 'Trap Memphis Vol. 1',
    type: 'EP / Mixtape',
    year: '2025',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    spotifyUrl: 'https://open.spotify.com/artist/monteking',
    tracksCount: '6 Beats',
  },
];

export function MusicSection() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-gold uppercase mb-2">
            DISCOGRAFÍA OFICIAL
          </span>
          <h2 className="font-cinzel font-black text-3xl sm:text-5xl text-white">
            MÚSICA & <span className="text-gold-gradient">LANZAMIENTOS</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent my-4" />
        </div>

        {/* Releases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RELEASES.map((rel, idx) => (
            <motion.div
              key={rel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-card rounded-3xl overflow-hidden border border-gold/20 hover:border-gold/60 glass-card-hover group"
            >
              <div className="relative aspect-square overflow-hidden bg-obsidian-dark">
                <img
                  src={rel.cover}
                  alt={rel.title}
                  onError={(e) => { e.target.src = rel.fallbackCover; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-obsidian-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <a
                    href={rel.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-obsidian-dark font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-transform"
                  >
                    <Music2 className="w-4 h-4" />
                    <span>Escuchar en Spotify</span>
                  </a>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30">
                    {rel.type}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">{rel.year} • {rel.tracksCount}</span>
                </div>

                <h3 className="font-cinzel font-bold text-lg text-white group-hover:text-gold transition-colors">
                  {rel.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
