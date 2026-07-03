import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Star } from 'lucide-react';

interface LandingPageProps {
  onOpen: () => void;
}

export default function LandingPage({ onOpen }: LandingPageProps) {
  const [typedText, setTypedText] = useState('');
  const fullText = "I made something special just for you...";
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setShowButton(true);
      }
    }, 60);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div id="landing-page" className="relative min-h-screen flex flex-col items-center justify-center p-5 xs:p-6 overflow-hidden select-none">
      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
        {/* Decorative Floating Sparkles */}
        <div className="absolute -top-10 left-6 text-[#D4AF37] opacity-65 animate-bounce">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute -top-3 right-6 text-[#FFDCE8] opacity-75 animate-float-slow">
          <Star className="w-4 h-4 fill-current" />
        </div>

        {/* Large Aesthetic Welcome Panel */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="glassmorphism rounded-3xl p-6 xs:p-8 shadow-[0_15px_40px_rgba(255,220,232,0.25)] border border-white/60 w-full mb-6"
        >
          {/* Accent heart */}
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm border border-[#FFDCE8] mb-4"
          >
            <Heart className="w-7 h-7 text-[#B76E79] fill-[#FFDCE8]" />
          </motion.div>

          {/* Sized perfectly for Android without wrapping clipping */}
          <h1 className="font-serif text-2xl xs:text-3xl font-extrabold tracking-tight text-[#4A2D34] mb-3 leading-tight">
            Our Love Story <br />
            <span className="text-[#B76E79] font-serif italic text-3xl xs:text-4xl block mt-1">Spesial Untuk Wid ✨</span>
          </h1>

          <div className="min-h-[44px] flex items-center justify-center px-1">
            <p className="font-sans text-xs xs:text-sm text-[#8A6F75] font-medium tracking-wide leading-relaxed">
              {typedText}
              <span className="inline-block w-1.5 h-4 bg-[#B76E79] ml-1 animate-pulse" />
            </p>
          </div>
        </motion.div>

        {/* Beautiful CTA Button Slot - Animated smoothly to prevent layout jumps */}
        <div className="h-14 flex items-center justify-center w-full">
          <AnimatePresence>
            {showButton && (
              <motion.button
                id="open-heart-btn"
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                }}
                className="relative overflow-hidden group cursor-pointer px-6 xs:px-8 py-3.5 bg-gradient-to-r from-[#B76E79] via-[#D4AF37] to-[#B76E79] bg-[length:200%_auto] hover:bg-right text-white font-sans text-xs xs:text-sm font-semibold tracking-wider uppercase rounded-full shadow-[0_10px_22px_rgba(183,110,121,0.35)] border border-white/40 transition-all duration-500 flex items-center gap-2.5 z-20"
              >
                <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
                <span>Open My Heart</span>
                <Heart className="w-3.5 h-3.5 fill-white" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative luxury sparkles framing at bottom */}
      <div className="absolute bottom-6 flex items-center gap-2 opacity-40 font-sans text-[10px] text-[#A2888F] tracking-widest uppercase">
        <Star className="w-3 h-3 fill-current" /> Especially for you
      </div>
    </div>
  );
}
