import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const LANES = 4;
const LANE_W = 80;
const CANVAS_W = LANES * LANE_W;
const CANVAS_H = 500;
const HIT_Y = CANVAS_H - 80;
const HIT_WINDOW = 40;
const TILE_H = 40;
const TILE_SPEED = 4;
const LANE_COLORS = ['#EF4444','#EAB308','#22C55E','#3B82F6'];
const LANE_LABELS = ['A','S','D','F'];
const LANE_EMOJIS = ['🔴','🟡','🟢','🔵'];

function synthesizeHit(freq = 440) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type = 'square'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.3, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    o.start(); o.stop(ctx.currentTime + 0.12);
  } catch {}
}

export default function RhythmTap() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameStatus, setGameStatus] = useState('idle'); // idle playing gameover
  const [lastJudge, setLastJudge] = useState('');
  const [pressedLanes, setPressedLanes] = useState([false,false,false,false]);

  const initState = () => ({
    tiles: [],
    score: 0,
    combo: 0,
    maxCombo: 0,
    spawnTimer: 0,
    spawnInterval: 45,
    frameCount: 0,
    speed: TILE_SPEED,
    missed: 0,
  });

  const hit = useCallback((lane) => {
    setPressedLanes(prev => { const n=[...prev]; n[lane]=true; return n; });
    setTimeout(() => setPressedLanes(prev => { const n=[...prev]; n[lane]=false; return n; }), 100);

    const state = stateRef.current;
    if (!state) return;
    const tiles = state.tiles;
    let hitTile = null;
    let minDist = 9999;
    for (const t of tiles) {
      if (t.lane === lane && !t.hit) {
        const dist = Math.abs((t.y + TILE_H/2) - HIT_Y);
        if (dist < HIT_WINDOW && dist < minDist) { hitTile = t; minDist = dist; }
      }
    }
    const freqs = [220, 330, 440, 550];
    synthesizeHit(freqs[lane]);
    if (hitTile) {
      hitTile.hit = true;
      hitTile.explode = 1;
      const pts = minDist < 15 ? 300 : minDist < 30 ? 200 : 100;
      state.score += pts * (state.combo + 1);
      state.combo++;
      state.maxCombo = Math.max(state.maxCombo, state.combo);
      setLastJudge(pts === 300 ? '⚡ PERFECT!' : pts === 200 ? '✅ GOOD' : '👍 OK');
      setScore(state.score);
      setCombo(state.combo);
    } else {
      state.combo = 0;
      setCombo(0);
      setLastJudge('❌ MISS');
    }
    setTimeout(() => setLastJudge(''), 600);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const map = { a:0, s:1, d:2, f:3, ArrowLeft:0, ArrowDown:1, ArrowRight:2, ArrowUp:3 };
      const lane = map[e.key];
      if (lane !== undefined) { e.preventDefault(); hit(lane); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [hit]);

  const startGame = () => {
    stateRef.current = initState();
    setScore(0); setCombo(0); setLastJudge('');
    setGameStatus('playing');
  };

  const draw = useCallback((ctx, state) => {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    // Background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Lane dividers
    for (let i = 0; i <= LANES; i++) {
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(i * LANE_W, 0);
      ctx.lineTo(i * LANE_W, CANVAS_H);
      ctx.stroke();
    }

    // Lane gradient overlays
    for (let l = 0; l < LANES; l++) {
      const grd = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
      grd.addColorStop(0, 'transparent');
      grd.addColorStop(1, LANE_COLORS[l] + '15');
      ctx.fillStyle = grd;
      ctx.fillRect(l * LANE_W, 0, LANE_W, CANVAS_H);
    }

    // Hit line glow
    ctx.strokeStyle = 'rgba(255,215,0,0.4)';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(0, HIT_Y);
    ctx.lineTo(CANVAS_W, HIT_Y);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Hit circles
    for (let l = 0; l < LANES; l++) {
      const cx = l * LANE_W + LANE_W / 2;
      ctx.strokeStyle = LANE_COLORS[l];
      ctx.lineWidth = 2.5;
      ctx.shadowColor = LANE_COLORS[l];
      ctx.shadowBlur = pressedLanes[l] ? 20 : 5;
      ctx.beginPath();
      ctx.arc(cx, HIT_Y, 22, 0, Math.PI * 2);
      ctx.stroke();
      if (pressedLanes[l]) {
        ctx.fillStyle = LANE_COLORS[l] + '55';
        ctx.beginPath();
        ctx.arc(cx, HIT_Y, 22, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(LANE_LABELS[l], cx, HIT_Y);
    }

    // Tiles
    for (const tile of state.tiles) {
      if (tile.hit && tile.explode <= 0) continue;
      const x = tile.lane * LANE_W + 4;
      const y = tile.y;
      const w = LANE_W - 8;
      if (tile.hit) {
        ctx.globalAlpha = tile.explode;
        ctx.fillStyle = LANE_COLORS[tile.lane];
        ctx.shadowColor = LANE_COLORS[tile.lane];
        ctx.shadowBlur = 30 * tile.explode;
        ctx.beginPath();
        ctx.arc(x + w/2, y + TILE_H/2, (1.5-tile.explode)*30, 0, Math.PI*2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        tile.explode -= 0.08;
      } else {
        const dist = Math.abs((y + TILE_H/2) - HIT_Y);
        const nearGlow = dist < HIT_WINDOW;
        const rounding = 8;
        ctx.fillStyle = LANE_COLORS[tile.lane];
        if (nearGlow) { ctx.shadowColor = LANE_COLORS[tile.lane]; ctx.shadowBlur = 15; }
        ctx.beginPath();
        ctx.roundRect(x, y, w, TILE_H, rounding);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.beginPath();
        ctx.roundRect(x+2, y+2, w-4, TILE_H/3, rounding/2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(LANE_EMOJIS[tile.lane], x + w/2, y + TILE_H/2);
      }
    }
  }, [pressedLanes]);

  useEffect(() => {
    if (gameStatus !== 'playing') {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const loop = () => {
      const state = stateRef.current;
      if (!state) return;
      state.frameCount++;

      // Spawn
      state.spawnTimer++;
      if (state.spawnTimer >= state.spawnInterval) {
        state.spawnTimer = 0;
        const lane = Math.floor(Math.random() * LANES);
        state.tiles.push({ lane, y: -TILE_H, hit: false, explode: 0 });
        // Occasional double
        if (Math.random() < 0.25) {
          const lane2 = (lane + 1 + Math.floor(Math.random() * 3)) % LANES;
          state.tiles.push({ lane: lane2, y: -TILE_H, hit: false, explode: 0 });
        }
        // Increase difficulty
        if (state.spawnInterval > 20) state.spawnInterval = Math.max(20, state.spawnInterval - 0.03);
      }

      // Update tiles
      let newMissed = 0;
      state.tiles = state.tiles.filter(t => {
        if (!t.hit) {
          t.y += state.speed + (state.frameCount * 0.001);
          if (t.y > CANVAS_H) { newMissed++; return false; }
        } else if (t.explode <= 0) return false;
        return true;
      });

      if (newMissed > 0) {
        state.missed = (state.missed || 0) + newMissed;
        state.combo = 0;
        setCombo(0);
        if (state.missed >= 10) {
          setGameStatus('gameover');
          return;
        }
      }

      draw(ctx, state);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gameStatus, draw]);

  // Idle screen
  useEffect(() => {
    if (gameStatus !== 'idle') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('RHYTHM TAP', CANVAS_W/2, CANVAS_H/2 - 40);
    ctx.fillStyle = '#888';
    ctx.font = '13px monospace';
    ctx.fillText('Toca los tiles al ritmo', CANVAS_W/2, CANVAS_H/2);
    ctx.fillText('A / S / D / F  o  Click', CANVAS_W/2, CANVAS_H/2 + 24);
    ctx.fillText('🔴 🟡 🟢 🔵', CANVAS_W/2, CANVAS_H/2 + 55);
  }, [gameStatus]);

  const handleCanvasClick = (e) => {
    if (gameStatus !== 'playing') return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const lane = Math.floor(x / (rect.width / LANES));
    if (lane >= 0 && lane < LANES) hit(lane);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* HUD */}
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-zinc-500 text-xs uppercase tracking-wider">Score</div>
          <div className="text-yellow-500 font-bold text-2xl">{score.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-zinc-500 text-xs uppercase tracking-wider">Combo</div>
          <div className="text-white font-bold text-2xl">x{combo}</div>
        </div>
        {lastJudge && (
          <div className="text-center animate-bounce">
            <div className="text-lg font-bold text-white">{lastJudge}</div>
          </div>
        )}
      </div>

      <div className="relative touch-none">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="border border-zinc-700 rounded-xl cursor-pointer"
          style={{ maxWidth: '100%' }}
          onClick={handleCanvasClick}
          onTouchStart={(e) => {
            if (gameStatus !== 'playing') return;
            e.preventDefault();
            const rect = canvasRef.current.getBoundingClientRect();
            Array.from(e.touches).forEach(touch => {
              const x = touch.clientX - rect.left;
              const lane = Math.floor(x / (rect.width / LANES));
              if (lane >= 0 && lane < LANES) hit(lane);
            });
          }}
        />
        {gameStatus === 'gameover' && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center rounded-xl">
            <div className="text-4xl mb-3">💥</div>
            <h2 className="text-2xl font-bold text-red-500 mb-1">GAME OVER</h2>
            <p className="text-white mb-1">Score: {score.toLocaleString()}</p>
            <p className="text-zinc-400 text-sm mb-4">Combo máx: x{stateRef.current?.maxCombo || 0}</p>
            <Button onClick={startGame} className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold">
              Reintentar
            </Button>
          </div>
        )}
      </div>

      {gameStatus === 'idle' ? (
        <Button onClick={startGame} size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-10">
          🎵 INICIAR RHYTHM TAP
        </Button>
      ) : gameStatus === 'playing' ? (
        <div className="flex gap-2">
          {LANE_LABELS.map((l, i) => (
            <button key={l} onMouseDown={() => hit(i)}
              className="w-16 h-12 rounded-lg font-bold text-white border-2 transition-all active:scale-95"
              style={{ backgroundColor: LANE_COLORS[i] + '80', borderColor: LANE_COLORS[i] }}>
              {l}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}