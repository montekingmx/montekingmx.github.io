const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, ExternalLink, Loader2, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Fallback while loading
const IG_FALLBACK = [
  { img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80", caption: "Monteking Records" },
  { img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80", caption: "Estudio" },
  { img: "https://images.unsplash.com/photo-1519508234439-4f23643125c1?w=400&q=80", caption: "Producción" },
  { img: "https://images.unsplash.com/photo-1571327073757-71d13bfd3e79?w=400&q=80", caption: "Beats" },
  { img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80", caption: "Music" },
  { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", caption: "Live" },
];

const SOCIALS = [
  {
    name: "Instagram",
    handles: "@monteking.mx · @casilaog",
    icon: Instagram,
    gradient: "from-pink-600 via-purple-600 to-orange-500",
    url: "https://www.instagram.com/monteking.mx",
    cta: "Seguir",
  },
  {
    name: "YouTube",
    handles: "@MONTEKINGMX",
    icon: Youtube,
    gradient: "from-red-600 to-red-700",
    url: "https://www.youtube.com/@MONTEKINGMX",
    cta: "Suscribirse",
  },
  {
    name: "Spotify",
    handles: "Casila OG · Monteking",
    icon: () => (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
    gradient: "from-green-600 to-green-700",
    url: "https://open.spotify.com/artist/6JkL5fiPkUG49eUzwKE5bW",
    cta: "Escuchar",
  },
];

export default function SocialSection() {
  const [igPosts, setIgPosts] = useState(IG_FALLBACK);
  const [igLoading, setIgLoading] = useState(false);
  const [igLoaded, setIgLoaded] = useState(false);

  const fetchIgFeed = async () => {
    if (igLoading) return;
    setIgLoading(true);
    try {
      const result = await db.integrations.Core.InvokeLLM({
        prompt: `Busca las últimas publicaciones de Instagram de @monteking.mx (Monteking Records, artista de rap/trap de Monterrey México).
        
Para cada post encontrado, devuelve la URL directa de la imagen del post de Instagram.
Si no puedes obtener URLs directas de imágenes de Instagram, busca imágenes de alta calidad relacionadas con "Monteking Mx rap Monterrey" o "Casila OG música" en la web y devuelve sus URLs.
Devuelve exactamente 6 posts/imágenes relevantes al artista.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: 'object',
          properties: {
            posts: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  img: { type: 'string', description: 'URL directa de la imagen' },
                  caption: { type: 'string', description: 'Descripción corta del post' },
                }
              }
            }
          }
        }
      });
      if (result?.posts?.length > 0) {
        setIgPosts(result.posts.slice(0, 6));
        setIgLoaded(true);
      }
    } catch {
      // Keep fallback
    }
    setIgLoading(false);
  };

  useEffect(() => {
    // Auto-fetch on mount (once)
    fetchIgFeed();
  }, []);

  return (
    <section className="py-16 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-medium">Síguenos</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">Monteking en Redes</h2>
        </motion.div>

        {/* Social follow buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r ${s.gradient} text-white font-bold shadow-lg hover:shadow-xl transition-shadow`}
            >
              <s.icon className="w-6 h-6" />
              <div className="text-left">
                <div className="text-sm font-bold leading-tight">{s.name}</div>
                <div className="text-xs opacity-75 leading-tight">{s.handles}</div>
              </div>
              <span className="ml-1 text-xs bg-white/20 rounded-full px-2.5 py-0.5 font-semibold">{s.cta}</span>
            </motion.a>
          ))}
        </div>

        {/* Instagram visual feed */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold flex items-center gap-2 text-sm">
              <Instagram className="w-4 h-4 text-pink-400" />
              @monteking.mx — Instagram
              {igLoading && <Loader2 className="w-3 h-3 text-zinc-500 animate-spin" />}
              {igLoaded && <span className="text-green-400 text-xs font-normal">● En vivo</span>}
            </h3>
            <div className="flex items-center gap-2">
              <button onClick={fetchIgFeed} disabled={igLoading}
                className="text-zinc-600 hover:text-zinc-400 transition-colors">
                <RefreshCw className={`w-3.5 h-3.5 ${igLoading ? 'animate-spin' : ''}`} />
              </button>
              <a
                href="https://www.instagram.com/monteking.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-pink-400 text-xs flex items-center gap-1 transition-colors"
              >
                Ver perfil <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {igPosts.map((post, i) => (
              <motion.a
                key={i}
                href="https://www.instagram.com/monteking.mx"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative aspect-square overflow-hidden rounded-xl group"
              >
                <img
                  src={post.img}
                  alt={post.caption || "Instagram"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { e.target.src = IG_FALLBACK[i % IG_FALLBACK.length].img; }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-2">
                  <Instagram className="w-5 h-5 text-white" />
                  {post.caption && <p className="text-white text-xs text-center leading-tight line-clamp-2">{post.caption}</p>}
                </div>
              </motion.a>
            ))}
          </div>

          <div className="text-center mt-5">
            <a href="https://www.instagram.com/monteking.mx" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-pink-500/40 text-pink-400 hover:bg-pink-500/10 hover:border-pink-400">
                <Instagram className="w-4 h-4 mr-2" />
                Ver más en Instagram
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}