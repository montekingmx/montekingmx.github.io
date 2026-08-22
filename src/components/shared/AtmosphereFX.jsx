import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Radio, ShieldCheck, Flame } from 'lucide-react';
import AsciiBackground from './AsciiBackground';
import InfiniteFloatingElements from './InfiniteFloatingElements';

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
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const canvasSparksRef = useRef(null);
  const cometCanvasRef = useRef(null);
  const mousePosRef = useRef({ x: -100, y: -100 });
  const cometTrailRef = useRef([]);

  // Check if desktop device
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024 && window.matchMedia('(pointer: fine)').matches);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // 1. LUMINOUS GOLDEN LIGHT POINT CURSOR (No trail/estela, pure responsive point of light)
  useEffect(() => {
    if (!isDesktop) return;

    let animId;
    const canvas = cometCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
      setIsHoveringLink(Boolean(isInteractive));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Ultra-Fast Render loop for Golden Light Point (Zero Tail)
    const renderCursor = () => {
      animId = requestAnimationFrame(renderCursor);
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentMouse = mousePosRef.current;

      if (currentMouse.x > 0 && currentMouse.y > 0) {
        const headSize = isClicking ? 5 : isHoveringLink ? 8 : 6;

        // Radiant Soft Outer Glow
        const radGrad = ctx.createRadialGradient(
          currentMouse.x, currentMouse.y, 0,
          currentMouse.x, currentMouse.y, headSize * 4
        );
        radGrad.addColorStop(0, 'rgba(255, 240, 160, 0.95)');
        radGrad.addColorStop(0.25, 'rgba(255, 215, 0, 0.65)');
        radGrad.addColorStop(0.65, 'rgba(255, 140, 0, 0.2)');
        radGrad.addColorStop(1, 'rgba(255, 140, 0, 0)');

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(currentMouse.x, currentMouse.y, headSize * 4, 0, Math.PI * 2);
        ctx.fill();

        // Solid Brilliant Golden Center Core
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(currentMouse.x, currentMouse.y, headSize * 0.9, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    renderCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [isDesktop, isHoveringLink, isClicking]);

  // 2. FLOATING GOLDEN EMBERS / CHISPAS (Ultra-lightweight 2D Canvas)
  useEffect(() => {
    const canvas = canvasSparksRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId;
    const count = window.innerWidth < 768 ? 14 : 28;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -Math.random() * 0.45 - 0.2,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.03 + 0.015,
      phase: Math.random() * Math.PI * 2
    }));

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.pulse;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        const a = 0.25 + Math.sin(p.phase) * 0.25;
        ctx.fillStyle = `rgba(255, 215, 0, ${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // 3. Social Proof Toast (Spaced every 25s)
  useEffect(() => {
    const notifTimer = setInterval(() => {
      setShowNotif(true);
      setTimeout(() => {
        setShowNotif(false);
        setTimeout(() => {
          setCurrentNotifIdx((prev) => (prev + 1) % LIVE_NOTIFICATIONS.length);
        }, 500);
      }, 4500);
    }, 25000);

    return () => clearInterval(notifTimer);
  }, []);

  const activeNotif = LIVE_NOTIFICATIONS[currentNotifIdx];
  const IconComp = activeNotif.icon;

  return (
    <>
      {/* ── Fixed Global Background Layers (Crocodile Texture + Code Overlay + Chispas) ── */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        
        {/* Layer 1: Real Crocodile Texture - Full contrast */}
        <div
          id="global-bg-texture"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{
            backgroundImage: "url('assets/crocodile_texture.jpg')",
            opacity: 0.95,
            filter: "brightness(0.75) contrast(1.3)",
          }}
        />

        {/* Layer 2: Subtle Ambient Luxury Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 25%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        {/* Layer 3: Code / Matrix Hex Overlay */}
        <AsciiBackground />

        {/* Layer 4: Floating Elements */}
        <InfiniteFloatingElements />

        {/* Layer 5: Floating Golden Embers / Chispas */}
        <canvas ref={canvasSparksRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80" />
      </div>

      {/* ── Golden Comet (Cometa Dorado) Cursor Canvas (Desktop Only) ── */}
      {isDesktop && (
        <canvas
          ref={cometCanvasRef}
          className="fixed inset-0 pointer-events-none z-[99999]"
        />
      )}

      {/* ── Social Proof Toast Notification (Positioned at bottom-32 to NEVER collide with player) ── */}
      <div className="fixed bottom-32 sm:bottom-36 left-4 sm:left-6 z-40 pointer-events-none">
        <AnimatePresence>
          {showNotif && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-black/95 backdrop-blur-xl border border-yellow-500/50 rounded-2xl p-3.5 shadow-2xl shadow-black/90 flex items-center gap-3 max-w-xs sm:max-w-sm pointer-events-auto"
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

