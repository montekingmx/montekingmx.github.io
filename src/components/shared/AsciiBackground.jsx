import React, { useEffect, useRef } from 'react';

/**
 * AsciiBackground Component
 * Implements the 21st.dev Custom ASCII Art recipe (Canvas2D) with vibrant visibility.
 * Features:
 * - renderMode: "hexdump" (drawing hex-digits and ASCII symbols)
 * - Animated wave effect (animSpeed: 108, animIntensity: 90)
 * - Vivid golden/amber palette (#ffb700) with crisp luminance sampling.
 */
export default function AsciiBackground({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId;
    let time = 0;

    // Load source photo
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "assets/branding/moneda_1311_textura.png";

    // Offscreen canvas for sampling
    const sampleCanvas = document.createElement('canvas');
    const sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      sampleCanvas.width = Math.floor(window.innerWidth / 3);
      sampleCanvas.height = Math.floor(window.innerHeight / 3);
    };

    window.addEventListener('resize', resize);
    resize();

    const hexChars = "0123456789ABCDEF!#*+=-:.";
    const cellSize = 16;

    const render = () => {
      time += 0.035;
      animFrameId = requestAnimationFrame(render);

      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      // Draw source image onto sample canvas
      sampleCtx.clearRect(0, 0, sampleCanvas.width, sampleCanvas.height);
      if (img.complete && img.naturalWidth > 0) {
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const sRatio = sampleCanvas.width / sampleCanvas.height;
        let dw, dh, dx, dy;
        if (sRatio > imgRatio) {
          dw = sampleCanvas.width;
          dh = sampleCanvas.width / imgRatio;
          dx = 0;
          dy = (sampleCanvas.height - dh) / 2;
        } else {
          dh = sampleCanvas.height;
          dw = sampleCanvas.height * imgRatio;
          dx = (sampleCanvas.width - dw) / 2;
          dy = 0;
        }
        sampleCtx.drawImage(img, dx, dy, dw, dh);
      }

      let imgData;
      try {
        imgData = sampleCtx.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height);
      } catch (e) {
        return;
      }

      // Clear output
      ctx.clearRect(0, 0, w, h);
      ctx.font = `bold ${cellSize - 2}px "Courier New", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const cols = Math.ceil(w / cellSize);
      const rows = Math.ceil(h / cellSize);
      const scaleX = sampleCanvas.width / w;
      const scaleY = sampleCanvas.height / h;

      const pixels = imgData.data;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellSize + cellSize / 2;
          const y = r * cellSize + cellSize / 2;

          // Animated wave displacement
          const wave = Math.sin(time * 1.6 + (c * 0.12) + (r * 0.14)) * (cellSize * 0.35);
          const py = y + wave;

          const sx = Math.floor(x * scaleX);
          const sy = Math.floor(y * scaleY);
          const pIdx = (sy * sampleCanvas.width + sx) * 4;

          const red = pixels[pIdx] || 0;
          const green = pixels[pIdx + 1] || 0;
          const blue = pixels[pIdx + 2] || 0;

          // Luminance calculation
          let lum = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
          lum = Math.pow(lum, 1.2); // Tone curve

          // Hexdump char selection
          const charIdx = Math.floor(lum * (hexChars.length - 1));
          const char = hexChars[charIdx] || '0';

          // Vibrant Gold / Amber Tint (#ffb700)
          const alpha = Math.min(1, Math.max(0.18, lum * 1.1));
          
          if (lum > 0.4) {
            ctx.fillStyle = `rgba(255, 183, 0, ${alpha * 0.85})`;
            ctx.shadowColor = '#ffb700';
            ctx.shadowBlur = 4;
          } else {
            ctx.fillStyle = `rgba(180, 180, 180, ${alpha * 0.35})`;
            ctx.shadowBlur = 0;
          }

          ctx.fillText(char, x, py);
        }
      }

      // Scanline post effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 1.5);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={`pointer-events-none fixed inset-0 z-[-6] overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full opacity-70 mix-blend-screen" />
    </div>
  );
}
