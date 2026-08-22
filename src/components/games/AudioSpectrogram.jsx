import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Music, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AudioSpectrogram() {
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const ctxRef = useRef(null);
  const rafRef = useRef(null);
  const streamRef = useRef(null);
  const audioCtxRef = useRef(null);

  const [active, setActive] = useState(false);
  const [mode, setMode] = useState('bars'); // bars | spectrogram | circular
  const [error, setError] = useState('');
  const [peak, setPeak] = useState(0);

  const COLOR_PRESETS = [
    { name: 'Dorado', from: [212,175,55], to: [255,100,0] },
    { name: 'Neon',   from: [0,255,150], to: [0,100,255] },
    { name: 'Fuego',  from: [255,0,80],  to: [255,200,0] },
  ];
  const [colorIdx, setColorIdx] = useState(0);

  const lerp = (a, b, t) => a + (b - a) * t;
  const getColor = (t) => {
    const p = COLOR_PRESETS[colorIdx];
    const r = Math.round(lerp(p.from[0], p.to[0], t));
    const g = Math.round(lerp(p.from[1], p.to[1], t));
    const b2 = Math.round(lerp(p.from[2], p.to[2], t));
    return `rgb(${r},${g},${b2})`;
  };

  const startMic = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.82;
      analyserRef.current = analyser;
      const src = audioCtx.createMediaStreamSource(stream);
      src.connect(analyser);
      sourceRef.current = src;
      setActive(true);
      setError('');
    } catch {
      setError('No se pudo acceder al micrófono. Permite el acceso e intenta de nuevo.');
    }
  }, []);

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());
    audioCtxRef.current?.close();
    analyserRef.current = null;
    setActive(false);
    // Clear canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  // Draw loop
  useEffect(() => {
    if (!active || !analyserRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;
    const bufLen = analyser.frequencyBinCount;
    const data = new Uint8Array(bufLen);
    let scrollX = 0;

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      const W = canvas.width;
      const H = canvas.height;
      analyser.getByteFrequencyData(data);

      // Peak detection
      const maxVal = Math.max(...data);
      setPeak(Math.round((maxVal / 255) * 100));

      if (mode === 'bars') {
        ctx.fillStyle = 'rgba(10,10,10,0.25)';
        ctx.fillRect(0, 0, W, H);
        const barW = W / bufLen * 2.5;
        let x = 0;
        for (let i = 0; i < bufLen; i++) {
          const barH = (data[i] / 255) * H;
          const t = i / bufLen;
          ctx.fillStyle = getColor(t);
          ctx.fillRect(x, H - barH, barW, barH);
          x += barW + 1;
        }
      } else if (mode === 'spectrogram') {
        // Scroll left
        const imgData = ctx.getImageData(1, 0, W - 1, H);
        ctx.putImageData(imgData, 0, 0);
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(W - 1, 0, 1, H);
        const slice = bufLen / H;
        for (let y = 0; y < H; y++) {
          const freq = data[Math.floor((H - y) * slice)] / 255;
          ctx.fillStyle = `rgba(${Math.round(getColor(freq).match(/\d+/g).join(','))},${freq})`;
          // simpler approach:
          const r = lerp(COLOR_PRESETS[colorIdx].from[0], COLOR_PRESETS[colorIdx].to[0], freq);
          const g2 = lerp(COLOR_PRESETS[colorIdx].from[1], COLOR_PRESETS[colorIdx].to[1], freq);
          const b3 = lerp(COLOR_PRESETS[colorIdx].from[2], COLOR_PRESETS[colorIdx].to[2], freq);
          ctx.fillStyle = `rgba(${Math.round(r)},${Math.round(g2)},${Math.round(b3)},${freq * 1.2})`;
          ctx.fillRect(W - 2, y, 2, 1);
        }
      } else if (mode === 'circular') {
        ctx.fillStyle = 'rgba(10,10,10,0.15)';
        ctx.fillRect(0, 0, W, H);
        const cx = W / 2;
        const cy = H / 2;
        const radius = Math.min(W, H) * 0.3;
        const sliceAngle = (2 * Math.PI) / bufLen;
        ctx.beginPath();
        for (let i = 0; i < bufLen; i++) {
          const amplitude = (data[i] / 255) * radius * 0.8;
          const angle = i * sliceAngle - Math.PI / 2;
          const x = cx + (radius + amplitude) * Math.cos(angle);
          const y = cy + (radius + amplitude) * Math.sin(angle);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = getColor(maxVal / 255);
        ctx.lineWidth = 2;
        ctx.stroke();
        // inner glow
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212,175,55,${(maxVal / 255) * 0.6})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, mode, colorIdx]);

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Button
          onClick={active ? stop : startMic}
          className={active ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-yellow-500 hover:bg-yellow-400 text-black'}
        >
          {active ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
          {active ? 'Detener' : 'Activar Micrófono'}
        </Button>

        <div className="flex gap-1 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
          {['bars', 'spectrogram', 'circular'].map(m => (
            <button key={m} onClick={() => setMode(m)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                mode === m ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:text-white'
              }`}>
              {m === 'bars' ? '📊 Barras' : m === 'spectrogram' ? '🌡 Spectro' : '⭕ Circular'}
            </button>
          ))}
        </div>

        <div className="flex gap-1">
          {COLOR_PRESETS.map((c, i) => (
            <button key={c.name} onClick={() => setColorIdx(i)}
              className={`w-7 h-7 rounded-full border-2 transition-all ${colorIdx === i ? 'border-white scale-110' : 'border-zinc-700'}`}
              style={{ background: `linear-gradient(135deg, rgb(${c.from.join(',')}), rgb(${c.to.join(',')}))` }}
              title={c.name}
            />
          ))}
        </div>

        {active && (
          <div className="ml-auto flex items-center gap-2 text-xs text-zinc-400">
            <Waves className="w-3.5 h-3.5 text-yellow-500" />
            Peak: <span className="text-yellow-400 font-mono font-bold">{peak}%</span>
          </div>
        )}
      </div>

      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

      {/* Canvas */}
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
        <canvas ref={canvasRef} className="w-full h-full" />
        {!active && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
              <Mic className="w-7 h-7 text-yellow-500/60" />
            </div>
            <p className="text-zinc-500 text-sm">Activa el micrófono para ver el espectrograma</p>
            <p className="text-zinc-600 text-xs">Canta, pon música, o habla cerca del micro</p>
          </div>
        )}
      </div>

      <p className="text-zinc-600 text-xs mt-2 text-center">
        El audio se procesa localmente en tu dispositivo — nunca se envía al servidor
      </p>
    </div>
  );
}