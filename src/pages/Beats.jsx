import React, { useState } from 'react';
import { BeatCard } from '../components/BeatCard';
import { getAllBeats, getCategories } from '../services/beatService';
import { Search, SlidersHorizontal, Disc, Filter } from 'lucide-react';

export function Beats() {
  const allBeats = getAllBeats();
  const categories = getCategories();

  const [selectedCategory, setSelectedCategory] = useState('TODOS');
  const [searchQuery, setSearchQuery] = useState('');
  const [bpmRange, setBpmRange] = useState(200);

  const filteredBeats = allBeats.filter((beat) => {
    const matchesCategory = selectedCategory === 'TODOS' || beat.genre.toUpperCase() === selectedCategory.toUpperCase();
    const matchesSearch = beat.cleanTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          beat.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBpm = beat.bpm <= bpmRange;
    return matchesCategory && matchesSearch && matchesBpm;
  });

  return (
    <div className="min-h-screen bg-obsidian-dark pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-gold uppercase mb-2 block">
            PORTAL OFICIAL DE BEATS
          </span>
          <h1 className="font-cinzel font-black text-4xl sm:text-6xl text-white">
            BEATSTORE <span className="text-gold-gradient">IMPERIAL</span>
          </h1>
          <p className="text-sm text-gray-400 mt-3 max-w-xl mx-auto">
            Explora {allBeats.length} ritmos originales producidos por Monteking. Selecciona tu licencia y obtén los archivos inmediatamente.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="glass-card rounded-2xl p-6 border border-gold/20 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Search */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Buscar título o género..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-11 rounded-xl bg-obsidian-dark border border-gold/30 text-sm text-white focus:outline-none focus:border-gold"
            />
            <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* Genre Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gold text-obsidian-dark shadow-gold-glow'
                    : 'bg-obsidian-dark text-gray-400 border border-gold/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* BPM Filter */}
          <div className="flex items-center gap-3 w-full md:w-48 shrink-0">
            <span className="text-xs text-gray-400 font-mono">Max BPM: <strong className="text-gold">{bpmRange}</strong></span>
            <input
              type="range"
              min="80"
              max="200"
              step="5"
              value={bpmRange}
              onChange={(e) => setBpmRange(parseInt(e.target.value))}
              className="w-full h-1 bg-obsidian-dark rounded-lg appearance-none cursor-pointer accent-gold"
            />
          </div>

        </div>

        {/* Beats Grid */}
        {filteredBeats.length === 0 ? (
          <div className="py-20 text-center text-gray-400 glass-card rounded-3xl p-8">
            <Disc className="w-12 h-12 text-gold/40 mx-auto mb-3 animate-spin" style={{ animationDuration: '8s' }} />
            <p className="text-sm">No se encontraron beats con los criterios seleccionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBeats.map((beat) => (
              <BeatCard key={beat.id} beat={beat} beatList={allBeats} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
