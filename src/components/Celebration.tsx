import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
  type: 'heart' | 'star' | 'circle';
  rotation: number;
  spinSpeed: number;
}

export default function Celebration() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stage, setStage] = useState<'celebration' | 'forever'>('celebration');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Resize Canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Color palettes for romantic/luxury theme
    const colors = [
      '#FFDCE8', // soft pink
      '#B76E79', // rose gold
      '#D4AF37', // luxury gold
      '#FF5E84', // bright love pink
      '#FFF0F5', // lavender blush
      '#FFF9F3', // warm cream
    ];

    // Helper to create particles
    const createParticle = (x: number, y: number, isForeverSurge = false): Particle => {
      const types: ('heart' | 'star' | 'circle')[] = ['heart', 'star', 'circle'];
      const angle = Math.random() * Math.PI * 2;
      const speed = isForeverSurge ? (Math.random() * 8 + 3) : (Math.random() * 4 + 1.5);
      
      return {
        x,
        y,
        size: isForeverSurge ? (Math.random() * 18 + 10) : (Math.random() * 12 + 6),
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.cos(angle) * speed,
        speedY: isForeverSurge ? Math.sin(angle) * speed : -Math.random() * 2 - 1, // Rise upwards if normal
        opacity: 1,
        type: isForeverSurge ? 'heart' : types[Math.floor(Math.random() * types.length)],
        rotation: Math.random() * 360,
        spinSpeed: (Math.random() - 0.5) * 5,
      };
    };

    // Initial confetti pop
    for (let i = 0; i < 75; i++) {
      particles.push(createParticle(canvas.width / 2, canvas.height * 0.45));
    }

    // Periodic fireworks bursts & random floating hearts
    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick++;

      // Automatically spawn occasional firework or floating heart
      if (tick % 60 === 0 && stage === 'celebration') {
        const randomX = Math.random() * canvas.width;
        const randomY = Math.random() * canvas.height * 0.5 + 100;
        for (let i = 0; i < 24; i++) {
          particles.push(createParticle(randomX, randomY));
        }
      }

      // Render & Update Particles
      particles.forEach((p, idx) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.spinSpeed;
        p.opacity -= 0.006;

        if (stage === 'celebration') {
          // Slow downward float for non-surge particles
          p.speedY += 0.03; // gravity effect
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.type === 'heart') {
          // Draw a standard vector heart path on canvas
          ctx.beginPath();
          const d = p.size;
          ctx.moveTo(0, -d / 4);
          ctx.bezierCurveTo(d / 2, -d, d, -d / 3, 0, d * 0.8);
          ctx.bezierCurveTo(-d, -d / 3, -d / 2, -d, 0, -d / 4);
          ctx.fill();
        } else if (p.type === 'star') {
          // 4-point star
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(0, 0, p.size, 0);
          ctx.quadraticCurveTo(0, 0, 0, p.size);
          ctx.quadraticCurveTo(0, 0, -p.size, 0);
          ctx.quadraticCurveTo(0, 0, 0, -p.size);
          ctx.fill();
        } else {
          // Circular confetti flake
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Remove dead particles
        if (p.opacity <= 0 || p.y > canvas.height + 20) {
          particles.splice(idx, 1);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Forever Surge triggers an explosion from everywhere
    if (stage === 'forever') {
      const interval = setInterval(() => {
        for (let i = 0; i < 15; i++) {
          // Burst from edges
          const randomEdgeX = Math.random() > 0.5 ? 0 : canvas.width;
          const randomEdgeY = Math.random() * canvas.height;
          particles.push(createParticle(randomEdgeX, randomEdgeY, true));
          
          // Burst from center
          particles.push(createParticle(canvas.width / 2, canvas.height / 2, true));
        }
      }, 100);

      return () => {
        clearInterval(interval);
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
      };
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [stage]);

  const triggerForeverSurge = () => {
    setStage('forever');
  };

  return (
    <div id="celebration-container" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-[#FFF0F5] via-[#FFFBF9] to-[#FFF5F7]">
      {/* 60FPS Interactive Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#FFDCE8] blur-[100px] opacity-75 animate-pulse-gentle pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#FCF3DE] blur-[100px] opacity-70 pointer-events-none" />

      {/* Stage-based Animated Content */}
      <div className="relative z-10 max-w-md w-full px-6 text-center select-none">
        <AnimatePresence mode="wait">
          {stage === 'celebration' ? (
            <motion.div
              key="celebration-view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="glassmorphism rounded-3xl p-8 shadow-[0_25px_60px_rgba(183,110,121,0.25)] border border-white/60 flex flex-col items-center"
            >
              {/* Grand Glowing Heart */}
              <motion.div
                animate={{
                  scale: [1, 1.18, 1],
                  rotate: [0, 6, -6, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="w-20 h-20 bg-gradient-to-tr from-[#B76E79] to-[#FFDCE8] rounded-full flex items-center justify-center shadow-lg mb-6 border border-white"
              >
                <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
              </motion.div>

              <h1 className="font-serif text-5xl font-extrabold tracking-tight text-[#B76E79] mb-4 animate-bounce">
                YAY!! 💕
              </h1>

              <div className="space-y-4 font-sans text-sm text-[#5C3A44] leading-relaxed mb-8">
                <p className="font-bold text-base text-[#4A2D34]">
                  Makasih udah ngasih aku kesempatan lagi, Wid.
                </p>
                <p>
                  Aku janji bakal belajar lebih dewasa, lebih sabar, lebih ngerti kamu, dan bakal berusaha bikin kamu bahagia setiap hari.
                </p>
                <p className="font-serif text-lg font-extrabold text-[#B76E79] tracking-wide mt-4">
                  ❤️ I Love You, Wid ❤️
                </p>
              </div>

              {/* Forever Together CTA */}
              <motion.button
                id="forever-together-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerForeverSurge}
                className="cursor-pointer font-sans px-8 py-4 bg-gradient-to-r from-[#B76E79] via-[#D4AF37] to-[#B76E79] bg-[length:200%_auto] hover:bg-right text-white font-bold text-sm tracking-widest uppercase rounded-full shadow-[0_10px_25px_rgba(183,110,121,0.35)] border border-white/30 transition-all duration-500 flex items-center gap-2"
              >
                <span>💍 Forever Together</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="forever-view"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className="flex flex-col items-center justify-center min-h-[50vh]"
            >
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-8"
              >
                <Heart className="w-24 h-24 text-red-500 fill-red-500 filter drop-shadow-[0_0_15px_rgba(239,68,68,0.7)]" />
              </motion.div>

              <h2 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#4A2D34] tracking-tight leading-tight mb-4 drop-shadow-sm">
                "Forever Starts Today <span className="text-[#B76E79]">❤️</span>"
              </h2>
              
              <p className="font-sans text-xs tracking-widest text-[#B76E79] uppercase font-bold animate-pulse">
                Wid & Aku • Forever United
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="absolute bottom-6 text-center text-[10px] text-[#A2888F] font-sans tracking-widest uppercase z-10">
        Our Story Has Just Begun
      </footer>
    </div>
  );
}
