import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Mic, Music2, Car } from 'lucide-react';
import GTAMKCityCruiser from '../components/games/GTAMKCityCruiser';
import PacManGame from '../components/games/PacManGame';
import AudioSpectrogram from '../components/games/AudioSpectrogram';
import VirtualPiano from '../components/games/VirtualPiano';

const TABS = [
  { id: 'gtacruiser',   label: 'GTA MK City 3D',   icon: Car,      desc: 'Juego 3D inmersivo tipo GTA recorriendo Monterrey con radio de beats' },
  { id: 'spectrogram',  label: 'Espectrograma 3D', icon: Mic,      desc: 'Visualizador de audio 3D en tiempo real' },
  { id: 'piano',        label: 'Piano Virtual',    icon: Music2,   desc: 'Toca piano con teclado físico o táctil' },
  { id: 'pacman',       label: 'PacMan MK',        icon: Gamepad2, desc: 'Pacman retro con el logo oficial de Monteking' },
];

export default function GamePage() {
  const [activeTab, setActiveTab] = useState('gtacruiser');

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="text-yellow-400 uppercase tracking-[0.3em] text-xs font-bold font-mono">
            Arcade & Sound Lab 13-11
          </span>
          <h1 className="font-pirata text-4xl md:text-7xl font-black text-white mt-3 mb-4 tracking-wider">
            MONTEKING <span className="text-stroke-gold">GAMES 3D</span>
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto font-sans">
            Juegos inmersivos tridimensionales, emuladores y herramientas audiovisuales con banda sonora oficial.
          </p>
        </motion.div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold font-oswald text-sm tracking-wide transition-all border ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 border-yellow-200 text-black shadow-xl shadow-yellow-500/30 scale-105'
                  : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Game Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'gtacruiser' && (
            <div>
              <div className="text-center mb-6">
                <p className="text-zinc-400 text-sm max-w-xl mx-auto">
                  Conduce por la autopista nocturna de Monterrey en tu deportivo 13-11. Sintoniza las estaciones de radio de Monteking y esquiva a la policía mientras recoges monedas doradas.
                </p>
              </div>
              <GTAMKCityCruiser />
            </div>
          )}

          {activeTab === 'spectrogram' && (
            <div>
              <div className="text-center mb-6">
                <p className="text-zinc-400 text-sm">Visualizador de audio 3D en tiempo real usando Web Audio API.</p>
              </div>
              <AudioSpectrogram />
            </div>
          )}

          {activeTab === 'piano' && (
            <div>
              <div className="text-center mb-6">
                <p className="text-zinc-400 text-sm">Piano virtual con osciladores y filtros en tiempo real.</p>
              </div>
              <VirtualPiano />
            </div>
          )}

          {activeTab === 'pacman' && (
            <div className="flex flex-col items-center">
              <div className="text-center mb-6">
                <p className="text-zinc-400 text-sm">PacMan edición Monteking 13-11. Usa las flechas del teclado o controles táctiles.</p>
              </div>
              <PacManGame />
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}