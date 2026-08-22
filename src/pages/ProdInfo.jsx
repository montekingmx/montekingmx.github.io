import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Music, Sliders, Zap, BookOpen, ChevronDown, ChevronUp,
  Volume2, Waves, BarChart2, Target, Star, ArrowRight
} from 'lucide-react';

const SECTIONS = [
  {
    id: 'produccion',
    icon: Music,
    color: 'text-yellow-500',
    bg: 'from-yellow-500/10 to-orange-500/5',
    border: 'border-yellow-500/20',
    title: 'Producción Musical',
    subtitle: 'Bases sólidas para producers',
    tips: [
      { title: 'El groove viene del cuantizado imperfecto', desc: 'No quantices al 100%. Un valor de 75-85% da humanidad al beat. Los mejores productores de trap usan swing de 55-65%.' },
      { title: 'Empieza siempre por el kick y el snare', desc: 'El ritmo es la columna vertebral. Hasta que el kick y snare suenen perfectos, no añadas nada más. 808 ≠ kick.' },
      { title: 'Menos es más en el arreglo', desc: 'Un beat con 4-6 elementos bien mezclados suena mejor que 20 capas peleando. Silencio = espacio = claridad.' },
      { title: 'La tonalidad lo es todo', desc: 'Melodía, sample y 808 DEBEN estar en la misma tonalidad. Un 808 desafinado destruye el track completo.' },
      { title: 'Varía cada 4-8 compases', desc: 'El cerebro humano se aburre cada 8 compases. Añade fills, cambios de energía, drops, elementos nuevos.' },
    ]
  },
  {
    id: 'mezcla',
    icon: Sliders,
    color: 'text-blue-400',
    bg: 'from-blue-500/10 to-cyan-500/5',
    border: 'border-blue-500/20',
    title: 'Mezcla (Mixing)',
    subtitle: 'Claridad y balance',
    tips: [
      { title: 'Ganar espacio con frecuencias', desc: 'Cada instrumento necesita su "casa" en el espectro. Kick: 60-100Hz. Snare: 200-300Hz + 5kHz. Voz: 1-5kHz. Mezcla sin competencia.' },
      { title: 'EQ: quita antes de añadir', desc: 'Cortar frecuencias problemáticas (-3 a -6dB) siempre suena más profesional que añadir. Corta lo que sobra, no añadas lo que falta.' },
      { title: 'La regla del -18dBFS', desc: 'Graba y mezcla con tu señal promedio en -18dBFS (RMS). Esto da headroom para mastering sin distorsión ni clipping.' },
      { title: 'Sidechain el 808 al kick', desc: 'Un sidechain de 2-4ms de attack hace que el kick "respire" sobre el 808. Es el sonido de trap moderno por excelencia.' },
      { title: 'Referencia en múltiples sistemas', desc: 'Mezcla en monitores, revisa en auriculares, en el celular, en el coche. Si suena bien en todos = mezcla profesional.' },
    ]
  },
  {
    id: 'mastering',
    icon: Zap,
    color: 'text-purple-400',
    bg: 'from-purple-500/10 to-pink-500/5',
    border: 'border-purple-500/20',
    title: 'Mastering Profesional',
    subtitle: 'El toque final',
    tips: [
      { title: 'Estándar Monteking: -8 a -5 LUFS (+3 LUFS sobre lo convencional)', desc: 'En Monteking Records masterizamos a -8 y hasta -5 LUFS (+3 LUFS más fuerte que los estándares convencionales de streaming) para garantizar máxima pegada, presencia comercial y energía agresiva en clubs y bocinas de calle.' },
      { title: 'Limiter de alta gama y True Peak', desc: 'Un limiter profesional (FabFilter Pro-L 2, Ozone Maximizer) con True Peak en -0.5 a -1dBTP evita distorsión inter-sample mientras mantiene la presión sonora al máximo.' },
      { title: 'Stereo widening estratégico', desc: 'Amplía frecuencias medias-altas (1kHz+) pero mantén el sub (por debajo de 100Hz) en mono. Las bocinas pequeñas no reproducen sub estéreo.' },
      { title: 'EQ de mastering: máximo ±3dB', desc: 'En mastering, cambios sutiles tienen gran impacto. Si necesitas más de 3dB, el problema está en la mezcla, no en el master.' },
      { title: 'Haz referencia con tracks comerciales', desc: 'Usa SPAN o iZotope Insight para comparar tu master con canciones del mismo género en plataformas. Emula el espectro, no el volumen.' },
    ]
  },
  {
    id: 'flujo',
    icon: Target,
    color: 'text-green-400',
    bg: 'from-green-500/10 to-teal-500/5',
    border: 'border-green-500/20',
    title: 'Flujo de Trabajo',
    subtitle: 'Productividad máxima',
    tips: [
      { title: 'El template de proyecto es tu aliado', desc: 'Crea un template en tu DAW con canales pre-configurados, FX básicos y grupos. Ahorra 20-30 min por beat.' },
      { title: 'Deadline falso = disciplina real', desc: 'Pon un timer de 60-90 minutos por beat. La restricción de tiempo elimina la parálisis por análisis. \'Done > Perfect\'.' },
      { title: 'Archiva todo, borra nada', desc: 'Ese beat "malo" de hace 6 meses puede ser el mejor sample de tu próximo proyecto. Organiza con fechas y géneros.' },
      { title: 'Aprende teoría musical: 30 min/día', desc: 'Escalas, modos, progresiones de acordes. No necesitas ser pianista, pero entender Im-bVII-bVI-bVII cambia tu game.' },
      { title: 'Feedback real antes de lanzar', desc: 'Muéstrale el beat a 3 personas que NO te conocen. Su reacción honesta vale más que 100 opiniones de amigos.' },
    ]
  },
];

