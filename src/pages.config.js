import About from './pages/About';
import ArtistProfile from './pages/ArtistProfile';
import BeatMaker from './pages/BeatMaker';
import Beats from './pages/Beats';
import Game from './pages/Game';
import Home from './pages/Home';
import LyricVideo from './pages/LyricVideo';
import Membership from './pages/Membership';
import Merch from './pages/Merch';
import Music from './pages/Music';
import ProdInfo from './pages/ProdInfo';
import Services from './pages/Services';
import Videos from './pages/Videos';
import __Layout from './Layout.jsx';

export const PAGES = {
    "Home": Home,
    "Beats": Beats,
    "Music": Music,
    "Videos": Videos,
    "LyricVideo": LyricVideo,
    "Merch": Merch,
    "Services": Services,
    "ProdInfo": ProdInfo,
    "Game": Game,
    "BeatMaker": BeatMaker,
    "About": About,
    "ArtistProfile": ArtistProfile,
    "Membership": Membership,
};

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};