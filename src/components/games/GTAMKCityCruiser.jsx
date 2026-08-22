import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play, Pause, Radio, Volume2, ShieldAlert, Zap, Flame,
  Trophy, RefreshCw, Maximize2, Minimize2, Car, Sun, Moon, Gauge, Sparkles
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAudio } from '@/context/AudioContext';

const VEHICLES = [
  { id: 'sport', name: 'Cyber Sport GT 13-11', topSpeed: 210, accel: 1.2, handling: 0.055, color: '#FFD700', underglow: '#00E5FF', desc: 'Máxima aceleración y nitro de alta presión.' },
  { id: 'lowrider', name: '1984 Lowrider Gold Spoke', topSpeed: 165, accel: 0.8, handling: 0.045, color: '#e63946', underglow: '#FF0055', desc: 'Suspensión hidráulica con rebote y drift suave.' },
  { id: 'armored', name: 'Escalade Armored MK-Tank', topSpeed: 150, accel: 0.7, handling: 0.038, color: '#1a1a24', underglow: '#39FF14', desc: 'Blindaje pesado: destruye patrullas policiales sin frenar.' }
];

const TIME_PRESETS = [
  { id: 'sunset', name: '🌅 Atardecer Monterrey', skyTop: '#0a0014', skyMid: '#2d004d', skyBottom: '#ff5500', sunColor: '#FFD700' },
  { id: 'midnight', name: '🌃 Midnight Cyberpunk', skyTop: '#020008', skyMid: '#0a031a', skyBottom: '#00e5ff33', sunColor: '#00E5FF' },
  { id: 'dawn', name: '🌫️ Neblina 13-11', skyTop: '#080d1a', skyMid: '#121c2e', skyBottom: '#ffaa00', sunColor: '#FFA500' }
];

const RADIO_STATIONS = [
  { name: "13-11 FM (Trap & Memphis)", beat: "TRAP-MEMPH/yyy_sour_play_||_beat_||_116bpm.mp3", trackTitle: "Sour Play - MK Memphis" },
  { name: "Boom Bap Classics 90s", beat: "BOOMBAP/stairway_class_||_beat_||_ohshit_boombap_classic_||_75bpm_147bpm.mp3", trackTitle: "Stairway Class 90s" },
  { name: "Cardiac Techno Club", beat: "ELECTRO MK/psyghetto_1__||_techno_mk_||_120bpm_121bpm.mp3", trackTitle: "Psyghetto 120BPM" },
  { name: "Suave R&B Nightdrive", beat: "SUAVE/arriba_de_ti_||_beat_||_lofi_rnb_boombap_114bpm.mp3", trackTitle: "Arriba De Ti LoFi" }
];

