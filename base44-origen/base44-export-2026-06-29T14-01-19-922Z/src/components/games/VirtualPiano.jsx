import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// Notes: 2 octaves C3–B4
const KEYS = [
  { note: 'C3',  freq: 130.81, black: false, label: 'C3' },
  { note: 'C#3', freq: 138.59, black: true  },
  { note: 'D3',  freq: 146.83, black: false, label: 'D3' },
  { note: 'D#3', freq: 155.56, black: true  },
  { note: 'E3',  freq: 164.81, black: false, label: 'E3' },
  { note: 'F3',  freq: 174.61, black: false, label: 'F3' },
  { note: 'F#3', freq: 185.00, black: true  },
  { note: 'G3',  freq: 196.00, black: false, label: 'G3' },
  { note: 'G#3', freq: 207.65, black: true  },
  { note: 'A3',  freq: 220.00, black: false, label: 'A3' },
  { note: 'A#3', freq: 233.08, black: true  },
  { note: 'B3',  freq: 246.94, black: false, label: 'B3' },
  { note: 'C4',  freq: 261.63, black: false, label: 'C4' },
  { note: 'C#4', freq: 277.18, black: true  },
  { note: 'D4',  freq: 293.66, black: false, label: 'D4' },
  { note: 'D#4', freq: 311.13, black: true  },
  { note: 'E4',  freq: 329.63, black: false, label: 'E4' },
  { note: 'F4',  freq: 349.23, black: false, label: 'F4' },
  { note: 'F#4', freq: 369.99, black: true  },
  { note: 'G4',  freq: 392.00, black: false, label: 'G4' },
  { note: 'G#4', freq: 415.30, black: true  },
  { note: 'A4',  freq: 440.00, black: false, label: 'A4' },
  { note: 'A#4', freq: 466.16, black: true  },
  { note: 'B4',  freq: 493.88, black: false, label: 'B4' },
];

// Keyboard mapping
const KEY_MAP = {
  'a':'C3','w':'C#3','s':'D3','e':'D#3','d':'E3','f':'F3','t':'F#3','g':'G3',
  'y':'G#3','h':'A3','u':'A#3','j':'B3','k':'C4','o':'C#4','l':'D4',
  'p':'D#4',';':'E4',"'":'F4',
};

const WAVE_TYPES = ['sine','triangle','sawtooth','square'];
const WAVE_LABELS = ['Sine 🎻','Triangle 🔺','Sawtooth 🎸','Square 🟦'];

