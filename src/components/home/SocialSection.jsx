import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, ExternalLink, Heart, MessageCircle, Share2, Play, Disc3, CheckCircle2, Film, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Real Instagram Posts & Reels provided by user
const REAL_INSTAGRAM_PROFILES = [
  {
    handle: "@casilaog",
    name: "Casila OG",
    bio: "Artista & Líder Creativo 13-11 • 'Moneda Al Aire' ya disponible",
    url: "https://www.instagram.com/casilaog",
    avatar: "assets/logo_1.png",
    followers: "12.4K",
    latestPost: {
      type: "reel",
      id: "DNuJTMhWCq9",
      url: "https://www.instagram.com/reel/DNuJTMhWCq9/",
      embedUrl: "https://www.instagram.com/reel/DNuJTMhWCq9/embed",
      title: "Casila OG — Último Reel Oficial",
      caption: "201XCIENTO y más novedades en el estudio. Mira el reel oficial en Instagram.",
      tag: "ÚLTIMO REEL REAL"
    },
    reels: [
      { id: "DbeJkkNurg1", url: "https://www.instagram.com/reel/DbeJkkNurg1/", title: "Casila OG — Reel Sesión #2", type: "reel" },
      { id: "DXxug0iRbGc", url: "https://www.instagram.com/reel/DXxug0iRbGc/", title: "Casila OG — Reel Freestyle #3", type: "reel" }
    ]
  },
  {
    handle: "@montekingmx",
    name: "Monteking MX",
    bio: "Sello Discográfico Independiente • Beats, Producción y Merch Oficial 13-11",
    url: "https://www.instagram.com/montekingmx",
    avatar: "assets/branding/mk_logo_black.png",
    followers: "28.9K",
    latestPost: {
      type: "reel",
      id: "DUPQeqZjJ-L",
      url: "https://www.instagram.com/reel/DUPQeqZjJ-L/",
      embedUrl: "https://www.instagram.com/reel/DUPQeqZjJ-L/embed",
      title: "Monteking MX — Beatmaking & Drops",
      caption: "Nuevo drop y producción musical desde el estudio central 13-11.",
      tag: "ÚLTIMO REEL REAL"
    },
    reels: [
      { id: "DUHQVj1kYtk", url: "https://www.instagram.com/reel/DUHQVj1kYtk/", title: "Monteking MX — Reel Beat Session", type: "reel" },
      { id: "DOhMKMjkm63", url: "https://www.instagram.com/reel/DOhMKMjkm63/", title: "Monteking MX — Reel Studio Cut", type: "reel" }
    ]
  },
  {
    handle: "@montekingrecords",
    name: "Monteking Records",
    bio: "Estudio de Grabación & Productora Audiovisual • Monterrey, NL [13-11]",
    url: "https://www.instagram.com/montekingrecords",
    avatar: "assets/branding/mk_logo_color.png",
    followers: "15.7K",
    latestPost: {
      type: "post",
      id: "CnxMf0KvJVH",
      url: "https://www.instagram.com/p/CnxMf0KvJVH/",
      embedUrl: "https://www.instagram.com/p/CnxMf0KvJVH/embed",
      title: "Monteking Records — Publicación Oficial",
      caption: "Sesión de estudio y lanzamientos discográficos oficiales.",
      tag: "ÚLTIMO POST REAL"
    },
    reels: [
      { id: "CgpXnaxJYgw", url: "https://www.instagram.com/p/CgpXnaxJYgw/", title: "Monteking Records — Post Oficial #2", type: "post" },
      { id: "CSnkoSBFb0I", url: "https://www.instagram.com/p/CSnkoSBFb0I/", title: "Monteking Records — Post Oficial #3", type: "post" }
    ]
  }
];

