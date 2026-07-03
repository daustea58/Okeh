import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [dots, setDots] = useState('...');

  useEffect(() => {
    // Cycle dots animation
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '.' : prev + '.'));
    }, 500);

    // Timeout to complete loading screen after 2.5s
    const timeout = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearInterval(dotsInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      id="loading-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-tr from-[#FFF0F5] via-[#FFFBF9] to-[#FFF5F7]"
    >
      {/* Background Soft Glows */}
      <div className="absolute w-72 h-72 rounded-full bg-[#FFDCE8] blur-[80px] opacity-60 animate-pulse-gentle" />
      
      <div className="relative flex flex-col items-center z-10 px-6 text-center">
        {/* Pulsing Luxury Heart */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-white shadow-xl border border-[#FFDCE8]"
        >
          <Heart className="w-12 h-12 text-[#B76E79] fill-[#FFDCE8]" />
          <div className="absolute inset-0 rounded-full border border-pink-300 opacity-30 animate-ping" />
        </motion.div>

        {/* Premium Font Text */}
        <h2 className="font-serif text-2xl xs:text-3xl font-extrabold tracking-tight text-[#4A2D34] mb-3">
          Sebuah Surat Untuk Wid <span className="text-[#B76E79]">🤍</span>
        </h2>

        <p className="font-sans text-xs xs:text-sm text-[#8A6F75] font-semibold tracking-widest uppercase mt-1">
          Menyiapkan sesuatu yang spesial
          <span className="inline-block w-6 text-left">{dots}</span>
        </p>

        {/* Bottom copyright/aesthetic element */}
        <p className="absolute bottom-10 font-sans text-[10px] tracking-widest text-[#A2888F] uppercase">
          Eksklusif • Dibuat Dengan Ketulusan
        </p>
      </div>
    </motion.div>
  );
}
