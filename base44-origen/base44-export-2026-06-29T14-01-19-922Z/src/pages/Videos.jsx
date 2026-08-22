import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Youtube, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Thumbnails: YouTube serves these correctly even without API key
const yt = (id, q = 'hqdefault') => `https://img.youtube.com/vi/${id}/${q}.jpg`;

const VIDEOS = [
  // Videos Oficiales — IDs reales del canal @MONTEKINGMX
  { id: 1,  title: "SOMEDAY",               artist: "Casila OG",              videoId: "FKIbM7Qotrk", thumbnail: yt("FKIbM7Qotrk","hqdefault"), type: "official" },
  { id: 2,  title: "SHE WANNA BE MINE",     artist: "Casila OG",              videoId: "xzYVq7E-uVU", thumbnail: yt("xzYVq7E-uVU","hqdefault"), type: "official" },
  { id: 3,  title: "MA OWN B",              artist: "Casila OG",              videoId: "OgsHPc6uu8g", thumbnail: yt("OgsHPc6uu8g","hqdefault"), type: "official" },
  { id: 4,  title: "THE WORLD IS MINE",     artist: "Casila OG",              videoId: "IGv9bys1vjA", thumbnail: yt("IGv9bys1vjA","hqdefault"), type: "official" },
  { id: 5,  title: "FROM EL CIELO",         artist: "Casila OG",              videoId: "DAP3EMJLU1k", thumbnail: yt("DAP3EMJLU1k","hqdefault"), type: "official" },
  { id: 6,  title: "SHE KNOW",              artist: "Casila OG",              videoId: "LU5HwikCNUI", thumbnail: yt("LU5HwikCNUI","hqdefault"), type: "official" },
  { id: 7,  title: "WHAT UP FOOL // ONESHOT 07", artist: "Monteking MX",     videoId: "xPYmODP1Y28", thumbnail: yt("xPYmODP1Y28","hqdefault"), type: "official" },
  // Video Lyrics
  { id: 8,  title: "CASINO WINS // OG VIDEO LYRIC", artist: "Big Bong",      videoId: "utaKHzTqims", thumbnail: yt("utaKHzTqims","hqdefault"), type: "lyric" },
  { id: 9,  title: "INSANE ft. NOYO (LYRIC VIDEO)", artist: "Casila OG",     videoId: "u8g7xauYKys", thumbnail: yt("u8g7xauYKys","hqdefault"), type: "lyric" },
  { id: 10, title: "DOPE IN MA CITY (OG VIDEO LYRIC)", artist: "Big Bong ft. JMAAC", videoId: "qsywJRIKGqA", thumbnail: yt("qsywJRIKGqA","hqdefault"), type: "lyric" },
  { id: 11, title: "HITMAN (OG VIDEOLYRIC)",  artist: "BigBong ft. LilPaip",  videoId: "SLaX7MHnSeU", thumbnail: yt("SLaX7MHnSeU","hqdefault"), type: "lyric" },
  { id: 12, title: "DONT STOP ft. JMAAC",    artist: "Casila OG",             videoId: "xnYg87W9kIc", thumbnail: yt("xnYg87W9kIc","hqdefault"), type: "lyric" },
  // Colaboraciones
  { id: 13, title: "FEEL THE POWER",         artist: "Davinchi Power ft. JMAAC, Casila OG", videoId: "MuE_wT7btI4", thumbnail: yt("MuE_wT7btI4","hqdefault"), type: "collab" },
  { id: 14, title: "EN CALILI // #CYPHERKING #1", artist: "Casila OG",        videoId: "70GXxWRBlMo", thumbnail: yt("70GXxWRBlMo","hqdefault"), type: "collab" },
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
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12">
          <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">Videos</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-4">Contenido Visual</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
            Videos oficiales, lyric videos y colaboraciones de Monteking MX
          </p>
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-500 text-white font-bold"
            onClick={() => window.open('https://www.youtube.com/@MONTEKINGMX', '_blank')}>
            <Youtube className="w-5 h-5 mr-2" />
            Suscribirse en YouTube
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
              className="mb-10">
              <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    width="100%" height="100%"
                    src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-xs text-yellow-500 uppercase tracking-wider">{FILTER_LABELS[selectedVideo.type]}</span>
                    <h2 className="text-xl font-bold text-white mt-1">{selectedVideo.title}</h2>
                    <p className="text-zinc-400 text-sm">{selectedVideo.artist}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-zinc-700 text-white"
                      onClick={() => window.open(`https://www.youtube.com/watch?v=${selectedVideo.videoId}`, '_blank')}>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver en YouTube
                    </Button>
                    <Button variant="outline" className="border-zinc-700 text-white"
                      onClick={() => {
                        const url = `https://www.youtube.com/watch?v=${selectedVideo.videoId}`;
                        const text = `🎬 ${selectedVideo.title} — ${selectedVideo.artist} | Monteking MX`;
                        if (navigator.share) navigator.share({ title: text, url });
                        else navigator.clipboard?.writeText(`${text}\n${url}`);
                      }}>
                      <Play className="w-4 h-4 mr-2" />
                      Compartir
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Filters */}
        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveFilter}>
          <TabsList className="bg-zinc-900 border border-zinc-800">
            {Object.entries(FILTER_LABELS).map(([val, label]) => (
              <TabsTrigger key={val} value={val} className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-xs sm:text-sm">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Carousel */}
        <div className="relative mb-16">
          <Button variant="outline" size="icon" onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 border-zinc-700">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-4 px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04 }}
                onClick={() => { setSelectedVideo(video); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex-shrink-0 w-72 group cursor-pointer">
                <Card className={`overflow-hidden border transition-all ${selectedVideo.id === video.id ? 'border-yellow-500' : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600'}`}>
                  <div className="relative aspect-video">
                    <img src={video.thumbnail} alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
                        <Play className="w-6 h-6 text-black fill-black ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${
                        video.type === 'official' ? 'bg-yellow-600' :
                        video.type === 'lyric' ? 'bg-blue-600' : 'bg-purple-600'
                      }`}>
                        {video.type === 'official' ? '🎬 Oficial' : video.type === 'lyric' ? '📝 Lyric' : '🤝 Collab'}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-zinc-900">
                    <h3 className="text-white font-bold text-sm truncate">{video.title}</h3>
                    <p className="text-zinc-500 text-xs truncate mt-0.5">{video.artist}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          <Button variant="outline" size="icon" onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 border-zinc-700">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Subscribe CTA */}
        <Card className="bg-gradient-to-r from-red-600/20 to-red-500/20 border-red-500/30 p-8 text-center">
          <Youtube className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">Suscríbete al Canal</h3>
          <p className="text-zinc-400 max-w-xl mx-auto mb-6">
            Activa las notificaciones y no te pierdas nada del canal oficial de Monteking MX.
          </p>
          <Button size="lg" className="bg-red-600 hover:bg-red-500 text-white font-bold"
            onClick={() => window.open('https://www.youtube.com/@MONTEKINGMX', '_blank')}>
            <Youtube className="w-5 h-5 mr-2" />
            Suscribirse Ahora
          </Button>
        </Card>
      </div>
    </div>
  );
}