import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Youtube, ExternalLink, ChevronLeft, ChevronRight, ListMusic, Disc3, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const yt = (id, q = 'hqdefault') => `https://img.youtube.com/vi/${id}/${q}.jpg`;

const VIDEOS = [
  // Videos Oficiales
  { id: 1,  title: "201XCIENTO",            artist: "Casila OG",              videoId: "w4Q7IEqyjE4", thumbnail: yt("w4Q7IEqyjE4","hqdefault"), type: "official" },
  { id: 2,  title: "SOMEDAY",               artist: "Casila OG",              videoId: "FKIbM7Qotrk", thumbnail: yt("FKIbM7Qotrk","hqdefault"), type: "official" },
  { id: 3,  title: "SHE WANNA BE MINE",     artist: "Casila OG",              videoId: "xzYVq7E-uVU", thumbnail: yt("xzYVq7E-uVU","hqdefault"), type: "official" },
  { id: 4,  title: "MA OWN B",              artist: "Casila OG",              videoId: "OgsHPc6uu8g", thumbnail: yt("OgsHPc6uu8g","hqdefault"), type: "official" },
  { id: 5,  title: "THE WORLD IS MINE",     artist: "Casila OG",              videoId: "IGv9bys1vjA", thumbnail: yt("IGv9bys1vjA","hqdefault"), type: "official" },
  { id: 6,  title: "FROM EL CIELO",         artist: "Casila OG",              videoId: "DAP3EMJLU1k", thumbnail: yt("DAP3EMJLU1k","hqdefault"), type: "official" },
  { id: 7,  title: "SHE KNOW",              artist: "Casila OG",              videoId: "LU5HwikCNUI", thumbnail: yt("LU5HwikCNUI","hqdefault"), type: "official" },
  { id: 8,  title: "WHAT UP FOOL // ONESHOT 07", artist: "Monteking MX",     videoId: "xPYmODP1Y28", thumbnail: yt("xPYmODP1Y28","hqdefault"), type: "official" },
  // Video Lyrics
  { id: 9,  title: "CASINO WINS // OG VIDEO LYRIC", artist: "Big Bong",      videoId: "utaKHzTqims", thumbnail: yt("utaKHzTqims","hqdefault"), type: "lyric" },
  { id: 10, title: "INSANE ft. NOYO (LYRIC VIDEO)", artist: "Casila OG",     videoId: "u8g7xauYKys", thumbnail: yt("u8g7xauYKys","hqdefault"), type: "lyric" },
  { id: 11, title: "DOPE IN MA CITY (OG VIDEO LYRIC)", artist: "Big Bong ft. JMAAC", videoId: "qsywJRIKGqA", thumbnail: yt("qsywJRIKGqA","hqdefault"), type: "lyric" },
  { id: 12, title: "HITMAN (OG VIDEOLYRIC)",  artist: "BigBong ft. LilPaip",  videoId: "SLaX7MHnSeU", thumbnail: yt("SLaX7MHnSeU","hqdefault"), type: "lyric" },
  { id: 13, title: "DONT STOP ft. JMAAC",    artist: "Casila OG",             videoId: "xnYg87W9kIc", thumbnail: yt("xnYg87W9kIc","hqdefault"), type: "lyric" },
  // Colaboraciones
  { id: 14, title: "FEEL THE POWER",         artist: "Davinchi Power ft. JMAAC, Casila OG", videoId: "MuE_wT7btI4", thumbnail: yt("MuE_wT7btI4","hqdefault"), type: "collab" },
  { id: 15, title: "EN CALILI // #CYPHERKING #1", artist: "Casila OG",        videoId: "70GXxWRBlMo", thumbnail: yt("70GXxWRBlMo","hqdefault"), type: "collab" },
];