export default function VirtualPiano() {
  const audioCtxRef = useRef(null);
  const activeNodes = useRef({});
  const [pressed, setPressed] = useState(new Set());
  const [wave, setWave] = useState('sine');
  const [octaveShift, setOctaveShift] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [reverb, setReverb] = useState(false);
  const convolverRef = useRef(null);
  const masterGainRef = useRef(null);

  const getAudioCtx = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      masterGainRef.current = audioCtxRef.current.createGain();
      masterGainRef.current.gain.value = volume;
      masterGainRef.current.connect(audioCtxRef.current.destination);
    }
    return audioCtxRef.current;
  };

  const playNote = useCallback((note, freq) => {
    if (activeNodes.current[note]) return;
    const ctx = getAudioCtx();
    const shiftedFreq = freq * Math.pow(2, octaveShift);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = wave;
    osc.frequency.setValueAtTime(shiftedFreq, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);

    osc.connect(gain);
    gain.connect(masterGainRef.current);

    osc.start();
    activeNodes.current[note] = { osc, gain };
    setPressed(p => new Set([...p, note]));
  }, [wave, octaveShift]);

  const stopNote = useCallback((note) => {
    const node = activeNodes.current[note];
    if (!node) return;
    const { osc, gain } = node;
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.stop(ctx.currentTime + 0.4);
    delete activeNodes.current[note];
    setPressed(p => { const n = new Set(p); n.delete(note); return n; });
  }, []);

  // Volume sync
  useEffect(() => {
    if (masterGainRef.current) masterGainRef.current.gain.value = volume;
  }, [volume]);

  // Keyboard events
  useEffect(() => {
    const down = (e) => {
      if (e.repeat) return;
      const note = KEY_MAP[e.key.toLowerCase()];
      if (note) {
        const k = KEYS.find(k => k.note === note);
        if (k) playNote(k.note, k.freq);
      }
    };
    const up = (e) => {
      const note = KEY_MAP[e.key.toLowerCase()];
      if (note) stopNote(note);
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, [playNote, stopNote]);

  const whiteKeys = KEYS.filter(k => !k.black);
  const whiteW = 100 / whiteKeys.length;

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <div className="flex gap-1 bg-zinc-900 rounded-lg p-1 border border-zinc-800">
          {WAVE_TYPES.map((w, i) => (
            <button key={w} onClick={() => setWave(w)}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                wave === w ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:text-white'
              }`}>
              {WAVE_LABELS[i]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span>Octava:</span>
          <button onClick={() => setOctaveShift(o => Math.max(-2, o-1))}
            className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center font-bold">−</button>
          <span className="text-yellow-400 font-bold font-mono w-4 text-center">{octaveShift > 0 ? `+${octaveShift}` : octaveShift}</span>
          <button onClick={() => setOctaveShift(o => Math.min(2, o+1))}
            className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center font-bold">+</button>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span>Vol:</span>
          <input type="range" min={0} max={1} step={0.01} value={volume}
            onChange={e => setVolume(parseFloat(e.target.value))}
            className="w-20 accent-yellow-500" />
        </div>
      </div>

      {/* Piano */}
      <div className="relative w-full overflow-x-auto">
        <div className="relative mx-auto" style={{ width: '100%', minWidth: 600, height: 160 }}>
          {/* White keys */}
          {whiteKeys.map((key, wi) => (
            <div
              key={key.note}
              onMouseDown={() => playNote(key.note, key.freq)}
              onMouseUp={() => stopNote(key.note)}
              onMouseLeave={() => stopNote(key.note)}
              onTouchStart={(e) => { e.preventDefault(); playNote(key.note, key.freq); }}
              onTouchEnd={() => stopNote(key.note)}
              className="absolute bottom-0 rounded-b-lg border border-zinc-700 cursor-pointer select-none flex flex-col items-center justify-end pb-2 transition-all duration-75"
              style={{
                left: `${wi * whiteW}%`,
                width: `${whiteW - 0.3}%`,
                height: '100%',
                background: pressed.has(key.note) ? '#FFD700' : 'linear-gradient(to bottom, #e8e8e8, #fff)',
                boxShadow: pressed.has(key.note) ? 'inset 0 -2px 6px rgba(0,0,0,0.2)' : '0 4px 6px rgba(0,0,0,0.4)',
                zIndex: 1,
              }}>
              <span className="text-zinc-500 text-xs font-mono" style={{ fontSize: '9px' }}>{key.label}</span>
            </div>
          ))}

          {/* Black keys */}
          {(() => {
            let wi = -1;
            return KEYS.map((key, i) => {
              if (!key.black) { wi++; return null; }
              return (
                <div
                  key={key.note}
                  onMouseDown={(e) => { e.stopPropagation(); playNote(key.note, key.freq); }}
                  onMouseUp={() => stopNote(key.note)}
                  onMouseLeave={() => stopNote(key.note)}
                  onTouchStart={(e) => { e.preventDefault(); playNote(key.note, key.freq); }}
                  onTouchEnd={() => stopNote(key.note)}
                  className="absolute rounded-b-md cursor-pointer select-none transition-all duration-75"
                  style={{
                    left: `${(wi + 1) * whiteW - whiteW * 0.3}%`,
                    width: `${whiteW * 0.6}%`,
                    top: 0,
                    height: '62%',
                    background: pressed.has(key.note) ? '#FFD700' : 'linear-gradient(to bottom, #1a1a1a, #333)',
                    zIndex: 2,
                    boxShadow: pressed.has(key.note) ? '0 2px 8px rgba(255,215,0,0.6)' : '0 4px 8px rgba(0,0,0,0.8)',
                  }}
                />
              );
            });
          })()}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-600">
        <span>🎹 Teclado: <span className="text-zinc-400 font-mono">A W S E D F T G Y H U J K O L P ;</span></span>
        <span>📱 Toca las teclas directamente</span>
      </div>
    </div>
  );
}