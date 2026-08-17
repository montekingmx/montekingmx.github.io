import React from 'react';
import { motion } from 'framer-motion';
import { Users, Crown, Instagram, Music2, Youtube } from 'lucide-react';

const TEAM = [
  {
    name: 'Monteking',
    role: 'Lead Producer & Artist',
    bio: 'Fundador y cerebro musical detrás del catálogo y sonido distintivo de Monteking Records.',
    instagram: 'monteking.mx',
    isFounder: true,
  },
  {
    name: 'Casila OG',
    role: 'Co-Productor & Visual Director',
    bio: 'Dirección creativa visual, concepto de arte y producción asociada.',
    instagram: 'casilaog',
    isFounder: false,
  },
  {
    name: 'Monteking Records',
    role: 'Sello Discográfico',
    bio: 'Colectivo independiente impulsando la música urbana de Monterrey.',
    instagram: 'monteking.records',
    isFounder: false,
  },
];

export default function Team() {
  return (
    <div className="min-h-screen bg-obsidian-dark pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-gold uppercase mb-2 block">
            EL COLECTIVO
          </span>
          <h1 className="font-cinzel font-black text-4xl sm:text-6xl text-white">
            LA BANDA & <span className="text-gold-gradient">EQUIPO</span>
          </h1>
          <p className="text-sm text-gray-400 mt-3 max-w-xl mx-auto">
            Las mentes detrás de la producción, visión creativa e ingeniería de Monteking Mx.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="glass-card rounded-3xl p-8 border border-gold/20 hover:border-gold/60 glass-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gold/15 text-gold flex items-center justify-center border border-gold/30">
                    <Crown className="w-7 h-7 text-gold" />
                  </div>
                  {member.isFounder && (
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-gold text-obsidian-dark uppercase tracking-wider">
                      FUNDADOR
                    </span>
                  )}
                </div>

                <h3 className="font-cinzel font-bold text-2xl text-white">
                  {member.name}
                </h3>
                <span className="text-xs text-gold font-mono font-bold block mb-3">
                  {member.role}
                </span>

                <p className="text-xs text-gray-300 leading-relaxed mb-6">
                  {member.bio}
                </p>
              </div>

              <a
                href={`https://instagram.com/${member.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-gold transition-colors pt-4 border-t border-gold/15"
              >
                <Instagram className="w-4 h-4 text-gold" />
                <span>@{member.instagram}</span>
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
