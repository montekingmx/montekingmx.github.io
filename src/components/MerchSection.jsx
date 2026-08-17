import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, ShoppingBag, Crown, Sparkles, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';

const MERCH_ITEMS = [
  {
    id: 'merch-1',
    name: 'Monteking Crown Hoodie (Black & Gold)',
    price: 65,
    tag: 'EDICIÓN LIMITADA',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'merch-2',
    name: 'Luxury Casino Oversized Tee',
    price: 38,
    tag: 'BEST SELLER',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: 'merch-3',
    name: 'Monterrey Empire Snapback Cap',
    price: 32,
    tag: 'NUEVO',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop',
    sizes: ['Ajustable'],
  },
];

export function MerchSection() {
  const { generateWhatsAppLink } = useCart();

  const handleOrderMerch = (item) => {
    const text = `Me interesa ordenar la prenda *${item.name}* ($${item.price} USD) de la colección Monteking Merch.`;
    window.open(`https://wa.me/528100000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-gold uppercase mb-2">
            STREETWEAR EXCLUSIVO
          </span>
          <h2 className="font-cinzel font-black text-3xl sm:text-5xl text-white">
            MONTEKING <span className="text-gold-gradient">MERCH</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent my-4" />
        </div>

        {/* Merch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MERCH_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="glass-card rounded-3xl overflow-hidden border border-gold/20 hover:border-gold/60 glass-card-hover group"
            >
              <div className="relative aspect-square overflow-hidden bg-obsidian-dark">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-gold text-obsidian-dark uppercase tracking-wider">
                  {item.tag}
                </span>
              </div>

              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-cinzel font-bold text-base text-white group-hover:text-gold transition-colors">
                    {item.name}
                  </h3>
                  <span className="font-mono font-bold text-lg text-gold-gradient shrink-0">
                    ${item.price} USD
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gold/10">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span>Tallas:</span>
                    <span className="text-gold font-mono font-bold">{item.sizes.join(', ')}</span>
                  </div>

                  <button
                    onClick={() => handleOrderMerch(item)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold/15 hover:bg-gold text-gold hover:text-obsidian-dark font-bold text-xs border border-gold/40 hover:border-gold shadow-gold-glow transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Ordenar vía WhatsApp</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
