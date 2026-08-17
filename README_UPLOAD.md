# ⚡ INGESTA DE BEATS LIMPIOS (SIN TAG): MONTEKING 2030

El proceso de procesamiento de audio ahora deja tus instrumentales **100% limpios y normales**, eliminando cualquier pauta de voz o tag.

---

## 🚀 PASOS PARA SUBIR NUEVOS BEATS

### 1. Arrastra tus archivos `.wav` o `.mp3`
- Copia o arrastra tus archivos de audio a la carpeta `1_INPUT_WAVS/`.

### 2. Ejecuta el comando en tu terminal
```bash
npm run update-beats
```

*¿Qué sucede automáticamente?*
- Convierte tus WAVs a MP3 de alta fidelidad (192kbps) en estado **totalmente limpio (sin pauta de voz)**.
- Detecta automáticamente el BPM.
- Actualiza `src/data/playlist.js` para refrescar la interfaz web de React al instante.

---

## 🌐 SUBIR CAMBIOS A GITHUB (DESPLIEGUE WEB)

Para enviar los cambios a tu sitio en vivo (`https://montekingmx.github.io`), ejecuta estas 3 líneas en tu terminal:

```bash
git add .
git commit -m "feat: actualización de beats limpios"
git push origin main
```
