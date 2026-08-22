const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle2, Loader2, Bell } from 'lucide-react';

export default function NewsletterForm({ source = 'footer', compact = false }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Ingresa un email válido');
      return;
    }
    setState('loading');
    setErrorMsg('');

    try {
      // Save subscriber
      await db.entities.NewsletterSubscriber.create({
        email: email.trim().toLowerCase(),
        name: name.trim() || undefined,
        source,
        active: true,
      });

      // Send welcome email
      await db.integrations.Core.SendEmail({
        to: email.trim(),
        from_name: 'Monteking Records',
        subject: '🎵 ¡Bienvenido a la familia Monteking!',
        body: `
¡Qué onda${name ? ` ${name}` : ''}! 🔥

Gracias por unirte a la comunidad Monteking. Ya eres parte del movimiento 13-11.

Serás el primero en enterarte de:
• 🎤 Nuevos lanzamientos y canciones
• 🎵 Beats recién salidos del estudio  
• 🎥 Videos y contenido exclusivo
• 👕 Drops de merch limitados
• 🎪 Shows y eventos en Monterrey

Mientras tanto, échate una escuchadita:
🎧 Spotify: https://open.spotify.com/artist/6JkL5fiPkUG49eUzwKE5bW
📺 YouTube: https://www.youtube.com/@MONTEKINGMX
📸 Instagram: https://www.instagram.com/monteking.mx

¡Arriba el Noreste! 🏔️

— Casila OG & Monteking Records
        `.trim()
      });

      setState('success');
    } catch (err) {
      // If duplicate email (entity error), still show success to avoid enumeration
      if (err?.message?.includes('duplicate') || err?.message?.includes('unique')) {
        setState('success');
      } else {
        setState('error');
        setErrorMsg('Algo salió mal. Intenta de nuevo.');
      }
    }
  };

  if (state === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex items-center gap-3 ${compact ? 'justify-start' : 'justify-center'}`}
      >
        <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">¡Ya eres parte del movimiento! 🔥</p>
          <p className="text-zinc-500 text-xs">Revisa tu email — te mandamos un mensaje de bienvenida</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {!compact && (
        <div className="flex items-center gap-2 mb-3">
          <Bell className="w-4 h-4 text-yellow-500" />
          <p className="text-white text-sm font-semibold">Suscríbete a los lanzamientos</p>
        </div>
      )}
      <div className={`flex ${compact ? 'flex-row gap-2' : 'flex-col sm:flex-row gap-2'}`}>
        {!compact && (
          <Input
            type="text"
            placeholder="Tu nombre (opcional)"
            value={name}
            onChange={e => setName(e.target.value)}
            className="bg-zinc-800 border-zinc-700 text-white text-sm flex-1"
          />
        )}
        <Input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={e => { setEmail(e.target.value); setErrorMsg(''); }}
          required
          className="bg-zinc-800 border-zinc-700 text-white text-sm flex-1"
        />
        <Button
          type="submit"
          disabled={state === 'loading'}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold shrink-0"
        >
          {state === 'loading'
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <><Mail className="w-4 h-4 mr-1.5" />{compact ? 'Suscribir' : 'Suscribirme'}</>
          }
        </Button>
      </div>
      {errorMsg && <p className="text-red-400 text-xs mt-1.5">{errorMsg}</p>}
      {!compact && (
        <p className="text-zinc-600 text-xs mt-2">Sin spam. Cancela cuando quieras.</p>
      )}
    </form>
  );
}