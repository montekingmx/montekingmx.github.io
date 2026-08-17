import React, { lazy } from 'react';

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

export const PAGES = {
  "Home": Home,
  "Beats": Beats,
  "Music": Music,
  "Videos": Videos,
  "Merch": Merch,
  "LyricVideo": LyricVideo,
  "ProdInfo": ProdInfo,
  "Services": Services,
  "Gallery": Gallery,
  "Game": Game,
  "About": About,
  "Team": Team,
  "Membership": Membership,
};

export const pagesConfig = {
  mainPage: "Home",
  Pages: PAGES,
};
