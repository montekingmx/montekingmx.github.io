import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '../components/HeroSection';
import { BeatCard } from '../components/BeatCard';
import { MusicSection } from '../components/MusicSection';
import { VideosSection } from '../components/VideosSection';
import { MerchSection } from '../components/MerchSection';
import { getAllBeats, getCategories } from '../services/beatService';
import { Disc, Search, Sparkles, SlidersHorizontal, ArrowRight, ShieldCheck, Zap, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  const allBeats = getAllBeats();
  const categories = getCategories();

  const [selectedCategory, setSelectedCategory] = useState('TODOS');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBeats = allBeats.filter((beat) => {
    const matchesCategory = selectedCategory === 'TODOS' || beat.genre.toUpperCase() === selectedCategory.toUpperCase();
    const matchesSearch = beat.cleanTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          beat.genre.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBeat = allBeats[0];

  return (
    <div className="min-h-screen bg-obsidian-dark text-foreground flex flex-col">
      
      {/* 1. Hero Section */}
      <HeroSection featuredBeat={featuredBeat} beatList={allBeats} />

      {/* Value Propositions Ribbon */}
      <div className="py-8 bg-obsidian-card border-y border-gold/15 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3 p-2">
            <div className="p-3 rounded-2xl bg-gold/10 text-gold border border-gold/20">
              <Zap className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <h4 className="font-bold text-sm text-white">Descargas Instantáneas 24/7</h4>
              <p className="text-xs text-gray-400">Archivos WAV & Stems listos para grabar</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-2">
            <div className="p-3 rounded-2xl bg-gold/10 text-gold border border-gold/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <h4 className="font-bold text-sm text-white">Licencias 100% Claras</h4>
              <p className="text-xs text-gray-400">Sin reclamos de copyright en plataformas</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-2">
            <div className="p-3 rounded-2xl bg-gold/10 text-gold border border-gold/20">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <h4 className="font-bold text-sm text-white">Mezcla Profesional HQ</h4>
              <p className="text-xs text-gray-400">Masterizados para sonar potente en club/radio</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Beatstore Showcase Section */}
      <section className="py-20 px-4 relative max-w-7xl mx-auto w-full">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-gold uppercase mb-2 block">
              CATÁLOGO DE RITMOS
            </span>
            <h2 className="font-cinzel font-black text-3xl sm:text-5xl text-white">
              EXPLORAR <span className="text-gold-gradient">BEATS</span>
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Buscar por nombre o estilo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-11 rounded-2xl bg-obsidian-card border border-gold/20 focus:border-gold text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold transition-all"
            />
            <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-gold text-obsidian-dark shadow-gold-glow'
                  : 'bg-obsidian-card text-gray-400 border border-gold/15 hover:border-gold/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Beats Grid */}
        {filteredBeats.length === 0 ? (
          <div className="py-16 text-center text-gray-400 glass-card rounded-3xl p-8">
            <Disc className="w-12 h-12 text-gold/40 mx-auto mb-3 animate-spin" style={{ animationDuration: '8s' }} />
            <p className="text-sm">No se encontraron beats que coincidan con la búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBeats.slice(0, 8).map((beat) => (
              <BeatCard key={beat.id} beat={beat} beatList={allBeats} />
            ))}
          </div>
        )}

        {/* View All Beats CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/beats"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-obsidian-card border border-gold/40 hover:border-gold text-gold font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:bg-gold/10 transition-all"
          >
            <span>Ver Todo el Catálogo ({allBeats.length} Beats)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      {/* 3. Music Section */}
      <MusicSection />

      {/* 4. Videos Section */}
      <VideosSection />

      {/* 5. Merch Section */}
      <MerchSection />

      {/* Footer */}
      <footer className="mt-auto py-12 px-4 border-t border-gold/20 bg-obsidian-dark text-center text-gray-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cinzel font-bold text-sm text-gold-gradient">
            MONTEKING MX © {new Date().getFullYear()} • ALL RIGHTS RESERVED
          </span>
          <span className="text-gray-500">
            Monterrey, Nuevo León, México • Beatstore Level 2030
          </span>
        </div>
      </footer>

    </div>
  );
}
