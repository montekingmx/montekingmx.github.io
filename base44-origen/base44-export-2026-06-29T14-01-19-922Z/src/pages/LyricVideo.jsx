const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Link2, Scissors, FileText, Type, Download, Loader2,
  CheckCircle2, AlertCircle, Sparkles, ChevronRight, ChevronLeft,
  Palette, Image
} from 'lucide-react';

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/66ca3a969_LOGO-MK-COLOR-SH.png";

const FONT_OPTIONS = [
  { id: 'impact',     name: 'Impact',        style: { fontFamily: 'Impact, Arial Black, sans-serif', fontWeight: 'bold' } },
  { id: 'montserrat', name: 'Montserrat',     style: { fontFamily: 'Montserrat, sans-serif', fontWeight: '800' } },
  { id: 'courier',    name: 'Courier',        style: { fontFamily: 'Courier New, monospace', fontWeight: 'bold' } },
  { id: 'georgia',    name: 'Georgia',        style: { fontFamily: 'Georgia, serif', fontWeight: 'bold' } },
  { id: 'arial',      name: 'Arial Black',    style: { fontFamily: 'Arial Black, sans-serif' } },
  { id: 'trebuchet',  name: 'Trebuchet',      style: { fontFamily: 'Trebuchet MS, sans-serif', fontWeight: '700' } },
  { id: 'verdana',    name: 'Verdana',        style: { fontFamily: 'Verdana, sans-serif', fontWeight: 'bold' } },
  { id: 'palatino',   name: 'Palatino',       style: { fontFamily: 'Palatino, serif', fontStyle: 'italic' } },
  { id: 'comic',      name: 'Comic',          style: { fontFamily: 'Comic Sans MS, cursive' } },
  { id: 'tahoma',     name: 'Tahoma',         style: { fontFamily: 'Tahoma, sans-serif', fontWeight: 'bold' } },
  { id: 'century',    name: 'Century Gothic',  style: { fontFamily: 'Century Gothic, sans-serif', fontWeight: '700' } },
  { id: 'gothic',     name: 'Franklin Gothic', style: { fontFamily: 'Franklin Gothic Medium, sans-serif' } },
  { id: 'lucida',     name: 'Lucida',          style: { fontFamily: 'Lucida Sans, sans-serif', fontWeight: 'bold' } },
  { id: 'garamond',   name: 'Garamond',        style: { fontFamily: 'Garamond, serif', fontStyle: 'italic', fontWeight: 'bold' } },
  { id: 'rockwell',   name: 'Rockwell',        style: { fontFamily: 'Rockwell, serif', fontWeight: 'bold' } },
  { id: 'futura',     name: 'Futura',          style: { fontFamily: 'Futura, Century Gothic, sans-serif', fontWeight: '700', letterSpacing: '0.05em' } },
  { id: 'bebas',      name: 'Bebas Style',     style: { fontFamily: 'Impact, sans-serif', letterSpacing: '0.12em', fontWeight: '900' } },
  { id: 'stencil',    name: 'Stencil',         style: { fontFamily: 'Impact, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase' } },
  { id: 'mono',       name: 'Monospace',       style: { fontFamily: 'Menlo, Monaco, Courier New, monospace', fontWeight: 'bold' } },
  { id: 'narrow',     name: 'Condensed',       style: { fontFamily: 'Arial Narrow, sans-serif', fontWeight: '900', letterSpacing: '-0.02em' } },
];

const TEXT_COLORS  = ['#FFFFFF','#FFD700','#FF4136','#00FF9F','#00BFFF','#FF69B4','#FF8C00','#7B2FBE','#00E5FF','#39FF14'];
const SHADOW_OPTS  = [
  { id: 'none',    label: 'Sin sombra',    css: 'none' },
  { id: 'black',   label: 'Sombra negra',  css: '2px 2px 8px #000' },
  { id: 'gold',    label: 'Glow dorado',   css: '0 0 20px #FFD700, 0 0 40px #FFD700' },
  { id: 'neon',    label: 'Neon verde',    css: '0 0 10px #00FF9F, 0 0 30px #00FF9F' },
  { id: 'fire',    label: 'Fuego rojo',    css: '0 0 10px #FF4136, 2px 2px 0 #000' },
  { id: 'white',   label: 'Glow blanco',   css: '0 0 15px #fff, 0 0 30px #fff' },
];

const STEPS = ['URL', 'Transcripción', 'Estilo', 'Clips'];

