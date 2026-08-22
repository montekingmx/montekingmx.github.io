import React from 'react';
import { motion } from 'framer-motion';

export default function SpotifySection() {
  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">Escucha en Spotify</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">Toda la Música</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-yellow-500 font-bold mb-3 uppercase tracking-widest text-sm">Monteking</h3>
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/artist/6JkL5fiPkUG49eUzwKE5bW?utm_source=generator&theme=0"
              width="100%"
              height="380"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-yellow-500 font-bold mb-3 uppercase tracking-widest text-sm">Moneda Al Aire</h3>
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/album/0frbDayzrtuYO31vlzqZtb?utm_source=generator"
              width="100%"
              height="380"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}