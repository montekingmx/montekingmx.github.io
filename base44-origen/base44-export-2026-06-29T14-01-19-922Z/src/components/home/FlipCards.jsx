import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const CARDS = [
  {
    front: { label: 'Casila OG', role: 'Artista · Productor', emoji: '🎤', color: 'from-yellow-500 to-orange-600' },
    back: {
      bio: 'Autor principal de "Moneda Al Aire". Su estilo fusiona trap, boom bap y melodías cinematográficas. Líder creativo de Monteking Records desde 2017.',
      stats: [{ k: 'Álbumes', v: '3+' }, { k: 'BPM avg', v: '120' }, { k: 'Años', v: '7+' }],
      ig: `${createPageUrl('ArtistProfile')}?artist=casila-og`,
      igLabel: 'Ver Perfil →',
      isInternal: true,
    }
  },
  {
    front: { label: 'Monteking Records', role: 'Sello · 13-11', emoji: '👑', color: 'from-zinc-700 to-zinc-900' },
    back: {
      bio: 'Sello independiente de Monterrey, NL. Producción, mezcla, mastering y distribución propia. Movimiento cultural desde el underground.',
      stats: [{ k: 'Beats', v: '80+' }, { k: 'Géneros', v: '4' }, { k: 'Ciudad', v: 'MTY' }],
      ig: 'https://www.instagram.com/monteking.mx',
    }
  },
  {
    front: { label: 'TRAP-MEMPH', role: 'Colección · 18 Beats', emoji: '🔥', color: 'from-red-600 to-orange-500' },
    back: {
      bio: 'La colección más extensa. Trap pesado con influencias de Memphis, Houston y Detroit. Drums contundentes y melodías oscuras.',
      stats: [{ k: 'Beats', v: '18' }, { k: 'BPM', v: '106–135' }, { k: 'Mood', v: 'Dark' }],
      ig: 'https://montekingmx.github.io',
    }
  },
  {
    front: { label: 'BOOMBAP', role: 'Colección · 30+ Beats', emoji: '💥', color: 'from-blue-600 to-purple-700' },
    back: {
      bio: 'Boom bap clásico redefinido. Samplers vinilo, drums crudos y patrones que rinden homenaje al rap de los 90s con sonido actual.',
      stats: [{ k: 'Beats', v: '30+' }, { k: 'BPM', v: '75–155' }, { k: 'Mood', v: 'Clásico' }],
      ig: 'https://montekingmx.github.io',
    }
  },
  {
    front: { label: 'SUAVE', role: 'Colección · R&B/LoFi', emoji: '🌙', color: 'from-pink-600 to-purple-600' },
    back: {
      bio: 'Beats suaves para proyectos melódicos. LoFi, R&B y trap tumbado con atmósferas nocturnas perfectas para canciones de amor.',
      stats: [{ k: 'Beats', v: '5' }, { k: 'BPM', v: '60–148' }, { k: 'Mood', v: 'Chill' }],
      ig: 'https://montekingmx.github.io',
    }
  },
  {
    front: { label: 'TECHNO.MK', role: 'Colección · Electro', emoji: '⚡', color: 'from-green-500 to-teal-600' },
    back: {
      bio: 'Fusión única de techno underground con el ADN trap de Monteking. Beats para escenas alternativas y festivales.',
      stats: [{ k: 'Beats', v: '4' }, { k: 'BPM', v: '103–121' }, { k: 'Mood', v: 'Intenso' }],
      ig: 'https://montekingmx.github.io',
    }
  },
];

function FlipCard({ card }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      style={{ perspective: 1200, height: 220 }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.front.color} flex flex-col items-center justify-center gap-3 border border-white/10 shadow-2xl`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-5xl">{card.front.emoji}</span>
          <div className="text-center">
            <p className="text-white font-bold text-lg">{card.front.label}</p>
            <p className="text-white/60 text-xs">{card.front.role}</p>
          </div>
          <p className="text-white/40 text-xs absolute bottom-3">Toca para voltear</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl bg-zinc-900 border border-zinc-700 flex flex-col justify-between p-5 shadow-2xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-zinc-300 text-xs leading-relaxed">{card.back.bio}</p>
          <div className="flex gap-3 justify-around my-2">
            {card.back.stats.map(s => (
              <div key={s.k} className="text-center">
                <p className="text-yellow-500 font-bold text-base">{s.v}</p>
                <p className="text-zinc-500 text-xs">{s.k}</p>
              </div>
            ))}
          </div>
          {card.back.isInternal ? (
            <Link
              to={card.back.ig}
              onClick={e => e.stopPropagation()}
              className="text-center text-xs text-yellow-400 hover:text-yellow-300 border border-yellow-500/30 rounded-lg py-1.5 transition-colors hover:border-yellow-500/60 block"
            >
              {card.back.igLabel || 'Ver más →'}
            </Link>
          ) : (
            <a
              href={card.back.ig}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-center text-xs text-yellow-400 hover:text-yellow-300 border border-yellow-500/30 rounded-lg py-1.5 transition-colors hover:border-yellow-500/60 block"
            >
              Ver más →
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function FlipCards() {
  return (
    <section className="py-16 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-medium">Monteking Universe</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-2">Explora el Mundo MK</h2>
          <p className="text-zinc-500 text-sm">Toca las cards para descubrir más</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <FlipCard card={card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}