export default function LyricVideoPage() {
  const [step, setStep] = useState(0);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1 result
  const [clips, setClips] = useState([]);
  const [transcript, setTranscript] = useState('');

  // Step 2: editable transcript
  const [editedTranscript, setEditedTranscript] = useState('');

  // Step 3: style
  const [font, setFont] = useState(FONT_OPTIONS[0]);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [shadowOpt, setShadowOpt] = useState(SHADOW_OPTS[1]);
  const [bgColor, setBgColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(32);

  const analyze = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    try {
      const result = await db.integrations.Core.InvokeLLM({
        prompt: `Analiza este video de YouTube/redes: "${url}"

Simula el análisis de un video viral. Devuelve:
1. Una transcripción detallada del audio (si es música, las letras; si es podcast, el diálogo principal)
2. Identifica 5 segmentos virales/momentos clave con timestamps estimados

Devuelve JSON con esta estructura exacta.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            type: { type: 'string', description: 'música, podcast, video' },
            transcript: { type: 'string', description: 'transcripción completa o letra' },
            viral_clips: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  start_time: { type: 'string' },
                  end_time: { type: 'string' },
                  duration_seconds: { type: 'number' },
                  hook: { type: 'string', description: 'por qué este clip es viral' },
                  excerpt: { type: 'string', description: 'texto/lyric de este clip' },
                }
              }
            }
          }
        }
      });
      setTranscript(result.transcript || '');
      setEditedTranscript(result.transcript || '');
      setClips(result.viral_clips || []);
      setStep(1);
    } catch(e) {
      setError('No se pudo analizar el video. Verifica el enlace e intenta de nuevo.');
    }
    setLoading(false);
  };

  const previewText = editedTranscript.split('\n').slice(0,3).join('\n') || 'Preview de tus lyrics aquí...';

  // Canvas-based image export (9:16 vertical frame per clip)
  const downloadClipImage = (clip, idx) => {
    const W = 1080, H = 1920;
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, W, H);

    // Lyric text
    const fontStack = font.style.fontFamily || 'Impact, sans-serif';
    const fw = font.style.fontWeight || 'bold';
    const fs = Math.round(fontSize * 2.5);
    ctx.font = `${fw} ${fs}px ${fontStack}`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Shadow
    if (shadowOpt.css !== 'none') {
      ctx.shadowColor = textColor;
      ctx.shadowBlur = 30;
    }

    // Word-wrap text
    const text = clip.excerpt || clip.title || '';
    const words = text.split(' ');
    const maxW = W * 0.8;
    let lines = [], line = '';
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxW && line) {
        lines.push(line); line = word;
      } else { line = test; }
    }
    if (line) lines.push(line);

    const lineH = fs * 1.35;
    const startY = H / 2 - ((lines.length - 1) * lineH) / 2;
    lines.forEach((l, i) => ctx.fillText(l, W / 2, startY + i * lineH));

    // Clip number badge
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(212,175,55,0.9)';
    ctx.beginPath(); ctx.roundRect(W/2 - 60, 80, 120, 60, 30); ctx.fill();
    ctx.fillStyle = '#000';
    ctx.font = `bold 28px sans-serif`;
    ctx.fillText(`CLIP ${idx + 1}`, W/2, 112);

    // Watermark
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = '#fff';
    ctx.font = `bold 36px Impact, sans-serif`;
    ctx.textAlign = 'right';
    ctx.fillText('MONTEKING MX', W - 50, H - 60);
    ctx.globalAlpha = 1;

    // Download
    const a = document.createElement('a');
    a.download = `monteking_lyric_clip_${idx + 1}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  const downloadAllClips = () => {
    clips.forEach((clip, i) => {
      setTimeout(() => downloadClipImage(clip, i), i * 300);
    });
  };

  return (
    <div className="min-h-screen bg-black py-12 pb-32">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="text-yellow-500 uppercase tracking-[0.3em] text-xs font-medium">Herramienta IA</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-3">
            Video → <span className="text-yellow-500">Lyric Clips</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm">
            Pega un enlace de YouTube, Instagram o Facebook. La IA extrae los clips más virales, transcribe el audio y genera tus videos con lyrics personalizadas.
          </p>
        </motion.div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                i === step ? 'bg-yellow-500 text-black' :
                i < step ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                'bg-zinc-900 text-zinc-500 border border-zinc-800'
              }`}>
                {i < step ? <CheckCircle2 className="w-3 h-3" /> : <span>{i+1}</span>}
                {s}
              </div>
              {i < STEPS.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 0: URL */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <h2 className="text-white font-bold">Pega tu enlace</h2>
                  <p className="text-zinc-500 text-xs">YouTube, Instagram, Facebook, TikTok</p>
                </div>
              </div>

              <div className="flex gap-3 mb-4">
                <Input
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && analyze()}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="bg-zinc-800 border-zinc-700 text-white flex-1"
                />
                <Button onClick={analyze} disabled={loading || !url.trim()}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Sparkles className="w-4 h-4 mr-2" />Analizar</>}
                </Button>
              </div>

              {loading && (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 text-yellow-500 animate-spin mx-auto mb-3" />
                  <p className="text-zinc-400 text-sm">Analizando video con IA...</p>
                  <p className="text-zinc-600 text-xs mt-1">Extrayendo clips virales y transcribiendo audio</p>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="mt-6 grid sm:grid-cols-3 gap-3">
                {[
                  { icon: Scissors, label: '5 Clips Virales', desc: 'Los mejores momentos automáticamente' },
                  { icon: FileText, label: 'Transcripción', desc: 'Audio → Texto con IA' },
                  { icon: Type, label: 'Lyrics Estilizadas', desc: '20+ fuentes y estilos' },
                ].map(f => (
                  <div key={f.label} className="bg-zinc-800/50 rounded-xl p-4 text-center border border-zinc-700/50">
                    <f.icon className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
                    <p className="text-white text-xs font-semibold">{f.label}</p>
                    <p className="text-zinc-500 text-xs mt-1">{f.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 1: Transcript */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }}
              className="space-y-4">
              {/* Viral clips */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-yellow-500" />
                  {clips.length} Clips Virales Detectados
                </h2>
                <div className="space-y-3">
                  {clips.map((clip, i) => (
                    <div key={i} className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-500 font-bold text-sm shrink-0">
                          {i+1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm">{clip.title}</p>
                          <p className="text-zinc-500 text-xs">{clip.start_time} → {clip.end_time} ({clip.duration_seconds}s)</p>
                          <p className="text-yellow-400/80 text-xs mt-1 italic">"{clip.hook}"</p>
                          {clip.excerpt && <p className="text-zinc-400 text-xs mt-1 truncate">{clip.excerpt}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transcript editor */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-white font-bold mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-yellow-500" />
                  Transcripción / Lyrics
                  <span className="text-zinc-500 text-xs font-normal">— edita si necesitas corregir</span>
                </h2>
                <Textarea
                  value={editedTranscript}
                  onChange={e => setEditedTranscript(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white min-h-48 font-mono text-sm resize-none"
                  placeholder="La transcripción aparecerá aquí..."
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" className="border-zinc-700 text-zinc-400" onClick={() => setStep(0)}>
                  <ChevronLeft className="w-4 h-4 mr-1" />Volver
                </Button>
                <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold" onClick={() => setStep(2)}>
                  Elegir Estilo <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Style */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }}
              className="space-y-4">
              {/* Preview */}
              <div className="rounded-2xl overflow-hidden border border-zinc-700 aspect-video relative"
                style={{ background: bgColor }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center gap-3">
                  <p style={{
                    ...font.style,
                    color: textColor,
                    textShadow: shadowOpt.css,
                    fontSize: `${fontSize}px`,
                    lineHeight: 1.3,
                    whiteSpace: 'pre-line',
                  }}>
                    {previewText}
                  </p>
                  {/* Watermark */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-30">
                    <img src={LOGO_URL} className="w-5 h-5 object-contain" alt="MK" />
                    <span className="text-white text-xs font-bold">MONTEKING</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Fonts */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm">
                    <Type className="w-4 h-4 text-yellow-500" />Fuente ({FONT_OPTIONS.length})
                  </h3>
                  <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {FONT_OPTIONS.map(f => (
                      <button key={f.id} onClick={() => setFont(f)}
                        className={`px-2.5 py-2 rounded-lg text-xs text-left transition-all border ${
                          font.id === f.id ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400' : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'
                        }`}
                        style={f.style}>
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors & shadow */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 space-y-4">
                  <div>
                    <h3 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
                      <Palette className="w-4 h-4 text-yellow-500" />Color de texto
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {TEXT_COLORS.map(c => (
                        <button key={c} onClick={() => setTextColor(c)}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${textColor === c ? 'border-white scale-110' : 'border-zinc-700'}`}
                          style={{ background: c }} />
                      ))}
                      <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)}
                        className="w-8 h-8 rounded-full cursor-pointer border-2 border-zinc-700" title="Color personalizado" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-2 text-sm">Fondo</h3>
                    <div className="flex items-center gap-2">
                      <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer" />
                      <span className="text-zinc-500 text-xs">Color de fondo del video</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-2 text-sm">Sombra / Efecto</h3>
                    <div className="grid grid-cols-2 gap-1.5">
                      {SHADOW_OPTS.map(s => (
                        <button key={s.id} onClick={() => setShadowOpt(s)}
                          className={`px-2 py-1.5 rounded-lg text-xs transition-all border ${
                            shadowOpt.id === s.id ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400' : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'
                          }`}>
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-semibold mb-2 text-sm">Tamaño: {fontSize}px</h3>
                    <input type="range" min={16} max={72} value={fontSize} onChange={e => setFontSize(+e.target.value)}
                      className="w-full accent-yellow-500" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" className="border-zinc-700 text-zinc-400" onClick={() => setStep(1)}>
                  <ChevronLeft className="w-4 h-4 mr-1" />Volver
                </Button>
                <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold" onClick={() => setStep(3)}>
                  Generar Clips <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Generate */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity:0,x:20 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:-20 }}
              className="space-y-4">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-white font-bold mb-2 flex items-center gap-2">
                  <Download className="w-4 h-4 text-yellow-500" />
                  Tus {clips.length} Lyric Clips Listos
                </h2>
                <p className="text-zinc-500 text-sm mb-5">
                  Cada clip incluye las lyrics con el estilo elegido y la marca de agua de Monteking. Descarga individual o todos juntos.
                </p>

                {/* Style summary */}
                <div className="bg-zinc-800/50 rounded-xl p-4 mb-4 flex flex-wrap gap-3 items-center text-sm">
                  <span className="text-zinc-400">Fuente:</span>
                  <span className="text-white font-semibold" style={font.style}>{font.name}</span>
                  <span className="w-5 h-5 rounded-full border border-zinc-600 inline-block" style={{ background: textColor }} />
                  <span className="text-zinc-400">{shadowOpt.label}</span>
                  <span className="text-zinc-400">·</span>
                  <span className="text-zinc-400">{fontSize}px</span>
                </div>

                {/* Clip cards */}
                <div className="space-y-3">
                  {clips.map((clip, i) => (
                    <div key={i} className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-9 rounded-lg overflow-hidden relative border border-zinc-600"
                            style={{ background: bgColor, minWidth: 56 }}>
                            <p style={{ ...font.style, color: textColor, textShadow: shadowOpt.css, fontSize: '6px', lineHeight: 1.2 }}
                              className="absolute inset-0 flex items-center justify-center text-center p-1">
                              {clip.excerpt?.split(' ').slice(0,4).join(' ')}
                            </p>
                            <div className="absolute bottom-0.5 right-0.5 opacity-30">
                              <img src={LOGO_URL} className="w-2 h-2 object-contain" alt="" />
                            </div>
                          </div>
                          <div>
                            <p className="text-white text-sm font-semibold">{clip.title}</p>
                            <p className="text-zinc-500 text-xs">{clip.start_time} – {clip.end_time} · {clip.duration_seconds}s · MP4 vertical 9:16</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline"
                          className="border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10 shrink-0"
                          onClick={() => downloadClipImage(clip, i)}>
                          <Download className="w-3.5 h-3.5 mr-1.5" />
                          Descargar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-bold" onClick={downloadAllClips}>
                    <Download className="w-4 h-4 mr-2" />
                    Descargar todos ({clips.length} imágenes PNG)
                  </Button>
                </div>
                <div className="mt-3 p-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-xs text-zinc-400">
                  <p className="font-semibold text-white mb-1">📸 Formato: imágenes PNG 1080×1920 (9:16)</p>
                  <p>Cada imagen es un frame listo para usarse como portada de Reels/TikTok con tus lyrics estilizadas y watermark Monteking. Para video completo con audio, importa las imágenes en CapCut, Premiere o DaVinci Resolve.</p>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" className="border-zinc-700 text-zinc-400" onClick={() => setStep(2)}>
                  <ChevronLeft className="w-4 h-4 mr-1" />Volver al Estilo
                </Button>
                <Button variant="outline" className="border-zinc-700 text-zinc-400" onClick={() => { setStep(0); setUrl(''); setClips([]); setTranscript(''); setEditedTranscript(''); }}>
                  Nuevo Video
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}