import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Mail, Sparkles, Calendar, AlertCircle } from 'lucide-react';
import MusicPlayer from './MusicPlayer';
import PolaroidGallery from './PolaroidGallery';

interface LoveLetterProps {
  onAccept: () => void;
}

export default function LoveLetter({ onAccept }: LoveLetterProps) {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [canOpen, setCanOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showFullContent, setShowFullContent] = useState(false);

  // Guard against click-through events from previous page on mobile
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanOpen(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // "Masih Bingung" Button running state
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
  const [noBtnScale, setNoBtnScale] = useState(1);
  const [yesBtnScale, setYesBtnScale] = useState(1);
  const [confuseAttempts, setConfuseAttempts] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const letterParagraphs = [
    "Hai Wid 🤍",
    "Mungkin aku sadar, selama ini aku udah banyak bikin salah. Bahkan kalau dihitung, mungkin salahku nggak akan cukup pakai jari.",
    "Aku minta maaf buat semua sikapku, terutama saat aku sering ngambek atau marah tanpa alasan yang jelas. Aku tahu itu pasti bikin kamu capek, dan aku benar-benar menyesal.",
    "Aku nggak bisa mengubah apa yang sudah terjadi, tapi kalau suatu hari nanti kamu mau kasih aku satu kesempatan lagi, aku pengen belajar jadi seseorang yang lebih baik buat kamu.",
    "Aku nggak janji bakal langsung sempurna, tapi aku janji bakal berusaha lebih ngerti kamu, lebih sabar, dan lebih menghargai hubungan ini.",
    "Jadi... boleh nggak aku tanya sekali lagi?",
    "❤️ Wid, kamu mau balikan lagi sama aku?"
  ];

  // Natural human typewriter effect with dynamic pauses, realistic typos, and nervous corrections
  useEffect(() => {
    if (!isEnvelopeOpened) return;

    interface TypeAction {
      t: 'w' | 'd' | 'p'; // write, delete, pause
      v: string | number; // text to write, count to delete, or duration to pause
    }

    const typingActions: TypeAction[] = [
      // Para 1
      { t: 'w', v: "Hai Wid 🤍\n\n" },
      { t: 'p', v: 900 },
      
      // Para 2
      { t: 'w', v: "Mungkin aku sad" },
      { t: 'p', v: 400 },
      { t: 'w', v: "ra" }, // typo "sadra"
      { t: 'p', v: 750 }, // pause in nervous realization
      { t: 'd', v: 2 }, // delete "ra"
      { t: 'p', v: 500 },
      { t: 'w', v: "ar, selama ini aku udah banyak bikin salah. Bahkan kalau dihitung, mungkin salahku nggak akan cu" },
      { t: 'p', v: 300 },
      { t: 'w', v: "kyp" }, // typo "cukyp"
      { t: 'p', v: 850 },
      { t: 'd', v: 3 }, // delete "kyp"
      { t: 'p', v: 450 },
      { t: 'w', v: "kup pakai jari.\n\n" },
      { t: 'p', v: 1400 }, // long pause between paragraphs

      // Para 3
      { t: 'w', v: "Aku minta ma" },
      { t: 'p', v: 350 },
      { t: 'w', v: "fa" }, // typo "mafa"
      { t: 'p', v: 800 },
      { t: 'd', v: 2 }, // delete "fa"
      { t: 'p', v: 400 },
      { t: 'w', v: "af buat semua sik" },
      { t: 'p', v: 300 },
      { t: 'w', v: "p" }, // typo "sikp"
      { t: 'p', v: 600 },
      { t: 'd', v: 1 }, // delete "p"
      { t: 'p', v: 300 },
      { t: 'w', v: "apku, terutama saat aku sering ngambek atau marah tanpa alasan yang jelas. Aku tahu itu pasti bikin kamu capek, dan aku benar-benar menyesal.\n\n" },
      { t: 'p', v: 1500 },

      // Para 4
      { t: 'w', v: "Aku nggak bisa meng" },
      { t: 'p', v: 300 },
      { t: 'w', v: "uabh" }, // typo "menguabh"
      { t: 'p', v: 900 },
      { t: 'd', v: 3 }, // delete "ubh"
      { t: 'p', v: 400 },
      { t: 'w', v: "bah apa yang su" },
      { t: 'p', v: 250 },
      { t: 'w', v: "dha" }, // typo "sudha"
      { t: 'p', v: 800 },
      { t: 'd', v: 2 }, // delete "ha"
      { t: 'p', v: 350 },
      { t: 'w', v: "ah terjadi, tapi kalau suatu hari nanti kamu mau kasih aku satu kesempatan lagi, aku pengen belajar jadi seseorang yang lebih baik buat kamu.\n\n" },
      { t: 'p', v: 1600 },

      // Para 5
      { t: 'w', v: "Aku nggak janji bakal langsung sempurna, tapi aku janji bakal berusaha lebih ngerti kamu, lebih sabar, dan lebih menghargai hubungan ini.\n\n" },
      { t: 'p', v: 1800 },

      // Para 6
      { t: 'w', v: "Jadi... boleh " },
      { t: 'p', v: 500 },
      { t: 'w', v: "gka" }, // typo "gka"
      { t: 'p', v: 950 },
      { t: 'd', v: 3 }, // delete "gka"
      { t: 'p', v: 450 },
      { t: 'w', v: "nggak aku tanya sekali l" },
      { t: 'p', v: 200 },
      { t: 'w', v: "gi?" }, // typo "lgi?"
      { t: 'p', v: 800 },
      { t: 'd', v: 3 }, // delete "gi?"
      { t: 'p', v: 400 },
      { t: 'w', v: "agi?\n\n" },
      { t: 'p', v: 2200 },

      // Para 7 (Proposal line)
      { t: 'w', v: "❤️ " },
      { t: 'p', v: 800 },
      { t: 'w', v: "Wid, kamu mau balikan lagi sama aku?" }
    ];

    let isCancelled = false;
    let currentText = '';
    let actionIndex = 0;
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout;
    
    // Smooth scroll down while typing
    const scrollInterval = setInterval(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 450);

    const runEngine = () => {
      if (isCancelled) return;

      if (actionIndex >= typingActions.length) {
        clearInterval(scrollInterval);
        setTypedText(currentText);
        setShowFullContent(true);
        return;
      }

      const action = typingActions[actionIndex];

      if (action.t === 'w') {
        const textToType = action.v as string;
        if (charIndex < textToType.length) {
          const char = textToType[charIndex];
          currentText += char;
          setTypedText(currentText);
          charIndex++;

          // Slower dynamic human typing speed (75ms - 155ms per character)
          let delay = Math.random() * 80 + 75;

          // Realistic human punctuation beats
          if (char === ',' || char === ';') {
            delay = Math.random() * 250 + 350; // Pause at commas (350ms - 600ms)
          } else if (char === '.' || char === '?' || char === '!') {
            delay = Math.random() * 600 + 700; // Pause at sentence ends (700ms - 1300ms)
          } else if (char === '\n') {
            delay = Math.random() * 500 + 800; // Pause at linebreaks (800ms - 1300ms)
          }

          timeoutId = setTimeout(runEngine, delay);
        } else {
          // Move to next action block
          actionIndex++;
          charIndex = 0;
          timeoutId = setTimeout(runEngine, 150);
        }
      } else if (action.t === 'd') {
        const count = action.v as number;
        if (charIndex < count) {
          currentText = currentText.slice(0, -1);
          setTypedText(currentText);
          charIndex++;

          // Natural fast-tap backspace speed (approx 55ms - 75ms)
          const delay = Math.random() * 20 + 55;
          timeoutId = setTimeout(runEngine, delay);
        } else {
          // Move to next action block
          actionIndex++;
          charIndex = 0;
          timeoutId = setTimeout(runEngine, 200);
        }
      } else if (action.t === 'p') {
        const duration = action.v as number;
        timeoutId = setTimeout(() => {
          actionIndex++;
          charIndex = 0;
          runEngine();
        }, duration);
      }
    };

    // Initial suspense pause before letter writing commences
    timeoutId = setTimeout(runEngine, 1300);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
      clearInterval(scrollInterval);
    };
  }, [isEnvelopeOpened]);

  // Handle run-away button "Masih Bingung"
  const handleNoButtonMove = () => {
    // Generate random translations
    const maxOffset = 130; // pixels
    const randomX = (Math.random() - 0.5) * maxOffset * 2;
    const randomY = (Math.random() - 0.5) * maxOffset;
    
    setNoBtnPos({ x: randomX, y: randomY });
    setConfuseAttempts(prev => prev + 1);

    // Make Yes button bigger and No button smaller
    setNoBtnScale(prev => Math.max(0.5, prev - 0.08));
    setYesBtnScale(prev => Math.min(1.8, prev + 0.12));
  };

  const getConfuseText = () => {
    if (confuseAttempts === 0) return "🙈 Masih Bingung";
    if (confuseAttempts === 1) return "Ehh? Yakin? 🥺";
    if (confuseAttempts === 2) return "Gak bisa ditekan! 😜";
    if (confuseAttempts === 3) return "Coba lagi deh.. 😋";
    if (confuseAttempts === 4) return "Tombolnya lari! 🏃‍♀️";
    return "Nggak boleh pilih ini! 💖";
  };

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col items-center py-10 px-4 overflow-x-hidden">
      
      {/* Background Decoratives */}
      <div className="absolute top-1/4 left-5 w-16 h-16 bg-pink-100/35 rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-4 w-24 h-24 bg-yellow-100/35 rounded-full blur-xl pointer-events-none" />

      {/* STAGE 1: CLOSED ENVELOPE */}
      <AnimatePresence>
        {!isEnvelopeOpened && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full max-w-sm flex flex-col items-center justify-center my-auto min-h-[70vh] px-2 z-10"
          >
            {/* Elegant Envelope Title */}
            <h2 className="font-serif text-2xl font-bold text-[#5C3A44] text-center mb-2">
              For Wid 🤍
            </h2>
            <p className="font-sans text-xs text-[#A2888F] text-center mb-8 uppercase tracking-widest">
              You have a secret love letter
            </p>

            {/* Premium Interactive Envelope Box */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (canOpen) {
                  setIsEnvelopeOpened(true);
                }
              }}
              className="relative w-full aspect-[4/3] bg-[#FFF0F5] border-2 border-white rounded-3xl shadow-[0_20px_45px_rgba(183,110,121,0.25)] flex flex-col items-center justify-center cursor-pointer hover:shadow-[0_25px_50px_rgba(183,110,121,0.35)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden group"
            >
              {/* Gold border lines */}
              <div className="absolute inset-2.5 border border-dashed border-[#D4AF37]/40 rounded-[18px]" />

              {/* Envelope flap folds (visual lines) */}
              <div className="absolute top-0 inset-x-0 h-[45%] bg-[#FFE4EE] rounded-t-3xl clip-flap border-b border-white/50" />
              
              {/* Elegant Gold Heart Seal */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative z-10 w-20 h-20 bg-white rounded-full shadow-lg border border-[#D4AF37] flex items-center justify-center group-hover:bg-[#FFF9F9] transition-colors"
              >
                <div className="absolute inset-1.5 border border-[#D4AF37]/20 rounded-full" />
                <Heart className="w-10 h-10 text-[#B76E79] fill-[#FFDCE8] animate-pulse-gentle" />
              </motion.div>

              {/* "Buka Amplop" Overlay */}
              <div className="absolute bottom-4 font-sans text-[11px] font-semibold text-[#B76E79] uppercase tracking-widest animate-bounce">
                ✨ Tap to Open ✨
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 2: LETTER CONTENT VIEW */}
      {isEnvelopeOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-md flex flex-col gap-10 z-10"
        >
          {/* Continuous Music Player - hidden during typing, visible afterwards */}
          <div className={showFullContent ? "w-full" : "hidden"}>
            <MusicPlayer autoPlay={true} />
          </div>

          {/* Section: The Elegant Letter Card */}
          <div className="glassmorphism rounded-[32px] p-8 shadow-[0_15px_40px_rgba(183,110,121,0.18)] border border-white/70 relative">
            <div className="absolute top-4 right-4 text-[#D4AF37]/50 animate-pulse-gentle">
              <Sparkles className="w-6 h-6" />
            </div>

            {/* Vintage style letter header */}
            <div className="flex flex-col mb-6 border-b border-pink-100 pb-4">
              <span className="font-serif text-[11px] font-bold text-[#B76E79] tracking-widest uppercase">
                Private & Confidential
              </span>
              <span className="font-sans text-[10px] text-[#A2888F] italic">
                From My Heart to Yours
              </span>
            </div>

            {/* Typed Text Box with custom typing caret */}
            <div className="font-serif text-sm leading-relaxed text-[#5C3A44] text-justify space-y-4 whitespace-pre-line min-h-[220px]">
              {typedText}
              {!showFullContent && (
                <span className="inline-block w-2 h-4 bg-[#B76E79] ml-1 animate-pulse" />
              )}
            </div>
          </div>

          {/* Reveal details sequentially after letter typing */}
          {showFullContent && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="flex flex-col gap-10"
            >
              {/* Section: Calendar "TANGGAL BALIKAN KITA" */}
              <div className="glassmorphism rounded-3xl p-6 shadow-md border border-white/60 text-center">
                <div className="flex items-center justify-center gap-2 text-[#B76E79] mb-1">
                  <Calendar className="w-5 h-5 text-[#B76E79]" />
                  <span className="font-serif text-sm font-bold tracking-wide uppercase">TANGGAL BALIKAN KITA</span>
                </div>
                
                <p className="font-serif text-sm font-bold text-[#8A6F75]">
                  Juli 2026
                </p>

                <div className="grid grid-cols-7 gap-y-2.5 gap-x-1 mt-4 max-w-[280px] mx-auto text-center">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                    <span key={idx} className="font-sans text-[10px] font-bold text-[#A2888F] uppercase tracking-wider">{day}</span>
                  ))}
                  {/* Empty slots for offset (July 2026 starts on Wednesday, so 3 empty slots) */}
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="aspect-square" />
                  ))}
                  {/* July Days */}
                  {Array.from({ length: 31 }).map((_, idx) => {
                    const dayNum = idx + 1;
                    const isTargetDate = dayNum === 4;
                    return (
                      <div key={dayNum} className="relative aspect-square flex items-center justify-center">
                        {isTargetDate ? (
                          <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute inset-0 bg-[#B76E79]/20 border-2 border-[#B76E79] rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(183,110,121,0.4)] z-10"
                          >
                            <span className="font-serif text-sm font-black text-[#4A2D34]">
                              {dayNum}
                            </span>
                            {/* Heart badge */}
                            <div className="absolute -top-1.5 -right-1.5 bg-[#B76E79] p-0.5 rounded-full border border-white shadow">
                              <Heart className="w-1.5 h-1.5 text-white fill-white" />
                            </div>
                          </motion.div>
                        ) : (
                          <span className={`font-sans text-xs font-semibold ${dayNum < 4 ? 'text-[#8A6F75]' : 'text-[#4A2D34]'}`}>
                            {dayNum}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <p className="font-sans text-[10px] text-[#A2888F] italic mt-4 leading-relaxed px-2">
                  "04 Juli 2026 • Hari istimewa saat kita memulai kembali lembaran baru bersama 💖"
                </p>
              </div>

              {/* Section: Polaroid Gallery */}
              <PolaroidGallery />

              {/* Section: Love Meter (Animation 100%) */}
              <div className="glassmorphism rounded-3xl p-6 shadow-md border border-white/60">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-serif text-sm font-bold text-[#5C3A44]">My Love For You</span>
                  <span className="font-mono text-xs font-bold text-[#B76E79] animate-pulse">100%</span>
                </div>
                {/* Visual Love Progress Bar */}
                <div className="w-full h-3 bg-pink-100/50 rounded-full overflow-hidden border border-pink-200/40 relative">
                  <motion.div
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.5, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#B76E79] to-[#E89EAF] rounded-full relative flex items-center justify-end"
                  >
                    <div className="absolute right-1 w-2 h-2 rounded-full bg-white shadow animate-ping" />
                  </motion.div>
                </div>
                {/* Row of hearts pulsing */}
                <div className="flex justify-center gap-1.5 mt-3">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <motion.div
                      key={idx}
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ duration: 1.5, delay: idx * 0.15, repeat: Infinity }}
                    >
                      <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* THE DECISION ZONE */}
              <div className="flex flex-col items-center gap-6 mt-8 py-6 border-t border-pink-100 relative">
                <h3 className="font-serif text-lg font-bold text-[#4A2D34] text-center mb-1">
                  Bagaimana Wid? Boleh aku jadi pelindungmu lagi?
                </h3>
                
                {/* CTA Action Buttons layout */}
                <div className="relative w-full min-h-[160px] flex items-center justify-center gap-4">
                  {/* Yes Button "Mau Balikan" */}
                  <motion.button
                    style={{ scale: yesBtnScale }}
                    whileHover={{ scale: yesBtnScale + 0.05 }}
                    whileTap={{ scale: yesBtnScale - 0.05 }}
                    onClick={onAccept}
                    className="cursor-pointer font-sans px-7 py-3.5 bg-gradient-to-r from-emerald-500 to-[#B76E79] text-white font-semibold text-sm rounded-full shadow-lg border border-white/30 tracking-wider flex items-center gap-2 z-20 transition-all duration-300"
                  >
                    <Heart className="w-4 h-4 fill-white animate-pulse" />
                    <span>💖 Mau Balikan</span>
                  </motion.button>

                  {/* No Button "Masih Bingung" */}
                  <motion.button
                    animate={{
                      x: noBtnPos.x,
                      y: noBtnPos.y,
                      scale: noBtnScale
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    onMouseEnter={handleNoButtonMove}
                    onClick={handleNoButtonMove}
                    onTouchStart={handleNoButtonMove}
                    className="cursor-pointer font-sans px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-500 font-semibold text-xs rounded-full shadow-md border border-gray-200 tracking-wide z-10 select-none whitespace-nowrap"
                  >
                    <span>{getConfuseText()}</span>
                  </motion.button>
                </div>

                {confuseAttempts > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-sans text-[11px] text-pink-600 font-medium italic text-center animate-bounce mt-2 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5" /> Eh, tombol "Masih Bingung" nya pemalu, gak mau dipencet! Tekan "Mau Balikan" aja ya! 💕
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}

          {/* Footer inside the letter content view */}
          <footer className="w-full text-center mt-12 py-6 border-t border-pink-100 text-[10px] text-[#A2888F] font-sans tracking-widest uppercase">
            Made with <Heart className="w-3 h-3 text-pink-500 fill-pink-500 inline mx-0.5" /> Especially for Wid
          </footer>
        </motion.div>
      )}
    </div>
  );
}
