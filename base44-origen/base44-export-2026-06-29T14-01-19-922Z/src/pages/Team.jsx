const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Users, Crown, Music, UserCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from "@tanstack/react-query";

const TEAM_IMAGES = {
  casila: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/68707d1a6_IMG_5249.jpg",
  bigbong: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/51763d7af_BIGBONG-PNG-OFICIAL.png",
  team1: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/b026df279_68066F06-CE65-48AD-8C4F-D5043F3ED97B.jpg",
  team2: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6947f57d0fff82c786d5c45d/5154cff25_BB76FBFA-F0F8-437B-828D-AC96FE18ED852.jpg"
};

export default function TeamPage() {
  const { data: members = [] } = useQuery({
    queryKey: ['members'],
    queryFn: () => db.entities.Member.list(),
    initialData: []
  });

  const founder = members.find((m) => m.is_founder);
  const teamMembers = members.filter((m) => !m.is_founder);

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16">

          <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">
            El Equipo
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-4">
            Monteking
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Conoce a las personas detrás de la música y el movimiento
          </p>
        </motion.div>

        {/* Team Members Grid */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>

          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Users className="w-8 h-8 text-yellow-500" />
            La Banda
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {founder &&
            <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden lg:col-span-2">
              <div className="grid lg:grid-cols-2 gap-8 p-8">
                <div className="relative aspect-square lg:aspect-auto rounded-xl overflow-hidden">
                  <img
                  src={TEAM_IMAGES.casila}
                  alt={founder.name}
                  className="w-full h-full object-cover" />

                  <div className="absolute top-4 left-4">
                    <div className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-full font-bold text-sm">
                      <Crown className="w-4 h-4" />
                      Fundador
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {founder.name}
                  </h2>
                  <p className="text-yellow-500 text-xl mb-6">{founder.role}</p>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    {founder.bio}
                  </p>
                  <div className="flex gap-4">
                    {founder.social_links?.instagram &&
                  <a
                    href={`https://instagram.com/${founder.social_links.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer">

                        <Button variant="outline" className="bg-yellow-500 text-gray-950 px-4 py-2 text-sm font-medium rounded-md inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm h-9 border-zinc-700 hover:bg-yellow-500 hover:text-black hover:border-yellow-500">
                          <Instagram className="w-5 h-5 mr-2" />
                          {founder.social_links.instagram}
                        </Button>
                      </a>
                  }
                    {founder.social_links?.spotify &&
                  <a
                    href={`https://open.spotify.com/artist/${founder.social_links.spotify}`}
                    target="_blank"
                    rel="noopener noreferrer">

                        <Button variant="outline" className="border-zinc-700 text-white hover:bg-green-500 hover:border-green-500">
                          <Music className="w-5 h-5 mr-2" />
                          Spotify
                        </Button>
                      </a>
                  }
                  <Link to={`${createPageUrl('ArtistProfile')}?artist=casila-og`}>
                    <Button variant="outline" className="border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500">
                      <UserCircle className="w-5 h-5 mr-2" />
                      Ver Perfil
                    </Button>
                  </Link>
                  </div>
                </div>
              </div>
            </Card>
            }
            {teamMembers.map((member, index) =>
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}>

                <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden group hover:border-yellow-500/50 transition-all">
                  <div className="relative aspect-square overflow-hidden">
                    {member.photo_url ?
                  <img
                    src={member.photo_url}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" /> :

                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                        <Users className="w-20 h-20 text-zinc-700" />
                      </div>
                  }
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-xl">{member.name}</h3>
                      <p className="text-yellow-500 text-sm">{member.role}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    {member.bio &&
                  <p className="text-zinc-400 text-sm mb-4">{member.bio}</p>
                  }
                    {member.social_links?.instagram &&
                  <a
                    href={`https://instagram.com/${member.social_links.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-zinc-500 hover:text-yellow-500 transition-colors text-sm">

                        <Instagram className="w-4 h-4" />
                        {member.social_links.instagram}
                      </a>
                  }
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </motion.section>

      </div>
    </div>);

}