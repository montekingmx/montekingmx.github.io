const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Upload, Heart, MessageCircle, X, Check, Clock, Camera } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useQuery } from "@tanstack/react-query";

const DEMO_GALLERY = [];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [likedImages, setLikedImages] = useState([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploadCaption, setUploadCaption] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: galleryPosts = [] } = useQuery({
    queryKey: ['gallery'],
    queryFn: () => db.entities.GalleryPost.filter({ status: 'approved' }),
    initialData: []
  });

  const allPosts = [...DEMO_GALLERY, ...galleryPosts];

  const toggleLike = (imageId) => {
    setLikedImages(prev =>
      prev.includes(imageId)
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const handleUpload = async () => {
    if (!uploadFile) return;
    
    setIsUploading(true);
    
    // Upload file first
    const { file_url } = await db.integrations.Core.UploadFile({ file: uploadFile });
    
    // Create gallery post (pending approval)
    await db.entities.GalleryPost.create({
      image_url: file_url,
      caption: uploadCaption,
      user_name: "Usuario",
      status: "pending",
      likes: 0
    });
    
    setIsUploading(false);
    setIsUploadOpen(false);
    setUploadCaption("");
    setUploadFile(null);
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">
            Comunidad
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-4">
            Galería
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
            Explora y comparte momentos con la familia Monteking. 
            Tu foto puede ser parte de nuestra galería oficial.
          </p>
          
          {/* Upload Button */}
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold"
              >
                <Upload className="w-5 h-5 mr-2" />
                Subir Foto
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
              <DialogHeader>
                <DialogTitle>Subir Nueva Foto</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {/* File Upload */}
                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-yellow-500/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUploadFile(e.target.files[0])}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {uploadFile ? (
                      <div className="space-y-2">
                        <Check className="w-12 h-12 text-green-500 mx-auto" />
                        <p className="text-white">{uploadFile.name}</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Camera className="w-12 h-12 text-zinc-600 mx-auto" />
                        <p className="text-zinc-500">Haz clic para seleccionar una imagen</p>
                      </div>
                    )}
                  </label>
                </div>

                {/* Caption */}
                <Textarea
                  placeholder="Describe tu foto..."
                  value={uploadCaption}
                  onChange={(e) => setUploadCaption(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white resize-none"
                  rows={3}
                />

                {/* Info */}
                <div className="flex items-start gap-2 p-3 bg-zinc-800/50 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-400 text-sm">
                    Las fotos serán revisadas antes de aparecer en la galería pública. 
                    Este proceso puede tomar hasta 24 horas.
                  </p>
                </div>

                {/* Submit */}
                <Button 
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold"
                  onClick={handleUpload}
                  disabled={!uploadFile || isUploading}
                >
                  {isUploading ? "Subiendo..." : "Enviar para Revisión"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(post)}
            >
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img
                  src={post.image_url}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-medium truncate">{post.caption}</p>
                    <p className="text-zinc-400 text-sm">@{post.user_name}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-white text-sm">
                        <Heart className="w-4 h-4" />
                        {post.likes + (likedImages.includes(post.id) ? 1 : 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white/50 hover:text-white"
                >
                  <X className="w-8 h-8" />
                </button>

                {/* Image */}
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={selectedImage.image_url}
                    alt={selectedImage.caption}
                    className="w-full h-auto max-h-[70vh] object-contain bg-zinc-900"
                  />
                </div>

                {/* Info */}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{selectedImage.caption}</p>
                    <p className="text-zinc-500 text-sm">Por @{selectedImage.user_name}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLike(selectedImage.id)}
                      className="flex items-center gap-2 text-white hover:text-yellow-500 transition-colors"
                    >
                      <Heart className={`w-6 h-6 ${
                        likedImages.includes(selectedImage.id) ? 'fill-yellow-500 text-yellow-500' : ''
                      }`} />
                      {selectedImage.likes + (likedImages.includes(selectedImage.id) ? 1 : 0)}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Community Stats */}
        <section className="mt-16">
          <Card className="bg-zinc-900/50 border-zinc-800 p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-yellow-500 mb-2">{allPosts.length}+</div>
                <div className="text-zinc-500">Fotos Compartidas</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-500 mb-2">5K+</div>
                <div className="text-zinc-500">Likes Totales</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-500 mb-2">500+</div>
                <div className="text-zinc-500">Miembros Activos</div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}