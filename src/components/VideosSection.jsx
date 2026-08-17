import React from 'react';
import { motion } from 'framer-motion';
import { Video, Play, ExternalLink } from 'lucide-react';

const VIDEOS = [
  {
    id: 'vid-1',
    title: 'Mala o Buena Época (Video Oficial)',
    category: 'Video Musical',
    embedId: 'dQw4w9WgXcQ', // Default video embed ID
    cover: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop',
    youtubeUrl: 'https://youtube.com',
  },
  {
    id: 'vid-2',
    title: 'Monteking Studio Session (Monterrey MX)',
    category: 'Behind the Scenes',
    cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
    youtubeUrl: 'https://youtube.com',
  },
  {
    id: 'vid-3',
    title: 'Making of Moneda al Aire Beat',
    category: 'Beatmaking Vlog',
    cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop',
    youtubeUrl: 'https://youtube.com',
  },
];

export function VideosSection() {
  return (
    <section className="py-20 px-4 relative bg-obsidian-card/40">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-gold uppercase mb-2">
            EXPERIENCIA VISUAL
          </span>
          <h2 className="font-cinzel font-black text-3xl sm:text-5xl text-white">
            VIDEOS & <span className="text-gold-gradient">DOCUMENTALES</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent my-4" />
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VIDEOS.map((vid, idx) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-card rounded-3xl overflow-hidden border border-gold/20 hover:border-gold/60 glass-card-hover group"
            >
              <div className="relative aspect-video overflow-hidden bg-obsidian-dark">
                <img
                  src={vid.cover}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-obsidian-dark/40 group-hover:bg-obsidian-dark/60 transition-colors flex items-center justify-center">
                  <a
                    href={vid.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-ruby/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                  >
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </a>
                </div>

                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-obsidian-dark/80 text-gold border border-gold/30 backdrop-blur-md uppercase">
                  {vid.category}
                </span>
              </div>

              <div className="p-6 flex items-center justify-between">
                <h3 className="font-cinzel font-bold text-base text-white group-hover:text-gold transition-colors">
                  {vid.title}
                </h3>
                <Video className="w-5 h-5 text-gold shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
