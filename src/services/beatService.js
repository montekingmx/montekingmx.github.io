import { songs as rawSongs } from '../data/playlist.js';

// Base URL for audio assets if hosted remotely or locally
const BASE_AUDIO_URL = 'https://montekingmx.github.io/';

/**
 * Limpia el título del beat para una presentación elegante y profesional en la UI
 */
export function cleanBeatTitle(title) {
  if (!title) return 'Untitled Beat';
  return title
    .replace(/\|\|/g, '')
    .replace(/Beat/gi, '')
    .replace(/Monteking/gi, '')
    .replace(/Trap/gi, '')
    .replace(/Memphis/gi, '')
    .replace(/\d+bpm/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normaliza las canciones para consumo del frontend
 */
export function getAllBeats() {
  return rawSongs.map((song, index) => {
    // Determinar URL de audio completa
    const audioUrl = song.url.startsWith('http')
      ? song.url
      : `${BASE_AUDIO_URL}${song.url}`;

    // Determinar carátula
    let coverUrl = song.cover_art_url;
    if (!coverUrl || coverUrl.includes('cover_trap')) {
      coverUrl = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop';
    } else if (!coverUrl.startsWith('http')) {
      coverUrl = `${BASE_AUDIO_URL}${coverUrl}`;
    }

    return {
      id: `beat-${index + 1}`,
      rawName: song.name,
      cleanTitle: cleanBeatTitle(song.name) || `Beat #${index + 1}`,
      artist: song.artist || 'Monteking',
      genre: song.album || 'TRAP-MEMPH',
      audioUrl: audioUrl,
      bpm: song.bpm && song.bpm > 0 ? song.bpm : 130,
      coverUrl: coverUrl,
      key: 'Min',
      priceBasic: 29.99,
      pricePremium: 49.99,
      priceUnlimited: 99.99,
      priceExclusive: 299.99,
      tags: ['Trap', 'Memphis', 'Dark', 'Monterrey', song.album].filter(Boolean),
      featured: index < 4,
    };
  });
}

/**
 * Obtiene las categorías de géneros únicas presentes en el catálogo
 */
export function getCategories() {
  const beats = getAllBeats();
  const genres = [...new Set(beats.map(b => b.genre))];
  return ['TODOS', ...genres];
}

/**
 * Filtra los beats por categoría, búsqueda y rango de BPM
 */
export function filterBeats({ category = 'TODOS', searchQuery = '', minBpm = 0, maxBpm = 200 }) {
  let list = getAllBeats();

  if (category && category !== 'TODOS') {
    list = list.filter(b => b.genre.toUpperCase() === category.toUpperCase());
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(b => 
      b.cleanTitle.toLowerCase().includes(q) ||
      b.rawName.toLowerCase().includes(q) ||
      b.genre.toLowerCase().includes(q)
    );
  }

  if (minBpm > 0 || maxBpm < 200) {
    list = list.filter(b => b.bpm >= minBpm && b.bpm <= maxBpm);
  }

  return list;
}
