const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useRef } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Play, Pause, RotateCcw, Download, Trash2, Plus, Volume2, Save, Repeat, Move } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Sample library
const SAMPLES = {
  drums: [
    { id: 'kick1', name: 'Kick 808', url: 'https://assets.mixkit.co/active_storage/sfx/2354/2354.wav', color: 'from-red-500 to-orange-500' },
    { id: 'snare1', name: 'Snare Trap', url: 'https://assets.mixkit.co/active_storage/sfx/2355/2355.wav', color: 'from-orange-500 to-yellow-500' },
    { id: 'hihat1', name: 'Hi-Hat', url: 'https://assets.mixkit.co/active_storage/sfx/2356/2356.wav', color: 'from-yellow-500 to-green-500' },
    { id: 'clap1', name: 'Clap', url: 'https://assets.mixkit.co/active_storage/sfx/2357/2357.wav', color: 'from-green-500 to-teal-500' }
  ],
  melody: [
    { id: 'piano1', name: 'Piano C', url: 'https://assets.mixkit.co/active_storage/sfx/126/126.wav', color: 'from-blue-500 to-purple-500' },
    { id: 'synth1', name: 'Synth Lead', url: 'https://assets.mixkit.co/active_storage/sfx/127/127.wav', color: 'from-purple-500 to-pink-500' },
    { id: 'bass1', name: 'Bass Drop', url: 'https://assets.mixkit.co/active_storage/sfx/128/128.wav', color: 'from-pink-500 to-red-500' }
  ],
  fx: [
    { id: 'riser1', name: 'Riser', url: 'https://assets.mixkit.co/active_storage/sfx/2358/2358.wav', color: 'from-cyan-500 to-blue-500' },
    { id: 'reverse1', name: 'Reverse', url: 'https://assets.mixkit.co/active_storage/sfx/2359/2359.wav', color: 'from-indigo-500 to-purple-500' }
  ]
};

