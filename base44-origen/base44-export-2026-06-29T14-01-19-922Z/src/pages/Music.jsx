import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Heart, Share2, ExternalLink, Clock, Music } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const IMAGES = {
  cover: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/40e372abd_3milx3milcover.png",
  backCover: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/459ec2705_703F06BD-7343-485D-88EF-6528237B35AA.jpg",
  coin: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/b84b3cca8_1311MONEDABACKDISENO-Recuperado-Recuperado-Recuperado.png"
};

const ALBUM = {
  title: "Moneda Al Aire",
  artist: "Casila OG",
  year: "2024",
  tracks: [
    { id: 1, title: "Papaya y Betabel", duration: "3:24" },
    { id: 2, title: "A Veces Me Hago El Muerto Para Ver Quien Baila Sobre Mi Tumba", duration: "4:12" },
    { id: 3, title: "Cuando Me Ha Importado", duration: "3:45" },
    { id: 4, title: "Agugu", duration: "3:18" },
    { id: 5, title: "Dale Gas", duration: "3:32" },
    { id: 6, title: "Todo Puede Pasar", duration: "4:05" },
    { id: 7, title: "Disculpa De Antemano", duration: "3:55" },
    { id: 8, title: "A Donde Tope", duration: "3:28" },
    { id: 9, title: "Adrenalina", duration: "4:02" },
    { id: 10, title: "Me Cosquillas", duration: "3:15" },
    { id: 11, title: "On My Line", duration: "3:48" },
    { id: 12, title: "Loteria", duration: "3:38" },
    { id: 13, title: "Quiero Mas", duration: "4:10" },
    { id: 14, title: "Borderline ft. BigBong", duration: "4:45", isBonus: true }
  ]
};

export default function MusicPage() {
  const [playingTrack, setPlayingTrack] = useState(null);
  const [likedTracks, setLikedTracks] = useState([]);

  const togglePlay = (trackId) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId);
  };

  const toggleLike = (trackId) => {
    setLikedTracks(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  const totalDuration = "52:17";

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Album Header */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Album Art */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={IMAGES.cover} 
                  alt={ALBUM.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Album Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">
                Álbum • {ALBUM.year}
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mt-4 mb-4">
                {ALBUM.title}
              </h1>
              <p className="text-2xl text-zinc-400 mb-6">{ALBUM.artist}</p>
              
              <div className="flex items-center gap-6 text-zinc-500 text-sm mb-8">
                <span>{ALBUM.tracks.length} canciones</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {totalDuration}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="https://open.spotify.com/album/0frbDayzrtuYO31vlzqZtb" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8">
                    <Play className="w-5 h-5 mr-2 fill-current" />
                    Reproducir en Spotify
                  </Button>
                </a>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-zinc-700 text-white hover:bg-zinc-800"
                  onClick={() => {
                    const text = 'Escucha "Moneda Al Aire" de Casila OG — Monteking Records 🎵';
                    const url = 'https://open.spotify.com/album/0frbDayzrtuYO31vlzqZtb';
                    if (navigator.share) {
                      navigator.share({ title: text, url });
                    } else {
                      navigator.clipboard?.writeText(`${text}\n${url}`);
                    }
                  }}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Compartir
                </Button>
              </div>

              {/* Streaming Links */}
              <div className="mt-8 pt-8 border-t border-zinc-800">
                <p className="text-zinc-500 text-sm mb-4">Escucha en:</p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://open.spotify.com/album/0frbDayzrtuYO31vlzqZtb" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-green-700 text-green-400 hover:bg-green-900/20">
                      🟢 Spotify
                    </Button>
                  </a>
                  <a href="https://music.apple.com/search?term=Casila+OG+Monteking" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400 hover:text-white">
                      🍎 Apple Music
                    </Button>
                  </a>
                  <a href="https://www.youtube.com/@MONTEKINGMX" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-red-700 text-red-400 hover:bg-red-900/20">
                      ▶ YouTube
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Track List */}
        <section>
          <Tabs defaultValue="tracks">
            <TabsList className="bg-zinc-900 border border-zinc-800 mb-8">
              <TabsTrigger value="tracks" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                Canciones
              </TabsTrigger>
              <TabsTrigger value="about" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                Sobre el Álbum
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tracks">
              <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
                <div className="divide-y divide-zinc-800">
                  {ALBUM.tracks.map((track, index) => (
                    <motion.div
                      key={track.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`flex items-center gap-4 p-4 hover:bg-zinc-800/50 transition-colors group cursor-pointer ${
                        playingTrack === track.id ? 'bg-yellow-500/10' : ''
                      }`}
                      onClick={() => togglePlay(track.id)}
                    >
                      {/* Track Number / Play */}
                      <div className="w-10 text-center">
                        {playingTrack === track.id ? (
                          <div className="w-8 h-8 mx-auto rounded-full bg-yellow-500 flex items-center justify-center">
                            <Pause className="w-4 h-4 text-black" />
                          </div>
                        ) : (
                          <>
                            <span className="text-zinc-600 font-mono group-hover:hidden">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <Play className="w-4 h-4 text-white hidden group-hover:block mx-auto" />
                          </>
                        )}
                      </div>

                      {/* Track Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium truncate ${
                          playingTrack === track.id ? 'text-yellow-500' : 'text-white'
                        }`}>
                          {track.title}
                        </h4>
                        {track.isBonus && (
                          <span className="text-xs text-yellow-500 uppercase tracking-wider">
                            Bonus Track
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(track.id);
                          }}
                          className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                            likedTracks.includes(track.id) ? 'opacity-100' : ''
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${
                            likedTracks.includes(track.id) 
                              ? 'fill-yellow-500 text-yellow-500' 
                              : 'text-zinc-500 hover:text-white'
                          }`} />
                        </button>
                        <span className="text-zinc-500 text-sm font-mono w-12 text-right">
                          {track.duration}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="about">
              <Card className="bg-zinc-900/50 border-zinc-800 p-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Sobre "Moneda Al Aire"</h3>
                    <p className="text-zinc-400 leading-relaxed mb-4">
                      "Moneda Al Aire" representa el trabajo más personal y ambicioso de Casila OG 
                      hasta la fecha. Con 14 tracks que recorren diferentes emociones y estilos, 
                      el álbum es un reflejo de la vida en las calles de Monterrey.
                    </p>
                    <p className="text-zinc-400 leading-relaxed">
                      Producido enteramente bajo el sello Monteking Records, este proyecto cuenta 
                      con colaboraciones especiales y una producción de alta calidad que eleva el 
                      sonido del norte de México.
                    </p>
                  </div>

                  {/* Spotify Player - Artist (Monteking) */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Monteking</h3>
                    <div className="rounded-xl overflow-hidden">
                      <iframe 
                        style={{borderRadius: "12px"}} 
                        src="https://open.spotify.com/embed/artist/6JkL5fiPkUG49eUzwKE5bW?utm_source=generator&theme=0" 
                        width="100%" 
                        height="380" 
                        frameBorder="0" 
                        allowFullScreen 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      />
                    </div>
                  </div>

                  {/* Spotify Player - Album */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Moneda Al Aire</h3>
                    <div className="rounded-xl overflow-hidden">
                      <iframe 
                        style={{borderRadius: "12px"}} 
                        src="https://open.spotify.com/embed/album/0frbDayzrtuYO31vlzqZtb?utm_source=generator" 
                        width="100%" 
                        height="380" 
                        frameBorder="0" 
                        allowFullScreen 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}