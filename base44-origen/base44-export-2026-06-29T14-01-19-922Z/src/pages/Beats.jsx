import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Crown, Search, ShoppingCart, Music, Share2, X, MessageCircle, Mail, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const ALBUMS = [
  { name: 'TRAP-MEMPH', color: 'from-red-500 to-orange-500',    cover: 'https://montekingmx.github.io/assets/cover_trap.jpg' },
  { name: 'BOOMBAP',    color: 'from-blue-500 to-purple-500',   cover: 'https://montekingmx.github.io/assets/cover_boombap.jpg' },
  { name: 'SUAVE',      color: 'from-pink-500 to-purple-500',   cover: 'https://montekingmx.github.io/assets/cover_suave.jpg' },
  { name: 'TECHNO. MK', color: 'from-green-500 to-teal-500',   cover: 'https://montekingmx.github.io/assets/cover_techno.jpg' }
];

const BEATS_DATA = [
  { title: "Yyy Sour Play", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/yyy_sour_play_||_beat_||_116bpm.mp3", bpm: 116 },
  { title: "What U Need", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/what_u_need_||_beat_||_trap_monteking_121bpm.mp3", bpm: 121 },
  { title: "Payaso De Circo", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/payaso_de_circo_||_beat_||_memph_trap_monteking_||_110bpm_112bpm.mp3", bpm: 110 },
  { title: "Violin Negro", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/violin_negro_||_beat_||_trap_107bpm.mp3", bpm: 107 },
  { title: "No Traen Nada", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/no_traen_nada_||_beat_||_trap_memphis_monteking_||_125bpm_106bpm.mp3", bpm: 125 },
  { title: "Acicalado", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/acicalado_||_beat_||_trap_memph_monteking_||_122bpm.mp3", bpm: 122 },
  { title: "327", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/327_||_beat_||_trap_memphis_fresh_||_124bpm_123bpm.mp3", bpm: 124 },
  { title: "Je' Cherche Le Billets Pa Les Pies 2", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/je'_cherche_le_billets_pa_les_pies_2_||_beat_||_120_bpm_||_trap_deep_monteking.mp3", bpm: 120 },
  { title: "Sun Boss", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/sun_boss_||_beat_||_trap_monteking_houstón_||_135bpm.mp3", bpm: 135 },
  { title: "Gota De Hielo", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/gota_de_hielo_||_beat_||_trap_tumbado_113bpm.mp3", bpm: 113 },
  { title: "Necromancer", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/necromancer_||_beat_||_trap_memphis_monteking_||_125bpm_121bpm.mp3", bpm: 125 },
  { title: "Ades", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/ades_||_beat_||_trap_monteking_117bpm.mp3", bpm: 117 },
  { title: "Avem", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/avem_||_beat_||_60bpm_||_trap_monteking_121bpm.mp3", bpm: 60 },
  { title: "Suave Y Denso", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/suave_y_denso_||_slow_beat_||_lofi_112bpm.mp3", bpm: 112 },
  { title: "In My Bag", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/in_my_bag_||_beat_||_memph_monteking_detroit_trap_126bpm.mp3", bpm: 126 },
  { title: "Snake", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/snake_||_drill_||_beat__134bpm.mp3", bpm: 134 },
  { title: "Tomahawk", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/tomahawk_||_beat_||_trap_monteking_||_130bpm_124bpm.mp3", bpm: 130 },
  { title: "24K", album: "TRAP-MEMPH", url: "https://montekingmx.github.io/TRAP-MEMPH/24k_||_beat_||_trap_||_112bpm_111bpm.mp3", bpm: 112 },
  { title: "Devil", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/devil_||_beat_||_boombap_154bpm.mp3", bpm: 154 },
  { title: "Sencillo", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/sencillo_||_beat_||_boombap_classic_||_94bpm_114bpm.mp3", bpm: 94 },
  { title: "Stairway Class", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/stairway_class_||_beat_||_ohshit_boombap_classic_||_75bpm_147bpm.mp3", bpm: 75 },
  { title: "Arrastrando", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/arrastrando_||_beat_||_boombap_tumbado_||_140bpm_135bpm.mp3", bpm: 140 },
  { title: "Guru", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/guru_||_beat_||_boombap-trap_113bpm.mp3", bpm: 113 },
  { title: "Slow Reflex", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/slow_reflex_||_beat_||_boombap_deep_monteking_134bpm.mp3", bpm: 134 },
  { title: "Bulldozer", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/bulldozer_||_beat_||_boombap_duro_||_141_bpm.mp3", bpm: 141 },
  { title: "Ponganse De Pie", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/ponganse_de_pie_||_beat_||_boombap_mystik_monteking_||_135bpm_134bpm.mp3", bpm: 135 },
  { title: "Falling Harp", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/falling_harp_||_beat_||_boombap_dark_||_115bpm_114bpm.mp3", bpm: 115 },
  { title: "Bomboycaja", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/bomboycaja_||_beat_||_boombap_monteking_||_146bpm_dminor_145bpm.mp3", bpm: 146 },
  { title: "Muerte Lenta", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/muerte_lenta_||_beat_||_boombap_||_122bpm_123bpm.mp3", bpm: 122 },
  { title: "Starway", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/starway_||_beat_||_boombap_funk__148bpm.mp3", bpm: 148 },
  { title: "Bien O Mal", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/bien_o_mal_||_beat_||_boombap_||_130bpm_131bpm.mp3", bpm: 130 },
  { title: "Turko Americano", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/turko_americano_||_beat_||_boombap_||_125bpm.mp3", bpm: 125 },
  { title: "Ese Soy", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/ese_soy_||_beat_||_boombap_monteking_||_119bpm_118bpm.mp3", bpm: 119 },
  { title: "G-Funk", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/g-funk_||_beat_||_gfunk_boombap_||_80bpm_152bpm.mp3", bpm: 80 },
  { title: "Hace Tiempo", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/hace_tiempo_||_beat_||_cumbia_rap_||_138bpm_139bpm.mp3", bpm: 138 },
  { title: "La Barredora", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/la_barredora_||_beat_||_boombap_monteking_134bpm.mp3", bpm: 134 },
  { title: "Calabozo", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/calabozo_||_beat_||_boombap_seco_||_155bpm_c#minor_151bpm.mp3", bpm: 155 },
  { title: "Me Chingue La Rodilla", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/me_chingue_la_rodilla_||_beat_||_boombap_monteking_||_140bpm_139bpm.mp3", bpm: 140 },
  { title: "Les Confieso", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/les_confieso_||_beat_||_boombap_seco_154bpm.mp3", bpm: 154 },
  { title: "Digan Lo Que Digan", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/digan_lo_que_digan_||_beat_||_boombap_monteking_tresillo_118bpm.mp3", bpm: 118 },
  { title: "Crema Y Manteca", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/crema_y_manteca_||_beat_||_boombap_mystik_monteking_||_130bpm_dminor_131bpm.mp3", bpm: 130 },
  { title: "Vigilando", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/vigilando_||_beat_||_boombap_||_120bpm.mp3", bpm: 120 },
  { title: "Murciélago", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/murciélago_||_beat_||_boombap_seco_153bpm.mp3", bpm: 153 },
  { title: "Ripper", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/ripper_||_beat_||_boombap_mystik_||_128bpm_127bpm.mp3", bpm: 128 },
  { title: "Chapter One", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/chapter_one_||_beat_||_boombap_dark_||_60bpm_121bpm.mp3", bpm: 60 },
  { title: "Donde Piso", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/donde_piso_||_beat_||_boombap_mystik_monteking_||_69bpm_154bpm.mp3", bpm: 69 },
  { title: "Solo Mía", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/solo_mía_||_beat_||_boombap_||_132bpm.mp3", bpm: 132 },
  { title: "High Up", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/high_up_||_beat_||_boombap_||_145_bpm.mp3", bpm: 145 },
  { title: "Horno", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/horno_||_beat_||_boombap_103bpm.mp3", bpm: 103 },
  { title: "Boiler", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/boiler_||_beat_||_boombap_mystik_monteking_||_130bpm.mp3", bpm: 130 },
  { title: "Nightsleep", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/nightsleep_||_beat_||_ohshit_boombap_classic_||_120bpm_121bpm.mp3", bpm: 120 },
  { title: "Slow Burning", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/slow_burning_||_beat_||_boombap__112bpm.mp3", bpm: 112 },
  { title: "Platinum", album: "BOOMBAP", url: "https://montekingmx.github.io/BOOMBAP/platinum_||_beat_||_boombap_seco_monteking_138bpm.mp3", bpm: 138 },
  { title: "Arriba De Ti", album: "SUAVE", url: "https://montekingmx.github.io/SUAVE/arriba_de_ti_||_beat_||_lofi_rnb_boombap_114bpm.mp3", bpm: 114 },
  { title: "Starway", album: "SUAVE", url: "https://montekingmx.github.io/SUAVE/starway_||_beat_||_boombap_funk_148bpm.mp3", bpm: 148 },
  { title: "Slow Reflex", album: "SUAVE", url: "https://montekingmx.github.io/SUAVE/slow_reflex_||_beat_||_boombap_deep_monteking_134bpm.mp3", bpm: 134 },
  { title: "Ojitos Rojos", album: "SUAVE", url: "https://montekingmx.github.io/SUAVE/ojitos_rojos_||_beat_||_sushi_body_hot_trap_||_60bpm_119bpm.mp3", bpm: 60 },
  { title: "Flavors", album: "SUAVE", url: "https://montekingmx.github.io/SUAVE/flavors_||_beat_||_hot_trap_||_144bpm_127bpm.mp3", bpm: 144 },
  { title: "Margott", album: "TECHNO. MK", url: "https://montekingmx.github.io/TECHNO. MK/margott_||_techno_mk_||_104bpm_107bpm.mp3", bpm: 104 },
  { title: "Psyghetto 1", album: "TECHNO. MK", url: "https://montekingmx.github.io/TECHNO. MK/psyghetto_1__||_techno_mk_||_120bpm_121bpm.mp3", bpm: 120 },
  { title: "Churpybaby", album: "TECHNO. MK", url: "https://montekingmx.github.io/TECHNO. MK/churpybaby_||_techno_mk_||_113bpm.mp3", bpm: 113 },
  { title: "Oh Shit", album: "TECHNO. MK", url: "https://montekingmx.github.io/TECHNO. MK/oh_shit_||_techno_mk_||_115bpm_103bpm.mp3", bpm: 115 }
];

const LICENSE_TIERS = [
  { id: 'standard', label: 'Estándar', price: 500, desc: 'WAV Masterizado · Uso comercial no exclusivo' },
  { id: 'pro',      label: 'Pro (Stems)', price: 700, desc: 'Trackout + WAV + MP3' },
  { id: 'exclusive',label: 'Exclusiva', price: 1000, desc: 'Archivos completos · Beat se elimina · *base o % regalías' },
];

export default function BeatsPage() {
  const [selectedAlbum, setSelectedAlbum] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [playingBeat, setPlayingBeat] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState('standard');
  const audioRef = useRef(null);

  const filteredBeats = BEATS_DATA.filter(beat => {
    const matchesAlbum = selectedAlbum === "all" || beat.album === selectedAlbum;
    const matchesSearch = beat.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAlbum && matchesSearch;
  });

  const handlePlayPause = (beat) => {
    if (playingBeat?.url === beat.url) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    } else {
      setPlayingBeat(beat);
      if (audioRef.current) {
        audioRef.current.src = beat.url;
        audioRef.current.play();
      }
    }
  };

  const addToCart = (beat) => {
    if (!cart.find(b => b.url === beat.url)) {
      setCart([...cart, { ...beat, license: selectedLicense }]);
    }
  };

  const removeFromCart = (url) => setCart(c => c.filter(b => b.url !== url));

  const getTotal = () => cart.reduce((sum, b) => {
    const tier = LICENSE_TIERS.find(t => t.id === b.license) || LICENSE_TIERS[0];
    return sum + tier.price;
  }, 0);

  const buildWhatsAppMsg = () => {
    const licLabel = (id) => LICENSE_TIERS.find(t => t.id === id)?.label || 'Estándar';
    const lines = cart.map(b => `• "${b.title}" (${b.album}) — Licencia ${licLabel(b.license)} $${LICENSE_TIERS.find(t => t.id === b.license)?.price || 500} MXN`);
    const total = getTotal();
    const msg = encodeURIComponent(
      `¡Hola Monteking! 🎵 Quiero comprar los siguientes beats:\n\n${lines.join('\n')}\n\nTotal: $${total} MXN\n\n¿Cómo procedo con el pago?`
    );
    return `https://wa.me/5218115000000?text=${msg}`;
  };

  const buildEmailMsg = () => {
    const licLabel = (id) => LICENSE_TIERS.find(t => t.id === id)?.label || 'Estándar';
    const lines = cart.map(b => `• "${b.title}" (${b.album}) — Licencia ${licLabel(b.license)} $${LICENSE_TIERS.find(t => t.id === b.license)?.price || 500} MXN`);
    const total = getTotal();
    const subject = encodeURIComponent(`Compra de Beats — Monteking Records`);
    const body = encodeURIComponent(`Hola,\n\nQuiero adquirir los siguientes beats:\n\n${lines.join('\n')}\n\nTotal: $${total} MXN\n\nQuedo en espera de instrucciones de pago.\n\nGracias.`);
    return `mailto:monteking1311@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8">
          <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">
            Tienda de Beats
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-4">
            Beats Originales
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-5">
            Explora nuestra colección de beats producidos por Monteking Records
          </p>
          <a href="https://montekingmx.github.io" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 border border-yellow-500/30 hover:border-yellow-500/60 rounded-xl px-4 py-2 text-sm transition-all">
            🌐 Ver catálogo completo — montekingmx.github.io
          </a>
        </motion.div>

        {/* Licencias — seleccionable */}
        <div className="mb-8">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-3">Tipo de licencia activo al agregar al carrito</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {LICENSE_TIERS.map(lic => (
              <button key={lic.id} onClick={() => setSelectedLicense(lic.id)}
                className={`rounded-xl p-4 text-center border transition-all text-left ${
                  selectedLicense === lic.id
                    ? 'border-yellow-500 bg-yellow-500/10'
                    : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-600'
                }`}>
                <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Licencia</p>
                <p className="text-white font-bold">{lic.label}</p>
                <p className="text-yellow-500 font-bold text-xl my-1">${lic.price} MXN</p>
                <p className="text-zinc-500 text-xs">{lic.desc}</p>
                {selectedLicense === lic.id && (
                  <span className="inline-block mt-2 text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-full font-bold">✓ Activa</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Albums Filter */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <Button
            onClick={() => setSelectedAlbum("all")}
            variant={selectedAlbum === "all" ? "default" : "outline"}
            className={selectedAlbum === "all" ? "bg-yellow-500 text-black" : "border-zinc-700"}>
            Todos
          </Button>
          {ALBUMS.map(album => (
            <Button
              key={album.name}
              onClick={() => setSelectedAlbum(album.name)}
              variant={selectedAlbum === album.name ? "default" : "outline"}
              className={selectedAlbum === album.name ? `bg-gradient-to-r ${album.color} text-white` : "border-zinc-700"}>
              {album.name}
            </Button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <Input
            placeholder="Buscar beats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800 text-white" />
        </div>

        {/* Beats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {filteredBeats.map((beat, index) => {
            const isPlaying = playingBeat?.url === beat.url && !audioRef.current?.paused;
            const album = ALBUMS.find(a => a.name === beat.album);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}>
                <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all">
                  <div className={`relative aspect-square overflow-hidden`}>
                    {album?.cover ? (
                      <img src={album.cover} alt={beat.album} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${album?.color} flex items-center justify-center`}>
                        <Music className="w-16 h-16 text-white/20" />
                      </div>
                    )}
                    <button
                      onClick={() => handlePlayPause(beat)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      {isPlaying ? 
                        <Pause className="w-12 h-12 text-white" /> :
                        <Play className="w-12 h-12 text-white fill-white" />
                      }
                    </button>
                    {isPlaying && (
                      <div className="absolute bottom-2 left-2 right-2 h-0.5 bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 animate-pulse" style={{ width: '60%' }} />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-xs mb-2">
                      {beat.album}
                    </Badge>
                    <h3 className="text-white font-bold mb-1 truncate">{beat.title}</h3>
                    <p className="text-zinc-500 text-sm mb-3">{beat.bpm} BPM</p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => addToCart(beat)}
                        size="sm"
                        className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black text-xs">
                        <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                        Agregar
                      </Button>
                      <Button
                        onClick={() => {
                          const text = `🎵 "${beat.title}" — ${beat.bpm} BPM | Monteking Records`;
                          const url = `https://montekingmx.github.io`;
                          if (navigator.share) navigator.share({ title: text, url });
                          else navigator.clipboard?.writeText(`${text}\n${url}`);
                        }}
                        size="sm"
                        variant="outline"
                        className="border-zinc-700 text-zinc-400 hover:text-white px-2">
                        <Share2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Hidden Audio Player */}
        <audio ref={audioRef} />

        {/* Cart FAB */}
        {cart.length > 0 && (
          <button onClick={() => setCartOpen(true)}
            className="fixed bottom-24 right-6 z-40 bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl font-bold transition-all hover:scale-105">
            <ShoppingCart className="w-5 h-5" />
            <span>{cart.length} Beat{cart.length > 1 ? 's' : ''}</span>
            <span className="bg-black/20 rounded-lg px-2 py-0.5 text-sm">${getTotal()} MXN</span>
          </button>
        )}

        {/* Cart Modal */}
        <AnimatePresence>
          {cartOpen && (
            <>
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                onClick={() => setCartOpen(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />
              <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:40 }}
                className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg w-full bg-zinc-900 border border-zinc-700 md:rounded-2xl rounded-t-2xl p-6 z-50 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-white font-bold text-lg flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-yellow-500" />
                    Tu Carrito ({cart.length})
                  </h2>
                  <button onClick={() => setCartOpen(false)} className="text-zinc-500 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2 mb-5">
                  {cart.map((beat, i) => {
                    const tier = LICENSE_TIERS.find(t => t.id === beat.license) || LICENSE_TIERS[0];
                    return (
                      <div key={i} className="flex items-center justify-between gap-3 bg-zinc-800/50 rounded-xl p-3 border border-zinc-700/50">
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-semibold truncate">{beat.title}</p>
                          <p className="text-zinc-500 text-xs">{beat.album} · {beat.bpm} BPM · Licencia {tier.label}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-yellow-400 font-bold text-sm">${tier.price}</span>
                          <button onClick={() => removeFromCart(beat.url)} className="text-zinc-600 hover:text-red-400">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-zinc-700 pt-4 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Total</span>
                    <span className="text-white font-bold text-xl">${getTotal()} MXN</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-zinc-500 text-xs mb-3 text-center">Elige cómo contactarnos para completar tu compra:</p>
                  <a href={buildWhatsAppMsg()} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Comprar por WhatsApp
                    </Button>
                  </a>
                  <a href={buildEmailMsg()} className="block">
                    <Button variant="outline" className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-800">
                      <Mail className="w-4 h-4 mr-2" />
                      Comprar por Email
                    </Button>
                  </a>
                  <p className="text-zinc-600 text-xs text-center mt-2">
                    Pago vía transferencia, OXXO o tarjeta. Te respondemos en menos de 24h.
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}