export default function BeatMaker() {
  const [timeline, setTimeline] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [volume, setVolume] = useState(80);
  const [beatName, setBeatName] = useState("");
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const audioContextRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: savedBeats = [] } = useQuery({
    queryKey: ['savedBeats'],
    queryFn: async () => {
      const user = await db.auth.me();
      return db.entities.SavedBeat.filter({ created_by: user.email });
    },
    initialData: []
  });

  const saveBeatMutation = useMutation({
    mutationFn: async (data) => db.entities.SavedBeat.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedBeats'] });
      toast.success("¡Beat guardado exitosamente!");
      setIsSaveDialogOpen(false);
      setBeatName("");
    }
  });

  const addSampleToTimeline = (sample) => {
    setTimeline([...timeline, { 
      ...sample, 
      id: `${sample.id}-${Date.now()}`, 
      startTime: timeline.length * 0.5,
      loop: false,
      panning: 0,
      volume: 100
    }]);
  };

  const removeSample = (id) => {
    setTimeline(timeline.filter(s => s.id !== id));
  };

  const clearTimeline = () => {
    setTimeline([]);
  };

  const updateSample = (id, updates) => {
    setTimeline(timeline.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const playSample = (sample) => {
    const audio = new Audio(sample.url);
    audio.volume = (volume / 100) * ((sample.volume || 100) / 100);
    audio.loop = sample.loop || false;
    
    // Simple panning simulation
    if (audio.context) {
      const panner = audio.context.createStereoPanner();
      panner.pan.value = (sample.panning || 0) / 100;
    }
    
    audio.play();
  };

  const saveBeat = async () => {
    if (!beatName.trim()) {
      toast.error("Por favor ingresa un nombre para tu beat");
      return;
    }

    await saveBeatMutation.mutateAsync({
      name: beatName,
      timeline: timeline,
      bpm: bpm,
      volume: volume
    });
  };

  const loadBeat = (beat) => {
    setTimeline(beat.timeline);
    setBpm(beat.bpm);
    setVolume(beat.volume);
    toast.success(`Beat "${beat.name}" cargado`);
  };

  return (
    <div className="space-y-6">
      {/* Sample Library */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardContent className="p-6">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-yellow-500" />
            Biblioteca de Samples
          </h3>
          
          {Object.entries(SAMPLES).map(([category, samples]) => (
            <div key={category} className="mb-6 last:mb-0">
              <p className="text-zinc-500 text-sm uppercase tracking-wider mb-3">{category}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {samples.map(sample => (
                  <motion.div
                    key={sample.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <button
                      onClick={() => addSampleToTimeline(sample)}
                      onDoubleClick={() => playSample(sample)}
                      className={`w-full p-3 rounded-lg bg-gradient-to-r ${sample.color} text-white font-medium text-sm transition-all hover:shadow-lg`}>
                      {sample.name}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
          <p className="text-zinc-600 text-xs mt-4">Haz clic para agregar al timeline • Doble clic para previsualizar</p>
        </CardContent>
      </Card>

      {/* Controls */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-2">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-400 text-black">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
              </Button>
              <Button
                onClick={clearTimeline}
                size="lg"
                variant="outline"
                className="border-zinc-700">
                <RotateCcw className="w-5 h-5" />
              </Button>
              <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-zinc-700">
                    <Save className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-zinc-900 border-zinc-800">
                  <DialogHeader>
                    <DialogTitle className="text-white">Guardar Beat</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Input
                      placeholder="Nombre de tu beat..."
                      value={beatName}
                      onChange={(e) => setBeatName(e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                    <Button 
                      onClick={saveBeat}
                      className="w-full bg-yellow-500 hover:bg-yellow-400 text-black"
                      disabled={saveBeatMutation.isPending}>
                      {saveBeatMutation.isPending ? "Guardando..." : "Guardar"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center gap-3 min-w-[200px]">
                <Volume2 className="w-5 h-5 text-zinc-500" />
                <Slider
                  value={[volume]}
                  onValueChange={([v]) => setVolume(v)}
                  max={100}
                  step={1}
                  className="flex-1" />
                <span className="text-white text-sm font-mono w-10">{volume}%</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-yellow-500 text-yellow-500 px-3 py-1">
                {bpm} BPM
              </Badge>
              <Badge variant="outline" className="border-zinc-700 text-zinc-400 px-3 py-1">
                {timeline.length} samples
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardContent className="p-6">
          <h3 className="text-white font-bold mb-4">Timeline</h3>
          
          {timeline.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-zinc-600">Tu timeline está vacío</p>
              <p className="text-zinc-700 text-sm mt-1">Agrega samples de la biblioteca para comenzar</p>
            </div>
          ) : (
            <Reorder.Group axis="y" values={timeline} onReorder={setTimeline} className="space-y-3">
              {timeline.map(sample => (
                <Reorder.Item
                  key={sample.id}
                  value={sample}
                  className={`rounded-lg bg-gradient-to-r ${sample.color} bg-opacity-20 border border-zinc-800 hover:border-zinc-700 transition-colors overflow-hidden`}>
                  <div className="flex items-center gap-3 p-3 cursor-move">
                    <div className={`w-1 h-12 rounded-full bg-gradient-to-b ${sample.color}`} />
                    <div className="flex-1">
                      <p className="text-white font-medium">{sample.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {sample.loop && <Badge variant="outline" className="border-green-500 text-green-500 text-xs">Loop</Badge>}
                        <span className="text-zinc-500 text-xs">Pan: {sample.panning}% • Vol: {sample.volume}%</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => playSample(sample)}
                      size="sm"
                      variant="outline"
                      className="border-zinc-700">
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => updateSample(sample.id, { loop: !sample.loop })}
                      size="sm"
                      variant="outline"
                      className={`border-zinc-700 ${sample.loop ? 'bg-green-500/20 border-green-500' : ''}`}>
                      <Repeat className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => removeSample(sample.id)}
                      size="sm"
                      variant="outline"
                      className="border-zinc-700 hover:border-red-500 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Controls expandidos */}
                  <div className="px-3 pb-3 space-y-2">
                    <div className="flex items-center gap-3">
                      <Move className="w-4 h-4 text-zinc-500" />
                      <span className="text-zinc-500 text-xs w-16">Pan:</span>
                      <Slider
                        value={[sample.panning || 0]}
                        onValueChange={([v]) => updateSample(sample.id, { panning: v })}
                        min={-100}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-white text-xs font-mono w-12 text-right">{sample.panning || 0}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-4 h-4 text-zinc-500" />
                      <span className="text-zinc-500 text-xs w-16">Volume:</span>
                      <Slider
                        value={[sample.volume || 100]}
                        onValueChange={([v]) => updateSample(sample.id, { volume: v })}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-white text-xs font-mono w-12 text-right">{sample.volume || 100}%</span>
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
        </CardContent>
      </Card>

      {/* Saved Beats */}
      {savedBeats.length > 0 && (
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-6">
            <h3 className="text-white font-bold mb-4">Mis Beats Guardados</h3>
            <div className="grid gap-2">
              {savedBeats.map(beat => (
                <div key={beat.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                  <div>
                    <p className="text-white font-medium">{beat.name}</p>
                    <p className="text-zinc-500 text-xs">{beat.timeline.length} samples • {beat.bpm} BPM</p>
                  </div>
                  <Button
                    onClick={() => loadBeat(beat)}
                    size="sm"
                    className="bg-yellow-500 hover:bg-yellow-400 text-black">
                    Cargar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}