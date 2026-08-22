import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Music2, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const CASILA = {
  name: "Casila OG",
  role: "Fundador de Monteking",
  image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/bd4a507c1_IMG_5297.jpg",
  coverImage: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/459ec2705_703F06BD-7343-485D-88EF-6528237B35AA.jpg",
  bio: "Monteking Mx es una Bandera, Comunidad, Movimiento, Marca, Empresa y Sello Discográfico independiente de Monterrey, NL, México. Representamos el Sonido Cardiaco que creamos para ustedes, nosotros, y para el mundo.",
  stats: [
  { label: "Tracks", value: "200+" },
  { label: "Beats", value: "3000+" },
  { label: "Años", value: "10+" }]

};

export default function ArtistSpotlight() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Relocated Hero Artwork Wallpaper */}
      <div
        className="absolute inset-0 opacity-25 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6947f4b3e4453a62be1b6258/cbbfe1eb3_WALLPAPERBRANDNEWMACHORIZONTAL.jpg")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Artist Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1">

            <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">ARTISTA / PRODUCTOR / BEATMAKER / DISEÑADOR

            </span>
            <h2 className="text-5xl md:text-7xl font-bold text-white mt-4 mb-6">
              {CASILA.name}
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              {CASILA.bio}
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-10">
              {CASILA.stats.map((stat, index) =>
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center">

                  <div className="text-3xl md:text-4xl font-bold text-yellow-500">
                    {stat.value}
                  </div>
                  <div className="text-zinc-500 text-sm uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mb-8">
              <Button
                size="icon"
                variant="outline" className="bg-yellow-500 text-[#000000] text-sm font-medium rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm h-9 w-9 border-zinc-700 hover:bg-zinc-800 hover:border-yellow-500 hover:text-yellow-500 transition-all">

                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="outline" className="bg-yellow-500 text-[#000000] text-sm font-medium rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm h-9 w-9 border-zinc-700 hover:bg-zinc-800 hover:border-yellow-500 hover:text-yellow-500 transition-all">

                <Youtube className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="outline" className="bg-yellow-500 text-[#000000] text-sm font-medium rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm h-9 w-9 border-zinc-700 hover:bg-zinc-800 hover:border-yellow-500 hover:text-yellow-500 transition-all">

                <Music2 className="w-5 h-5" />
              </Button>
            </div>

            <Link to={createPageUrl('About')}>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-yellow-500 font-bold group">

                Conoce Más
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Artist Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2">

            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-yellow-500/5 rounded-full blur-2xl" />
              
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl">
                <img
                  src={CASILA.image}
                  alt={CASILA.name}
                  className="w-full h-full object-cover" />

                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Name Badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-yellow-500/20">
                    <div className="text-yellow-500 text-sm uppercase tracking-wider">
                      MONTEKING
                    </div>
                    <div className="text-white text-2xl font-bold mt-1">
                      {CASILA.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}