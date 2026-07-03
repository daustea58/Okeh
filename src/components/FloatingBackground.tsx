import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  type: 'heart' | 'sparkle' | 'blossom';
  symbol: string;
  size: number;
  left: number;
  initialY: number; // starting y offset in vh
  duration: number; // animation duration
  delay: number; // random animation delay
  maxOpacity: number;
  swayDistance: number; // custom horizontal sway amplitude
  rotationDir: number; // -1 or 1 for rotation direction
}

export default function FloatingBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate an elegant, optimized set of romantic background elements
    const generated: Particle[] = Array.from({ length: 24 }).map((_, idx) => {
      const types: ('heart' | 'sparkle' | 'blossom')[] = ['heart', 'sparkle', 'blossom', 'heart'];
      const chosenType = types[idx % types.length];
      
      let symbol = '🤍';
      if (chosenType === 'heart') {
        const hearts = ['🤍', '❤️', '💕', '💖', '💝'];
        symbol = hearts[idx % hearts.length];
      } else if (chosenType === 'sparkle') {
        symbol = '✨';
      } else {
        symbol = '🌸';
      }

      return {
        id: idx,
        type: chosenType,
        symbol,
        size: Math.random() * 14 + 10, // size range between 10px and 24px
        left: Math.random() * 100, // horizontal percent coordinate
        initialY: 105, // start just below viewport bottom
        duration: Math.random() * 10 + 12, // slow rise speed (12s to 22s)
        delay: Math.random() * -15, // negative delay so particles are pre-distributed across the screen on load
        maxOpacity: Math.random() * 0.35 + 0.15, // luxury subtle opacity
        swayDistance: Math.random() * 30 + 15, // horizontal wave sway distance in pixels
        rotationDir: Math.random() > 0.5 ? 1 : -1,
      };
    });

    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-radial-[at_top_right] from-[#FFEAF1] via-[#FFFBFB] to-[#FFF3F6]">
      {/* Elegant Ambient Aurora Color Waves */}
      <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-[#FFE3ED] blur-[140px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#FCF3DE] blur-[120px] opacity-50 pointer-events-none" />

      {/* Subtle overlay texture sparkles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_80%)]" />

      {/* Framer Motion Background Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none font-sans"
          initial={{
            y: '105vh',
            x: `${p.left}vw`,
            opacity: 0,
            rotate: 0,
            scale: 0.8,
          }}
          animate={{
            y: '-10vh',
            x: [
              `${p.left}vw`,
              `calc(${p.left}vw + ${p.swayDistance}px)`,
              `calc(${p.left}vw - ${p.swayDistance}px)`,
              `${p.left}vw`,
            ],
            opacity: [0, p.maxOpacity, p.maxOpacity, 0],
            rotate: [0, p.rotationDir * 180, p.rotationDir * 360],
            scale: [0.8, 1.1, 1, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            fontSize: `${p.size}px`,
            filter: p.type === 'sparkle' ? 'drop-shadow(0 0 4px rgba(212,175,55,0.4))' : 'none',
          }}
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
}
