import React from 'react';
import { motion } from 'framer-motion';
import { Sliders, Volume2, Cpu, Sparkles, BookOpen } from 'lucide-react';

const TIPS = [
  {
    title: 'Mezcla de 808s y Bombos sin Saturación',
    category: 'MEZCLA & EQ',
    desc: 'Cómo aplicar ecualización sustractiva en los 30Hz - 60Hz y saturación armónica para que el 808 retumbe en bocinas de celular y sistemas de club.',
    icon: Volume2,
  },
  {
    title: 'Estampado de Tag Automático a 16 Barras',
    category: 'WORKFLOW & AUTOMATIZACIÓN',
    desc: 'El secreto matemático detrás de nuestro script de Python: cómo calcular la duración de barra exacta según el BPM para posicionar la firma de voz sin romper la métrica.',
    icon: Cpu,
  },
  {
    title: 'Diseño de Atmosferas Memphis & Trap',
    category: 'SOUND DESIGN',
    desc: 'Técnicas de pitching, compresión paralela y reverberación convolutiva para darle ese toque oscuro y cinematográfico característico de Monteking.',
    icon: Sliders,
  },
];

export default function ProdInfo() {
  return (
    <div className="min-h-screen bg-obsidian-dark pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-gold uppercase mb-2 block">
            CONOCIMIENTO DEL ESTUDIO
          </span>
          <h1 className="font-cinzel font-black text-4xl sm:text-6xl text-white">
            PROD. <span className="text-gold-gradient">TIPS & INFO</span>
          </h1>
          <p className="text-sm text-gray-400 mt-3 max-w-xl mx-auto">
            Secretos de producción, ingeniería de audio y flujos de trabajo compartidos por Monteking para la comunidad de productores.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIPS.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="glass-card rounded-3xl p-8 border border-gold/20 hover:border-gold/60 glass-card-hover flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-gold/10 text-gold border border-gold/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-gold/10 text-gold border border-gold/20">
                    {tip.category}
                  </span>
                </div>

                <h3 className="font-cinzel font-bold text-xl text-white">
                  {tip.title}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {tip.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
