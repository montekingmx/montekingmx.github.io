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

  // 1. GOLDEN COMET (COMETA DORADO) HIGH-PERFORMANCE CURSOR ENGINE
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

    let lastX = -100;
    let lastY = -100;

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mousePosRef.current = { x, y };

      const dist = Math.hypot(x - lastX, y - lastY);
      if (dist > 3) {
        // Add comet trail segments and stardust sparks
        cometTrailRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 3 + 2,
          alpha: 1,
          life: 0,
          maxLife: 28 + Math.random() * 12,
          isSpark: Math.random() > 0.4
        });
        lastX = x;
        lastY = y;
      }
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

    // Render loop for Golden Comet
    const renderComet = () => {
      animId = requestAnimationFrame(renderComet);
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const trail = cometTrailRef.current;
      const currentMouse = mousePosRef.current;

      // Draw Comet Tail Glow Ribbon
      if (trail.length > 2) {
        ctx.save();
        for (let i = trail.length - 1; i > 0; i--) {
          const p = trail[i];
          const prev = trail[i - 1];
          const progress = i / trail.length;

          ctx.strokeStyle = `rgba(255, 215, 0, ${progress * 0.6})`;
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 8 * progress;
          ctx.lineWidth = (progress * 4 + 1);
          ctx.lineCap = 'round';

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Draw Stardust particles
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        p.alpha = Math.max(0, 1 - (p.life / p.maxLife));

        if (p.alpha <= 0) {
          trail.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(255, ${200 + Math.floor(p.alpha * 55)}, 50, ${p.alpha * 0.9})`;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = p.isSpark ? 10 : 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Glowing Comet Head
      if (currentMouse.x > 0 && currentMouse.y > 0) {
        const headSize = isClicking ? 5 : isHoveringLink ? 8 : 6;

        // Radiant Outer Glow
        const radGrad = ctx.createRadialGradient(
          currentMouse.x, currentMouse.y, 0,
          currentMouse.x, currentMouse.y, headSize * 3.5
        );
        radGrad.addColorStop(0, 'rgba(255, 240, 150, 0.95)');
        radGrad.addColorStop(0.3, 'rgba(255, 215, 0, 0.6)');
        radGrad.addColorStop(1, 'rgba(255, 140, 0, 0)');

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(currentMouse.x, currentMouse.y, headSize * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Solid Star Core
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(currentMouse.x, currentMouse.y, headSize * 0.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    renderComet();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [isDesktop, isHoveringLink, isClicking]);

  // 2. BACKGROUND EMBERS (CANVAS 2D)
  useEffect(() => {
    const canvas = canvasSparksRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 18 : 36; // Optimized count for extreme smoothness

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
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.2,
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.03 + 0.01,
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

        const a = 0.3 + Math.sin(p.phase) * 0.3;
        ctx.fillStyle = `rgba(255, 200, 0, ${a})`;
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
      {/* ── Fixed Global Background Layers ── */}
      <div className="fixed inset-0 pointer-events-none z-[-10] overflow-hidden">
        
        {/* Layer 1: Real Crocodile Texture - Crisply visible */}
        <div
          id="global-bg-texture"
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: "url('assets/crocodile_texture.jpg')",
            opacity: 0.94,
            filter: "brightness(0.82) contrast(1.25)",
          }}
        />

        {/* Layer 2: Subtle Ambient Tint */}
        <div
          className="absolute inset-0 transition-colors duration-700 ease-in-out"
          style={{
            backgroundColor: "rgba(10, 8, 4, 0.45)",
          }}
        />

        {/* Layer 3: Ultra-Fast Lightweight ASCII Matrix */}
        <AsciiBackground />

        {/* Layer 4: Floating Elements - ONE LAYER DIRECTLY ABOVE Crocodile Texture! */}
        <InfiniteFloatingElements />

        {/* Layer 5: Non-stop Golden Embers */}
        <canvas ref={canvasSparksRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-75" />
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

