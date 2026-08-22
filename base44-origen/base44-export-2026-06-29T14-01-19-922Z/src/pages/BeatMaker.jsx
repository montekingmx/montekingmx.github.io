import React, { useState, useRef } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Play, Pause, Download, Save, Plus, Trash2, Volume2, Disc } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const SAMPLE_CATEGORIES = {
  drums: [
    { id: "kick1", name: "Kick 808", color: "bg-red-500" },
    { id: "snare1", name: "Snare Clap", color: "bg-blue-500" },
    { id: "hihat1", name: "Hi-Hat Closed", color: "bg-green-500" },
    { id: "hihat2", name: "Hi-Hat Open", color: "bg-emerald-500" },
    { id: "perc1", name: "Percussion", color: "bg-purple-500" }
  ],
  melody: [
    { id: "piano1", name: "Piano Loop", color: "bg-pink-500" },
    { id: "synth1", name: "Synth Lead", color: "bg-indigo-500" },
    { id: "bass1", name: "Bass 808", color: "bg-orange-500" },
    { id: "pad1", name: "Ambient Pad", color: "bg-cyan-500" }
  ],
  fx: [
    { id: "riser1", name: "Riser", color: "bg-yellow-500" },
    { id: "crash1", name: "Crash", color: "bg-red-400" },
    { id: "vocal1", name: "Vocal Chop", color: "bg-purple-400" }
  ]
};

export default function BeatMakerPage() {
  const [timeline, setTimeline] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState([140]);
  const [volume, setVolume] = useState([80]);
  const [currentTime, setCurrentTime] = useState(0);

  const handleDragSample = (sample) => {
    const newSample = {
      ...sample,
      id: `${sample.id}-${Date.now()}`,
      position: timeline.length,
      duration: 4
    };
    setTimeline([...timeline, newSample]);
    toast.success(`${sample.name} añadido al timeline`);
  };

  const removeSample = (id) => {
    setTimeline(timeline.filter(s => s.id !== id));
  };

  const saveBeat = () => {
    toast.success("Beat guardado en tu biblioteca");
  };

  const exportBeat = () => {
    toast.success("Exportando beat... Esto puede tomar unos segundos");
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
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
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">
                  Beat Maker
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">
                  Crea tu Beat
                </h1>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={saveBeat}
                  variant="outline"
                  className="border-zinc-700 text-white hover:bg-zinc-800"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar
                </Button>
                <Button
                  onClick={exportBeat}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sample Library */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <Card className="bg-zinc-900/50 border-zinc-800 p-4">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Disc className="w-5 h-5 text-yellow-500" />
                  Samples
                </h3>
                <Tabs defaultValue="drums">
                  <TabsList className="bg-zinc-800 w-full">
                    <TabsTrigger value="drums" className="flex-1">Drums</TabsTrigger>
                    <TabsTrigger value="melody" className="flex-1">Melody</TabsTrigger>
                    <TabsTrigger value="fx" className="flex-1">FX</TabsTrigger>
                  </TabsList>
                  
                  {Object.entries(SAMPLE_CATEGORIES).map(([category, samples]) => (
                    <TabsContent key={category} value={category} className="space-y-2 mt-4">
                      {samples.map((sample) => (
                        <motion.div
                          key={sample.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`${sample.color} p-3 rounded-lg cursor-pointer flex items-center justify-between group hover:opacity-90 transition-opacity`}
                          onClick={() => handleDragSample(sample)}
                        >
                          <span className="text-white font-medium text-sm">{sample.name}</span>
                          <Plus className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </Card>

              {/* Controls */}
              <Card className="bg-zinc-900/50 border-zinc-800 p-4 mt-4">
                <h3 className="text-white font-bold mb-4">Controles</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-zinc-400 text-sm mb-2 block">BPM: {bpm[0]}</label>
                    <Slider
                      value={bpm}
                      onValueChange={setBpm}
                      min={60}
                      max={200}
                      step={1}
                    />
                  </div>
                  <div>
                    <label className="text-zinc-400 text-sm mb-2 block flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      Volume: {volume[0]}%
                    </label>
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3"
            >
              <Card className="bg-zinc-900/50 border-zinc-800 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-xl">Timeline</h3>
                  <Button
                    size="lg"
                    className="w-16 h-16 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-1" />
                    )}
                  </Button>
                </div>

                {/* Timeline Grid */}
                <div className="bg-zinc-800/50 rounded-lg p-4 min-h-[400px]">
                  {timeline.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-zinc-500 text-center">
                      <div>
                        <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Arrastra samples aquí para crear tu beat</p>
                        <p className="text-sm mt-2">Haz clic en cualquier sample de la izquierda</p>
                      </div>
                    </div>
                  ) : (
                    <Reorder.Group axis="y" values={timeline} onReorder={setTimeline} className="space-y-2">
                      {timeline.map((sample) => (
                        <Reorder.Item key={sample.id} value={sample}>
                          <motion.div
                            layout
                            className={`${sample.color} p-4 rounded-lg flex items-center justify-between cursor-move`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                              <span className="text-white font-medium">{sample.name}</span>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-white hover:bg-white/20"
                              onClick={() => removeSample(sample.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>
                  )}
                </div>

                {/* Playback Bar */}
                <div className="mt-6">
                  <div className="bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-yellow-500"
                      animate={{ width: isPlaying ? "100%" : "0%" }}
                      transition={{ duration: 8, ease: "linear", repeat: isPlaying ? Infinity : 0 }}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}