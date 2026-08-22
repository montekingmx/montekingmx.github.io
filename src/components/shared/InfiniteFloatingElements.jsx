import React from 'react';
import { motion } from 'framer-motion';

const BG_IMAGES = [
  { 
    id: "img-1", 
    src: "assets/bg_elements/david-clode.jpg", 
    title: "13-11 Texture", 
    style: "top-[12%] left-[2%] w-44 sm:w-60 lg:w-72 rotate-[-5deg]" 
  },
  { 
    id: "img-2", 
    src: "assets/bg_elements/mike-cox.jpg", 
    title: "Moneda Master Visual", 
    style: "top-[32%] right-[3%] w-48 sm:w-64 lg:w-80 rotate-[6deg]" 
  },
  { 
    id: "img-3", 
    src: "assets/bg_elements/whisk_1050.png", 
    title: "Casila OG Concept", 
    style: "top-[52%] left-[4%] w-44 sm:w-56 lg:w-64 rotate-[4deg]" 
  },
  { 
    id: "img-4", 
    src: "assets/bg_elements/whisk_19bc.jpeg", 
    title: "Underground Vault", 
    style: "top-[70%] right-[4%] w-48 sm:w-60 lg:w-72 rotate-[-4deg]" 
  },
  { 
    id: "img-5", 
    src: "assets/bg_elements/chatgpt_13feb.png", 
    title: "Mamaseo Art", 
    style: "top-[42%] left-[6%] w-40 sm:w-52 lg:w-60 rotate-[-8deg]" 
  },
  { 
    id: "img-6", 
    src: "assets/bg_elements/9b4b965a.png", 
    title: "Monteking Records Emblem", 
    style: "top-[20%] right-[6%] w-44 sm:w-56 lg:w-68 rotate-[8deg]" 
  },
  { 
    id: "img-7", 
    src: "assets/bg_elements/f046ac83.jpg", 
    title: "201% Visualizer Frame", 
    style: "top-[84%] left-[15%] w-52 sm:w-68 lg:w-80 rotate-[3deg]" 
  },
];

export default function InfiniteFloatingElements() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-4] overflow-hidden">
      {BG_IMAGES.map((item, index) => (
        <motion.div
          key={item.id}
          className={`absolute ${item.style} rounded-3xl overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.85)] border-2 border-yellow-500/40 bg-zinc-950/70 backdrop-blur-md opacity-60 hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-pointer group`}
          animate={{
            y: [0, -35, 0, 35, 0],
            x: [0, 20, 0, -20, 0],
            rotate: [0, 3, -3, 2, 0],
            scale: [1, 1.04, 0.98, 1.02, 1]
          }}
          transition={{
            duration: 12 + index * 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 1.2
          }}
          whileHover={{ scale: 1.15, zIndex: 30 }}
        >
          <div className="relative aspect-video w-full h-full">
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 contrast-110"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            {/* Ambient gold glow edge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-yellow-400 uppercase tracking-wider truncate">
                {item.title}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
