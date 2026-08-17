import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

const CartContext = createContext();

export const LICENSES = [
  {
    id: 'mp3',
    name: 'Licencia Básica (MP3)',
    tag: 'BÁSICA',
    price: 29.99,
    format: 'MP3 de Alta Calidad (320kbps)',
    usage: 'Streaming (hasta 50,000 reproducciones), 1 Video Musical',
    icon: 'Music',
  },
  {
    id: 'wav',
    name: 'Licencia Premium (WAV)',
    tag: 'MÁS POPULAR',
    price: 49.99,
    format: 'WAV Master 24-bit + MP3',
    usage: 'Streaming (hasta 250,000 reproducciones), Radio, Actuaciones en vivo',
    icon: 'Sparkles',
    popular: true,
  },
  {
    id: 'stems',
    name: 'Licencia Ilimitada (Stems/Trackout)',
    tag: 'PROFESIONAL',
    price: 99.99,
    format: 'WAV Master + Pistas Separadas (Stems)',
    usage: 'Streaming Ilimitado, Radio, TV, Mezcla/Masterización personalizada',
    icon: 'Layers',
  },
  {
    id: 'exclusive',
    name: 'Derechos Exclusivos (Full Ownership)',
    tag: 'CASINO VIP',
    price: 299.99,
    format: 'Contrato firmado + Retiro de catálogo + Todos los archivos',
    usage: 'Propiedad 100% exclusiva, regalías y libertad comercial total',
    icon: 'Crown',
    exclusive: true,
  },
];

export function CartProvider({ children }) {
  const [selectedBeatForLicense, setSelectedBeatForLicense] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);

  const openLicenseModal = (beat) => {
    setSelectedBeatForLicense(beat);
    setIsLicenseModalOpen(true);
  };

  const closeLicenseModal = () => {
    setIsLicenseModalOpen(false);
  };

  const addToCart = (beat, license) => {
    const cartId = `${beat.id}-${license.id}`;
    const exists = cartItems.some(item => item.cartId === cartId);

    if (exists) {
      toast.info('Este beat con esta licencia ya está en tu carrito');
      return;
    }

    const newItem = {
      cartId,
      beat,
      license,
      price: license.price,
    };

    setCartItems([...cartItems, newItem]);
    toast.success(`"${beat.cleanTitle}" (${license.name}) añadido al carrito 🛒`);
    setIsLicenseModalOpen(false);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
    toast.info('Elemento eliminado del carrito');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  };

  /**
   * Genera el enlace de compra instantáneo enviado a WhatsApp de Monteking (Monterrey MX)
   */
  const generateWhatsAppLink = (customMessage = '') => {
    const phoneNumber = '528100000000'; // Número oficial de Monteking (Monterrey MX)
    
    let text = `👑 *ORDEN DE COMPRA MONTEKING MX*\n\n`;
    text += `¡Hola Monteking! Me interesa adquirir las siguientes licencias de beats:\n\n`;

    if (cartItems.length > 0) {
      cartItems.forEach((item, i) => {
        text += `${i + 1}. *Beat:* ${item.beat.cleanTitle} (${item.beat.bpm} BPM)\n`;
        text += `   *Licencia:* ${item.license.name} ($${item.license.price} USD)\n`;
        text += `   *Género:* ${item.beat.genre}\n\n`;
      });
      text += `💰 *TOTAL ESTIMADO:* $${getTotal()} USD\n\n`;
    } else if (selectedBeatForLicense) {
      text += `*Beat:* ${selectedBeatForLicense.cleanTitle} (${selectedBeatForLicense.bpm} BPM)\n\n`;
    }

    if (customMessage) {
      text += `📝 *Nota del Artista:* ${customMessage}\n\n`;
    }

    text += `⚡ Solicitado desde el portal web oficial Monteking Mx (Edición 2030).`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <CartContext.Provider value={{
      selectedBeatForLicense,
      cartItems,
      isCartOpen,
      setIsCartOpen,
      isLicenseModalOpen,
      openLicenseModal,
      closeLicenseModal,
      addToCart,
      removeFromCart,
      clearCart,
      getTotal,
      generateWhatsAppLink,
      LICENSES,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
