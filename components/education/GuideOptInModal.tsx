"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  guideTitle: string;
  guidePdfUrl: string;
  locale: string;
};

const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/REPLACE_WITH_WEBHOOK_ID";

/**
 * Opt-in gate before a guide PDF is served. Captures name, email,
 * phone, and terms acceptance, posts the lead to the GHL webhook,
 * then triggers the download. If the webhook call fails we still
 * hand the PDF over — the visitor came here to read, not to be
 * blocked by our CRM.
 */
export default function GuideOptInModal({
  isOpen,
  onClose,
  guideTitle,
  guidePdfUrl,
  locale,
}: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    acceptTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isEN = locale === "en";
  const canSubmit =
    !!formData.name &&
    !!formData.email &&
    !!formData.phone &&
    formData.acceptTerms &&
    !isSubmitting;

  async function handleSubmit() {
    if (!canSubmit) return;
    setIsSubmitting(true);

    try {
      await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          source: "Website - Guide Download",
          guide_requested: guideTitle,
          tags: ["guide-download", "website-lead"],
        }),
      });
    } catch (error) {
      // Webhook failed — not a blocker. Still deliver the PDF.
      console.error("Guide opt-in webhook failed:", error);
    }

    setIsSubmitting(false);
    setIsSuccess(true);

    const link = document.createElement("a");
    link.href = guidePdfUrl;
    link.download = "";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleClose() {
    setFormData({ name: "", email: "", phone: "", acceptTerms: false });
    setIsSuccess(false);
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            aria-hidden
          />

          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={guideTitle}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-verde-950 px-6 py-5 relative">
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label={isEN ? "Close" : "Cerrar"}
                  className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <p className="text-gold-500 text-xs font-heading font-semibold tracking-widest uppercase mb-2">
                  {isEN ? "FREE GUIDE" : "GUÍA GRATUITA"}
                </p>
                <h3 className="font-heading font-bold text-white text-lg tracking-tight pr-8">
                  {guideTitle}
                </h3>
              </div>

              {!isSuccess ? (
                <div className="p-6">
                  <p className="text-sm text-verde-950/50 mb-5">
                    {isEN
                      ? "Enter your information below to download the guide instantly."
                      : "Ingrese su información a continuación para descargar la guía al instante."}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-verde-950 mb-1.5">
                        {isEN ? "Full name" : "Nombre completo"}
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-verde-950/10 bg-verde-50/50 text-sm text-verde-950 focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/10 focus:outline-none transition-all"
                        placeholder={
                          isEN ? "Your full name" : "Su nombre completo"
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-verde-950 mb-1.5">
                        {isEN ? "Email" : "Correo electrónico"}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-verde-950/10 bg-verde-50/50 text-sm text-verde-950 focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/10 focus:outline-none transition-all"
                        placeholder={isEN ? "you@email.com" : "su@correo.com"}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-verde-950 mb-1.5">
                        {isEN ? "Phone" : "Teléfono"}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-lg border border-verde-950/10 bg-verde-50/50 text-sm text-verde-950 focus:border-gold-500/50 focus:ring-2 focus:ring-gold-500/10 focus:outline-none transition-all"
                        placeholder="(555) 000-0000"
                      />
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            acceptTerms: e.target.checked,
                          })
                        }
                        className="mt-1 w-4 h-4 rounded border-verde-950/20 text-gold-500 focus:ring-gold-500/20"
                      />
                      <span className="text-xs text-verde-950/40 leading-relaxed">
                        {isEN
                          ? "I agree to receive communications from Verde Law. My information will not be shared with third parties or immigration authorities."
                          : "Acepto recibir comunicaciones de Verde Law. Mi información no será compartida con terceros ni con autoridades de inmigración."}
                      </span>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className="w-full mt-5 bg-gradient-to-r from-gold-500 to-gold-400 text-verde-950 font-heading font-semibold py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-gold-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? isEN
                        ? "Sending..."
                        : "Enviando..."
                      : isEN
                        ? "Download Guide"
                        : "Descargar Guía"}
                  </button>

                  <p className="text-[10px] text-verde-950/25 text-center mt-3">
                    {isEN
                      ? "Your information is confidential and will not be shared with immigration authorities."
                      : "Su información es confidencial y no será compartida con autoridades de inmigración."}
                  </p>
                </div>
              ) : (
                <div className="p-6 text-center py-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-verde-100 flex items-center justify-center">
                      <svg
                        className="w-7 h-7 text-verde-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </motion.div>
                  <h4 className="font-heading font-bold text-verde-950 text-lg mb-2">
                    {isEN
                      ? "Your guide is downloading!"
                      : "¡Su guía se está descargando!"}
                  </h4>
                  <p className="text-sm text-verde-950/50 mb-6">
                    {isEN
                      ? "If the download doesn't start automatically, click the button below."
                      : "Si la descarga no comienza automáticamente, haga clic en el botón de abajo."}
                  </p>
                  <a
                    href={guidePdfUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex px-6 py-2.5 rounded-lg bg-verde-950 text-white text-sm font-heading font-semibold hover:bg-verde-900 transition-colors"
                  >
                    {isEN ? "Download Again" : "Descargar de Nuevo"}
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