export default function SocialSection() {
  const [activeAccount, setActiveAccount] = useState(0);

  // Load Instagram embed script
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const script = document.createElement('script');
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [activeAccount]);

  const account = REAL_INSTAGRAM_PROFILES[activeAccount];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-pink-400 text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Instagram className="w-3.5 h-3.5" /> ACTIVIDAD OFICIAL & REELS EN VIVO
          </div>
          <h2 className="font-pirata text-4xl sm:text-6xl text-white tracking-wider">
            POSTS & REELS <span className="text-stroke-gold">REALES</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mt-2 font-sans">
            Publicaciones y reels verificados en directo desde las cuentas oficiales de Instagram.
          </p>
        </motion.div>

        {/* Account Selector Tabs */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
          {REAL_INSTAGRAM_PROFILES.map((prof, idx) => (
            <button
              key={prof.handle}
              onClick={() => setActiveAccount(idx)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold font-oswald text-xs sm:text-sm tracking-wide transition-all border shrink-0 ${
                activeAccount === idx
                  ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 border-pink-400 text-white shadow-xl shadow-purple-500/25 scale-105'
                  : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <Instagram className="w-4 h-4" />
              <span>{prof.handle}</span>
            </button>
          ))}
        </div>

        {/* Active Account Profile Bar */}
        <div className="bg-gradient-to-r from-zinc-950 via-black to-zinc-950 rounded-3xl p-6 sm:p-8 border-2 border-zinc-800 shadow-2xl mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-zinc-900 border-2 border-yellow-400/60 p-1 shrink-0">
              <img src={account.avatar} alt={account.name} className="w-full h-full object-contain rounded-xl" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl font-bold font-oswald text-white">{account.name}</h3>
                <span className="text-yellow-400 font-mono text-xs font-bold">{account.handle}</span>
              </div>
              <p className="text-zinc-400 text-xs mt-1 max-w-md font-sans">{account.bio}</p>
            </div>
          </div>

          <a
            href={account.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-gradient-to-r from-pink-600 to-purple-600 hover:brightness-110 text-white px-6 py-3 rounded-2xl font-bold font-oswald text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-transform active:scale-95"
          >
            <Instagram className="w-4 h-4" />
            Seguir en Instagram
          </a>
        </div>

        {/* Posts & Reels Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Featured Real Post / Reel Embed */}
          <div className="lg:col-span-7 bg-zinc-950/90 rounded-3xl p-6 sm:p-8 border-2 border-yellow-500/30 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
              <span className="text-xs font-mono font-bold text-yellow-400 uppercase">
                {account.latestPost.tag}
              </span>
              <a
                href={account.latestPost.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-pink-400 hover:underline flex items-center gap-1"
              >
                Abrir en Instagram <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Instagram Iframe / Embed Container */}
            <div className="rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl flex justify-center min-h-[480px]">
              <iframe
                src={account.latestPost.embedUrl}
                className="w-full h-[520px] sm:h-[580px] border-0"
                allowFullScreen
                loading="lazy"
                title={account.latestPost.title}
              />
            </div>
          </div>

          {/* Secondary Real Reels & Posts Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <Film className="w-5 h-5 text-yellow-400" />
              <h3 className="text-white font-oswald font-bold text-lg uppercase tracking-wide">
                Más Publicaciones & Reels Reales
              </h3>
            </div>

            {account.reels.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-950/90 rounded-2xl p-4 border-2 border-zinc-800 hover:border-pink-500/60 shadow-xl transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-yellow-400 font-bold uppercase">
                    {item.type === 'reel' ? '🎬 REEL OFICIAL' : '📸 POST OFICIAL'}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">ID: {item.id}</span>
                </div>

                <div className="rounded-xl overflow-hidden bg-black border border-zinc-800 mb-3">
                  <iframe
                    src={`https://www.instagram.com/${item.type === 'reel' ? 'reel' : 'p'}/${item.id}/embed`}
                    className="w-full h-[320px] border-0"
                    allowFullScreen
                    loading="lazy"
                    title={item.title}
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-900">
                  <span className="text-white font-bold font-oswald text-xs truncate max-w-[200px]">{item.title}</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-600 hover:bg-pink-500 text-white px-3 py-1 rounded-xl text-[11px] font-bold font-oswald uppercase flex items-center gap-1 shrink-0"
                  >
                    Ver en IG <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}