const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Save, Volume2, Share2, ChevronDown, ChevronUp, Music } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

import { toast } from "sonner";

// ── Instruments ──────────────────────────────────────────────────────────────
const INSTRUMENTS = [
  { name: 'KICK 808',  color: '#EF4444', synth: 'kick'    },
  { name: 'KICK 2',    color: '#DC2626', synth: 'kick2'   },
  { name: 'SNARE',     color: '#F97316', synth: 'snare'   },
  { name: 'SNARE 2',   color: '#EA580C', synth: 'snare2'  },
  { name: 'HI-HAT',   color: '#EAB308', synth: 'hihat'   },
  { name: 'OPEN HAT', color: '#CA8A04', synth: 'openhat' },
  { name: 'RIDE',     color: '#84CC16', synth: 'ride'    },
  { name: 'CLAP',     color: '#22C55E', synth: 'clap'    },
  { name: 'PERC',     color: '#14B8A6', synth: 'perc'    },
  { name: 'BASS 808', color: '#8B5CF6', synth: 'bass'    },
  { name: 'SUB',      color: '#6366F1', synth: 'sub'     },
  { name: 'PLUCK',    color: '#3B82F6', synth: 'pluck'   },
  { name: 'SYNTH HI', color: '#EC4899', synth: 'synthhi' },
  { name: 'SYNTH LO', color: '#F59E0B', synth: 'synthlo' },
  { name: 'STAB',     color: '#10B981', synth: 'stab'    },
  { name: 'FX RISE',  color: '#A78BFA', synth: 'fx'      },
];

// ── Presets ───────────────────────────────────────────────────────────────────
const STEPS = 16;
const E = 0, X = 1;
const PRESETS = {
  trap: {
    name:'🔥 Trap', bpm: 90,
    rows:[
      [X,E,E,E, E,E,E,E, X,E,E,E, E,E,E,E],//kick
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],//kick2
      [E,E,E,E, X,E,E,E, E,E,E,E, X,E,E,E],//snare
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],//snare2
      [X,E,X,E, X,E,X,E, X,E,X,E, X,E,X,X],//hihat
      [E,E,E,E, E,E,X,E, E,E,E,E, E,E,X,E],//openhat
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],//ride
      [E,E,E,E, X,E,E,E, E,E,E,E, X,E,E,X],//clap
      [E,X,E,E, E,X,E,E, E,X,E,E, E,X,E,E],//perc
      [X,E,E,E, E,X,E,E, X,E,E,E, E,E,X,E],//bass
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],//sub
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],//pluck
      [E,E,X,E, E,E,E,E, E,E,X,E, E,X,E,E],//synthhi
      [E,E,E,X, E,E,E,E, E,X,E,E, E,E,E,X],//synthlo
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],//stab
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],//fx
    ]
  },
  boombap: {
    name:'🎤 Boom Bap', bpm: 95,
    rows:[
      [X,E,E,E, E,E,E,E, X,E,E,E, E,E,E,E],
      [E,E,E,E, E,E,E,X, E,E,E,E, E,E,E,E],
      [E,E,E,E, X,E,E,E, E,E,E,E, X,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,X,E],
      [X,E,X,E, X,E,X,E, X,E,X,E, X,E,X,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,X,E,E, E,X,E,E, E,X,E,E, E,X,E,E],
      [E,E,E,E, X,E,E,E, E,E,E,E, X,E,E,E],
      [E,E,X,E, E,E,X,E, E,E,X,E, E,E,X,E],
      [X,E,E,X, E,E,E,E, X,E,E,E, E,X,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,E,E, E,X,E,E, E,E,E,X, E,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
    ]
  },
  reggaeton: {
    name:'🌴 Reggaeton', bpm: 96,
    rows:[
      [X,E,E,E, E,E,E,E, X,E,E,E, E,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,X,E, E,E,X,E, E,E,X,E, E,E,X,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [X,E,X,X, E,X,X,E, X,E,X,X, E,X,X,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,X,E, E,X,E,E, E,E,X,E, E,X,E,X],
      [E,X,E,X, E,X,E,X, E,X,E,X, E,X,E,X],
      [X,E,E,E, X,E,E,X, E,E,X,E, E,X,E,E],
      [X,E,E,E, E,E,E,E, X,E,E,E, E,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
    ]
  },
  corridos: {
    name:'🤠 Corridos', bpm: 78,
    rows:[
      [X,E,E,X, E,X,E,E, X,E,E,X, E,X,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,E,E, X,E,E,E, E,E,E,E, X,E,E,X],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [X,X,E,X, X,E,X,X, X,X,E,X, X,E,X,X],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,X,E, X,E,E,E, E,E,X,E, X,E,E,E],
      [E,X,E,E, E,X,E,E, E,X,E,E, E,X,E,E],
      [X,E,E,E, X,E,E,X, X,E,E,E, X,E,E,X],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,E,X, E,E,E,X, E,E,E,X, E,E,E,X],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
    ]
  },
  drill: {
    name:'🗡️ Drill', bpm: 140,
    rows:[
      [X,E,E,E, X,E,E,E, X,E,E,E, X,E,E,E],
      [E,E,E,E, E,E,X,E, E,E,E,E, E,E,X,X],
      [E,E,E,E, X,E,E,E, E,E,E,E, X,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,X,E],
      [X,X,X,X, X,X,X,X, X,X,X,X, X,X,X,X],
      [E,E,E,E, E,E,E,X, E,E,E,E, E,E,E,X],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,E,E, X,E,E,X, E,E,E,E, X,E,X,E],
      [E,X,E,E, E,X,E,X, E,X,E,E, E,X,E,X],
      [X,E,E,X, E,E,X,E, X,E,E,X, E,E,X,E],
      [X,E,E,E, E,E,E,E, X,E,E,E, E,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,X,E, E,X,E,E, E,E,X,E, E,X,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,E],
      [E,E,E,E, X,E,E,E, E,E,E,E, X,E,E,E],
      [E,E,E,E, E,E,E,E, E,E,E,E, E,E,E,X],
    ]
  },
};

