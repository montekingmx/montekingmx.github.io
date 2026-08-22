export const ALBUMS = [
  { 
    name: 'TRAP-MEMPH', 
    label: 'Trap Memphis',
    color: 'from-red-600 to-orange-500',    
    cover: 'assets/cover_trap.jpg',
    themeColor: '#39FF14'
  },
  { 
    name: 'BOOMBAP',    
    label: 'Boom Bap',
    color: 'from-blue-600 to-purple-600',   
    cover: 'assets/cover_boombap.jpg',
    themeColor: '#FFD700'
  },
  { 
    name: 'SUAVE',      
    label: 'R&B / Suave',
    color: 'from-fuchsia-600 to-pink-500',   
    cover: 'assets/cover_suave.jpg',
    themeColor: '#D500F9'
  },
  { 
    name: 'TECHNO. MK', 
    label: 'Techno / Electro MK',
    color: 'from-emerald-500 to-cyan-500',   
    cover: 'assets/cover_techno.jpg',
    themeColor: '#00E5FF'
  }
];

export const LICENSE_TIERS = [
  { 
    id: 'standard', 
    label: 'Licencia Estándar (WAV)', 
    price: 500, 
    desc: 'WAV Masterizado de Alta Calidad · Uso comercial no exclusivo' 
  },
  { 
    id: 'pro',      
    label: 'Licencia Pro (Stems)', 
    price: 700, 
    desc: 'Trackout (Pistas separadas) + WAV Master + MP3' 
  },
  { 
    id: 'exclusive',
    label: 'Licencia Exclusiva', 
    price: 1000, 
    desc: 'Archivos completos multipista · El beat se retira del catálogo · *Precio base o % regalías' 
  },
];

