import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, MessageSquare, ArrowRight, Disc } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    clearCart,
    getTotal,
    generateWhatsAppLink,
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckoutWhatsApp = () => {
    const link = generateWhatsAppLink();
    window.open(link, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-obsidian-dark/80 backdrop-blur-md"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-screen max-w-md bg-obsidian-dark border-l border-gold/30 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gold/20 flex items-center justify-between bg-obsidian-card">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-gold" />
                <h2 className="font-cinzel font-bold text-lg text-white">Tu Carrito de Licencias</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-gray-400 hover:text-gold hover:bg-gold/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 gap-3">
                  <Disc className="w-12 h-12 text-gold/40 animate-spin" style={{ animationDuration: '10s' }} />
                  <p className="text-sm">Tu carrito está vacío.</p>
                  <p className="text-xs text-gray-500">Explora nuestro catálogo de beats y añade tus licencias preferidas.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.cartId}
                    className="p-4 rounded-2xl glass-card border border-gold/20 flex items-center justify-between gap-3"
                  >
                    <img
                      src={item.beat.coverUrl}
                      alt={item.beat.cleanTitle}
                      className="w-12 h-12 rounded-xl object-cover border border-gold/30"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-white truncate">{item.beat.cleanTitle}</h4>
                      <p className="text-xs text-gold font-medium">{item.license.name}</p>
                      <p className="text-[10px] text-gray-400">{item.beat.bpm} BPM • {item.beat.genre}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="font-mono font-bold text-sm text-gold">${item.price}</span>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-gray-500 hover:text-ruby transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & WhatsApp Order CTA */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gold/20 bg-obsidian-card space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Total Licencias ({cartItems.length})</span>
                  <span className="font-mono font-bold text-xl text-gold-gradient">${getTotal()} USD</span>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleCheckoutWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-gold-glow transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Finalizar Pedido vía WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-xs text-gray-400 hover:text-ruby transition-colors"
                  >
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
