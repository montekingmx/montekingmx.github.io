import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Music, Mic, Headphones, Disc, Radio, MessageCircle, 
  Globe, CheckCircle, Star, ArrowRight, Zap, Film, Sparkles, ExternalLink
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SAMPLE_PACKS } from '@/data/samplePacksData';

const SERVICES = [
  {
    icon: Music,
    title: "Producción Musical & Beats",
    description: "Composición exclusiva en Logic Pro & Ableton Live, arreglos de vanguardia y diseño sonoro a medida para tu proyecto.",
    features: ["Beat Original Exclusivo", "Arreglos & Estructura", "Diseño Sonoro en DAW Pro", "Stems WAV 24-Bit + MIDI"],
    price: "Desde $2,500 MXN",
    color: "yellow",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80"
  },
  {
    icon: Headphones,
    title: "Mezcla & Mastering Pro (-8 LUFS)",
    description: "Tratamiento acústico, compresión analógica por stems y maximización quirúrgica a -8 LUFS con punch comercial agresivo.",
    features: ["Mezcla por Stems", "Mastering Competitivo (-8 LUFS)", "Revisiones Ilimitadas", "Entrega en 48 hrs"],
    price: "Desde $1,500 MXN",
    color: "purple",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80"
  },
  {
    icon: Mic,
    title: "Grabación en Estudio Monterrey",
    description: "Cabina profesional insonorizada, micrófonos de condensador Neumann/Shure y preamps valvulares para tomas impecables.",
    features: ["Micrófonos de Gama Alta", "Ingeniero de Sonido Incluido", "Coaching Vocal", "Presencial en Monterrey, NL"],
    price: "$800 MXN / hora",
    color: "blue",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1000&q=80"
  },
  {
    icon: Radio,
    title: "Ghost Production & Beatmaking",
    description: "Producción musical integral bajo tu autoría comercial, con sesión multitrack completa y confidencialidad 100% garantizada.",
    features: ["100% Derechos & Regalías", "Acuerdo de Confidencialidad", "Track Completo Stems + MIDI", "Mezcla & Master Incluido"],
    price: "Desde $5,000 MXN",
    color: "red",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80"
  },
  {
    icon: Film,
    title: "Dirección de Videoclips 4K",
    description: "Producción cinematográfica integral, dirección de arte, cámaras cinema 4K, edición de ritmo rápido y color grading.",
    features: ["Cámara 4K Cinema", "Dirección de Arte & Guion", "Edición & VFX", "Color Grading Cinemático"],
    price: "Desde $6,500 MXN",
    color: "pink",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80"
  }
];

