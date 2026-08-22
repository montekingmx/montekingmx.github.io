import React from 'react';
import { motion } from 'framer-motion';
import { Music, ShoppingBag, Gamepad2, Image, ArrowRight, Scissors, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const LINKS = [
  {
    icon: Music,
    title: "Beats",
    description: "Explora nuestra colección de instrumentales profesionales",
    href: "Beats",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: Scissors,
    title: "Lyric Clips ✨",
    description: "Convierte cualquier video en clips virales con lyrics IA",
    href: "LyricVideo",
    gradient: "from-pink-500 to-purple-600"
  },
  {
    icon: BookOpen,
    title: "Prod. Tips",
    description: "Guía de producción, mezcla y mastering profesional",
    href: "ProdInfo",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Gamepad2,
    title: "Juegos",
    description: "Beat Maker, Piano Virtual, Espectrograma y más",
    href: "Game",
    gradient: "from-green-500 to-teal-500"
  },
  {
    icon: ShoppingBag,
    title: "Merch",
    description: "Ropa y accesorios exclusivos de Monteking",
    href: "Merch",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Image,
    title: "Galería",
    description: "Comparte y explora fotos de la comunidad",
    href: "Gallery",
    gradient: "from-orange-500 to-red-500"
  }
];

export default function QuickLinks() {
  return (
    <section className="py-24 bg-gradient-to-b from-zinc-900 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">
            Explora
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            El Universo Monteking
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LINKS.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={createPageUrl(link.href)}>
                <div className="group relative h-full bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-500 overflow-hidden">
                  {/* Hover Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <link.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                    {link.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center text-yellow-500 text-sm font-medium opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                    Explorar
                    <ArrowRight className="w-4 h-4 ml-2" />
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