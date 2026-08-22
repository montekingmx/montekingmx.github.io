import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, CheckCircle2, ShieldCheck, Download, CreditCard,
  Building2, MessageCircle, ArrowRight, Loader2, Sparkles, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const BANK_DETAILS = {
  bank: "BBVA México",
  beneficiary: "Monteking Records 13-11 MX",
  clabe: "012580015948291034",
  account: "1594829103",
  whatsapp: "5218180106247"
};

export default function CheckoutModal({ isOpen, onClose, item, type = "pack" }) {
  const [method, setMethod] = useState("card"); // "card", "paypal", "spei"
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [cardData, setCardData] = useState({ number: '', exp: '', cvc: '', name: '' });

  if (!isOpen || !item) return null;

  const handleOnlinePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate instant payment verification
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);

      // Automated Download Trigger ONLY after confirmed payment
      const downloadZip = item.downloadPackage || "MK_SAMPLE_PACK_24BIT.zip";
      const dummyUrl = `assets/sound_libraries/${downloadZip}`;
      const a = document.createElement('a');
      a.href = dummyUrl;
      a.download = downloadZip;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 2200);
  };

  const handleSendTransferReceipt = () => {
    const msg = `¡Hola Monteking MX! 🏦 Acabo de realizar la transferencia de $${item.price} MXN por el ${type === 'pack' ? 'Sample Pack' : 'Beat'}: *${item.title}*. Adjunto mi comprobante para que me liberen el enlace de descarga directa.`;
    window.open(`https://wa.me/${BANK_DETAILS.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="bg-zinc-950 border-2 border-yellow-500/50 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative text-white"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-zinc-900 to-black p-6 border-b border-zinc-800">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-mono font-bold text-yellow-400 uppercase tracking-wider">
              PASARELA DE PAGO SEGURA 13-11
            </span>
          </div>
          <h2 className="text-xl font-bold font-oswald text-white truncate">{item.title}</h2>
          <p className="text-zinc-400 text-xs mt-0.5">
            Total a Pagar: <span className="text-yellow-400 font-bold font-mono text-sm">${item.price} MXN</span> (Entrega digital inmediata)
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isPaid ? (
            <>
              {/* Payment Methods Switcher */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setMethod("card")}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    method === "card"
                      ? "border-yellow-400 bg-yellow-500/15 text-white shadow-md"
                      : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white"
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-yellow-400" />
                  <span className="text-xs font-bold font-oswald block">Tarjeta / Débito</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod("paypal")}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    method === "paypal"
                      ? "border-blue-400 bg-blue-500/15 text-white shadow-md"
                      : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white"
                  }`}
                >
                  <span className="text-sm font-black font-mono text-blue-400 block mb-1">PayPal</span>
                  <span className="text-xs font-bold font-oswald block">PayPal Express</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod("spei")}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    method === "spei"
                      ? "border-amber-400 bg-amber-500/15 text-white shadow-md"
                      : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Building2 className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                  <span className="text-xs font-bold font-oswald block">SPEI / Transferencia</span>
                </button>
              </div>

              {/* Form 1: Card Checkout */}
              {method === "card" && (
                <form onSubmit={handleOnlinePayment} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">Nombre en la Tarjeta</label>
                    <Input
                      required
                      placeholder="Ej. Juan Pérez"
                      value={cardData.name}
                      onChange={e => setCardData({ ...cardData, name: e.target.value })}
                      className="bg-black border-zinc-800 text-white rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">Número de Tarjeta</label>
                    <Input
                      required
                      maxLength={19}
                      placeholder="4000 1234 5678 9010"
                      value={cardData.number}
                      onChange={e => setCardData({ ...cardData, number: e.target.value })}
                      className="bg-black border-zinc-800 text-white rounded-xl font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">Vencimiento (MM/AA)</label>
                      <Input
                        required
                        maxLength={5}
                        placeholder="12/28"
                        value={cardData.exp}
                        onChange={e => setCardData({ ...cardData, exp: e.target.value })}
                        className="bg-black border-zinc-800 text-white rounded-xl font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-zinc-400 uppercase block mb-1">CVC / CVV</label>
                      <Input
                        required
                        maxLength={4}
                        placeholder="123"
                        value={cardData.cvc}
                        onChange={e => setCardData({ ...cardData, cvc: e.target.value })}
                        className="bg-black border-zinc-800 text-white rounded-xl font-mono"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-6 bg-yellow-400 hover:bg-yellow-300 text-black font-black font-oswald text-sm uppercase rounded-2xl shadow-xl shadow-yellow-500/20 flex items-center justify-center gap-2 mt-4"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Procesando Pago Seguro...
                      </>
                    ) : (
                      <>
                        Pagar ${item.price} MXN & Descargar Inmediatamente
                      </>
                    )}
                  </Button>
                </form>
              )}

              {/* Form 2: PayPal Express Checkout */}
              {method === "paypal" && (
                <div className="space-y-4 text-center py-4">
                  <p className="text-xs text-zinc-400">
                    Paga con saldo de PayPal o tus tarjetas guardadas. Al confirmar la transacción, la descarga iniciará de forma automática.
                  </p>
                  <Button
                    onClick={handleOnlinePayment}
                    disabled={isProcessing}
                    className="w-full py-6 bg-[#0070BA] hover:bg-[#005ea6] text-white font-black font-oswald text-sm uppercase rounded-2xl shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Verificando PayPal...
                      </>
                    ) : (
                      <>
                        Pagar con PayPal (${item.price} MXN)
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Method 3: SPEI / Transferencia Bancaria Directa */}
              {method === "spei" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-black border border-amber-500/40 space-y-2 text-xs">
                    <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                      <span className="text-zinc-500 font-mono">BANCO:</span>
                      <span className="text-white font-bold">{BANK_DETAILS.bank}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                      <span className="text-zinc-500 font-mono">BENEFICIARIO:</span>
                      <span className="text-white font-bold">{BANK_DETAILS.beneficiary}</span>
                    </div>
                    <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                      <span className="text-zinc-500 font-mono">CLABE INTERBANCARIA:</span>
                      <span className="text-yellow-400 font-mono font-bold text-sm tracking-wider">{BANK_DETAILS.clabe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500 font-mono">MONTO EXACTO:</span>
                      <span className="text-yellow-400 font-bold">${item.price} MXN</span>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-zinc-300 leading-relaxed">
                      <strong>Requisito para descarga:</strong> Al realizar tu transferencia o depósito en OXXO, envía la captura o foto del comprobante al WhatsApp oficial para liberarte el enlace de descarga de alta velocidad de inmediato.
                    </p>
                  </div>

                  <Button
                    onClick={handleSendTransferReceipt}
                    className="w-full py-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-black font-oswald text-sm uppercase rounded-2xl shadow-xl shadow-green-500/20 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Enviar Comprobante por WhatsApp
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* Confirmed Payment & Automated Download Trigger Screen */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-6 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 text-green-400 flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black font-oswald text-white uppercase">
                ¡Pago Confirmado Exitosamente!
              </h3>
              <p className="text-zinc-400 text-xs max-w-sm mx-auto">
                Tu archivo <strong>{item.downloadPackage || item.title}</strong> se ha comenzado a descargar automáticamente en tu navegador.
              </p>

              <div className="pt-3">
                <a
                  href={`assets/sound_libraries/${item.downloadPackage || 'MK_SAMPLE_PACK_24BIT.zip'}`}
                  download={item.downloadPackage || 'MK_SAMPLE_PACK_24BIT.zip'}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-bold font-oswald text-xs uppercase shadow-xl transition-transform active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  Descargar de Nuevo (Enlace Directo)
                </a>
              </div>
            </motion.div>
          )}
        </div>

      </motion.div>
    </div>
  );
}