// YouTube Official Playlists from @MONTEKINGMX
const YOUTUBE_PLAYLISTS = [
  {
    id: "pl-1",
    title: "Moneda Al Aire - Album",
    desc: "Todos los videoclips oficiales, visualizers y audios del álbum debut de Casila OG.",
    playlistId: "PL_MONEDA_AL_AIRE_CASILA",
    videosCount: "14 videos",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PL_MONEDA_AL_AIRE_CASILA",
    cover: "assets/branding/moneda_1311_textura.png",
    directUrl: "https://www.youtube.com/@MONTEKINGMX/playlists"
  },
  {
    id: "pl-2",
    title: "Videos Populares",
    desc: "Los videoclips oficiales más reproducidos y virales del canal de Monteking MX.",
    playlistId: "PL_VIDEOS_POPULARES_MK",
    videosCount: "20+ videos",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PL_VIDEOS_POPULARES_MK",
    cover: "assets/cover_trap.jpg",
    directUrl: "https://www.youtube.com/@MONTEKINGMX/playlists"
  },
  {
    id: "pl-3",
    title: "Big Bong Estilo Rebajado",
    desc: "Tracks y colaboraciones en versión rebajada con tempo lento y bajos profundos.",
    playlistId: "PL_BIG_BONG_REBAJADO",
    videosCount: "10+ tracks",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PL_BIG_BONG_REBAJADO",
    cover: "assets/cover_suave.jpg",
    directUrl: "https://www.youtube.com/@MONTEKINGMX/playlists"
  },
  {
    id: "pl-4",
    title: "Monteking OneShots",
    desc: "Sesiones de estudio exclusivas y freestyle cuts en plano secuencia directo.",
    playlistId: "PL_MONTEKING_ONESHOTS",
    videosCount: "15+ one-shots",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PL_MONTEKING_ONESHOTS",
    cover: "assets/cover_boombap.jpg",
    directUrl: "https://www.youtube.com/@MONTEKINGMX/playlists"
  },
  {
    id: "pl-5",
    title: "Colaboraciones",
    desc: "Producciones y featurings con artistas nacionales e internacionales del sello.",
    playlistId: "PL_COLABORACIONES_MK",
    videosCount: "25+ clips",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PL_COLABORACIONES_MK",
    cover: "assets/cover_techno.jpg",
    directUrl: "https://www.youtube.com/@MONTEKINGMX/playlists"
  }
];

