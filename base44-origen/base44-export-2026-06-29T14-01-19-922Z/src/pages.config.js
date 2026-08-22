/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import About from './pages/About';
import ArtistProfile from './pages/ArtistProfile';
import BeatMaker from './pages/BeatMaker';
import Beats from './pages/Beats';
import Gallery from './pages/Gallery';
import Game from './pages/Game';
import Home from './pages/Home';
import LyricVideo from './pages/LyricVideo';
import Membership from './pages/Membership';
import Merch from './pages/Merch';
import Music from './pages/Music';
import ProdInfo from './pages/ProdInfo';
import Services from './pages/Services';
import Team from './pages/Team';
import Videos from './pages/Videos';
import __Layout from './Layout.jsx';

export const PAGES = {
    "About": About,
    "ArtistProfile": ArtistProfile,
    "BeatMaker": BeatMaker,
    "Beats": Beats,
    "Gallery": Gallery,
    "Game": Game,
    "Home": Home,
    "LyricVideo": LyricVideo,
    "Membership": Membership,
    "Merch": Merch,
    "Music": Music,
    "ProdInfo": ProdInfo,
    "Services": Services,
    "Team": Team,
    "Videos": Videos,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};