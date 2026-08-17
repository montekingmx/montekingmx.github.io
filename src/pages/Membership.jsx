import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Check, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';

const TIERS = [
  {
    name: 'Silver Club',
    price: '$9.99 / mes',
    desc: 'Acceso anticipado a lanzamientos de beats y 15% de descuento en el catálogo.',
    features: ['1 Beat gratis al mes', 'Descuento del 15% en licencias', 'Acceso a la comunidad VIP'],
  },
  {
    name: 'Gold Imperial',
    price: '$24.99 / mes',
    popular: true,
    desc: 'Para artistas en constante lanzamiento que requieren beats y licencias ilimitadas.',
    features: ['3 Beats gratis al mes', 'Descuento del 30% en licencias', 'Acceso a stems de prueba', 'Soporte prioritario por WhatsApp'],
  },
  {
    name: 'Platinum VIP 13-11',
    price: '$49.99 / mes',
    exclusive: true,
    desc: 'Membresía total para sellos y productores de alto volumen.',
    features: ['Beats ilimitados en preview HQ', '50% de descuento en licencias exlusivas', 'Sesión mensual de revisión vocal', 'Merch gratis en suscripción anual'],
  },
];

export default function Membership() {
  const { generateWhatsAppLink } = useCart();

  const handleJoinMembership = (tier) => {
    const text = `¡Hola Monteking! Me interesa unirme a la membresía VIP *${tier.name}* (${tier.price}).`;
    window.open(`https://wa.me/528100000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-obsidian-dark pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-gold uppercase mb-2 block">
            ACCESO EXCLUSIVO
          </span>
          <h1 className="font-cinzel font-black text-4xl sm:text-6xl text-white">
            MEMBRESÍA <span className="text-gold-gradient">VIP 13-11</span>
          </h1>
          <p className="text-sm text-gray-400 mt-3 max-w-xl mx-auto">
            Únete al club exclusivo de artistas y productores de Monteking. Descuentos en catálogo, beats mensuales y contenido VIP.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className={`relative glass-card rounded-3xl p-8 border flex flex-col justify-between ${
                tier.popular ? 'border-gold shadow-gold-intense bg-gold/5' : 'border-gold/20 hover:border-gold/60'
              }`}
            >
              {tier.popular && (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold bg-gold text-obsidian-dark uppercase tracking-wider">
                  MÁS POPULAR
                </span>
              )}

              <div>
                <Crown className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-cinzel font-bold text-2xl text-white mb-1">{tier.name}</h3>
                <span className="font-mono font-bold text-2xl text-gold-gradient block mb-4">
                  {tier.price}
                </span>

                <p className="text-xs text-gray-300 leading-relaxed mb-6">
                  {tier.desc}
                </p>

                <div className="space-y-2 mb-8">
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-gray-300">
                      <Check className="w-4 h-4 text-gold shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleJoinMembership(tier)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gold text-obsidian-dark font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:brightness-110 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Unirme a {tier.name}</span>
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
