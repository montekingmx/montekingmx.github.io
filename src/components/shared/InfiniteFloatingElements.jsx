import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Curated collection of user images matching:
// mk, global, represent, whisk, 13-11, ahn35eahn35eahn3, ChatGPT 3 mar 2026, B4A87904, BD31866D, 8cb8f89d, FOTOS A VECES ME HAGO EL MUERTO, WALLPAPERS MK 13-11
const IMAGE_POOLS = [
  // Slot 1 (Top Left)
  [
    "assets/bg_elements/Gemini_Generated_Image_ahn35eahn35eahn3.png",
    "assets/bg_elements/Whisk_058422086d1069aa42e45c9c492796cddr.png",
    "assets/bg_elements/13-11_MONEDA_DISEÑO_#1.png",
    "assets/bg_elements/Whisk_1050872ab80877fb2de4c716aa3d777bdr.png"
  ],
  // Slot 2 (Top Right)
  [
    "assets/bg_elements/ChatGPT_Image_3_mar_2026_04_25_26.png",
    "assets/bg_elements/MK_GLOBAL_SELLO.png",
    "assets/bg_elements/Whisk_06c2bf3e4405a3d9b44414179cd89b1ddr.png",
    "assets/bg_elements/PFgeO.png"
  ],
  // Slot 3 (Mid Left)
  [
    "assets/bg_elements/B4A87904-14A8-464B-BE0F-9381ED6DEACE.PNG",
    "assets/bg_elements/represents_amarillos.png",
    "assets/bg_elements/Whisk_463c04a071007269b764a65059c4c99edr.png",
    "assets/bg_elements/ChatGPT_Image_13_feb_2026_04_28_21.png"
  ],
  // Slot 4 (Mid Right)
  [
    "assets/bg_elements/BD31866D-B72A-44DF-AC62-7DB574A82055.JPEG",
    "assets/bg_elements/GLOBAL_SELLO_MK_CAMUFLAJE.png",
    "assets/bg_elements/Whisk_9211fccd27692b88cec4e1c141220600dr.png",
    "assets/bg_elements/Gemini_Generated_Image_p3b7tvp3b7tvp3b7.png"
  ],
  // Slot 5 (Bottom Left)
  [
    "assets/bg_elements/8cb8f89d58111709d557388f53c19189_4096_4096.png",
    "assets/bg_elements/ChatGPT_Image_3_mar_2026_04_21_23.png",
    "assets/bg_elements/Whisk_012bb324baed9f6bec54f09fe6805e67dr.png",
    "assets/bg_elements/Whisk_19bcc94159c7955925044d5dea68a5badr.jpeg"
  ],
  // Slot 6 (Bottom Right)
  [
    "assets/bg_elements/ChatGPT_Image_3_mar_2026_03_55_16.png",
    "assets/bg_elements/Whisk_05ce6eb0604047e87434f199ecdc33fadr.png",
    "assets/bg_elements/IMG_3200.png",
    "assets/bg_elements/Whisk_df5a4aabe94bd86bdf84a5cd9711a592dr.jpeg"
  ],
  // Slot 7 (Center Bottom Floating)
  [
    "assets/bg_elements/Whisk_05e757105d0b2318d7643b5701395b5ddr.png",
    "assets/bg_elements/Whisk_1050872ab80877fb2de4c716aa3d777bdr.png",
    "assets/bg_elements/MK_GLOBAL_SELLO.png",
    "assets/bg_elements/8cb8f89d58111709d557388f53c19189_4096_4096.png"
  ]
];

const CARD_SLOTS = [
  { id: "slot-1", style: "top-[10%] left-[2%] w-44 sm:w-56 lg:w-72 rotate-[-4deg]" },
  { id: "slot-2", style: "top-[25%] right-[2%] w-48 sm:w-60 lg:w-76 rotate-[5deg]" },
  { id: "slot-3", style: "top-[46%] left-[3%] w-44 sm:w-56 lg:w-68 rotate-[3deg]" },
  { id: "slot-4", style: "top-[64%] right-[3%] w-48 sm:w-60 lg:w-72 rotate-[-4deg]" },
  { id: "slot-5", style: "top-[38%] left-[5%] w-40 sm:w-52 lg:w-64 rotate-[-6deg]" },
  { id: "slot-6", style: "top-[18%] right-[5%] w-44 sm:w-56 lg:w-68 rotate-[6deg]" },
  { id: "slot-7", style: "top-[82%] left-[18%] w-52 sm:w-64 lg:w-76 rotate-[2deg]" },
];

export default function InfiniteFloatingElements() {
  const [cycleIndex, setCycleIndex] = useState(0);

  // Smoothly alternate images every 12 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCycleIndex((prev) => prev + 1);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[-5] overflow-hidden">
      {CARD_SLOTS.map((slot, index) => {
        const pool = IMAGE_POOLS[index % IMAGE_POOLS.length];
        const currentSrc = pool[cycleIndex % pool.length];

        return (
          <motion.div
            key={slot.id}
            className={`absolute ${slot.style} rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.9)] border-2 border-yellow-500/50 bg-zinc-950/80 backdrop-blur-md opacity-75 hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-pointer group`}
            animate={{
              y: [0, -25, 0, 25, 0],
              x: [0, 15, 0, -15, 0],
              rotate: [0, 2.5, -2.5, 1.5, 0],
              scale: [1, 1.03, 0.98, 1.02, 1]
            }}
            transition={{
              duration: 14 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 1.1
            }}
            whileHover={{ scale: 1.12, zIndex: 30 }}
          >
            <div className="relative aspect-video w-full h-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSrc}
                  src={currentSrc}
                  alt=""
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95 contrast-110"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </AnimatePresence>

              {/* Ambient Gold Sheen Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-yellow-400/80 shadow-[0_0_8px_#FFD700]" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

