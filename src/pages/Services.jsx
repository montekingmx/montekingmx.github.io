import React from 'react';
import { motion } from 'framer-motion';
import { Sliders, Mic, Disc, Sparkles, Check, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';

const SERVICES = [
  {
    title: 'Producción Custom de Beats',
    price: '$199 USD',
    desc: 'Un instrumental diseñado desde cero exclusivamente a la medida de tu concepto vocal y estilo artístico.',
    features: ['Arreglo exclusivo', 'Pistas por separado (Stems)', 'Mezcla y Master incluidos', 'Sesión de revisión 1 a 1'],
    icon: Disc,
  },
  {
    title: 'Mezcla & Master de Canción',
    price: '$149 USD',
    desc: 'Tratamiento analógico y digital de tus voces sobre la pista para lograr potencia, nitidez y nivel de competencia comercial.',
    features: ['Afinación y edición de voz', 'Ecualización & compresión multi-banda', 'Efectos creativos (reverbs, delays, pitches)', 'Master para Spotify & Apple Music'],
    icon: Sliders,
  },
  {
    title: 'Grabación de Estudio (Monterrey NL)',
    price: '$45 USD / hr',
    desc: 'Sesión presencial de grabación en nuestro estudio en Monterrey con microfonía de condensador de alta gama y dirección vocal.',
    features: ['Directamente con Monteking', 'Monitoreo profesional', 'Cabina acoplada acústicamente', 'Entrega de archivos brutos'],
    icon: Mic,
  },
];

export default function Services() {
  const { generateWhatsAppLink } = useCart();

  const handleBookService = (service) => {
    const text = `¡Hola Monteking! Me interesa contratar el servicio de *${service.title}* (${service.price}).`;
    window.open(`https://wa.me/528100000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-obsidian-dark pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-gold uppercase mb-2 block">
            SERVICIOS DE ESTUDIO
          </span>
          <h1 className="font-cinzel font-black text-4xl sm:text-6xl text-white">
            SERVICIOS <span className="text-gold-gradient">PROFESIONALES</span>
          </h1>
          <p className="text-sm text-gray-400 mt-3 max-w-xl mx-auto">
            Lleva tu sonido al nivel de las grandes producciones. Servicios de producción a medida, mezcla y masterización desde Monterrey, MX.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="glass-card rounded-3xl p-8 border border-gold/20 hover:border-gold/60 glass-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-gold/10 text-gold border border-gold/30">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono font-bold text-xl text-gold-gradient">
                      {srv.price}
                    </span>
                  </div>

                  <h3 className="font-cinzel font-bold text-xl text-white mb-2">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed mb-6">
                    {srv.desc}
                  </p>

                  <div className="space-y-2 mb-8">
                    {srv.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-gray-300">
                        <Check className="w-4 h-4 text-gold shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleBookService(srv)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gold text-obsidian-dark font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Cotizar por WhatsApp</span>
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
