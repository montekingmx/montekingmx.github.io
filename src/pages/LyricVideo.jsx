import React from 'react';
import { motion } from 'framer-motion';
import { Music2, Play, Sparkles, Film } from 'lucide-react';

const LYRIC_CLIPS = [
  {
    id: 'lyric-1',
    title: 'Moneda al Aire (Official Lyric Clip)',
    artist: 'Monteking',
    duration: '2:45',
    cover: 'MONEDA AL AIRE ALBUM COVER FRONT.png',
    fallbackCover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    quote: '"Lanzando la moneda al aire sin mirar atrás, el sonido de Monterrey sonando en la ciudad..."',
  },
  {
    id: 'lyric-2',
    title: 'Mala o Buena Época (Visualizer)',
    artist: 'Monteking',
    duration: '3:12',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    quote: '"Buena o mala época, la rima se mantiene firme desde el 13-11..."',
  },
  {
    id: 'lyric-3',
    title: 'Violín Negro (Beat Lyric Cut)',
    artist: 'Monteking',
    duration: '2:30',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    quote: '"Cuerdas oscuras, bombos pesados, el trap de Memphis reinterpretado..."',
  },
];

export default function LyricVideo() {
  return (
    <div className="min-h-screen bg-obsidian-dark pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-gold uppercase mb-2 block">
            VISUALES & LETRAS
          </span>
          <h1 className="font-cinzel font-black text-4xl sm:text-6xl text-white">
            LYRIC <span className="text-gold-gradient">CLIPS</span>
          </h1>
          <p className="text-sm text-gray-400 mt-3 max-w-xl mx-auto">
            Disfruta de las letras sincronizadas y clips visuales conceptuales de las canciones de Monteking.
          </p>
        </div>

        {/* Lyric Clips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LYRIC_CLIPS.map((clip, idx) => (
            <motion.div
              key={clip.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="glass-card rounded-3xl overflow-hidden border border-gold/20 hover:border-gold/60 glass-card-hover group"
            >
              <div className="relative aspect-video overflow-hidden bg-obsidian-dark">
                <img
                  src={clip.cover}
                  alt={clip.title}
                  onError={(e) => { e.target.src = clip.fallbackCover; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-obsidian-dark/50 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gold text-obsidian-dark flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-obsidian-dark ml-1" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono bg-obsidian-dark/80 text-gold border border-gold/30">
                  {clip.duration}
                </span>
              </div>

              <div className="p-6 flex flex-col gap-3">
                <h3 className="font-cinzel font-bold text-lg text-white group-hover:text-gold transition-colors">
                  {clip.title}
                </h3>
                <p className="text-xs text-gold/90 italic font-serif bg-gold/5 p-3 rounded-xl border border-gold/15">
                  {clip.quote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
