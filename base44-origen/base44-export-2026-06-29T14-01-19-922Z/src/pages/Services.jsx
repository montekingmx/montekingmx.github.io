import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Music, Mic, Headphones, Disc, Radio, MessageCircle, 
  Globe, CheckCircle, Star, ArrowRight, Zap
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SERVICES = [
  {
    icon: Music,
    title: "Producción Musical",
    description: "Beats originales, arreglos y composición completa para tu proyecto",
    features: ["Beat Original", "Arreglos", "Composición", "Stems incluidos"],
    price: "Desde $2,500 MXN",
    color: "yellow",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80"
  },
  {
    icon: Headphones,
    title: "Mixing & Mastering",
    description: "Dale el acabado profesional que tu música merece",
    features: ["Mezcla profesional", "Mastering", "Revisiones incluidas", "Entrega en 48hrs"],
    price: "Desde $1,500 MXN",
    color: "purple",
    image: "https://images.unsplash.com/photo-1519508234439-4f23643125c1?w=600&q=80"
  },
  {
    icon: Mic,
    title: "Grabación en Estudio",
    description: "Sesiones de grabación en estudio profesional en Monterrey",
    features: ["Estudio equipado", "Ingeniero incluido", "Por hora", "Presencial"],
    price: "$800 MXN/hora",
    color: "blue",
    image: "https://images.unsplash.com/photo-1478737270197-08f9b19e6e08?w=600&q=80"
  },
  {
    icon: Radio,
    title: "Ghost Production",
    description: "Producción completa bajo tu nombre",
    features: ["100% derechos", "Confidencial", "Track completo", "Stems + proyecto"],
    price: "Desde $5,000 MXN",
    color: "red",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
  },
  {
    icon: MessageCircle,
    title: "Dedicatorias Personalizadas",
    description: "Canción o mensaje personalizado exclusivo para ti",
    features: ["100% personalizado", "Para cualquier ocasión", "Audio profesional", "Único"],
    price: "Precio a consultar",
    color: "pink",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80"
  },
  {
    icon: Globe,
    title: "Servicios Remotos",
    description: "Trabaja con nosotros desde cualquier parte del mundo",
    features: ["100% en línea", "Comunicación directa", "Entrega digital", "Global"],
    price: "Varía según servicio",
    color: "green",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
  },
];

const PACKS = [
  {
    name: "Drum Kit Monteking",
    description: "Colección de 200+ samples de drums usados en producciones de MK",
    price: 300,
    includes: ["200+ Drums", "Kicks, Snares, Hi-hats", "808s & Subs", "Formato WAV"],
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&q=80"
  },
  {
    name: "PRODxCAS Pack",
    description: "Preset pack exclusivo de Casila OG para diferentes VSTs",
    price: 300,
    includes: ["50+ Presets", "Serum, Vital, Omnisphere", "Sonidos signature", "Bonus loops"],
    image: "https://images.unsplash.com/photo-1571327073757-71d13bfd3e79?w=400&q=80"
  },
  {
    name: "Represent - Melody Pack",
    description: "100 melodías listas para usar en tus beats",
    price: 0,
    includes: ["100 Melodías", "MIDI + Audio", "BPM & Key tags", "Stems incluidos"],
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&q=80"
  },
  {
    name: "Sample Pack Monteking",
    description: "Colección completa de samples vocales, FX y más",
    price: 300,
    includes: ["150+ Samples", "Vocals, FX, Loops", "One-shots", "Royalty-free"],
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80"
  },
];

export default function ServicesPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const colorClasses = {
    yellow: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    red: "from-red-500/20 to-red-600/20 border-red-500/30",
    pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30",
    green: "from-green-500/20 to-green-600/20 border-green-500/30",
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">
            Servicios Profesionales
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-4">
            Producción de Calidad Global
          </h1>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
            Llevamos tu música al siguiente nivel con servicios de producción, mezcla, mastering 
            y más. Remoto o presencial en Monterrey, NL.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`bg-gradient-to-br ${colorClasses[service.color]} border h-full overflow-hidden group hover:scale-105 transition-transform`}>
                {service.image && (
                  <div className="relative h-40 overflow-hidden">
                    <img src={service.image} alt={service.title}
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                    <div className={`absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/20`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}
                <CardHeader>
                  {!service.image && (
                    <div className={`w-14 h-14 rounded-xl bg-${service.color}-500/20 flex items-center justify-center mb-4`}>
                      <service.icon className={`w-7 h-7 text-${service.color}-500`} />
                    </div>
                  )}
                  <CardTitle className="text-white">{service.title}</CardTitle>
                  <p className="text-zinc-400 text-sm mt-2">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-zinc-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-500 font-bold text-lg">{service.price}</span>
                    <Button 
                      size="sm"
                      className="bg-white text-black hover:bg-yellow-500"
                      onClick={() => {
                        setSelectedService(service);
                        setIsContactOpen(true);
                      }}
                    >
                      Solicitar
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sample Packs */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">
              Recursos Digitales
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mt-4">
              Sample Packs & Presets
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKS.map((pack, index) => (
              <motion.div
                key={pack.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-zinc-900/50 border-zinc-800 h-full hover:border-yellow-500/50 transition-all group overflow-hidden">
                <CardHeader>
                  <div className="w-full aspect-square relative rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                    {pack.image && (
                      <img src={pack.image} alt={pack.name}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Disc className="w-12 h-12 text-yellow-500 drop-shadow-lg" />
                    </div>
                  </div>
                    <CardTitle className="text-white text-lg">{pack.name}</CardTitle>
                    <p className="text-zinc-500 text-sm">{pack.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 mb-6">
                      {pack.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-zinc-400 text-xs">
                          <Zap className="w-3 h-3 text-yellow-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-yellow-500">
                        {pack.price === 0 ? 'GRATIS' : `$${pack.price} MXN`}
                      </span>
                      <Button size="sm" className="bg-yellow-500 hover:bg-yellow-400 text-black">
                        {pack.price === 0 ? 'Descargar' : 'Comprar'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section>
          <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/30 p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Calidad Garantizada</h3>
                <p className="text-zinc-400 text-sm">
                  Más de 10 años de experiencia en la industria musical
                </p>
              </div>
              <div>
                <Globe className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Servicio Global</h3>
                <p className="text-zinc-400 text-sm">
                  Trabajamos con artistas de todo el mundo de forma remota
                </p>
              </div>
              <div>
                <Headphones className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Soporte Directo</h3>
                <p className="text-zinc-400 text-sm">
                  Comunicación directa con el equipo de producción
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Contact Dialog */}
        <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>
                Solicitar: {selectedService?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Input 
                placeholder="Tu nombre" 
                className="bg-zinc-800 border-zinc-700 text-white"
              />
              <Input 
                placeholder="Email" 
                type="email"
                className="bg-zinc-800 border-zinc-700 text-white"
              />
              <Input 
                placeholder="WhatsApp / Teléfono" 
                className="bg-zinc-800 border-zinc-700 text-white"
              />
              <Textarea 
                placeholder="Cuéntanos sobre tu proyecto..."
                className="bg-zinc-800 border-zinc-700 text-white resize-none"
                rows={4}
              />
              <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold">
                Enviar Solicitud
              </Button>
              <p className="text-zinc-500 text-xs text-center">
                Te contactaremos en menos de 24 horas para discutir los detalles
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}