export default function GTAMKCityCruiser() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { playTrack } = useAudio();

  const [selectedCar, setSelectedCar] = useState(VEHICLES[0]);
  const [selectedTime, setSelectedTime] = useState(TIME_PRESETS[0]);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(60);
  const [nitro, setNitro] = useState(100);
  const [health, setHealth] = useState(100);
  const [wantedLevel, setWantedLevel] = useState(1);
  const [radioIdx, setRadioIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const gameStateRef = useRef({
    playerX: 0,
    speed: 60,
    nitro: 100,
    nitroActive: false,
    health: 100,
    score: 0,
    roadCurve: 0,
    coins: [],
    obstacles: [],
    scenery: [],
    keys: {},
    audioCtx: null,
    animId: null
  });

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Change Radio Station
  const changeStation = (dir) => {
    const nextIdx = (radioIdx + dir + RADIO_STATIONS.length) % RADIO_STATIONS.length;
    setRadioIdx(nextIdx);
    const st = RADIO_STATIONS[nextIdx];
    playTrack({
      id: `game-radio-${nextIdx}`,
      title: st.trackTitle,
      artist: st.name,
      album: "GTA MK City Radio",
      url: st.beat,
      cover: "assets/cover_trap.jpg"
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth || 900;
      canvas.height = isFullscreen ? window.innerHeight : 520;
    };
    resize();
    window.addEventListener('resize', resize);

    const state = gameStateRef.current;
    state.coins = [];
    state.obstacles = [];
    state.scenery = [];

    const handleKeyDown = (e) => {
      state.keys[e.key.toLowerCase()] = true;
      if (e.key === ' ' || e.key.toLowerCase() === 'shift') state.nitroActive = true;
    };
    const handleKeyUp = (e) => {
      state.keys[e.key.toLowerCase()] = false;
      if (e.key === ' ' || e.key.toLowerCase() === 'shift') state.nitroActive = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let frame = 0;

    const loop = () => {
      frame++;
      state.animId = requestAnimationFrame(loop);

      const w = canvas.width;
      const h = canvas.height;
      const horizon = h * 0.44;

      // Inputs & Physics
      const hnd = selectedCar.handling;
      if (state.keys['arrowleft'] || state.keys['a']) state.playerX = Math.max(-0.85, state.playerX - hnd);
      if (state.keys['arrowright'] || state.keys['d']) state.playerX = Math.min(0.85, state.playerX + hnd);

      if (state.keys['arrowup'] || state.keys['w']) state.speed = Math.min(selectedCar.topSpeed, state.speed + selectedCar.accel);
      else if (state.keys['arrowdown'] || state.keys['s']) state.speed = Math.max(30, state.speed - 2.0);
      else state.speed = Math.max(60, state.speed - 0.3);

      if (state.nitroActive && state.nitro > 0) {
        state.speed = Math.min(selectedCar.topSpeed + 40, state.speed + 3.0);
        state.nitro = Math.max(0, state.nitro - 0.8);
      } else {
        state.nitro = Math.min(100, state.nitro + 0.2);
      }

      // Smooth Road Curvature
      state.roadCurve = Math.sin(frame * 0.015) * (w * 0.15);

      setSpeed(Math.round(state.speed));
      setNitro(Math.round(state.nitro));
      setHealth(Math.round(state.health));

      // 1. Sky & Atmosphere
      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizon);
      skyGrad.addColorStop(0, selectedTime.skyTop);
      skyGrad.addColorStop(0.65, selectedTime.skyMid);
      skyGrad.addColorStop(1, selectedTime.skyBottom);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, horizon);

      // Celestial Sun / Moon
      ctx.fillStyle = selectedTime.sunColor;
      ctx.shadowColor = selectedTime.sunColor;
      ctx.shadowBlur = 35;
      ctx.beginPath();
      ctx.arc(w / 2 + state.roadCurve * 0.3, horizon - 25, 52, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Skyline Buildings & Billboards
      for (let i = 0; i < 18; i++) {
        const bx = (i * (w / 16) + frame * 0.15) % w;
        const bh = 55 + ((i * 43) % 80);
        ctx.fillStyle = i % 2 === 0 ? '#0d0a17' : '#06040d';
        ctx.fillRect(bx - 20, horizon - bh, 40, bh);
        // Lights
        ctx.fillStyle = i % 3 === 0 ? '#ffb700' : '#00e5ff';
        ctx.fillRect(bx - 10, horizon - bh + 12, 5, 5);
        ctx.fillRect(bx - 10, horizon - bh + 30, 5, 5);
      }

      // 2. 3D Perspective Road
      const cxAtHorizon = w / 2 + state.roadCurve;
      ctx.fillStyle = '#0f0e17';
      ctx.beginPath();
      ctx.moveTo(cxAtHorizon - w * 0.12, horizon);
      ctx.lineTo(cxAtHorizon + w * 0.12, horizon);
      ctx.lineTo(w * 0.96, h);
      ctx.lineTo(w * 0.04, h);
      ctx.closePath();
      ctx.fill();

      // Road Borders (Gold Neon)
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(cxAtHorizon - w * 0.12, horizon);
      ctx.lineTo(w * 0.04, h);
      ctx.moveTo(cxAtHorizon + w * 0.12, horizon);
      ctx.lineTo(w * 0.96, h);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Center Road Dashes (Cyan Neon)
      const numStripes = 9;
      const stripeOffset = (frame * (state.speed / 18)) % 1;
      for (let i = 0; i < numStripes; i++) {
        const p = ((i + stripeOffset) / numStripes);
        const y = horizon + p * p * (h - horizon);
        const nextY = horizon + Math.pow(p + 0.07, 2) * (h - horizon);
        const curCenterX = (cxAtHorizon * (1 - p)) + (w / 2 * p);
        const stripeW = 2 + p * 8;
        ctx.fillStyle = '#00e5ff';
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 6;
        ctx.fillRect(curCenterX - stripeW / 2, y, stripeW, Math.max(3, nextY - y));
        ctx.shadowBlur = 0;
      }

      // Spawn Coins & Police Obstacles
      if (frame % 40 === 0) state.coins.push({ x: (Math.random() - 0.5) * 1.5, z: 0 });
      if (frame % 70 === 0) {
        state.obstacles.push({
          x: (Math.random() - 0.5) * 1.4,
          z: 0,
          type: Math.random() > 0.45 ? 'police' : 'civilian'
        });
      }

      // Render Coins
      for (let i = state.coins.length - 1; i >= 0; i--) {
        const c = state.coins[i];
        c.z += (state.speed / 900);
        if (c.z >= 1) {
          if (Math.abs(c.x - state.playerX) < 0.28) {
            state.score += 150;
            setScore(state.score);
          }
          state.coins.splice(i, 1);
          continue;
        }
        const cy = horizon + (c.z * c.z) * (h - horizon);
        const roadWAtY = (w * 0.24) + c.z * (w * 0.92 - w * 0.24);
        const curCenterX = (cxAtHorizon * (1 - c.z)) + (w / 2 * c.z);
        const cx = curCenterX + c.x * (roadWAtY / 2);
        const size = 8 + c.z * 24;

        ctx.fillStyle = '#FFD700';
        ctx.shadowColor = '#FFA500';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.font = `bold ${Math.max(8, size * 0.55)}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('13', cx, cy);
        ctx.shadowBlur = 0;
      }

      // Render Obstacles (Cops & Cars)
      for (let i = state.obstacles.length - 1; i >= 0; i--) {
        const obs = state.obstacles[i];
        obs.z += (state.speed / 1100);
        if (obs.z >= 1) {
          if (Math.abs(obs.x - state.playerX) < 0.24) {
            if (selectedCar.id === 'armored') {
              state.score += 300; // Tank smash bonus
            } else {
              state.speed = Math.max(25, state.speed - 40);
              state.health = Math.max(0, state.health - 18);
              setWantedLevel(lvl => Math.min(5, lvl + 1));
            }
          }
          state.obstacles.splice(i, 1);
          continue;
        }
        const oy = horizon + (obs.z * obs.z) * (h - horizon);
        const roadWAtY = (w * 0.24) + obs.z * (w * 0.92 - w * 0.24);
        const curCenterX = (cxAtHorizon * (1 - obs.z)) + (w / 2 * obs.z);
        const ox = curCenterX + obs.x * (roadWAtY / 2);
        const ow = 14 + obs.z * 56;
        const oh = 10 + obs.z * 34;

        ctx.fillStyle = obs.type === 'police' ? '#111322' : '#d90429';
        ctx.fillRect(ox - ow / 2, oy - oh, ow, oh);
        if (obs.type === 'police') {
          ctx.fillStyle = frame % 10 < 5 ? '#00e5ff' : '#ff0055';
          ctx.fillRect(ox - ow / 4, oy - oh - 4, ow / 2, 4);
        }
      }

      // 3. Render Player Vehicle
      const px = (w / 2) + state.playerX * (w * 0.38);
      const py = h - 65;
      const carW = 84;
      const carH = 46;

      // Underglow Neon
      ctx.shadowColor = selectedCar.underglow;
      ctx.shadowBlur = 20;
      ctx.fillStyle = selectedCar.underglow;
      ctx.beginPath();
      ctx.ellipse(px, py + 12, carW * 0.6, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Chassis
      ctx.fillStyle = selectedCar.color;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(px - carW / 2, py - carH / 2, carW, carH, [8, 8, 4, 4]);
      ctx.fill();
      ctx.stroke();

      // Windshield Tint
      ctx.fillStyle = '#000000bb';
      ctx.fillRect(px - carW * 0.32, py - carH * 0.32, carW * 0.64, carH * 0.42);

      // Tail Lights & Nitro Fire
      ctx.fillStyle = state.nitroActive ? '#00e5ff' : '#ff0055';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 15;
      ctx.fillRect(px - carW / 2 + 5, py + carH / 2 - 8, 16, 6);
      ctx.fillRect(px + carW / 2 - 21, py + carH / 2 - 8, 16, 6);

      if (state.nitroActive) {
        ctx.fillStyle = '#00e5ff';
        ctx.beginPath();
        ctx.moveTo(px - carW / 2 + 13, py + carH / 2);
        ctx.lineTo(px - carW / 2 + 8, py + carH / 2 + 24 + Math.random() * 10);
        ctx.lineTo(px - carW / 2 + 18, py + carH / 2);
        ctx.moveTo(px + carW / 2 - 13, py + carH / 2);
        ctx.lineTo(px + carW / 2 - 18, py + carH / 2 + 24 + Math.random() * 10);
        ctx.lineTo(px + carW / 2 - 8, py + carH / 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(state.animId);
    };
  }, [selectedCar, selectedTime, isFullscreen]);

  return (
    <div ref={containerRef} className="bg-black/95 rounded-3xl p-4 sm:p-8 border-2 border-yellow-500/40 shadow-2xl overflow-hidden max-w-6xl mx-auto space-y-6">
      
      {/* Top Controls: Garage & Atmosphere Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        
        {/* Garage Car Selector */}
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5 text-yellow-400" />
          <div className="flex gap-1.5 bg-zinc-950 p-1 rounded-2xl border border-zinc-800">
            {VEHICLES.map(v => (
              <button
                key={v.id}
                onClick={() => setSelectedCar(v)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-oswald transition-all ${
                  selectedCar.id === v.id ? 'bg-yellow-400 text-black shadow-md' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {v.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Time of Day */}
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-400" />
          <div className="flex gap-1.5 bg-zinc-950 p-1 rounded-2xl border border-zinc-800">
            {TIME_PRESETS.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTime(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-oswald transition-all ${
                  selectedTime.id === t.id ? 'bg-amber-400 text-black shadow-md' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {t.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Fullscreen Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={toggleFullscreen}
          className="border-zinc-700 text-zinc-300 hover:border-yellow-400 hover:text-yellow-400 rounded-xl text-xs"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4 mr-1.5" /> : <Maximize2 className="w-4 h-4 mr-1.5" />}
          {isFullscreen ? "Salir" : "Pantalla Completa"}
        </Button>

      </div>

      {/* Main HUD */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-zinc-950 px-4 py-2.5 rounded-2xl border border-yellow-500/30">
          <span className="text-[10px] text-zinc-500 font-mono block">MONTERREY CASH</span>
          <span className="text-xl sm:text-2xl font-black font-oswald text-yellow-400">${score}</span>
        </div>

        <div className="bg-zinc-950 px-4 py-2.5 rounded-2xl border border-zinc-800">
          <span className="text-[10px] text-zinc-500 font-mono block">VELOCIDAD</span>
          <span className="text-xl sm:text-2xl font-black font-oswald text-white">{speed} <span className="text-xs text-yellow-400">KM/H</span></span>
        </div>

        <div className="bg-zinc-950 px-4 py-2.5 rounded-2xl border border-red-500/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 font-mono block">WANTED LEVEL</span>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`text-sm ${i < wantedLevel ? 'text-yellow-400 animate-pulse' : 'text-zinc-700'}`}>★</span>
              ))}
            </div>
          </div>
        </div>

        {/* Radio Selector */}
        <div className="bg-zinc-950 px-4 py-2 rounded-2xl border border-zinc-800 flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-[10px] text-zinc-500 font-mono block">GTA RADIO MK</span>
            <span className="text-xs font-bold text-white font-oswald truncate block">{RADIO_STATIONS[radioIdx].name}</span>
          </div>
          <div className="flex gap-1 shrink-0 ml-1">
            <button onClick={() => changeStation(-1)} className="px-2 py-0.5 bg-zinc-800 text-white rounded text-xs">◀</button>
            <button onClick={() => changeStation(1)} className="px-2 py-0.5 bg-zinc-800 text-white rounded text-xs">▶</button>
          </div>
        </div>
      </div>

      {/* 3D Canvas Screen */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-zinc-800 shadow-2xl bg-black">
        <canvas ref={canvasRef} className="w-full block" />

        {/* Nitro HUD Overlay */}
        <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-4 py-2 rounded-2xl border border-cyan-500/40 flex items-center gap-2.5">
          <Flame className={`w-4 h-4 ${nitro > 20 ? 'text-cyan-400 animate-bounce' : 'text-zinc-600'}`} />
          <div className="w-28 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 transition-all" style={{ width: `${nitro}%` }} />
          </div>
          <span className="text-xs font-mono font-bold text-cyan-300">{nitro}%</span>
        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none text-[11px] font-mono text-zinc-400 bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
          <span>CONTROLES: [A / D / ◀ / ▶] Conducir • [W / S] Acelerar/Freno • [ESPACIO] Nitro</span>
          <span className="text-yellow-400 font-bold">{selectedCar.desc}</span>
        </div>
      </div>

    </div>
  );
}
