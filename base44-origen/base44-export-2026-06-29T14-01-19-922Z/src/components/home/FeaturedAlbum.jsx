import React from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Music } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const ALBUM = {
  title: "Moneda Al Aire",
  artist: "Casila OG",
  cover: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/40e372abd_3milx3milcover.png",
  backCover: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/459ec2705_703F06BD-7343-485D-88EF-6528237B35AA.jpg",
  tracks: [
  "Papaya y Betabel",
  "A Veces Me Hago El Muerto Para Ver Quien Baila Sobre Mi Tumba",
  "Cuando Me Ha Importado",
  "Agugu",
  "Dale Gas",
  "Todo Puede Pasar",
  "Disculpa De Antemano",
  "A Donde Tope",
  "Adrenalina",
  "Me Cosquillas",
  "On My Line",
  "Loteria",
  "Quiero Mas",
  "Borderline ft. BigBong (Bonus Track)"]

};

export default function FeaturedAlbum() {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-zinc-900 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16">

          <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">
            Nuevo Álbum
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4">
            Moneda Al Aire
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Album Cover */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group">

            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              
              {/* Album Art */}
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={ALBUM.cover}
                  alt={ALBUM.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}>

                    <Button
                      size="lg"
                      className="w-20 h-20 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black shadow-xl">

                      <Play className="w-8 h-8 fill-current ml-1" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Track List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>

            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800">
                <Music className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-white">Tracklist</h3>
                <span className="ml-auto text-zinc-500 text-sm">14 tracks</span>
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {ALBUM.tracks.map((track, index) =>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-800/50 transition-colors group cursor-pointer">

                    <span className="text-zinc-600 font-mono text-sm w-6">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/80 group-hover:text-white transition-colors flex-1 truncate">
                      {track}
                    </span>
                    <Play className="w-4 h-4 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex gap-3">
                <Link to={createPageUrl('Music')} className="flex-1">
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold">
                    <Play className="w-4 h-4 mr-2 fill-current" />
                    Reproducir
                  </Button>
                </Link>
                <Button variant="outline" className="bg-background text-stone-950 px-4 py-2 text-sm font-medium rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm hover:text-accent-foreground h-9 border-zinc-700 hover:bg-zinc-800">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}