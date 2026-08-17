import React from 'react';
import { motion } from 'framer-motion';
import { Image, Heart } from 'lucide-react';

const GALLERY_POSTS = [
  {
    id: 'gal-1',
    title: 'Moneda al Aire Cover Art',
    artist: 'Monteking 13-11',
    image: 'MONEDA AL AIRE ALBUM COVER FRONT.png',
    fallback: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    likes: 342,
  },
  {
    id: 'gal-2',
    title: 'Monteking Studio Setup (Monterrey, MX)',
    artist: 'Monteking Official',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
    likes: 512,
  },
  {
    id: 'gal-3',
    title: 'Trap Memphis Artwork Concept',
    artist: 'Monteking Design',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    likes: 289,
  },
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-obsidian-dark pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-gold uppercase mb-2 block">
            VISUALES & COMUNIDAD
          </span>
          <h1 className="font-cinzel font-black text-4xl sm:text-6xl text-white">
            GALERÍA <span className="text-gold-gradient">IMPERIAL</span>
          </h1>
          <p className="text-sm text-gray-400 mt-3 max-w-xl mx-auto">
            Arte visual, portadas de álbumes y fotografía exclusiva del estudio y presentaciones de Monteking.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GALLERY_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="glass-card rounded-3xl overflow-hidden border border-gold/20 hover:border-gold/60 glass-card-hover group"
            >
              <div className="relative aspect-square overflow-hidden bg-obsidian-dark">
                <img
                  src={post.image}
                  alt={post.title}
                  onError={(e) => { e.target.src = post.fallback; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-cinzel font-bold text-base text-white group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                  <span className="text-xs text-gray-400">{post.artist}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-ruby font-mono bg-ruby/10 px-3 py-1 rounded-full border border-ruby/20">
                  <Heart className="w-3.5 h-3.5 fill-ruby" />
                  <span>{post.likes}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