// ── Web Audio Synthesis (pure, no external files) ─────────────────────────────
function synthesize(type, ctx, vol = 1) {
  if (!ctx) return;
  const t = ctx.currentTime;
  const out = ctx.createGain();
  out.gain.value = Math.min(vol, 1);
  out.connect(ctx.destination);

  const addOsc = (waveType, freq, dur, gStart, gEnd, freqEnd) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(out);
    o.type = waveType;
    o.frequency.setValueAtTime(freq, t);
    if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, t + dur);
    g.gain.setValueAtTime(gStart, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.01);
  };

  const addNoise = (dur, fType, fFreq, gStart) => {
    const sz = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, sz, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < sz; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(); src.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = fType; f.frequency.value = fFreq;
    const g = ctx.createGain();
    src.connect(f); f.connect(g); g.connect(out);
    g.gain.setValueAtTime(gStart, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.start(t); src.stop(t + dur + 0.01);
  };

  switch (type) {
    case 'kick':
      addOsc('sine', 160, 0.5, 1.0, 0.001, 0.01);
      addOsc('sine', 60, 0.5, 0.8, 0.001, 0.01);
      break;
    case 'kick2':
      addOsc('sine', 80, 0.4, 0.9, 0.001, 30);
      addNoise(0.05, 'lowpass', 200, 0.3);
      break;
    case 'snare':
      addNoise(0.2, 'bandpass', 3500, 0.9);
      addOsc('triangle', 240, 0.1, 0.4, 0.001);
      break;
    case 'snare2':
      addNoise(0.15, 'bandpass', 2500, 0.8);
      addOsc('sine', 180, 0.08, 0.5, 0.001);
      break;
    case 'hihat':
      addNoise(0.04, 'highpass', 9000, 0.5);
      break;
    case 'openhat':
      addNoise(0.4, 'highpass', 7000, 0.3);
      break;
    case 'ride':
      addNoise(0.6, 'bandpass', 5000, 0.2);
      addOsc('sine', 3200, 0.3, 0.1, 0.001);
      break;
    case 'clap':
      [0, 0.011, 0.022].forEach(off => {
        const sz = Math.floor(ctx.sampleRate * 0.05);
        const buf = ctx.createBuffer(1, sz, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < sz; i++) d[i] = Math.random() * 2 - 1;
        const src = ctx.createBufferSource(); src.buffer = buf;
        const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2200;
        const g = ctx.createGain();
        src.connect(f); f.connect(g); g.connect(out);
        g.gain.setValueAtTime(0.7, t + off);
        g.gain.exponentialRampToValueAtTime(0.0001, t + off + 0.07);
        src.start(t + off); src.stop(t + off + 0.08);
      });
      break;
    case 'perc':
      addNoise(0.06, 'bandpass', 1200, 0.6);
      addOsc('triangle', 420, 0.05, 0.3, 0.001);
      break;
    case 'bass':
      addOsc('sawtooth', 55, 0.3, 1.0, 0.001);
      { const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 250;
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = 'sawtooth'; o.frequency.value = 55;
        o.connect(f); f.connect(g); g.connect(out);
        g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.0001, t+0.3);
        o.start(t); o.stop(t+0.35); }
      break;
    case 'sub':
      addOsc('sine', 40, 0.45, 0.95, 0.001);
      addOsc('sine', 80, 0.2, 0.3, 0.001);
      break;
    case 'pluck':
      addOsc('sawtooth', 440, 0.15, 0.4, 0.001, 440);
      addOsc('square', 220, 0.1, 0.2, 0.001);
      break;
    case 'synthhi':
      addOsc('square', 880, 0.1, 0.25, 0.001);
      addOsc('sine', 1320, 0.08, 0.1, 0.001);
      break;
    case 'synthlo':
      addOsc('sawtooth', 220, 0.2, 0.4, 0.001);
      addOsc('sine', 110, 0.2, 0.25, 0.001);
      break;
    case 'stab':
      addOsc('sawtooth', 330, 0.08, 0.6, 0.001);
      addOsc('square', 330, 0.08, 0.3, 0.001);
      break;
    case 'fx':
      addOsc('sawtooth', 80, 0.35, 0.35, 0.001, 900);
      break;
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
const createEmpty = () => INSTRUMENTS.map(() => Array(STEPS).fill(false));
const fromPreset = (rows) => {
  const base = createEmpty();
  rows.forEach((row, ri) => { if (ri < base.length) base[ri] = row.map(v => v === 1); });
  return base;
};

export default function BeatMakerGrid() {
  const [grid, setGrid] = useState(createEmpty);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(90);
  const [volume, setVolume] = useState(75);
  const [beatName, setBeatName] = useState('');
  const [saving, setSaving] = useState(false);
  const [showExtra, setShowExtra] = useState(false);
  const [activePreset, setActivePreset] = useState(null);

  const audioCtxRef = useRef(null);
  const stepRef = useRef(0);
  const intervalRef = useRef(null);
  const gridRef = useRef(grid);
  const volRef = useRef(volume / 100);

  useEffect(() => { gridRef.current = grid; }, [grid]);
  useEffect(() => { volRef.current = volume / 100; }, [volume]);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
    return audioCtxRef.current;
  }, []);

  const tick = useCallback(() => {
    const step = stepRef.current;
    setCurrentStep(step);
    const ctx = getCtx();
    gridRef.current.forEach((row, ri) => {
      if (row[step]) synthesize(INSTRUMENTS[ri].synth, ctx, volRef.current);
    });
    stepRef.current = (step + 1) % STEPS;
  }, [getCtx]);

  useEffect(() => {
    clearInterval(intervalRef.current);
    if (isPlaying) {
      const ms = (60 / bpm / 4) * 1000;
      intervalRef.current = setInterval(tick, ms);
    } else {
      setCurrentStep(-1);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, bpm, tick]);

  const toggleCell = useCallback((row, col) => {
    setGrid(prev => prev.map((r, ri) =>
      ri === row ? r.map((v, ci) => ci === col ? !v : v) : r
    ));
  }, []);

  const loadPreset = (key) => {
    const p = PRESETS[key];
    setGrid(fromPreset(p.rows));
    setBpm(p.bpm);
    setActivePreset(key);
    toast.success(`${p.name} cargado`);
  };

  const clearGrid = () => {
    setGrid(createEmpty());
    stepRef.current = 0;
    setCurrentStep(-1);
    setActivePreset(null);
  };

  const previewSound = (ri) => {
    const ctx = getCtx();
    synthesize(INSTRUMENTS[ri].synth, ctx, volRef.current);
  };

  const saveBeat = async () => {
    if (!beatName.trim()) { toast.error("Escribe un nombre"); return; }
    setSaving(true);
    try {
      await db.entities.SavedBeat.create({ name: beatName, timeline: grid, bpm, volume });
      toast.success(`Beat "${beatName}" guardado`);
      setBeatName('');
    } catch { toast.error("Error al guardar"); }
    setSaving(false);
  };

  const shareBeat = async () => {
    const data = btoa(JSON.stringify({ g: grid.map(r => r.map(v => v ? 1 : 0)), bpm, volume }));
    const url = `${window.location.href.split('?')[0]}?beat=${data}`;
    if (navigator.share) {
      navigator.share({ title: 'Beat - Monteking MX', url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url).then(() => toast.success('Enlace copiado')).catch(() => toast.error('No se pudo copiar'));
    }
  };

  const BASE_INST = INSTRUMENTS.slice(0, 9);
  const EXTRA_INST = INSTRUMENTS.slice(9);
  const visibleInst = showExtra ? INSTRUMENTS : BASE_INST;

  return (
    <div className="space-y-3 select-none">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl">
        {/* Play/Pause */}
        <Button
          onClick={() => setIsPlaying(p => !p)}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-9 px-4 shrink-0">
          {isPlaying
            ? <><Pause className="w-4 h-4 mr-1" /><span className="hidden sm:inline">Pause</span></>
            : <><Play className="w-4 h-4 mr-1" /><span className="hidden sm:inline">Play</span></>}
        </Button>

        {/* Presets */}
        <div className="flex gap-1 flex-wrap">
          {Object.entries(PRESETS).map(([key, p]) => (
            <Button key={key} onClick={() => loadPreset(key)}
              variant="outline" size="sm"
              className={`text-xs h-8 px-2 border-zinc-700 ${activePreset === key ? 'border-yellow-500 text-yellow-500' : 'text-zinc-300'}`}>
              {p.name}
            </Button>
          ))}
        </div>

        <Button onClick={clearGrid} variant="outline" size="sm"
          className="border-zinc-700 text-zinc-400 h-8 px-2 shrink-0">
          <RotateCcw className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* BPM + Volume row */}
      <div className="flex flex-wrap gap-3 px-1">
        <div className="flex items-center gap-2 flex-1 min-w-[140px]">
          <span className="text-zinc-500 text-xs whitespace-nowrap">BPM</span>
          <Slider value={[bpm]} onValueChange={([v]) => setBpm(v)} min={60} max={180} step={1} className="flex-1" />
          <Badge variant="outline" className="border-yellow-500 text-yellow-500 text-xs px-1.5 min-w-[44px] text-center shrink-0">{bpm}</Badge>
        </div>
        <div className="flex items-center gap-2 min-w-[120px] flex-1">
          <Volume2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          <Slider value={[volume]} onValueChange={([v]) => setVolume(v)} max={100} step={1} className="flex-1" />
          <span className="text-zinc-500 text-xs w-8 text-right shrink-0">{volume}%</span>
        </div>
      </div>

      {/* Step progress dots */}
      <div className="flex gap-0.5" style={{ paddingLeft: '68px', paddingRight: '4px' }}>
        {Array(STEPS).fill(0).map((_, i) => (
          <div key={i} className={`flex-1 h-1 rounded-full transition-colors duration-75 ${
            i === currentStep ? 'bg-yellow-500' : i % 4 === 0 ? 'bg-zinc-600' : 'bg-zinc-800'
          }`} />
        ))}
      </div>

      {/* Grid */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div style={{ minWidth: '480px' }}>
            {/* Beat markers */}
            <div className="flex border-b border-zinc-800/50" style={{ paddingLeft: '68px' }}>
              {[1,2,3,4].map(b => (
                <div key={b} className="flex-1 text-center text-zinc-700 text-xs py-1 font-mono">
                  {b}
                </div>
              ))}
            </div>

            {visibleInst.map((inst, ri) => (
              <div key={inst.name} className="flex items-center border-b border-zinc-800/30 last:border-b-0 hover:bg-zinc-900/30 transition-colors">
                <button
                  onClick={() => previewSound(ri)}
                  className="shrink-0 text-xs font-bold text-left px-2 py-2 hover:bg-zinc-800/60 transition-colors leading-tight active:scale-95"
                  style={{ color: inst.color, width: '68px' }}>
                  {inst.name}
                </button>
                <div className="flex flex-1 gap-0.5 p-1">
                  {Array(STEPS).fill(0).map((_, ci) => {
                    const active = grid[ri][ci];
                    const isCurrentStep = ci === currentStep;
                    return (
                      <button
                        key={ci}
                        onClick={() => toggleCell(ri, ci)}
                        className={`flex-1 rounded transition-all active:scale-90 ${
                          ci % 4 === 3 ? 'mr-1' : ''
                        } ${
                          active
                            ? 'border-0'
                            : isCurrentStep
                              ? 'bg-zinc-700 border border-zinc-600'
                              : ci % 4 === 0
                                ? 'bg-zinc-800 border border-zinc-700'
                                : 'bg-zinc-900 border border-zinc-800/50'
                        }`}
                        style={{
                          height: '28px',
                          backgroundColor: active ? inst.color : undefined,
                          boxShadow: active && isCurrentStep ? `0 0 10px ${inst.color}88` : undefined,
                          opacity: active && isCurrentStep ? 1 : active ? 0.9 : 1,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Toggle extra instruments */}
        <button
          onClick={() => setShowExtra(s => !s)}
          className="w-full py-2 text-zinc-600 hover:text-zinc-400 text-xs flex items-center justify-center gap-1 border-t border-zinc-800 transition-colors">
          <Music className="w-3 h-3" />
          {showExtra
            ? <><ChevronUp className="w-3 h-3" /> Ocultar instrumentos extra</>
            : <><ChevronDown className="w-3 h-3" /> Mostrar {EXTRA_INST.length} instrumentos más (Bass, Synths, FX…)</>}
        </button>
      </div>

      {/* Save & Share */}
      <div className="flex gap-2">
        <input
          value={beatName}
          onChange={e => setBeatName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && saveBeat()}
          placeholder="Nombre del beat..."
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500 min-w-0"
        />
        <Button onClick={saveBeat} disabled={saving}
          className="bg-yellow-500 hover:bg-yellow-400 text-black shrink-0 px-3">
          <Save className="w-4 h-4 sm:mr-1" />
          <span className="hidden sm:inline">{saving ? '...' : 'Guardar'}</span>
        </Button>
        <Button onClick={shareBeat} variant="outline"
          className="border-zinc-700 text-zinc-300 shrink-0 px-3">
          <Share2 className="w-4 h-4 sm:mr-1" />
          <span className="hidden sm:inline">Compartir</span>
        </Button>
      </div>

      <p className="text-zinc-700 text-xs text-center">Toca el nombre del instrumento para previsualizar el sonido</p>
    </div>
  );
}