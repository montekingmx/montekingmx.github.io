import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, Sparkles, ExternalLink } from 'lucide-react';

const CARDS = [
  {
    front: { label: 'Casila OG', role: 'Artista · Productor', emoji: '🎤', color: 'from-amber-500 via-yellow-400 to-amber-700' },
    back: {
      bio: 'Autor principal de "Moneda Al Aire". Su estilo fusiona trap, boom bap y melodías cinematográficas. Líder creativo de Monteking Records.',
      stats: [{ k: 'Álbumes', v: '3+' }, { k: 'BPM avg', v: '120' }, { k: 'Años', v: '7+' }],
      ig: `${createPageUrl('ArtistProfile')}?artist=casila-og`,
      igLabel: 'Ver Perfil Oficial',
      isInternal: true,
    }
  },
  {
    front: { label: 'Monteking Records', role: 'Sello · 13-11', emoji: '👑', color: 'from-zinc-400 via-slate-100 to-zinc-600' },
    back: {
      bio: 'Sello independiente de Monterrey, NL. Producción, mezcla, mastering a -8 LUFS y distribución propia.',
      stats: [{ k: 'Beats', v: '80+' }, { k: 'Géneros', v: '4' }, { k: 'Ciudad', v: 'MTY' }],
      ig: 'https://www.instagram.com/monteking.mx',
      igLabel: 'Instagram MK',
      isInternal: false,
    }
  },
  {
    front: { label: 'TRAP-MEMPH', role: 'Colección · 18 Beats', emoji: '🔥', color: 'from-red-600 via-orange-500 to-amber-600' },
    back: {
      bio: 'Trap pesado con influencias de Memphis, Houston y Detroit. Drums contundentes y melodías oscuras.',
      stats: [{ k: 'Beats', v: '18' }, { k: 'BPM', v: '106–135' }, { k: 'Mood', v: 'Dark' }],
      ig: `${createPageUrl('Beats')}?genre=TRAP-MEMPH`,
      igLabel: 'Oír Colección',
      isInternal: true,
    }
  },
  {
    front: { label: 'BOOMBAP', role: 'Colección · 30+ Beats', emoji: '💥', color: 'from-yellow-400 via-amber-300 to-yellow-600' },
    back: {
      bio: 'Boom bap clásico redefinido. Samplers vinilo, drums crudos y patrones de los 90s con sonido masterizado.',
      stats: [{ k: 'Beats', v: '30+' }, { k: 'BPM', v: '75–155' }, { k: 'Mood', v: 'Clásico' }],
      ig: `${createPageUrl('Beats')}?genre=BOOMBAP`,
      igLabel: 'Oír Colección',
      isInternal: true,
    }
  },
  {
    front: { label: 'SUAVE', role: 'Colección · R&B/LoFi', emoji: '🌙', color: 'from-fuchsia-500 via-pink-400 to-purple-700' },
    back: {
      bio: 'Beats suaves para proyectos melódicos. LoFi, R&B y trap con atmósferas nocturnas y cálidas.',
      stats: [{ k: 'Beats', v: '5' }, { k: 'BPM', v: '60–148' }, { k: 'Mood', v: 'Chill' }],
      ig: `${createPageUrl('Beats')}?genre=SUAVE`,
      igLabel: 'Oír Colección',
      isInternal: true,
    }
  },
  {
    front: { label: 'TECHNO.MK', role: 'Colección · Electro', emoji: '⚡', color: 'from-cyan-400 via-teal-300 to-emerald-600' },
    back: {
      bio: 'Fusión única de techno underground con el ADN rítmico de Monteking para clubs y escenarios.',
      stats: [{ k: 'Beats', v: '4' }, { k: 'BPM', v: '103–121' }, { k: 'Mood', v: 'Intenso' }],
      ig: `${createPageUrl('Beats')}?genre=TECHNO.%20MK`,
      igLabel: 'Oír Colección',
      isInternal: true,
    }
  },
];

function FlipCard({ card }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ perspective: 1200, height: 250 }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-b from-zinc-900/90 to-black p-5 border-2 border-yellow-500/30 flex flex-col items-center justify-between shadow-2xl backdrop-blur-xl group overflow-hidden`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Metallic Sheen Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none opacity-40" />

          {/* Top Emoji Badge */}
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.front.color} p-0.5 shadow-xl mt-2`}>
            <div className="w-full h-full bg-black/80 rounded-[14px] flex items-center justify-center text-3xl">
              {card.front.emoji}
            </div>
          </div>

          <div className="text-center my-auto">
            <p className="text-white font-bold font-oswald text-lg tracking-wide uppercase">{card.front.label}</p>
            <p className="text-yellow-400/80 font-mono text-[11px] mt-0.5">{card.front.role}</p>
          </div>

          <div className="w-full pt-2 border-t border-white/10 text-center">
            <span className="text-zinc-400 text-[10px] font-mono tracking-wider uppercase">Toca para voltear ↻</span>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-3xl bg-gradient-to-b from-zinc-900 to-black border-2 border-yellow-400/60 flex flex-col justify-between p-4 shadow-2xl backdrop-blur-xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-zinc-300 text-[11px] leading-relaxed line-clamp-3">{card.back.bio}</p>
          
          <div className="grid grid-cols-3 gap-1 bg-black/60 rounded-xl p-2 border border-white/5 my-1">
            {card.back.stats.map(s => (
              <div key={s.k} className="text-center">
                <p className="text-yellow-400 font-bold font-mono text-xs">{s.v}</p>
                <p className="text-zinc-500 text-[9px] uppercase tracking-wider">{s.k}</p>
              </div>
            ))}
          </div>

          {/* High-End Metallic Action Button */}
          {card.back.isInternal ? (
            <Link
              to={card.back.ig}
              onClick={e => e.stopPropagation()}
              className="relative group/btn overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-yellow-600 p-[1px] shadow-lg transition-transform active:scale-95 block text-center"
            >
              <div className="bg-black/90 group-hover/btn:bg-transparent transition-colors py-2 px-3 rounded-[11px] flex items-center justify-center gap-1.5">
                <span className="text-[11px] font-black font-oswald tracking-wider uppercase text-yellow-300 group-hover/btn:text-black transition-colors">
                  {card.back.igLabel}
                </span>
                <ArrowRight className="w-3 h-3 text-yellow-300 group-hover/btn:text-black transition-colors" />
              </div>
            </Link>
          ) : (
            <a
              href={card.back.ig}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="relative group/btn overflow-hidden rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-yellow-600 p-[1px] shadow-lg transition-transform active:scale-95 block text-center"
            >
              <div className="bg-black/90 group-hover/btn:bg-transparent transition-colors py-2 px-3 rounded-[11px] flex items-center justify-center gap-1.5">
                <span className="text-[11px] font-black font-oswald tracking-wider uppercase text-yellow-300 group-hover/btn:text-black transition-colors">
                  {card.back.igLabel}
                </span>
                <ExternalLink className="w-3 h-3 text-yellow-300 group-hover/btn:text-black transition-colors" />
              </div>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function FlipCards() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-yellow-400 uppercase tracking-[0.3em] text-xs font-bold font-mono">
            Universo Monteking 13-11
          </span>
          <h2 className="font-pirata text-4xl sm:text-6xl text-white mt-3 tracking-wider">
            EXPLORA EL MUNDO <span className="text-stroke-gold">MK</span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-2">
            Toca o haz click en cada tarjeta interactiva para descubrir estadísticas y colecciones completas.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <FlipCard card={card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}