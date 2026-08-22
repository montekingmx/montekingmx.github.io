import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Filter, Search, Star, Truck, Shield, RefreshCw, X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CATEGORIES = ["Todos", "Camisetas", "Gorras", "Bolsas", "Accesorios"];

const DEMO_PRODUCTS = [
  {
    id: 1,
    name: "Camiseta Monteking Crown",
    category: "Camisetas",
    price: 599,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco"],
    isNew: true
  },
  {
    id: 2,
    name: "Gorra 13-11 Gold Edition",
    category: "Gorras",
    price: 449,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400",
    sizes: ["Unitalla"],
    colors: ["Negro", "Dorado"],
    isNew: true
  },
  {
    id: 3,
    name: "Tote Bag Moneda Al Aire",
    category: "Bolsas",
    price: 349,
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400",
    sizes: ["Unitalla"],
    colors: ["Negro"],
    isNew: false
  },
  {
    id: 4,
    name: "Hoodie Represent",
    category: "Camisetas",
    price: 899,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Negro"],
    isNew: true
  },
  {
    id: 5,
    name: "Cadena MK Logo",
    category: "Accesorios",
    price: 299,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
    sizes: ["Unitalla"],
    colors: ["Dorado", "Plata"],
    isNew: false
  },
  {
    id: 6,
    name: "Snapback Monterrey Style",
    category: "Gorras",
    price: 399,
    image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=400",
    sizes: ["Unitalla"],
    colors: ["Negro", "Blanco", "Verde"],
    isNew: false
  },
];

const FEATURES = [
  { icon: Truck, title: "Envío Nacional", description: "A todo México" },
  { icon: Shield, title: "Pago Seguro", description: "100% protegido" },
  { icon: RefreshCw, title: "Devoluciones", description: "30 días" },
];

const COLOR_MAP = {
  "Negro": "#1a1a1a",
  "Blanco": "#ffffff",
  "Dorado": "#D4AF37",
  "Plata": "#C0C0C0",
  "Verde": "#22c55e"
};

export default function MerchPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [configuringProduct, setConfiguringProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const filteredProducts = DEMO_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const openConfigurator = (product) => {
    setConfiguringProduct(product);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
  };

  const addToCart = () => {
    alert(`${configuringProduct.name} - ${selectedColor} - ${selectedSize} agregado al carrito`);
    setConfiguringProduct(null);
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12">
          <span className="text-yellow-500 uppercase tracking-[0.3em] text-sm font-medium">
            Tienda Oficial
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-4">
            Merchandise
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Ropa y accesorios exclusivos de Monteking. Configura tu producto y visualiza cómo se verá.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-4 mb-12">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="bg-zinc-900/50 border-zinc-800 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{feature.title}</h4>
                  <p className="text-zinc-500 text-sm">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8">
          <Card className="bg-zinc-900/50 border-zinc-800 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 bg-zinc-800 border-zinc-700 text-white">
                  <Filter className="w-4 h-4 mr-2 text-zinc-500" />
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {CATEGORIES.map(category => (
                    <SelectItem key={category} value={category} className="text-white hover:bg-zinc-700">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}>
              <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {product.isNew && (
                    <Badge className="absolute top-3 left-3 bg-yellow-500 text-black">
                      Nuevo
                    </Badge>
                  )}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors">
                    <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <Button 
                      onClick={() => openConfigurator(product)}
                      className="w-full bg-white text-black hover:bg-yellow-500 font-medium">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Configurar Producto
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <span className="text-zinc-500 text-xs uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="text-white font-bold text-lg mt-1 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    {product.colors.map(color => (
                      <span
                        key={color}
                        className="w-4 h-4 rounded-full border border-zinc-600"
                        style={{ backgroundColor: COLOR_MAP[color] }}
                        title={color}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-yellow-500">
                      ${product.price} MXN
                    </span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">4.9</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Product Configurator Dialog */}
        <Dialog open={!!configuringProduct} onOpenChange={() => setConfiguringProduct(null)}>
          <DialogContent className="bg-zinc-900 border-zinc-800 max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-white">Configurador de Producto</DialogTitle>
            </DialogHeader>
            {configuringProduct && (
              <div className="grid md:grid-cols-2 gap-8 py-4">
                {/* Product Preview */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-800">
                  <img
                    src={configuringProduct.image}
                    alt={configuringProduct.name}
                    className="w-full h-full object-cover"
                    style={{
                      filter: selectedColor === "Negro" ? "brightness(0.8)" : 
                              selectedColor === "Blanco" ? "brightness(1.2)" : "none"
                    }}
                  />
                  <div className="absolute top-4 left-4 right-4">
                    <Badge className="bg-yellow-500 text-black">Vista Previa</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-full border-2 border-white"
                        style={{ backgroundColor: COLOR_MAP[selectedColor] }}
                      />
                      <div>
                        <p className="text-white font-bold">{selectedColor}</p>
                        <p className="text-zinc-400 text-sm">Talla: {selectedSize}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Configuration Options */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{configuringProduct.name}</h3>
                    <p className="text-3xl font-bold text-yellow-500">${configuringProduct.price} MXN</p>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className="text-white font-medium mb-3 block">Color</label>
                    <div className="flex gap-3">
                      {configuringProduct.colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                            selectedColor === color ? 'border-yellow-500 scale-110' : 'border-zinc-600'
                          }`}
                          style={{ backgroundColor: COLOR_MAP[color] }}>
                          {selectedColor === color && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Check className="w-6 h-6 text-white drop-shadow-lg" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-zinc-400 text-sm mt-2">Seleccionado: {selectedColor}</p>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <label className="text-white font-medium mb-3 block">Talla</label>
                    <div className="grid grid-cols-4 gap-2">
                      {configuringProduct.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                            selectedSize === size
                              ? 'bg-yellow-500 border-yellow-500 text-black'
                              : 'bg-zinc-800 border-zinc-700 text-white hover:border-zinc-600'
                          }`}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <Button
                    onClick={addToCart}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-6 text-lg">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Agregar al Carrito
                  </Button>

                  <div className="text-center text-zinc-500 text-sm">
                    <p>✓ Envío en 5-10 días hábiles</p>
                    <p>✓ Fabricación bajo demanda</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Print on Demand Info */}
        <section className="mt-16">
          <Card className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/30 p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Sistema Print-On-Demand</h3>
              <p className="text-zinc-400 max-w-2xl mx-auto mb-6">
                Todos nuestros productos son fabricados bajo demanda, garantizando la máxima calidad
                y reduciendo el desperdicio. Cada pieza es única y hecha especialmente para ti.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline" className="border-yellow-500/50 text-yellow-500 px-4 py-2">
                  Calidad Premium
                </Badge>
                <Badge variant="outline" className="border-yellow-500/50 text-yellow-500 px-4 py-2">
                  Producción Sustentable
                </Badge>
                <Badge variant="outline" className="border-yellow-500/50 text-yellow-500 px-4 py-2">
                  Envío 5-10 días
                </Badge>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}