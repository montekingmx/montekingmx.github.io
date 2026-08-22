import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function copyStaticAssetsPlugin() {
  return {
    name: 'copy-static-assets',
    closeBundle() {
      const dirsToCopy = ['assets', 'BOOMBAP', 'ELECTRO MK', 'SUAVE', 'TRAP-MEMPH'];
      const distDir = path.resolve(__dirname, 'dist');
      for (const dir of dirsToCopy) {
        const srcPath = path.resolve(__dirname, dir);
        const destPath = path.resolve(distDir, dir);
        if (fs.existsSync(srcPath)) {
          fs.cpSync(srcPath, destPath, { recursive: true, force: true });
          console.log(`[copy-static-assets] Successfully copied ${dir} to dist/${dir}`);
        }
      }
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyStaticAssetsPlugin()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  }
});

