import React from 'react';
import { motion } from 'framer-motion';
import { Crown, ShoppingBag, Gamepad2, ArrowRight, Sparkles, BookOpen, Music2, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const LINKS = [
  {
    icon: Crown,
    title: "Beats & Catálogo",
    description: "Instrumentales profesionales en WAV, Stems y Exclusiva",
    href: "Beats",
    metallicGradient: "from-amber-400/90 via-yellow-200 to-yellow-600/90",
    metalBorder: "border-yellow-400/60 shadow-[0_0_20px_rgba(255,215,0,0.25)]",
    badge: "CATÁLOGO 13-11"
  },
  {
    icon: Music2,
    title: "Álbum & Discografía",
    description: "Escucha 'Moneda Al Aire' de Casila OG sin suscripción",
    href: "Music",
    metallicGradient: "from-zinc-300 via-slate-100 to-zinc-500",
    metalBorder: "border-zinc-300/60 shadow-[0_0_20px_rgba(255,255,255,0.15)]",
    badge: "MONEDA AL AIRE"
  },
  {
    icon: ShoppingBag,
    title: "Merch Oficial",
    description: "Streetwear pesado: Hoodies, gorras bordadas 3D y mochilas",
    href: "Merch",
    metallicGradient: "from-amber-500/90 via-yellow-300 to-amber-700/90",
    metalBorder: "border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.25)]",
    badge: "DROPSHIPPING"
  },
  {
    icon: Sparkles,
    title: "Lyric Clips ✨",
    description: "Generador de videoclips virales con líricas y efectos visuales",
    href: "LyricVideo",
    metallicGradient: "from-purple-300 via-pink-100 to-purple-600",
    metalBorder: "border-purple-400/60 shadow-[0_0_20px_rgba(192,132,252,0.25)]",
    badge: "IA GENERATOR"
  },
  {
    icon: Headphones,
    title: "Servicios de Estudio",
    description: "Grabación, mezcla y mastering a -8 LUFS en Monterrey",
    href: "Services",
    metallicGradient: "from-cyan-300 via-teal-100 to-cyan-600",
    metalBorder: "border-cyan-400/60 shadow-[0_0_20px_rgba(34,211,238,0.25)]",
    badge: "ESTUDIO MONTERREY"
  },
  {
    icon: Gamepad2,
    title: "Arcade & Sound Lab",
    description: "Beat Maker en tiempo real, piano analógico y juegos 13-11",
    href: "Game",
    metallicGradient: "from-emerald-300 via-green-100 to-emerald-600",
    metalBorder: "border-emerald-400/60 shadow-[0_0_20px_rgba(52,211,153,0.25)]",
    badge: "100% INTERACTIVO"
  }
];

export default function QuickLinks() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-yellow-400 uppercase tracking-[0.3em] text-xs font-bold font-mono">
            Ecosistema Oficial
          </span>
          <h2 className="font-pirata text-4xl sm:text-6xl text-white mt-3 tracking-wider">
            EXPLORA EL MUNDO <span className="text-stroke-gold">MONTEKING</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Música, instrumentales exclusivas, moda urbana y experiencias interactivas nacidas en Monterrey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LINKS.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <Link to={createPageUrl(link.href)} className="block h-full group">
                <div className={`relative h-full bg-gradient-to-b from-zinc-900/90 to-black rounded-3xl p-7 border-2 ${link.metalBorder} backdrop-blur-xl transition-all duration-500 overflow-hidden flex flex-col justify-between`}>
                  
                  {/* Metallic Brushed Texture Sheen */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity" />
                  
                  <div>
                    {/* Top row: Metallic Icon & Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${link.metallicGradient} p-0.5 shadow-xl group-hover:rotate-6 transition-transform duration-300`}>
                        <div className="w-full h-full bg-black/80 rounded-[14px] flex items-center justify-center">
                          <link.icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full bg-black/80 border border-white/10 text-zinc-300">
                        {link.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-2 font-oswald tracking-wide group-hover:text-yellow-400 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                      {link.description}
                    </p>
                  </div>

                  {/* Metallic Action Button */}
                  <div className={`mt-auto pt-4 border-t border-white/10 flex items-center justify-between`}>
                    <span className={`text-xs font-black font-oswald tracking-widest uppercase bg-gradient-to-r ${link.metallicGradient} bg-clip-text text-transparent`}>
                      Acceder Ahora
                    </span>
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-r ${link.metallicGradient} p-0.5 text-black shadow-lg group-hover:scale-110 transition-transform`}>
                      <div className="w-full h-full bg-black hover:bg-transparent rounded-full flex items-center justify-center text-white hover:text-black transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}