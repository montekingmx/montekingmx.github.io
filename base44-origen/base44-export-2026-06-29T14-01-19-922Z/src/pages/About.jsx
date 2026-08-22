import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Music, Users, Star, MapPin, Calendar, Award } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const IMAGES = {
  casila: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/eacb11643_IMG-20210323-WA0046.jpg",
  cover: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/40e372abd_3milx3milcover.png",
  background: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6947f4b3e4453a62be1b6258/dcded24a8_FONDOPORTADA.png",
  logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/66ca3a969_LOGO-MK-COLOR-SH.png"
};

const STATS = [
{ icon: Music, value: "200+", label: "Producciones" },
{ icon: Users, value: "50K+", label: "Seguidores" },
{ icon: Star, value: "100+", label: "Colaboraciones" },
{ icon: Award, value: "10+", label: "Años de Experiencia" }];

const TIMELINE = [
{ year: "2014", title: "Los Inicios", description: "Con toda la vida en el rap y la música, pero aqui se comienza a considerar como carrera, después de grabar las primeras canciones En Estudio. Aunque la primer cancion fue grabada alrededor del 2011." },
{ year: "2017", title: "Monteking Records", description: "Fundacion oficial del sello, estudio de grabación y los inicios en Producción Musical, de Instrumentales y de Audio Completa." },
{ year: "2020", title: "Expansión", description: "Colaboraciones con artistas nacionales e internacionales" },
{ year: "2024", title: "Moneda Al Aire", description: "Lanzamiento del álbum más ambicioso hasta la fecha" }];

export default function About() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${IMAGES.background})`, backgroundSize: 'cover' }} />

        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center">

            <img src={IMAGES.logo} alt="Monteking" className="h-24 w-auto mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              MONTEKING
              <span className="block text-yellow-500">MX</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Sonido de la Mera Mata y Original. 100% Gangster Product. Represent.
            </p>
            <div className="mt-4 text-yellow-500 font-mono tracking-widest">
              13-11 • REPRESENT
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, index) =>
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}>

                <Card className="bg-zinc-900/50 border-zinc-800 text-center p-6">
                  <CardContent className="p-0">
                    <stat.icon className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-zinc-500 text-sm mt-1">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative">

              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-2xl blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden aspect-square">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/f29a263f3_GLOBALSELLOMKAMARILLO.png" 
                  alt="Monteking Mx"
                  className="w-full h-full object-contain bg-black p-8"
                />

              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}>

              <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">LA MARCA

              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">Monteking Mx.

              </h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p className="">Directo de la Ciudad de los Cerros, creando lo que nace.
Comenzamos de 0, y le vamos a dar a donde tope el Borrego. Monteking no es nomás para el que sea de Monterrey, es para el que se identifique con las letras. Que las entienda, que sepa y recuerde lo que a pasado. Lo que cada quien tiene que contar. Lo que nos a costado. Buenos y malos momentos. "A Veces El Pato Nada Y A Veces Ni Agua Toma" dijo aquel. Nacido y creado en las calles de Monterrey, Nuevo León, la música representando todo México loco. Estilo único porque de aquí mero sale.

                </p>
                <p className="">Sonido distinto.

                </p>
                <p className="">"Con nosotros quien quiera
Contra nosotros quien pueda..."

                </p>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <div className="flex items-center gap-2 text-zinc-500">
                  <MapPin className="w-5 h-5 text-yellow-500" />
                  Monterrey, NL
                </div>
                <div className="flex items-center gap-2 text-zinc-500">
                  <Calendar className="w-5 h-5 text-yellow-500" />
                  Desde 2014
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">

            <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">
              Nuestra Historia
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              El Camino
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-500 via-yellow-500/50 to-transparent" />

            {TIMELINE.map((item, index) =>
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-center gap-8 mb-12 ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''}`
              }>

                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-yellow-500 rounded-full transform -translate-x-1/2" />

                {/* Content */}
                <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                  <span className="text-yellow-500 font-mono text-lg">{item.year}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{item.title}</h3>
                  <p className="text-zinc-500 mt-2">{item.description}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>

            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Nuestra Misión
            </h2>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Representar el Sonido que generamos en México a nivel global, cargando la escencia 
              para todos lados y el Respeto de las Raíces. Monteking es para Representar al que se identifique.
            </p>
            <p className="text-yellow-500 font-bold text-2xl mt-8 font-mono">
              REPRESENT • 13-11
            </p>
          </motion.div>
        </div>
      </section>
    </div>);

}