const FREQ_DATA = [
  { range: 'Sub Bass', hz: '20–60Hz', desc: 'Kick punch, 808 body', color: '#FF4136' },
  { range: 'Bass', hz: '60–250Hz', desc: 'Warmth, fundación', color: '#FF8C00' },
  { range: 'Low Mid', hz: '250–500Hz', desc: 'Cuerpo de instrumentos', color: '#FFD700' },
  { range: 'Mid', hz: '500–2kHz', desc: 'Presencia, voz principal', color: '#00D084' },
  { range: 'High Mid', hz: '2–6kHz', desc: 'Claridad, ataque, articulación', color: '#00BFFF' },
  { range: 'Air', hz: '6–20kHz', desc: 'Brillo, shimmer, hi-hats', color: '#BF7FFF' },
];

const LUFS_DATA = [
  { platform: 'Spotify', lufs: -11, color: '#1DB954' },
  { platform: 'YouTube', lufs: -10, color: '#FF0000' },
  { platform: 'Apple Music', lufs: -13, color: '#FC3C44' },
  { platform: 'SoundCloud', lufs: -11, color: '#FF7700' },
  { platform: 'Tidal', lufs: -11, color: '#00FFFF' },
  { platform: 'Amazon', lufs: -11, color: '#00A8E0' },
];

function TipCard({ tip, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07 }}
      className="border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors"
    >
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 p-4 text-left bg-zinc-900/40 hover:bg-zinc-900/70 transition-colors">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-xs font-bold flex items-center justify-center shrink-0">
            {i + 1}
          </span>
          <p className="text-white text-sm font-semibold">{tip.title}</p>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-zinc-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            className="overflow-hidden">
            <p className="text-zinc-400 text-sm px-4 pb-4 pt-0 border-t border-zinc-800/50 leading-relaxed">
              {tip.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProdInfoPage() {
  const [activeSection, setActiveSection] = useState('produccion');
  const section = SECTIONS.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-black py-12 pb-32">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-medium">Knowledge Base</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-3">
            Prod. Info & <span className="text-yellow-500">Tips</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm">
            Guía profesional de producción, mezcla y mastering. Todo lo que necesitas saber para elevar tu nivel.
          </p>
        </motion.div>

        {/* Section tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all border ${
                activeSection === s.id
                  ? `bg-gradient-to-r ${s.bg} border-yellow-500/40 ${s.color}`
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-600'
              }`}>
              <s.icon className="w-4 h-4" />
              {s.title}
            </button>
          ))}
        </div>

        {/* Tips */}
        <AnimatePresence mode="wait">
          <motion.div key={activeSection} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            className={`bg-gradient-to-br ${section.bg} border ${section.border} rounded-2xl p-6 mb-8`}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-zinc-900/80 flex items-center justify-center">
                <section.icon className={`w-5 h-5 ${section.color}`} />
              </div>
              <div>
                <h2 className="text-white font-bold">{section.title}</h2>
                <p className="text-zinc-500 text-xs">{section.subtitle}</p>
              </div>
            </div>
            <div className="space-y-2">
              {section.tips.map((tip, i) => <TipCard key={i} tip={tip} i={i} />)}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Interactive: Frequency Spectrum */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-bold mb-2 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-yellow-500" />
            Espectro de Frecuencias — Referencia Visual
          </h2>
          <p className="text-zinc-500 text-xs mb-5">Hover sobre cada rango para ver qué instrumentos viven ahí</p>
          <div className="flex gap-1 h-32 items-end">
            {FREQ_DATA.map((f, i) => (
              <div key={f.range} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer">
                <motion.div
                  className="w-full rounded-t-lg relative"
                  style={{ background: f.color, height: `${40 + i * 12}%`, opacity: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                >
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-xs w-28 text-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    <p className="text-white font-bold">{f.hz}</p>
                    <p className="text-zinc-400">{f.desc}</p>
                  </div>
                </motion.div>
                <p className="text-zinc-500 text-xs text-center leading-tight">{f.range}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* LUFS Reference */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-6">
          <h2 className="text-white font-bold mb-2 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-yellow-500" />
            Estándares de LUFS por Plataforma
          </h2>
          <p className="text-zinc-500 text-xs mb-5">Optimiza tu master para cada plataforma de streaming</p>
          <div className="space-y-3">
            {LUFS_DATA.map(p => (
              <div key={p.platform} className="flex items-center gap-3">
                <span className="text-zinc-300 text-sm w-28 shrink-0">{p.platform}</span>
                <div className="flex-1 bg-zinc-800 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((p.lufs + 20) / 20) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{ background: p.color }}
                  />
                </div>
                <span className="text-sm font-mono font-bold w-16 text-right" style={{ color: p.color }}>
                  {p.lufs} LUFS
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Reference Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'BPM Trap', value: '130–160', icon: '🥁', sub: 'Moderno' },
            { label: 'BPM Boom Bap', value: '85–100', icon: '🎤', sub: 'Clásico' },
            { label: 'Sample Rate', value: '48kHz', icon: '🔊', sub: 'Estándar pro' },
            { label: 'Bit Depth', value: '24-bit', icon: '💾', sub: 'Grabación' },
          ].map(c => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center hover:border-yellow-500/30 transition-colors"
            >
              <span className="text-2xl">{c.icon}</span>
              <p className="text-yellow-500 font-bold text-xl mt-2">{c.value}</p>
              <p className="text-white text-xs font-semibold">{c.label}</p>
              <p className="text-zinc-600 text-xs">{c.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}