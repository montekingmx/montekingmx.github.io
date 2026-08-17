import os
import subprocess
import shutil
import re
import json

# --- CONFIGURACIÓN DE AUTOMATIZACIÓN MONTEKING (SIN TAG / AUDIO LIMPIO) ---
input_folder = "1_INPUT_WAVS"
output_folder = "2_OUTPUT_MP3"
bitrate = "192k"

formatos_validos = (".wav", ".mp3", ".aif", ".aiff", ".m4a", ".flac")

def check_tools():
    """Verifica que ffmpeg esté instalado para la conversión limpia"""
    if shutil.which("ffmpeg") is None:
        print("❌ FALTA FFMPEG EN TU SISTEMA: Instala con 'brew install ffmpeg'")
        return False
    return True

def analizar_bpm_aubio(ruta_archivo):
    """Usa la herramienta externa 'aubio' para detectar BPM si no está en el título"""
    try:
        if shutil.which("aubio"):
            result = subprocess.run(
                ["aubio", "tempo", ruta_archivo], 
                capture_output=True, text=True
            )
            bpm_raw = result.stdout.strip().split(" ")[0]
            return int(round(float(bpm_raw)))
    except Exception as e:
        pass
    return None

def extraer_o_analizar_bpm(nombre_archivo, ruta_completa):
    # 1. Buscar BPM en el nombre del archivo (ejemplo: 140bpm)
    match = re.search(r'\b(6[0-9]|[7-9][0-9]|1[0-9]{2}|200)\b', nombre_archivo)
    if match:
        return int(match.group(1)), "Título"
    
    # 2. Intentar detectar BPM con Aubio
    bpm_analizado = analizar_bpm_aubio(ruta_completa)
    if bpm_analizado:
        return bpm_analizado, "Aubio"
            
    return 140, "Por defecto"

def generar_playlist_json(canciones):
    """Actualiza el archivo de datos src/data/playlist.js para la web en React"""
    js_content = f"export const songs = {json.dumps(canciones, indent=4)};\n\nexport default songs;\n"
    
    os.makedirs("src/data", exist_ok=True)
    with open("src/data/playlist.js", "w", encoding="utf-8") as f:
        f.write(js_content)
    print("✅ Actualizado src/data/playlist.js con audio 100% limpio (sin pauta de voz).")

def procesar_final():
    print("--- INICIANDO PROCESADOR DE AUDIOS LIMPIOS (SIN TAG) MONTEKING ---")
    
    check_tools()

    if os.path.exists(input_folder):
        os.makedirs(output_folder, exist_ok=True)

    canciones = []
    procesados = 0

    for root, dirs, files in os.walk(input_folder):
        for filename in files:
            if filename.startswith("._") or filename == ".DS_Store": continue

            if filename.lower().endswith(formatos_validos):
                input_path = os.path.join(root, filename)
                bpm, origen = extraer_o_analizar_bpm(filename, input_path)
                
                relative_path = os.path.relpath(root, input_folder)
                target_dir = os.path.join(output_folder, relative_path)
                os.makedirs(target_dir, exist_ok=True)
                
                clean_name = os.path.splitext(filename)[0].lower().replace(" ", "_").replace("(", "").replace(")", "")
                if str(bpm) not in clean_name:
                    clean_name = f"{clean_name}_{bpm}bpm"
                
                output_path = os.path.join(target_dir, f"{clean_name}.mp3")

                # Conversión a MP3 de alta calidad directa y limpia (SIN PÁUTA DE VOZ / SIN MEZCLA DE TAG)
                cmd = [
                    "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
                    "-i", input_path,
                    "-b:a", bitrate,
                    output_path
                ]

                try:
                    if shutil.which("ffmpeg"):
                        subprocess.run(cmd, check=True)
                    procesados += 1
                    
                    canciones.append({
                        "name": filename,
                        "artist": "Monteking",
                        "album": relative_path if relative_path != "." else "TRAP-MEMPH",
                        "url": output_path,
                        "bpm": bpm,
                        "cover_art_url": "ASSETS/cover_trap.jpg"
                    })
                    print(f"🎵 Audio limpio procesado: {filename} ({bpm} BPM)")
                except Exception as e:
                    print(f"❌ ERROR procesando {filename}: {e}")

    if canciones:
        generar_playlist_json(canciones)

    print("\n" + "="*50)
    print(f"🚀 {procesados} beats procesados en formato LIMPIO (sin pauta de voz).")
    print("="*50)

if __name__ == "__main__":
    procesar_final()
