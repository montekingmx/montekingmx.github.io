import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Handshake } from 'lucide-react';
import { Card } from "@/components/ui/card";

const COLLABORATORS = [
  {
    name: "Gold Days MX",
    instagram: "@golddays.mx",
    description: "Marca de Flores y Miel"
  },
  {
    name: "Blvck Seed",
    instagram: "@blvck_seed_barber_shop",
    description: "BarberShop y Colaboradora"
  },
  {
    name: "Mezcal Real 24K",
    instagram: "@mezcal.real",
    description: "Mezcal de Agave Salmiana con Oro Comestible de 24k"
  },
  {
    name: "DaCrewmbia",
    instagram: "@dacrewmbia",
    description: "Grupo De Cumbia"
  },
  {
    name: "Raioters MX",
    instagram: "@raioters",
    description: "Marca Streetwear Norteña y Urbana"
  },
  {
    name: "Reino Jewelry Global",
    instagram: "@reinojewelry",
    description: "Joyeria Elaborada y Personalizada del Reino de Nuevo León"
  }
];

export default function BrandCollaborators() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">
            Red de Colaboración
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-4 cursor-default">
            <span className="title-hover-gold">Marcas Aliadas</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Trabajamos junto a marcas que comparten nuestra visión y valores
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {COLLABORATORS.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={`https://instagram.com/${brand.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="bg-zinc-900/50 border-zinc-800 p-6 hover:border-yellow-500/50 transition-all h-full">
                  <div className="flex items-start justify-between mb-4">
                    <Handshake className="w-10 h-10 text-yellow-500" />
                    <ExternalLink className="w-5 h-5 text-zinc-600 group-hover:text-yellow-500 transition-colors" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-500 transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-zinc-500 text-sm mb-3">{brand.description}</p>
                  <p className="text-yellow-500 text-sm font-mono">{brand.instagram}</p>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}