const colorClasses = {
  yellow: "border-yellow-500/30 hover:border-yellow-500/60 shadow-yellow-500/10",
  purple: "border-purple-500/30 hover:border-purple-500/60 shadow-purple-500/10",
  blue: "border-blue-500/30 hover:border-blue-500/60 shadow-blue-500/10",
  red: "border-red-500/30 hover:border-red-500/60 shadow-red-500/10",
  pink: "border-pink-500/30 hover:border-pink-500/60 shadow-pink-500/10",
};

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    details: '',
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const message = `¡Hola Monteking MX! 🎯 Me interesa el servicio de *${selectedService?.title}*.\n\nNombre: ${formData.name}\nEmail: ${formData.email}\nTeléfono: ${formData.phone}\nDetalles: ${formData.details}`;
    window.open(`https://wa.me/5218180106247?text=${encodeURIComponent(message)}`, '_blank');
    setIsContactOpen(false);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-yellow-400 uppercase tracking-[0.3em] text-xs font-bold font-mono">
            Monteking Records 13-11 • Servicios Pro
          </span>
          <h1 className="font-pirata text-5xl sm:text-7xl font-bold text-white mt-3 mb-4 tracking-wider">
            SERVICIOS DE <span className="text-stroke-gold">PRODUCCIÓN</span>
          </h1>
          <p className="text-zinc-400 text-base max-w-2xl mx-auto font-sans">
            Desde la creación del beat hasta el master final y el videoclip oficial con calidad de industria internacional.
          </p>
        </motion.div>

        {/* Services Grid (Item 5) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className={`bg-gradient-to-b from-zinc-900 to-black border-2 ${colorClasses[service.color]} rounded-3xl h-full overflow-hidden group hover:scale-[1.02] transition-all duration-300 shadow-2xl flex flex-col justify-between`}>
                <div>
                  {/* High Quality Card Image Cover */}
                  <div className="relative h-48 overflow-hidden bg-black border-b border-zinc-800">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 w-11 h-11 rounded-2xl bg-yellow-400 text-black flex items-center justify-center shadow-lg font-bold">
                      <service.icon className="w-5 h-5" />
                    </div>
                  </div>

                  <CardHeader className="p-6">
                    <CardTitle className="text-white font-oswald text-xl font-bold">{service.title}</CardTitle>
                    <p className="text-zinc-400 text-xs font-sans mt-1.5 leading-relaxed">{service.description}</p>
                  </CardHeader>

                  <CardContent className="px-6 pb-6">
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-zinc-300 text-xs font-mono">
                          <CheckCircle className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>

                <div className="p-6 pt-0 border-t border-zinc-800/80 flex items-center justify-between mt-auto">
                  <span className="text-yellow-400 font-bold font-oswald text-base">{service.price}</span>
                  <Button 
                    size="sm"
                    className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold font-oswald text-xs rounded-xl px-4 py-2"
                    onClick={() => {
                      setSelectedService(service);
                      setIsContactOpen(true);
                    }}
                  >
                    Cotizar Ahora
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sample Packs Section with the 4 Dedicated Covers (Item 5) */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-yellow-400 uppercase tracking-[0.3em] text-xs font-bold font-mono">
              Recursos de Producción 24-Bit
            </span>
            <h2 className="font-pirata text-4xl sm:text-6xl font-bold text-white mt-2">
              SAMPLE PACKS & <span className="text-stroke-gold">DRUM KITS</span>
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-2">
              Librerías completas de baterías, 808s y loops analógicos grabados y procesados en estudio.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAMPLE_PACKS.map((pack, index) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="bg-zinc-950 border-2 border-zinc-800 hover:border-yellow-400 rounded-3xl h-full transition-all group overflow-hidden flex flex-col justify-between shadow-2xl">
                  <div>
                    <div className="w-full aspect-square relative rounded-t-2xl overflow-hidden bg-black border-b border-zinc-800">
                      <img
                        src={pack.cover}
                        alt={pack.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                      />
                      <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2.5 py-1 rounded-full text-[10px] font-mono font-bold">
                        {pack.badge}
                      </div>
                    </div>

                    <CardHeader className="p-5">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">{pack.category}</span>
                      <CardTitle className="text-white font-oswald text-base font-bold mt-1 line-clamp-1">{pack.title}</CardTitle>
                      <p className="text-zinc-400 text-xs mt-1 font-sans line-clamp-2">{pack.subtitle}</p>
                    </CardHeader>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                      <div>
                        <span className="text-zinc-500 line-through text-xs mr-1.5 font-mono">${pack.originalPrice}</span>
                        <span className="text-xl font-bold font-oswald text-yellow-400">${pack.price} MXN</span>
                      </div>
                      <a href="/Merch" className="bg-yellow-400 hover:bg-yellow-300 text-black px-3.5 py-2 rounded-xl text-xs font-bold font-oswald uppercase transition-transform active:scale-95">
                        Ver Pack
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Dialog */}
        <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
          <DialogContent className="bg-zinc-950 border-2 border-yellow-500/40 text-white rounded-3xl max-w-lg p-6 sm:p-8">
            <DialogHeader>
              <DialogTitle className="font-pirata text-3xl text-yellow-400">
                Cotizar {selectedService?.title}
              </DialogTitle>
              <p className="text-zinc-400 text-xs">
                Déjanos tus datos y nos comunicamos directamente por WhatsApp en minutos.
              </p>
            </DialogHeader>
            <form onSubmit={handleContactSubmit} className="space-y-4 mt-4">
              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">Nombre Completo / Artista</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej. MC Monte"
                  className="bg-black border-zinc-800 text-white rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">WhatsApp / Teléfono</label>
                  <Input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+52 81..."
                    className="bg-black border-zinc-800 text-white rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">Email</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contacto@..."
                    className="bg-black border-zinc-800 text-white rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">Detalles del Proyecto</label>
                <Textarea
                  rows={4}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Cuéntanos sobre tu idea, referencias musicales o fechas de entrega..."
                  className="bg-black border-zinc-800 text-white rounded-xl"
                />
              </div>
              <Button type="submit" className="w-full py-6 bg-yellow-400 hover:bg-yellow-300 text-black font-black font-oswald text-sm uppercase rounded-2xl shadow-xl shadow-yellow-500/20">
                Enviar por WhatsApp Directo
              </Button>
            </form>
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}