const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

import { Instagram, Music, Youtube, ArrowLeft, Play, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

// Static artist data — enriches DB members with beats/track info
const ARTIST_EXTRAS = {
  'casila-og': {
    slug: 'casila-og',
    name: 'Casila OG',
    coverImg: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/68707d1a6_IMG_5249.jpg',
    gradient: 'from-yellow-500/20 to-orange-500/10',
    accentColor: 'text-yellow-500',
    role: 'Artista · Productor · Fundador',
    fullBio: `Casila OG es el fundador y líder creativo de Monteking Records, sello independiente nacido en las calles de Monterrey, NL. Su sonido fusiona trap, boom bap y melodías cinematográficas creando un estilo único que él llama "Sonido Cardiaco".

Desde 2017 ha construido un catálogo de más de 80 beats y múltiples proyectos discográficos, incluyendo "Moneda Al Aire", su álbum más reciente que mezcla introspección lírica con producción de alto nivel.

Como productor, ha desarrollado 4 colecciones de beats: TRAP-MEMPH, BOOMBAP, SUAVE y TECHNO.MK, cada una con una identidad sonora distinta.`,
    stats: [
      { label: 'Beats', value: '80+' },
      { label: 'Álbumes', value: '3+' },
      { label: 'Años activo', value: '7+' },
      { label: 'Ciudad', value: 'MTY' },
    ],
    socials: {
      instagram: 'https://www.instagram.com/casilaog',
      spotify: 'https://open.spotify.com/artist/6JkL5fiPkUG49eUzwKE5bW',
      youtube: 'https://www.youtube.com/@MONTEKINGMX',
    },
    featuredBeats: [
      { title: 'Yyy Sour Play', album: 'TRAP-MEMPH', bpm: 116 },
      { title: 'Devil', album: 'BOOMBAP', bpm: 154 },
      { title: 'Sun Boss', album: 'TRAP-MEMPH', bpm: 135 },
      { title: 'Arrastrando', album: 'BOOMBAP', bpm: 140 },
      { title: 'Ojitos Rojos', album: 'SUAVE', bpm: 119 },
      { title: 'Margott', album: 'TECHNO. MK', bpm: 104 },
    ],
    albums: [
      { name: 'Moneda Al Aire', year: 2024, type: 'Álbum', color: 'from-yellow-500 to-orange-600', spotifyId: '3LmkiTLxMTz0e3FUPrDp5c' },
      { name: 'TRAP-MEMPH', year: 2023, type: 'Beat Collection', color: 'from-red-600 to-orange-500' },
      { name: 'BOOMBAP', year: 2022, type: 'Beat Collection', color: 'from-blue-600 to-purple-700' },
      { name: 'SUAVE', year: 2022, type: 'Beat Collection', color: 'from-pink-600 to-purple-600' },
    ],
  },
  'bigbong': {
    slug: 'bigbong',
    name: 'BigBong',
    coverImg: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/51763d7af_BIGBONG-PNG-OFICIAL.png',
    gradient: 'from-blue-500/20 to-purple-500/10',
    accentColor: 'text-blue-400',
    role: 'Artista · MC',
    fullBio: `BigBong es uno de los MC's del colectivo Monteking Mx. Con un flow característico y letras directas que hablan de la vida en el Noreste, BigBong aporta energía y contundencia al movimiento 13-11.

Su estilo se nutre del rap clásico, el trap y las vivencias de la calle montañesa, creando una propuesta auténtica dentro del sello.`,
    stats: [
      { label: 'Sello', value: 'MK' },
      { label: 'Estilo', value: 'Trap/Rap' },
      { label: 'Ciudad', value: 'MTY' },
      { label: 'Tag', value: '13-11' },
    ],
    socials: {
      instagram: 'https://www.instagram.com/monteking.mx',
    },
    featuredBeats: [],
    albums: [],
  },
};

export default function ArtistProfilePage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('artist') || 'casila-og';
  const artist = ARTIST_EXTRAS[slug] || ARTIST_EXTRAS['casila-og'];

  const { data: members = [] } = useQuery({
    queryKey: ['members'],
    queryFn: () => db.entities.Member.list(),
    initialData: [],
  });

  const dbMember = members.find(m =>
    m.name?.toLowerCase().replace(/\s+/g, '-') === slug ||
    m.name?.toLowerCase().includes(slug.replace('-', ' '))
  );

  const bio = dbMember?.bio || artist.fullBio;

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <div className={`relative pt-20 bg-gradient-to-br ${artist.gradient} border-b border-zinc-800`}>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <Link to={createPageUrl('About')}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="shrink-0"
            >
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                <img src={artist.coverImg} alt={artist.name}
                  className="w-full h-full object-cover object-top" />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex-1">
              <p className={`${artist.accentColor} text-xs uppercase tracking-[0.3em] font-medium mb-2`}>Monteking Records</p>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{artist.name}</h1>
              <p className="text-zinc-400 text-lg mb-5">{artist.role}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mb-6">
                {artist.stats.map(s => (
                  <div key={s.label} className="text-center">
                    <p className={`${artist.accentColor} font-bold text-xl`}>{s.value}</p>
                    <p className="text-zinc-500 text-xs">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Social buttons */}
              <div className="flex flex-wrap gap-2">
                {artist.socials.instagram && (
                  <a href={artist.socials.instagram} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400 hover:text-pink-400 hover:border-pink-400">
                      <Instagram className="w-4 h-4 mr-1.5" />Instagram
                    </Button>
                  </a>
                )}
                {artist.socials.spotify && (
                  <a href={artist.socials.spotify} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400 hover:text-green-400 hover:border-green-400">
                      <Music className="w-4 h-4 mr-1.5" />Spotify
                    </Button>
                  </a>
                )}
                {artist.socials.youtube && (
                  <a href={artist.socials.youtube} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400 hover:text-red-400 hover:border-red-400">
                      <Youtube className="w-4 h-4 mr-1.5" />YouTube
                    </Button>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Bio */}
          <div className="md:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-white font-bold text-xl mb-4">Biografía</h2>
              <div className="text-zinc-400 leading-relaxed space-y-3">
                {bio.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </motion.div>

            {/* Albums */}
            {artist.albums.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 className="text-white font-bold text-xl mb-4">Discografía</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {artist.albums.map(album => (
                    <div key={album.name} className={`rounded-xl overflow-hidden bg-gradient-to-br ${album.color} p-4 aspect-square flex flex-col justify-end`}>
                      <p className="text-white font-bold text-sm leading-tight">{album.name}</p>
                      <p className="text-white/60 text-xs">{album.year} · {album.type}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Spotify embed */}
            {artist.albums.find(a => a.spotifyId) && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-white font-bold text-xl mb-4">Escuchar en Spotify</h2>
                <iframe
                  src={`https://open.spotify.com/embed/album/${artist.albums.find(a => a.spotifyId).spotifyId}?utm_source=generator&theme=0`}
                  width="100%" height="152" frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl"
                />
              </motion.div>
            )}
          </div>

          {/* Featured Beats sidebar */}
          {artist.featuredBeats.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <h2 className="text-white font-bold text-xl mb-4">Beats Destacados</h2>
              <div className="space-y-2">
                {artist.featuredBeats.map((beat, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 hover:border-zinc-700 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-yellow-500/10 transition-colors">
                        <Play className="w-3.5 h-3.5 text-zinc-500 group-hover:text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-white text-xs font-semibold">{beat.title}</p>
                        <p className="text-zinc-600 text-xs">{beat.album} · {beat.bpm} BPM</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-zinc-700 text-zinc-500 text-xs shrink-0">
                      {beat.album.split(' ')[0]}
                    </Badge>
                  </div>
                ))}
              </div>
              <Link to={createPageUrl('Beats')}>
                <Button className="w-full mt-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Ver todos los beats
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}