const FILTER_LABELS = { all: 'Todos', official: 'Videos Oficiales', lyric: 'Video Lyrics', collab: 'Colaboraciones' };

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState(VIDEOS[0]);
  const [activeFilter, setActiveFilter] = useState("all");
  const carouselRef = useRef(null);

  const filteredVideos = activeFilter === "all" ? VIDEOS : VIDEOS.filter(v => v.type === activeFilter);

  const scroll = (dir) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <span className="text-yellow-400 uppercase tracking-[0.3em] text-xs font-bold font-mono">
            Monteking Films & Visuals
          </span>
          <h1 className="font-pirata text-5xl sm:text-7xl font-bold text-white mt-3 mb-3">
            CONTENIDO <span className="text-stroke-gold">VISUAL & PLAYLISTS</span>
          </h1>
          <p className="text-zinc-400 text-base max-w-2xl mx-auto mb-8 font-sans">
            Videoclips 4K, video lyrics oficiales, colaboraciones y listas de reproducción públicas del canal @MONTEKINGMX.
          </p>
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-500 text-white font-bold font-oswald text-sm px-8 py-6 rounded-2xl shadow-xl shadow-red-600/30 transition-transform active:scale-95"
            onClick={() => window.open('https://www.youtube.com/@MONTEKINGMX', '_blank')}
          >
            <Youtube className="w-5 h-5 mr-2" />
            SUSCRIBIRSE AL CANAL OFICIAL
          </Button>
        </motion.div>

        {/* Featured Video Player */}
        <AnimatePresence mode="wait">
          {selectedVideo && (
            <motion.section
              key={selectedVideo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-14"
            >
              <Card className="bg-zinc-950/90 border-2 border-yellow-500/30 rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-video bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=0&rel=0`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-zinc-950">
                  <div>
                    <span className="text-xs text-yellow-400 font-mono font-bold uppercase tracking-wider">{FILTER_LABELS[selectedVideo.type]}</span>
                    <h2 className="text-2xl font-black font-oswald text-white mt-1">{selectedVideo.title}</h2>
                    <p className="text-zinc-400 text-sm font-sans">{selectedVideo.artist}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-zinc-700 text-white hover:border-yellow-400 hover:text-yellow-400 rounded-xl"
                      onClick={() => window.open(`https://www.youtube.com/watch?v=${selectedVideo.videoId}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver en YouTube
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Filters */}
        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveFilter}>
          <TabsList className="bg-zinc-950 border border-zinc-800 rounded-2xl p-1">
            {Object.entries(FILTER_LABELS).map(([val, label]) => (
              <TabsTrigger key={val} value={val} className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black rounded-xl text-xs sm:text-sm font-bold font-oswald uppercase">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Carousel */}
        <div className="relative mb-20">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/90 border-zinc-700 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-4 px-12 no-scrollbar"
          >
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => { setSelectedVideo(video); window.scrollTo({ top: 120, behavior: 'smooth' }); }}
                className="flex-shrink-0 w-72 group cursor-pointer"
              >
                <Card className={`overflow-hidden border-2 rounded-2xl transition-all ${selectedVideo.id === video.id ? 'border-yellow-400 bg-zinc-900' : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600'}`}>
                  <div className="relative aspect-video">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center text-black">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-zinc-950">
                    <h3 className="text-white font-bold font-oswald text-sm truncate">{video.title}</h3>
                    <p className="text-zinc-500 text-xs truncate mt-0.5">{video.artist}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/90 border-zinc-700 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* ── Official YouTube Playlists Section (Item 13) ── */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <ListMusic className="w-6 h-6 text-yellow-400" />
            <h2 className="text-white font-black font-oswald text-2xl uppercase tracking-wide">
              Playlists Oficiales en YouTube (@MONTEKINGMX)
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {YOUTUBE_PLAYLISTS.map((pl, idx) => (
              <motion.a
                key={pl.id}
                href={pl.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="group bg-gradient-to-b from-zinc-900 to-black border-2 border-zinc-800 hover:border-yellow-400 rounded-3xl p-5 shadow-2xl flex flex-col justify-between transition-all duration-300 hover:scale-[1.02]"
              >
                <div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-zinc-800 bg-zinc-950">
                    <img src={pl.cover} alt={pl.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 bg-black/80 px-2.5 py-1 rounded-full text-[10px] font-mono text-yellow-400 font-bold">
                      {pl.videosCount}
                    </div>
                  </div>
                  <h3 className="text-white font-bold font-oswald text-base group-hover:text-yellow-400 transition-colors">
                    {pl.title}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2 font-sans">
                    {pl.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-yellow-400 font-bold">
                  <span>ABRIR PLAYLIST</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Subscribe Banner */}
        <Card className="bg-gradient-to-r from-red-600/20 via-zinc-950 to-black border-2 border-red-500/30 p-8 rounded-3xl text-center">
          <Youtube className="w-14 h-14 text-red-500 mx-auto mb-3" />
          <h3 className="text-2xl font-black font-oswald text-white uppercase mb-2">Canal Oficial de Monteking MX</h3>
          <p className="text-zinc-400 max-w-xl mx-auto mb-6 text-sm">
            Nuevos lanzamientos semanales, videoclips en 4K y beat previews directos.
          </p>
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-500 text-white font-bold font-oswald rounded-xl px-8"
            onClick={() => window.open('https://www.youtube.com/@MONTEKINGMX', '_blank')}
          >
            Suscribirse Ahora
          </Button>
        </Card>

      </div>
    </div>
  );
}