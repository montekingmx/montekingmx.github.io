import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";

const CELL = 18;
const COLS = 21;
const ROWS = 23;
const W = CELL * COLS;
const H = CELL * ROWS;

// 0=dot 1=wall 2=empty 3=power 4=ghosthouse
const MAZE_DEF = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,1,0,0,1,0,0,1,1,1,0,1,1,0,1],
  [1,3,1,1,0,1,1,1,0,0,1,0,0,1,1,1,0,1,1,3,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,0,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1],
  [1,1,1,1,0,1,1,1,2,1,2,2,2,1,1,1,0,1,1,1,1],
  [2,2,2,1,0,1,2,2,2,2,2,2,2,2,2,1,0,1,2,2,2],
  [1,1,1,1,0,1,2,1,1,4,4,4,1,1,2,1,0,1,1,1,1],
  [2,2,2,2,0,2,2,1,4,4,4,4,4,1,2,2,0,2,2,2,2],
  [1,1,1,1,0,1,2,1,1,1,1,1,1,1,2,1,0,1,1,1,1],
  [2,2,2,1,0,1,2,2,2,2,2,2,2,2,2,1,0,1,2,2,2],
  [1,1,1,1,0,1,2,1,1,1,1,1,1,1,2,1,0,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,1,1,0,0,1,0,0,1,1,1,0,1,1,0,1],
  [1,3,0,1,0,0,0,0,0,2,2,2,0,0,0,0,0,1,0,3,1],
  [1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1],
  [1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,1,2,1,1,1,0,1,1,1,1,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const GHOST_EMOJIS = ['💊','🍄','🌿','💉'];
const GHOST_COLORS = ['#FF0000','#FFB8FF','#00FFFF','#FFB852'];

function dirVec(d) {
  if (d==='up') return {dx:0,dy:-1};
  if (d==='down') return {dx:0,dy:1};
  if (d==='left') return {dx:-1,dy:0};
  return {dx:1,dy:0};
}

function canMove(maze, x, y, d) {
  const {dx,dy} = dirVec(d);
  const nx=x+dx, ny=y+dy;
  if (nx<0||nx>=COLS||ny<0||ny>=ROWS) return false;
  const cell = maze[ny][nx];
  return cell !== 1;
}

function countDots(maze) {
  let n=0;
  for (const row of maze) for (const c of row) if (c===0||c===3) n++;
  return n;
}

export default function PacManGame() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const rafRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameStatus, setGameStatus] = useState('idle'); // idle playing dead won gameover
  const [highScore, setHighScore] = useState(0);

  const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/66ca3a969_LOGO-MK-COLOR-SH.png";
  const logoImgRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = LOGO_URL;
    img.onload = () => { logoImgRef.current = img; };
  }, []);

  const initState = useCallback(() => {
    const maze = MAZE_DEF.map(r => [...r]);
    return {
      maze,
      pacman: { x: 10, y: 17, dir: 'right', nextDir: 'right', frame: 0, mouth: 0.2, mouthDir: 1 },
      ghosts: GHOST_EMOJIS.map((emoji, i) => ({
        emoji, color: GHOST_COLORS[i],
        x: 9 + (i % 3), y: 10 + (i > 1 ? 1 : 0),
        dir: ['up','down','left','right'][i], scared: false
      })),
      score: 0,
      lives: 3,
      totalDots: countDots(maze),
      dotsEaten: 0,
      powerTimer: 0,
      frameCount: 0,
      ghostMoveTimer: 0,
    };
  }, []);

  const startGame = useCallback(() => {
    stateRef.current = initState();
    setScore(0); setLives(3); setGameStatus('playing');
  }, [initState]);

  const draw = useCallback((ctx, state) => {
    const { maze, pacman, ghosts } = state;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    // Draw maze
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cell = maze[row][col];
        const px = col * CELL, py = row * CELL;
        if (cell === 1) {
          ctx.fillStyle = '#1e40af';
          ctx.fillRect(px+1, py+1, CELL-2, CELL-2);
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 1;
          ctx.strokeRect(px+1, py+1, CELL-2, CELL-2);
        } else if (cell === 0) {
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(px + CELL/2, py + CELL/2, 2.5, 0, Math.PI*2);
          ctx.fill();
        } else if (cell === 3) {
          ctx.fillStyle = state.powerTimer > 0 ? '#FFD700' : '#FF69B4';
          ctx.beginPath();
          ctx.arc(px + CELL/2, py + CELL/2, 5, 0, Math.PI*2);
          ctx.fill();
          if (state.powerTimer > 0) {
            ctx.shadowColor = '#FFD700'; ctx.shadowBlur = 10;
            ctx.fill(); ctx.shadowBlur = 0;
          }
        }
      }
    }

    // Draw pacman (MK logo or yellow circle)
    const px = pacman.x * CELL + CELL/2;
    const py = pacman.y * CELL + CELL/2;
    if (logoImgRef.current) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(px, py, CELL/2 - 1, 0, Math.PI*2);
      ctx.clip();
      ctx.drawImage(logoImgRef.current, px - CELL/2 + 1, py - CELL/2 + 1, CELL-2, CELL-2);
      ctx.restore();
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(px, py, CELL/2 - 1, 0, Math.PI*2);
      ctx.stroke();
    } else {
      const mouthA = pacman.mouth * Math.PI;
      let startAngle = mouthA;
      let endAngle = 2 * Math.PI - mouthA;
      if (pacman.dir === 'left')  { startAngle = Math.PI + mouthA; endAngle = Math.PI - mouthA; }
      else if (pacman.dir === 'up')   { startAngle = 1.5*Math.PI + mouthA; endAngle = 1.5*Math.PI - mouthA; }
      else if (pacman.dir === 'down') { startAngle = 0.5*Math.PI + mouthA; endAngle = 0.5*Math.PI - mouthA; }
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.arc(px, py, CELL/2 - 1, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();
    }

    // Draw ghosts
    for (const ghost of ghosts) {
      const gx = ghost.x * CELL + CELL/2;
      const gy = ghost.y * CELL + CELL/2;
      ctx.save();
      if (ghost.scared) {
        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        ctx.arc(gx, gy, CELL/2 - 1, Math.PI, 0);
        ctx.lineTo(gx + CELL/2 - 1, gy + CELL/2 - 1);
        ctx.lineTo(gx - CELL/2 + 1, gy + CELL/2 - 1);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.font = `${CELL + 2}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ghost.emoji, gx, gy);
      }
      ctx.restore();
    }
  }, []);

  const update = useCallback((state) => {
    state.frameCount++;
    if (state.powerTimer > 0) {
      state.powerTimer--;
      if (state.powerTimer === 0) state.ghosts.forEach(g => g.scared = false);
    }

    // Mouth animation
    const p = state.pacman;
    p.mouth += p.mouthDir * 0.06;
    if (p.mouth >= 0.35 || p.mouth <= 0.02) p.mouthDir *= -1;

    // Move pacman every 6 frames
    if (state.frameCount % 6 === 0) {
      if (canMove(state.maze, p.x, p.y, p.nextDir)) p.dir = p.nextDir;
      if (canMove(state.maze, p.x, p.y, p.dir)) {
        const {dx,dy} = dirVec(p.dir);
        p.x = (p.x + dx + COLS) % COLS;
        p.y = (p.y + dy + ROWS) % ROWS;
      }
      // Eat
      const cell = state.maze[p.y][p.x];
      if (cell === 0) { state.maze[p.y][p.x] = 2; state.score += 10; state.dotsEaten++; }
      if (cell === 3) { state.maze[p.y][p.x] = 2; state.score += 50; state.dotsEaten++; state.powerTimer = 180; state.ghosts.forEach(g => g.scared = true); }
    }

    // Move ghosts every 10 frames
    state.ghostMoveTimer = (state.ghostMoveTimer || 0) + 1;
    if (state.ghostMoveTimer % 10 === 0) {
      for (const ghost of state.ghosts) {
        const dirs = ['up','down','left','right'];
        const opposite = { up:'down', down:'up', left:'right', right:'left' };
        const possible = dirs.filter(d => d !== opposite[ghost.dir] && canMove(state.maze, ghost.x, ghost.y, d));
        if (possible.length === 0) possible.push(opposite[ghost.dir]);
        // Chase or random
        if (!ghost.scared && Math.random() < 0.5) {
          // Chase pacman
          const best = possible.reduce((bd, d) => {
            const {dx,dy} = dirVec(d);
            const dist = Math.abs(ghost.x+dx - p.x) + Math.abs(ghost.y+dy - p.y);
            return dist < bd.dist ? {d, dist} : bd;
          }, {d: possible[0], dist: 9999});
          ghost.dir = best.d;
        } else {
          ghost.dir = possible[Math.floor(Math.random() * possible.length)];
        }
        const {dx,dy} = dirVec(ghost.dir);
        ghost.x = (ghost.x + dx + COLS) % COLS;
        ghost.y = (ghost.y + dy + ROWS) % ROWS;
      }
    }

    // Collision detection
    for (const ghost of state.ghosts) {
      if (ghost.x === p.x && ghost.y === p.y) {
        if (ghost.scared) {
          ghost.scared = false;
          ghost.x = 10; ghost.y = 10;
          state.score += 200;
        } else {
          return 'dead';
        }
      }
    }

    if (state.dotsEaten >= state.totalDots) return 'won';
    return 'playing';
  }, []);

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
      const result = update(state);
      draw(ctx, state);
      setScore(state.score);

      if (result === 'dead') {
        const newLives = state.lives - 1;
        state.lives = newLives;
        setLives(newLives);
        if (newLives <= 0) {
          setHighScore(h => Math.max(h, state.score));
          setGameStatus('gameover');
          return;
        }
        state.pacman = { x: 10, y: 17, dir: 'right', nextDir: 'right', frame: 0, mouth: 0.2, mouthDir: 1 };
      } else if (result === 'won') {
        setHighScore(h => Math.max(h, state.score));
        setGameStatus('won');
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gameStatus, draw, update]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!stateRef.current) return;
      const map = { ArrowUp:'up', ArrowDown:'down', ArrowLeft:'left', ArrowRight:'right', w:'up', s:'down', a:'left', d:'right' };
      if (map[e.key]) { stateRef.current.pacman.nextDir = map[e.key]; e.preventDefault(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Draw idle screen
  useEffect(() => {
    if (gameStatus !== 'idle') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('PAC-MAN MONTEKING', W/2, H/2 - 30);
    ctx.font = '14px monospace';
    ctx.fillStyle = '#888';
    ctx.fillText('Presiona INICIAR para jugar', W/2, H/2);
    ctx.fillText('Usa flechas o WASD para mover', W/2, H/2 + 25);
    ctx.fillStyle = '#FFD700';
    ctx.font = '24px serif';
    ctx.fillText('💊🍄🌿💉 = enemigos', W/2, H/2 + 60);
  }, [gameStatus]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* HUD */}
      <div className="flex items-center justify-between w-full max-w-[378px]">
        <div>
          <span className="text-zinc-500 text-xs uppercase tracking-wider">Puntos</span>
          <div className="text-yellow-500 font-bold text-xl">{score.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <span className="text-zinc-500 text-xs uppercase tracking-wider">Vidas</span>
          <div className="text-xl">{'🟡'.repeat(Math.max(0, lives))}</div>
        </div>
        <div className="text-right">
          <span className="text-zinc-500 text-xs uppercase tracking-wider">Récord</span>
          <div className="text-zinc-300 font-bold text-xl">{highScore.toLocaleString()}</div>
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="border border-blue-800 rounded-lg"
          style={{ maxWidth: '100%' }}
        />
        {(gameStatus === 'gameover' || gameStatus === 'won') && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded-lg">
            <div className="text-4xl mb-2">{gameStatus === 'won' ? '🏆' : '💀'}</div>
            <h2 className="text-2xl font-bold text-yellow-500 mb-1">
              {gameStatus === 'won' ? '¡GANASTE!' : 'GAME OVER'}
            </h2>
            <p className="text-white mb-4">Puntos: {score}</p>
            <Button onClick={startGame} className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold">
              Jugar de Nuevo
            </Button>
          </div>
        )}
      </div>

      {gameStatus === 'idle' ? (
        <Button onClick={startGame} size="lg" className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-10">
          🎮 INICIAR JUEGO
        </Button>
      ) : gameStatus === 'playing' ? (
        <p className="text-zinc-500 text-sm">Flechas / WASD para mover • 💊🍄🌿💉 son los enemigos</p>
      ) : null}
    </div>
  );
}