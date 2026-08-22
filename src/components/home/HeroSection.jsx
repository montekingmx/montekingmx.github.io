import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, Crown, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const IMAGES = {
  wallpaper: "assets/branding/monteking_con_textura.png",
  logo: "assets/branding/mk_logo_color.png",
  title: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6947f4b3e4453a62be1b6258/14ca8c5db_STICKERTITULOMONEDAALAIRE.png",
  coinFront: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/a75fec195_13-11MONEDADISENO1.png",
  coinBack: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/b84b3cca8_1311MONEDABACKDISENO-Recuperado-Recuperado-Recuperado.png"
};

// WebGL Particle Ripple Canvas for interactive logo aura
function WebGLAuraCanvas({ mouseX, mouseY, isHovered }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    // Set dimensions
    canvas.width = 300;
    canvas.height = 300;
    gl.viewport(0, 0, 300, 300);

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_hover;

      void main() {
        vec2 uv = v_uv - 0.5;
        float d = length(uv);
        float angle = atan(uv.y, uv.x);
        
        // Fluid aura waves
        float wave = sin(d * 22.0 - u_time * 3.5 + angle * 3.0) * 0.5 + 0.5;
        float ring = smoothstep(0.48, 0.2, d) * wave;
        
        // Gold / Amber spectrum glow with mouse modulation
        vec3 gold = vec3(1.0, 0.84, 0.0);
        vec3 fire = vec3(1.0, 0.25, 0.0);
        vec3 col = mix(gold, fire, sin(u_time + d * 5.0) * 0.5 + 0.5) * ring;
        
        float alpha = ring * (0.35 + u_hover * 0.45);
        gl_FragColor = vec4(col * alpha, alpha);
      }
    `;

    const createShader = (type, source) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    };

    const program = gl.createProgram();
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1
    ]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uHover = gl.getUniformLocation(program, 'u_hover');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    let animId;
    let startTime = performance.now();

    const render = () => {
      animId = requestAnimationFrame(render);
      const elapsed = (performance.now() - startTime) / 1000;
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uMouse, mouseX || 0.5, mouseY || 0.5);
      gl.uniform1f(uHover, isHovered ? 1.0 : 0.0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, [mouseX, mouseY, isHovered]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none rounded-full blur-[6px] -z-10"
    />
  );
}

export default function HeroSection() {
  const [logoHovered, setLogoHovered] = useState(false);

  // Mouse spring 3D tilt tracking for interactive central logo
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [25, -25]), { stiffness: 250, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-25, 25]), { stiffness: 250, damping: 20 });
  const scale = useSpring(logoHovered ? 1.15 : 1, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setLogoHovered(false);
  };

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-20 select-none">
      
      {/* Background ambient subtle glow */}
      <div className="absolute inset-0 bg-radial-gradient from-yellow-500/10 via-black to-black opacity-80 pointer-events-none" />

      {/* Floating 3D Interactive Coin Animation - Right */}
      <motion.div
        className="hidden lg:block absolute right-10 top-1/3 w-40 h-40 xl:w-48 xl:h-48 opacity-85 cursor-pointer z-10"
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        whileHover={{ scale: 1.25, rotateZ: 15 }}
        animate={{
          y: [0, -25, 0],
          rotateY: [0, 360]
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 8, repeat: Infinity, ease: "linear" }
        }}
      >
        <img 
          src={IMAGES.coinFront} 
          alt="Moneda Frente" 
          className="absolute inset-0 w-full h-full object-contain backface-hidden drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]" 
        />
        <img 
          src={IMAGES.coinBack} 
          alt="Moneda Reverso" 
          className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]"
          style={{ transform: "rotateY(180deg)" }}
        />
      </motion.div>

      {/* Floating 3D Interactive Coin Animation - Left */}
      <motion.div
        className="hidden lg:block absolute left-10 top-1/3 w-40 h-40 xl:w-48 xl:h-48 opacity-85 cursor-pointer z-10"
        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        whileHover={{ scale: 1.25, rotateZ: -15 }}
        animate={{
          y: [0, -25, 0],
          rotateY: [0, 360]
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 },
          rotateY: { duration: 8, repeat: Infinity, ease: "linear", delay: 2 }
        }}
      >
        <img 
          src={IMAGES.coinFront} 
          alt="Moneda Frente" 
          className="absolute inset-0 w-full h-full object-contain backface-hidden drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]" 
        />
        <img 
          src={IMAGES.coinBack} 
          alt="Moneda Reverso" 
          className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]"
          style={{ transform: "rotateY(180deg)" }}
        />
      </motion.div>

      {/* Hero Central Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/15 border border-yellow-500/40 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg shadow-yellow-500/10"
        >
          <Sparkles className="w-3.5 h-3.5" /> SELLO DISCOGRÁFICO & CATÁLOGO 13-11
        </motion.div>

        {/* 3D WebGL Hover Interactive Central Logo (mk_logo_color.png) */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            scale,
            transformStyle: "preserve-3d",
            perspective: 1000
          }}
          className="relative mb-6 cursor-pointer group p-4"
        >
          {/* WebGL fluid aura shader backdrop */}
          <WebGLAuraCanvas isHovered={logoHovered} />

          {/* Central Logo */}
          <img
            src={IMAGES.logo}
            alt="Monteking MX Logo"
            className="h-32 md:h-44 w-auto mx-auto object-contain transition-all duration-300 drop-shadow-[0_0_40px_rgba(255,215,0,0.7)] group-hover:drop-shadow-[0_0_65px_rgba(255,215,0,0.95)]"
          />

          <div className="text-[10px] font-mono text-yellow-400/80 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity uppercase mt-2">
            ★ INTERACCIÓN 3D EN VIVO ★
          </div>
        </motion.div>

        {/* Title Sticker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <img
            src={IMAGES.title}
            alt="Moneda Al Aire - Casila OG"
            className="max-w-[90%] md:max-w-xl mx-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-zinc-300 text-sm md:text-lg font-medium tracking-[0.3em] uppercase mb-10 max-w-xl leading-relaxed font-oswald"
        >
          Monterrey, Nuevo León • Sonido Cardíaco
        </motion.p>

        {/* High-Contrast CTA Action Buttons with Glitch Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md sm:max-w-none"
        >
          {/* 1. Comprar Beats Button (Glitch button + Metallic Gold) */}
          <Link to={createPageUrl('Beats')} className="w-full sm:w-auto">
            <Button
              size="lg"
              data-text="EXPLORAR BEATS"
              className="glitch-btn w-full sm:w-auto bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 hover:brightness-110 text-black font-black px-9 py-7 text-base sm:text-lg rounded-2xl shadow-2xl shadow-yellow-500/40 transition-all duration-300 hover:scale-105 border-2 border-yellow-200 uppercase tracking-wider font-oswald"
            >
              <Crown className="w-5 h-5 mr-2 fill-black stroke-black stroke-2" />
              EXPLORAR BEATS
            </Button>
          </Link>

          {/* 2. Escuchar Álbum */}
          <Link to={createPageUrl('Music')} className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              data-text="ÁLBUM MONEDA AL AIRE"
              className="glitch-btn w-full sm:w-auto bg-black/80 hover:bg-zinc-900 text-white hover:text-yellow-400 font-bold px-8 py-7 text-base sm:text-lg rounded-2xl border-2 border-zinc-700 hover:border-yellow-400/80 transition-all duration-300 hover:scale-105 backdrop-blur-md uppercase tracking-wider font-oswald shadow-xl"
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              ÁLBUM "MONEDA AL AIRE"
            </Button>
          </Link>
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-400 hover:text-yellow-400 transition-colors p-2 flex flex-col items-center gap-1 z-10"
      >
        <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-yellow-400" />
        </motion.div>
      </motion.button>

    </section>
  );
}