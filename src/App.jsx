import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { AudioPlayer } from './components/AudioPlayer';
import { LicenseModal } from './components/LicenseModal';
import { CartDrawer } from './components/CartDrawer';
import { Toaster } from 'sonner';
import { Disc } from 'lucide-react';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Beats = lazy(() => import('./pages/Beats').then(m => ({ default: m.Beats })));
const Music = lazy(() => import('./pages/Music').then(m => ({ default: m.Music })));
const Videos = lazy(() => import('./pages/Videos').then(m => ({ default: m.Videos })));
const Merch = lazy(() => import('./pages/Merch').then(m => ({ default: m.Merch })));
const LyricVideo = lazy(() => import('./pages/LyricVideo'));
const ProdInfo = lazy(() => import('./pages/ProdInfo'));
const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Game = lazy(() => import('./pages/Game'));
const About = lazy(() => import('./pages/About'));
const Team = lazy(() => import('./pages/Team'));
const Membership = lazy(() => import('./pages/Membership'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-obsidian-dark flex flex-col items-center justify-center text-gold">
      <Disc className="w-12 h-12 animate-spin mb-4 text-gold" style={{ animationDuration: '4s' }} />
      <span className="font-cinzel text-sm font-bold tracking-widest uppercase text-gold-gradient">
        Cargando Monteking 2030...
      </span>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AudioProvider>
        <CartProvider>
          <div className="min-h-screen bg-obsidian-dark text-foreground font-sans relative selection:bg-gold selection:text-obsidian-dark">
            <Toaster position="top-right" theme="dark" toastOptions={{
              style: { background: '#121216', border: '1px solid rgba(212, 175, 55, 0.3)', color: '#fff' }
            }} />

            <Navbar />

            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/beats" element={<Beats />} />
                <Route path="/music" element={<Music />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/merch" element={<Merch />} />
                <Route path="/lyric-video" element={<LyricVideo />} />
                <Route path="/prod-info" element={<ProdInfo />} />
                <Route path="/services" element={<Services />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/game" element={<Game />} />
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>

            {/* Global Overlays & Persistent Audio Player */}
            <AudioPlayer />
            <LicenseModal />
            <CartDrawer />
          </div>
        </CartProvider>
      </AudioProvider>
    </Router>
  );
}
