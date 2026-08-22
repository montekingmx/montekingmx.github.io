import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, ExternalLink, Sparkles, Play, Disc3, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export default function LatestRelease() {
  const videoId = "w4Q7IEqyjE4"; // Official YouTube Video ID for 201% - CASILA OG
  const videoTitle = "201xCiento — Casila OG (Video Oficial)";
  const releaseDetails = {
    title: "201xCiento — Casila OG",
    album: "Mamaseo Vol. 1 / Moneda Al Aire [13-11]",
    producer: "Monteking Records",
    director: "Monteking Films",
    location: "Monterrey, NL, México",
    youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
    spotifyUrl: "https://open.spotify.com/artist/6JkL5fiPkUG49eUzwKE5bW"
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold font-mono uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            ÚLTIMO LANZAMIENTO OFICIAL 4K
          </div>
          <h2 className="font-pirata text-4xl sm:text-6xl text-white tracking-wider">
            201XCIENTO — <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-yellow-400">CASILA OG</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mt-2">
            El videoclip más reciente e icónico del canal oficial de Monteking MX.
          </p>
        </motion.div>

        {/* Video Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-black/90 rounded-3xl p-4 sm:p-8 border-2 border-yellow-500/30 shadow-[0_0_50px_rgba(255,215,0,0.15)] overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 via-yellow-500/20 to-purple-600/20 rounded-3xl blur-2xl -z-10" />

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Embedded Responsive Video Player (16:9) */}
            <div className="lg:col-span-8">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
                  title={videoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Release Info & CTA */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
              
              <div>
                <div className="flex items-center gap-2 text-yellow-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                  <Disc3 className="w-4 h-4 animate-spin text-yellow-400" /> Sencillo Oficial 201%
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-oswald tracking-wide leading-tight mb-3">
                  {releaseDetails.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans">
                  Sonido crudo, producción de alto calibre y estética visual norteña. Disponible en todas las plataformas digitales.
                </p>

                {/* Credits Pill */}
                <div className="bg-zinc-900/80 rounded-2xl p-4 border border-zinc-800 space-y-2 text-xs text-zinc-300 font-mono mb-6">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">ÁLBUM:</span>
                    <span className="text-white font-bold">{releaseDetails.album}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">PRODUCCIÓN:</span>
                    <span className="text-yellow-400">{releaseDetails.producer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">ORIGEN:</span>
                    <span className="text-zinc-400">{releaseDetails.location}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={releaseDetails.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full py-6 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2">
                    <Youtube className="w-5 h-5 fill-current" /> VER 201% EN YOUTUBE
                  </Button>
                </a>

                <div className="flex gap-2">
                  <Link to="/Music" className="flex-1">
                    <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:border-yellow-400 hover:text-yellow-400 rounded-xl text-xs font-bold">
                      <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> Oír Álbum
                    </Button>
                  </Link>
                  <Link to="/Beats" className="flex-1">
                    <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:border-yellow-400 hover:text-yellow-400 rounded-xl text-xs font-bold">
                      Comprar Beats
                    </Button>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