export const BEATS_DATA = [
  // TRAP-MEMPH
  { 
    id: "trap-1",
    title: "Yyy Sour Play", 
    rawTitle: "Yyy Sour Play || Beat ||",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/yyy_sour_play_||_beat_||_116bpm.mp3", 
    bpm: 116,
    cover: "assets/cover_trap.jpg"
  },
  { 
    id: "trap-2",
    title: "What U Need", 
    rawTitle: "What U Need || Beat || Trap Monteking",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/what_u_need_||_beat_||_trap_monteking_121bpm.mp3", 
    bpm: 121,
    cover: "assets/cover_trap.jpg"
  },
  { 
    id: "trap-3",
    title: "Payaso De Circo", 
    rawTitle: "Payaso De Circo || Beat || Memph Trap Monteking ||",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/payaso_de_circo_||_beat_||_memph_trap_monteking_||_110bpm_112bpm.mp3", 
    bpm: 110,
    cover: "assets/cover_trap.jpg"
  },
  { 
    id: "trap-4",
    title: "Violin Negro", 
    rawTitle: "Violin Negro || Beat || Trap",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/violin_negro_||_beat_||_trap_107bpm.mp3", 
    bpm: 107,
    cover: "assets/cover_trap.jpg"
  },
  { 
    id: "trap-5",
    title: "No Traen Nada", 
    rawTitle: "No Traen Nada || Beat || Trap Memphis Monteking ||",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/no_traen_nada_||_beat_||_trap_memphis_monteking_||_125bpm_106bpm.mp3", 
    bpm: 125,
    cover: "assets/cover_trap.jpg"
  },
  { 
    id: "trap-6",
    title: "Acicalado", 
    rawTitle: "Acicalado || Beat || Trap Memph Monteking ||",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/acicalado_||_beat_||_trap_memph_monteking_||_122bpm.mp3", 
    bpm: 122,
    cover: "assets/cover_trap.jpg"
  },
  { 
    id: "trap-7",
    title: "327", 
    rawTitle: "327 || Beat || Trap Memphis Fresh ||",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/327_||_beat_||_trap_memphis_fresh_||_124bpm_123bpm.mp3", 
    bpm: 124,
    cover: "assets/cover_trap.jpg"
  },
  { 
    id: "trap-8",
    title: "Je' Cherche Le Billets Pa Les Pies 2", 
    rawTitle: "Je' Cherche Le Billets Pa Les Pies 2 || Beat || 120 Bpm || Trap Deep Monteking",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/je'_cherche_le_billets_pa_les_pies_2_||_beat_||_120_bpm_||_trap_deep_monteking.mp3", 
    bpm: 120,
    cover: "assets/cover_trap.jpg"
  },
  { 
    id: "trap-9",
    title: "Sun Boss", 
    rawTitle: "Sun Boss || Beat || Trap Monteking Houstón ||",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/sun_boss_||_beat_||_trap_monteking_houstón_||_135bpm.mp3", 
    bpm: 135,
    cover: "assets/cover_trap.jpg"
  },
  { 
    id: "trap-10",
    title: "Gota De Hielo", 
    rawTitle: "Gota De Hielo || Beat || Trap Tumbado",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/gota_de_hielo_||_beat_||_trap_tumbado_113bpm.mp3", 
    bpm: 113,
    cover: "assets/cover_trap.jpg"
  },
  { 
    id: "trap-11",
    title: "Necromancer", 
    rawTitle: "Necromancer || Beat || Trap Memphis Monteking ||",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/necromancer_||_beat_||_trap_memphis_monteking_||_125bpm_121bpm.mp3", 
    bpm: 125,
    cover: "assets/cover_trap.jpg"
  },
  { 
    id: "trap-12",
    title: "Ades", 
    rawTitle: "Ades || Beat || Trap Monteking",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/ades_||_beat_||_trap_monteking_117bpm.mp3", 
    bpm: 117,
    cover: "assets/cover_trap.jpg"
  },
  { 
    id: "trap-13",
    title: "Avem", 
    rawTitle: "Avem || Beat || Trap Monteking",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/avem_||_beat_||_60bpm_||_trap_monteking_121bpm.mp3", 
    bpm: 60,
    cover: "assets/cover_trap.jpg"
  },
  { 
    id: "trap-14",
    title: "Suave Y Denso", 
    rawTitle: "Suave Y Denso || Slow Beat || Lofi",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/suave_y_denso_||_slow_beat_||_lofi_112bpm.mp3", 
    bpm: 112,
    cover: "assets/cover_trap.jpg"
  },
  { 
    id: "trap-15",
    title: "In My Bag", 
    rawTitle: "In My Bag || Beat || Memph Monteking Detroit Trap",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/in_my_bag_||_beat_||_memph_monteking_detroit_trap_126bpm.mp3", 
    bpm: 126,
    cover: "assets/cover_trap.jpg"
  },
  { 
    id: "trap-16",
    title: "Snake", 
    rawTitle: "Snake || Drill || Beat",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/snake_||_drill_||_beat__134bpm.mp3", 
    bpm: 134,
    cover: "assets/cover_trap.jpg"
  },
  { 
    id: "trap-17",
    title: "Tomahawk", 
    rawTitle: "Tomahawk || Beat || Trap Monteking ||",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/tomahawk_||_beat_||_trap_monteking_||_130bpm_124bpm.mp3", 
    bpm: 130,
    cover: "assets/cover_trap.jpg"
  },
  { 
    id: "trap-18",
    title: "24K", 
    rawTitle: "24K || Beat || Trap ||",
    artist: "Monteking",
    album: "TRAP-MEMPH", 
    url: "TRAP-MEMPH/24k_||_beat_||_trap_||_112bpm_111bpm.mp3", 
    bpm: 112,
    cover: "assets/cover_trap.jpg"
  },

  // BOOMBAP
  { 
    id: "bb-1",
    title: "Devil", 
    rawTitle: "Devil || Beat || Boombap",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/devil_||_beat_||_boombap_154bpm.mp3", 
    bpm: 154,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-2",
    title: "Sencillo", 
    rawTitle: "Sencillo || Beat || Boombap Classic ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/sencillo_||_beat_||_boombap_classic_||_94bpm_114bpm.mp3", 
    bpm: 94,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-3",
    title: "Stairway Class", 
    rawTitle: "Stairway Class || Beat || Ohshit Boombap Classic ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/stairway_class_||_beat_||_ohshit_boombap_classic_||_75bpm_147bpm.mp3", 
    bpm: 75,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-4",
    title: "Arrastrando", 
    rawTitle: "Arrastrando || Beat || Boombap Tumbado ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/arrastrando_||_beat_||_boombap_tumbado_||_140bpm_135bpm.mp3", 
    bpm: 140,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-5",
    title: "Guru", 
    rawTitle: "Guru || Beat || Boombap-Trap",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/guru_||_beat_||_boombap-trap_113bpm.mp3", 
    bpm: 113,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-6",
    title: "Slow Reflex", 
    rawTitle: "Slow Reflex || Beat || Boombap Deep Monteking",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/slow_reflex_||_beat_||_boombap_deep_monteking_134bpm.mp3", 
    bpm: 134,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-7",
    title: "Bulldozer", 
    rawTitle: "Bulldozer || Beat || Boombap Duro || 141 Bpm",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/bulldozer_||_beat_||_boombap_duro_||_141_bpm.mp3", 
    bpm: 141,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-8",
    title: "Ponganse De Pie", 
    rawTitle: "Ponganse De Pie || Beat || Boombap Mystik Monteking ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/ponganse_de_pie_||_beat_||_boombap_mystik_monteking_||_135bpm_134bpm.mp3", 
    bpm: 135,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-9",
    title: "Falling Harp", 
    rawTitle: "Falling Harp || Beat || Boombap Dark ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/falling_harp_||_beat_||_boombap_dark_||_115bpm_114bpm.mp3", 
    bpm: 115,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-10",
    title: "Bomboycaja", 
    rawTitle: "Bomboycaja || Beat || Boombap Monteking || Dminor",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/bomboycaja_||_beat_||_boombap_monteking_||_146bpm_dminor_145bpm.mp3", 
    bpm: 146,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-11",
    title: "Muerte Lenta", 
    rawTitle: "Muerte Lenta || Beat || Boombap ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/muerte_lenta_||_beat_||_boombap_||_122bpm_123bpm.mp3", 
    bpm: 122,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-12",
    title: "Starway", 
    rawTitle: "Starway || Beat || Boombap Funk",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/starway_||_beat_||_boombap_funk__148bpm.mp3", 
    bpm: 148,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-13",
    title: "Bien O Mal", 
    rawTitle: "Bien O Mal || Beat || Boombap ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/bien_o_mal_||_beat_||_boombap_||_130bpm_131bpm.mp3", 
    bpm: 130,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-14",
    title: "Turko Americano", 
    rawTitle: "Turko Americano || Beat || Boombap ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/turko_americano_||_beat_||_boombap_||_125bpm.mp3", 
    bpm: 125,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-15",
    title: "Ese Soy", 
    rawTitle: "Ese Soy || Beat || Boombap Monteking ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/ese_soy_||_beat_||_boombap_monteking_||_119bpm_118bpm.mp3", 
    bpm: 119,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-16",
    title: "G-Funk", 
    rawTitle: "G-Funk || Beat || Gfunk Boombap ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/g-funk_||_beat_||_gfunk_boombap_||_80bpm_152bpm.mp3", 
    bpm: 80,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-17",
    title: "Hace Tiempo", 
    rawTitle: "Hace Tiempo || Beat || Cumbia Rap ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/hace_tiempo_||_beat_||_cumbia_rap_||_138bpm_139bpm.mp3", 
    bpm: 138,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-18",
    title: "La Barredora", 
    rawTitle: "La Barredora || Beat || Boombap Monteking",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/la_barredora_||_beat_||_boombap_monteking_134bpm.mp3", 
    bpm: 134,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-19",
    title: "Calabozo", 
    rawTitle: "Calabozo || Beat || Boombap Seco || C#Minor",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/calabozo_||_beat_||_boombap_seco_||_155bpm_c#minor_151bpm.mp3", 
    bpm: 155,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-20",
    title: "Me Chingue La Rodilla", 
    rawTitle: "Me Chingue La Rodilla || Beat || Boombap Monteking ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/me_chingue_la_rodilla_||_beat_||_boombap_monteking_||_140bpm_139bpm.mp3", 
    bpm: 140,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-21",
    title: "Les Confieso", 
    rawTitle: "Les Confieso || Beat || Boombap Seco",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/les_confieso_||_beat_||_boombap_seco_154bpm.mp3", 
    bpm: 154,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-22",
    title: "Digan Lo Que Digan", 
    rawTitle: "Digan Lo Que Digan || Beat || Boombap Monteking Tresillo",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/digan_lo_que_digan_||_beat_||_boombap_monteking_tresillo_118bpm.mp3", 
    bpm: 118,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-23",
    title: "Crema Y Manteca", 
    rawTitle: "Crema Y Manteca || Beat || Boombap Mystik Monteking || Dminor",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/crema_y_manteca_||_beat_||_boombap_mystik_monteking_||_130bpm_dminor_131bpm.mp3", 
    bpm: 130,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-24",
    title: "Vigilando", 
    rawTitle: "Vigilando || Beat || Boombap ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/vigilando_||_beat_||_boombap_||_120bpm.mp3", 
    bpm: 120,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-25",
    title: "Murciélago", 
    rawTitle: "Murciélago || Beat || Boombap Seco",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/murciélago_||_beat_||_boombap_seco_153bpm.mp3", 
    bpm: 153,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-26",
    title: "Ripper", 
    rawTitle: "Ripper || Beat || Boombap Mystik ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/ripper_||_beat_||_boombap_mystik_||_128bpm_127bpm.mp3", 
    bpm: 128,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-27",
    title: "Chapter One", 
    rawTitle: "Chapter One || Beat || Boombap Dark ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/chapter_one_||_beat_||_boombap_dark_||_60bpm_121bpm.mp3", 
    bpm: 60,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-28",
    title: "Donde Piso", 
    rawTitle: "Donde Piso || Beat || Boombap Mystik Monteking ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/donde_piso_||_beat_||_boombap_mystik_monteking_||_69bpm_154bpm.mp3", 
    bpm: 69,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-29",
    title: "Solo Mía", 
    rawTitle: "Solo Mía || Beat || Boombap ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/solo_mía_||_beat_||_boombap_||_132bpm.mp3", 
    bpm: 132,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-30",
    title: "High Up", 
    rawTitle: "High Up || Beat || Boombap || 145 Bpm",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/high_up_||_beat_||_boombap_||_145_bpm.mp3", 
    bpm: 145,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-31",
    title: "Horno", 
    rawTitle: "Horno || Beat || Boombap",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/horno_||_beat_||_boombap_103bpm.mp3", 
    bpm: 103,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-32",
    title: "Boiler", 
    rawTitle: "Boiler || Beat || Boombap Mystik Monteking ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/boiler_||_beat_||_boombap_mystik_monteking_||_130bpm.mp3", 
    bpm: 130,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-33",
    title: "Nightsleep", 
    rawTitle: "Nightsleep || Beat || Ohshit Boombap Classic ||",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/nightsleep_||_beat_||_ohshit_boombap_classic_||_120bpm_121bpm.mp3", 
    bpm: 120,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-34",
    title: "Slow Burning", 
    rawTitle: "Slow Burning || Beat || Boombap",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/slow_burning_||_beat_||_boombap__112bpm.mp3", 
    bpm: 112,
    cover: "assets/cover_boombap.jpg"
  },
  { 
    id: "bb-35",
    title: "Platinum", 
    rawTitle: "Platinum || Beat || Boombap Seco Monteking",
    artist: "Monteking",
    album: "BOOMBAP", 
    url: "BOOMBAP/platinum_||_beat_||_boombap_seco_monteking_138bpm.mp3", 
    bpm: 138,
    cover: "assets/cover_boombap.jpg"
  },

  // SUAVE
  { 
    id: "suave-1",
    title: "Arriba De Ti", 
    rawTitle: "Arriba De Ti || Beat || Lofi Rnb Boombap",
    artist: "Monteking",
    album: "SUAVE", 
    url: "SUAVE/arriba_de_ti_||_beat_||_lofi_rnb_boombap_114bpm.mp3", 
    bpm: 114,
    cover: "assets/cover_suave.jpg"
  },
  { 
    id: "suave-2",
    title: "Starway (Suave)", 
    rawTitle: "Starway || Beat || Boombap Funk",
    artist: "Monteking",
    album: "SUAVE", 
    url: "SUAVE/starway_||_beat_||_boombap_funk_148bpm.mp3", 
    bpm: 148,
    cover: "assets/cover_suave.jpg"
  },
  { 
    id: "suave-3",
    title: "Slow Reflex (Suave)", 
    rawTitle: "Slow Reflex || Beat || Boombap Deep Monteking",
    artist: "Monteking",
    album: "SUAVE", 
    url: "SUAVE/slow_reflex_||_beat_||_boombap_deep_monteking_134bpm.mp3", 
    bpm: 134,
    cover: "assets/cover_suave.jpg"
  },
  { 
    id: "suave-4",
    title: "Ojitos Rojos", 
    rawTitle: "Ojitos Rojos || Beat || Sushi Body Hot Trap ||",
    artist: "Monteking",
    album: "SUAVE", 
    url: "SUAVE/ojitos_rojos_||_beat_||_sushi_body_hot_trap_||_60bpm_119bpm.mp3", 
    bpm: 60,
    cover: "assets/cover_suave.jpg"
  },
  { 
    id: "suave-5",
    title: "Flavors", 
    rawTitle: "Flavors || Beat || Hot Trap ||",
    artist: "Monteking",
    album: "SUAVE", 
    url: "SUAVE/flavors_||_beat_||_hot_trap_||_144bpm_127bpm.mp3", 
    bpm: 144,
    cover: "assets/cover_suave.jpg"
  },

  // TECHNO. MK / ELECTRO MK
  { 
    id: "techno-1",
    title: "Margott", 
    rawTitle: "Margott || Techno Mk ||",
    artist: "Monteking",
    album: "TECHNO. MK", 
    url: "ELECTRO MK/margott_||_techno_mk_||_104bpm_107bpm.mp3", 
    bpm: 104,
    cover: "assets/cover_techno.jpg"
  },
  { 
    id: "techno-2",
    title: "Psyghetto 1", 
    rawTitle: "Psyghetto 1  || Techno Mk ||",
    artist: "Monteking",
    album: "TECHNO. MK", 
    url: "ELECTRO MK/psyghetto_1__||_techno_mk_||_120bpm_121bpm.mp3", 
    bpm: 120,
    cover: "assets/cover_techno.jpg"
  },
  { 
    id: "techno-3",
    title: "Churpybaby", 
    rawTitle: "Churpybaby || Techno Mk ||",
    artist: "Monteking",
    album: "TECHNO. MK", 
    url: "ELECTRO MK/churpybaby_||_techno_mk_||_113bpm.mp3", 
    bpm: 113,
    cover: "assets/cover_techno.jpg"
  },
  { 
    id: "techno-4",
    title: "Oh Shit", 
    rawTitle: "Oh Shit || Techno Mk ||",
    artist: "Monteking",
    album: "TECHNO. MK", 
    url: "ELECTRO MK/oh_shit_||_techno_mk_||_115bpm_103bpm.mp3", 
    bpm: 115,
    cover: "assets/cover_techno.jpg"
  }
];

export default BEATS_DATA;
