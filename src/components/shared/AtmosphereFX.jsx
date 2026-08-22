import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShoppingBag, Radio, ShieldCheck, Flame, Disc3 } from 'lucide-react';
import AsciiBackground from './AsciiBackground';
import InfiniteFloatingElements from './InfiniteFloatingElements';
import { useAudio } from '@/context/AudioContext';

const LIVE_NOTIFICATIONS = [
  { icon: ShoppingBag, title: "Licencia Exclusiva Vendida", desc: "Trap Memphis 'Sour Play' — Monterrey, MX", time: "Hace 4m" },
  { icon: Radio, title: "Nuevo Stream en Vivo", desc: "Casila OG - 201xCiento (4K)", time: "Hace 12m" },
  { icon: ShieldCheck, title: "Sample Pack Adquirido", desc: "13-11 Memphis Vault 24-Bit — CDMX", time: "Hace 18m" },
  { icon: Flame, title: "Beat Agregado a Carrito", desc: "Boom Bap 'Devil 90s' — Guadalajara", time: "Hace 25m" }
];

export default function AtmosphereFX() {
  const [showNotif, setShowNotif] = useState(false);
  const [currentNotifIdx, setCurrentNotifIdx] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  const canvasSparksRef = useRef(null);
  const cursorCanvasRef = useRef(null);
  const sparkTrailRef = useRef([]);

  // Check if desktop device
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024 && window.matchMedia('(pointer: fine)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // 1. TACTICAL RETICLE & SPARK TRAIL CURSOR LOOP
  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Add sparks to cursor trail
      for (let i = 0; i < 2; i++) {
        sparkTrailRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 0.5,
          size: Math.random() * 2.5 + 1,
          alpha: 1,
          life: 0,
          maxLife: 25 + Math.random() * 15
        });
      }

      // Parallax on texture
      const texture = document.getElementById('global-bg-texture');
      if (texture) {
        const moveX = (window.innerWidth / 2 - e.clientX) / 45;
        const moveY = (window.innerHeight / 2 - e.clientY) / 45;
        texture.style.transform = `scale(1.12) translate(${moveX}px, ${moveY}px)`;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('button, a, input, [role="button"], .cursor-pointer');
      setIsHoveringLink(Boolean(isInteractive));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Cursor spark canvas render loop
    let animId;
    const renderCursorTrail = () => {
      animId = requestAnimationFrame(renderCursorTrail);
      const canvas = cursorCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render spark trail
      for (let i = sparkTrailRef.current.length - 1; i >= 0; i--) {
        const spark = sparkTrailRef.current[i];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.life++;
        spark.alpha = Math.max(0, 1 - (spark.life / spark.maxLife));

        if (spark.alpha <= 0) {
          sparkTrailRef.current.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(255, 215, 0, ${spark.alpha * 0.85})`;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    renderCursorTrail();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [isDesktop]);

  // 2. CONTINUOUS NON-STOP BACKGROUND FIREFLIES & SPARKS LOOP (CANVAS 2D)
  useEffect(() => {
    const canvas = canvasSparksRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 35 : 75;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize glowing embers / sparks
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2.2 + 0.8,
      baseRadius: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -Math.random() * 0.8 - 0.2, // Continuous upward gentle float
      alpha: Math.random() * 0.7 + 0.3,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.04 + 0.02,
      hue: Math.random() > 0.3 ? 45 : 35 // Gold / Amber spectrum
    }));

    const renderSparks = () => {
      animId = requestAnimationFrame(renderSparks);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.pulseSpeed;

        // Sine wave shimmer & pulse
        p.alpha = 0.4 + Math.sin(p.phase) * 0.4;
        p.radius = p.baseRadius * (0.8 + Math.sin(p.phase) * 0.4);

        // Wrap around screen boundaries seamlessly
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        // Draw glowing particle
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.alpha})`;
        ctx.shadowColor = `hsl(${p.hue}, 100%, 50%)`;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    renderSparks();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // 3. Social Proof Toast (Spaced every 22s)
  useEffect(() => {
    const notifTimer = setInterval(() => {
      setShowNotif(true);
      setTimeout(() => {
        setShowNotif(false);
        setTimeout(() => {
          setCurrentNotifIdx((prev) => (prev + 1) % LIVE_NOTIFICATIONS.length);
        }, 500);
      }, 5000);
    }, 22000);

    return () => clearInterval(notifTimer);
  }, []);

  const activeNotif = LIVE_NOTIFICATIONS[currentNotifIdx];
  const IconComp = activeNotif.icon;

  return (
    <>
      {/* ── Fixed Global Background Layers ── */}
      <div className="fixed inset-0 pointer-events-none z-[-10] overflow-hidden">
        {/* Crocodile Texture */}
        <div
          id="global-bg-texture"
          className="absolute inset-[-12%] bg-cover bg-center transition-transform duration-300 ease-out will-change-transform"
          style={{
            backgroundImage: "url('assets/crocodile_texture.jpg')",
            opacity: 0.88,
            filter: "brightness(0.72) contrast(1.3)",
          }}
        />

        {/* Dynamic Genre Tint */}
        <div
          className="absolute inset-0 transition-colors duration-700 ease-in-out"
          style={{
            backgroundColor: "var(--theme-bg-tint)",
            mixBlendMode: "overlay",
          }}
        />

        {/* Smoke Fog Layer */}
        <div className="absolute inset-0 animate-smoke opacity-35" />

        {/* 21st.dev Custom ASCII Art Canvas2D Effect Layer */}
        <AsciiBackground />

        {/* 7 User Background Images in Infinite Floating Motion Loop */}
        <InfiniteFloatingElements />

        {/* Non-stop moving continuous canvas sparks */}
        <canvas ref={canvasSparksRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      </div>

      {/* ── Tactical Reticle & Spark Trail Cursor (Desktop Only) ── */}
      {isDesktop && (
        <>
          <canvas
            ref={cursorCanvasRef}
            className="fixed inset-0 pointer-events-none z-[99998]"
          />

          {/* Tactical Crosshair / Diamond Pointer */}
          <div
            className="fixed pointer-events-none z-[99999] transition-transform duration-75 ease-out"
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
              transform: `translate(-50%, -50%) scale(${isClicking ? 0.75 : isHoveringLink ? 1.4 : 1})`,
            }}
          >
            {/* Center Golden Diamond Point */}
            <div className="w-2.5 h-2.5 bg-yellow-400 rotate-45 border border-yellow-100 shadow-[0_0_12px_#FFD700]" />

            {/* Tactical Crosshair Lines */}
            <div className={`absolute top-1/2 -left-3 w-2 h-[1px] bg-yellow-400/80 -translate-y-1/2 transition-all ${isHoveringLink ? 'w-3.5 -left-4 bg-yellow-300' : ''}`} />
            <div className={`absolute top-1/2 -right-3 w-2 h-[1px] bg-yellow-400/80 -translate-y-1/2 transition-all ${isHoveringLink ? 'w-3.5 -right-4 bg-yellow-300' : ''}`} />
            <div className={`absolute left-1/2 -top-3 w-[1px] h-2 bg-yellow-400/80 -translate-x-1/2 transition-all ${isHoveringLink ? 'h-3.5 -top-4 bg-yellow-300' : ''}`} />
            <div className={`absolute left-1/2 -bottom-3 w-[1px] h-2 bg-yellow-400/80 -translate-x-1/2 transition-all ${isHoveringLink ? 'h-3.5 -bottom-4 bg-yellow-300' : ''}`} />

            {/* Expanding Reticle Ring on Hover */}
            {isHoveringLink && (
              <div className="absolute -inset-2.5 border border-yellow-400/50 rounded-full animate-ping pointer-events-none" />
            )}
          </div>
        </>
      )}

      {/* ── Social Proof / Live Activity Toast ── */}
      <div className="fixed bottom-24 left-4 sm:left-6 z-40 pointer-events-none">
        <AnimatePresence>
          {showNotif && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-black/95 backdrop-blur-xl border border-yellow-500/40 rounded-2xl p-3.5 shadow-2xl shadow-black/90 flex items-center gap-3 max-w-xs sm:max-w-sm pointer-events-auto"
            >
              <div className="w-9 h-9 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0 text-yellow-400">
                <IconComp className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-white text-xs font-bold truncate font-oswald">{activeNotif.title}</p>
                  <span className="text-[10px] text-yellow-400/90 font-mono">● {activeNotif.time}</span>
                </div>
                <p className="text-zinc-300 text-[11px] truncate">{activeNotif.desc}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
