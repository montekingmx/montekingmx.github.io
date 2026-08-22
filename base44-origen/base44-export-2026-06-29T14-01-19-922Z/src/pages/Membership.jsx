const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Zap, Check, Instagram, Gift, Percent, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const MEMBERSHIP_TIERS = [
  {
    id: "silver",
    name: "Silver",
    price: "$199 MXN/mes",
    icon: Star,
    color: "from-gray-400 to-gray-600",
    benefits: [
      "10% descuento en todos los beats",
      "5% descuento en merch",
      "Acceso a contenido exclusivo",
      "Badge Silver en perfil"
    ]
  },
  {
    id: "gold",
    name: "Gold",
    price: "$399 MXN/mes",
    icon: Zap,
    color: "from-yellow-400 to-yellow-600",
    popular: true,
    benefits: [
      "20% descuento en todos los beats",
      "15% descuento en merch",
      "Acceso anticipado a nuevo merch",
      "Contenido premium exclusivo",
      "Badge Gold en perfil",
      "Participación en sorteos mensuales"
    ]
  },
  {
    id: "platinum",
    name: "Platinum",
    price: "$799 MXN/mes",
    icon: Crown,
    color: "from-purple-400 to-purple-600",
    benefits: [
      "30% descuento en todos los beats",
      "25% descuento en merch",
      "Acceso VIP anticipado a todo",
      "Beat gratis mensual",
      "Sesión de feedback con Casila OG",
      "Badge Platinum en perfil",
      "Acceso a eventos privados",
      "Merchandise exclusivo"
    ]
  }
];

export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [instagram, setInstagram] = useState("");
  const queryClient = useQueryClient();

  const { data: currentMembership } = useQuery({
    queryKey: ['membership'],
    queryFn: async () => {
      const user = await db.auth.me();
      const memberships = await db.entities.Membership.filter({ created_by: user.email });
      return memberships[0];
    }
  });

  const createMembership = useMutation({
    mutationFn: async (data) => {
      return db.entities.Membership.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['membership'] });
      toast.success("¡Membresía activada exitosamente!");
      setSelectedTier(null);
      setInstagram("");
    }
  });

  const handleSubscribe = async () => {
    if (!instagram.trim()) {
      toast.error("Por favor ingresa tu usuario de Instagram");
      return;
    }

    const today = new Date();
    const endDate = new Date(today);
    endDate.setMonth(endDate.getMonth() + 1);

    await createMembership.mutateAsync({
      tier: selectedTier,
      status: "active",
      start_date: today.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      instagram_handle: instagram
    });
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_6947f4b3e4453a62be1b6258/dcded24a8_FONDOPORTADA.png")`,
          backgroundSize: 'cover'
        }}
      />

      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">
              Membresías Exclusivas
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-4">
              Únete al Movimiento
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Obtén beneficios exclusivos, descuentos y acceso anticipado a todo el contenido de Monteking
            </p>
          </motion.div>

          {/* Current Membership */}
          {currentMembership && currentMembership.status === "active" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-12"
            >
              <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <Crown className="w-8 h-8 text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Membresía {currentMembership.tier.toUpperCase()} Activa
                        </h3>
                        <p className="text-zinc-400">
                          Válida hasta: {new Date(currentMembership.end_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white">Activa</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Membership Tiers */}
          <div className="grid md:grid-cols-3 gap-8">
            {MEMBERSHIP_TIERS.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`relative bg-zinc-900/50 border-zinc-800 overflow-hidden ${
                  tier.popular ? 'ring-2 ring-yellow-500' : ''
                }`}>
                  {tier.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-yellow-500 text-black font-bold">
                        Más Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                      <tier.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                    <p className="text-3xl font-bold text-yellow-500 mt-2">{tier.price}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {tier.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span className="text-zinc-300 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white font-bold`}
                          onClick={() => setSelectedTier(tier.id)}
                          disabled={currentMembership?.tier === tier.id && currentMembership?.status === "active"}
                        >
                          {currentMembership?.tier === tier.id && currentMembership?.status === "active" 
                            ? "Membresía Actual" 
                            : "Suscribirse"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-zinc-900 border-zinc-800">
                        <DialogHeader>
                          <DialogTitle className="text-white">Activar Membresía {tier.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <label className="text-white text-sm mb-2 block flex items-center gap-2">
                              <Instagram className="w-4 h-4 text-pink-500" />
                              Tu usuario de Instagram
                            </label>
                            <Input
                              placeholder="@tuusuario"
                              value={instagram}
                              onChange={(e) => setInstagram(e.target.value)}
                              className="bg-zinc-800 border-zinc-700 text-white"
                            />
                            <p className="text-xs text-zinc-500 mt-1">
                              Lo usaremos para verificar tu identidad y darte acceso a beneficios exclusivos
                            </p>
                          </div>
                          <Button 
                            onClick={handleSubscribe}
                            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold"
                            disabled={createMembership.isPending}
                          >
                            {createMembership.isPending ? "Procesando..." : `Activar por ${tier.price}`}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Benefits Overview */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Beneficios Exclusivos
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Percent,
                  title: "Descuentos",
                  description: "Ahorra en beats, merch y más"
                },
                {
                  icon: Clock,
                  title: "Acceso Anticipado",
                  description: "Sé el primero en todo"
                },
                {
                  icon: Gift,
                  title: "Contenido Exclusivo",
                  description: "Material premium solo para miembros"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-zinc-900/50 border-zinc-800 text-center p-6">
                    <benefit.icon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-zinc-400">{benefit.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}