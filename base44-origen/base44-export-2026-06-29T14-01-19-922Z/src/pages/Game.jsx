import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Music, Zap, Mic, Music2 } from 'lucide-react';
import BeatMakerGrid from '../components/games/BeatMakerGrid';
import PacManGame from '../components/games/PacManGame';
import RhythmTap from '../components/games/RhythmTap';
import AudioSpectrogram from '../components/games/AudioSpectrogram';
import VirtualPiano from '../components/games/VirtualPiano';

const TABS = [
  { id: 'beatmaker',    label: 'Beat Maker',    icon: Music,    desc: 'Crea beats en vivo con síntesis real' },
  { id: 'spectrogram',  label: 'Espectrograma', icon: Mic,      desc: 'Visualizador de audio 3D en tiempo real' },
  { id: 'piano',        label: 'Piano Virtual', icon: Music2,   desc: 'Toca piano con teclado o táctil' },
  { id: 'pacman',       label: 'PacMan MK',     icon: Gamepad2, desc: 'Pacman con el logo de Monteking' },
  { id: 'rhythm',       label: 'Rhythm Tap',    icon: Zap,      desc: 'Juego de ritmo al estilo Piano Tiles' },
];

export default function GamePage() {
  const [activeTab, setActiveTab] = useState('beatmaker');

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10">
          <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">
            Zona de Juegos
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-4">
            Monteking <span className="text-yellow-500">Games</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Crea música, juega y compite. Todos los juegos son 100% funcionales e interactivos.
          </p>
        </motion.div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all border ${
                activeTab === tab.id
                  ? 'bg-yellow-500 border-yellow-500 text-black'
                  : 'bg-zinc-900/50 border-zinc-700 text-zinc-300 hover:border-zinc-500'
              }`}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Game content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}>
          {activeTab === 'beatmaker' && (
            <div>
              <div className="text-center mb-6">
                <p className="text-zinc-400">Activa celdas para crear un patrón. Usa síntesis de audio en tiempo real — <span className="text-yellow-500">sin descargas</span>.</p>
              </div>
              <BeatMakerGrid />
            </div>
          )}
          {activeTab === 'spectrogram' && (
            <div>
              <div className="text-center mb-6">
                <p className="text-zinc-400">Visualizador de audio en tiempo real usando Web Audio API. Activa tu micrófono para ver el espectrograma.</p>
              </div>
              <AudioSpectrogram />
            </div>
          )}
          {activeTab === 'piano' && (
            <div>
              <div className="text-center mb-6">
                <p className="text-zinc-400">Piano virtual con síntesis de audio real. Usa el teclado de tu computadora o toca las teclas directamente.</p>
              </div>
              <VirtualPiano />
            </div>
          )}
          {activeTab === 'pacman' && (
            <div className="flex flex-col items-center">
              <div className="text-center mb-6">
                <p className="text-zinc-400">PacMan es el logo de Monteking. Los fantasmas son tus enemigos 💊🍄🌿💉</p>
                <p className="text-zinc-500 text-sm">Flechas del teclado o WASD para mover</p>
              </div>
              <PacManGame />
            </div>
          )}
          {activeTab === 'rhythm' && (
            <div className="flex flex-col items-center">
              <div className="text-center mb-6">
                <p className="text-zinc-400">Toca los tiles de colores al ritmo cuando lleguen a la línea dorada.</p>
                <p className="text-zinc-500 text-sm">Teclas A / S / D / F o toca la pantalla en móvil</p>
              </div>
              <RhythmTap />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}