import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, Heart } from 'lucide-react';

import photo1 from '../assets/images/photo1_1783105209537.jpg';
import photo2 from '../assets/images/photo2_1783105228586.jpg';
import photo3 from '../assets/images/photo3_1783105247800.jpg';
import photo4 from '../assets/images/photo4_1783105263854.jpg';
import photo5 from '../assets/images/photo5_1783105281011.jpg';

interface PolaroidItem {
  id: number;
  src: string;
  tilt: string;
  delay: number;
  placeholderBg: string;
}

export default function PolaroidGallery() {
  // Track load failures for individual images to trigger stunning stylized romantic vector placeholders
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const polaroids: PolaroidItem[] = [
    {
      id: 1,
      src: photo1,
      tilt: '-rotate-2 hover:rotate-1 hover:scale-105',
      delay: 0.1,
      placeholderBg: 'from-[#FFDCE8] to-[#FFF0F5]'
    },
    {
      id: 2,
      src: photo2,
      tilt: 'rotate-2 hover:-rotate-1 hover:scale-105',
      delay: 0.2,
      placeholderBg: 'from-[#FFF5F7] to-[#FCF3DE]'
    },
    {
      id: 3,
      src: photo3,
      tilt: '-rotate-1 hover:rotate-2 hover:scale-105',
      delay: 0.3,
      placeholderBg: 'from-[#FCF3DE] to-[#FFE3ED]'
    },
    {
      id: 4,
      src: photo4,
      tilt: 'rotate-3 hover:-rotate-1 hover:scale-105',
      delay: 0.4,
      placeholderBg: 'from-[#FFEAF1] to-[#FFF9F3]'
    },
    {
      id: 5,
      src: photo5,
      tilt: '-rotate-2 hover:rotate-1 hover:scale-105',
      delay: 0.5,
      placeholderBg: 'from-[#FFF9F3] to-[#FFDCE8]'
    }
  ];

  const handleImageError = (id: number) => {
    setFailedImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Title Panel */}
      <div className="flex items-center justify-center w-full border-b border-pink-100 pb-3 mb-2">
        <h3 className="font-serif text-lg font-bold text-[#4A2D34] flex items-center gap-2">
          <Camera className="w-5 h-5 text-[#B76E79]" />
          Polaroid Gallery
        </h3>
      </div>

      {/* Masonry-Style Polaroid Stack */}
      <div className="grid grid-cols-2 gap-4 w-full px-1">
        {polaroids.map((photo, index) => {
          const isFailed = failedImages[photo.id];
          
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: photo.delay, ease: 'easeOut' }}
              className={`bg-white p-2.5 pb-3.5 shadow-[0_8px_20px_rgba(255,220,232,0.15)] border border-pink-50/50 rounded-xl cursor-pointer transition-all duration-500 ease-out transform ${photo.tilt} flex flex-col ${index === 4 ? 'col-span-2 mx-auto w-[80%] mt-1' : ''}`}
            >
              {/* Image Frame with Elongated Aspect Ratio 2:3 */}
              <div className="relative aspect-[2/3] bg-pink-50 rounded-lg overflow-hidden border border-neutral-100">
                {!isFailed ? (
                  <img
                    src={photo.src}
                    alt="Polaroid Photo"
                    onError={() => handleImageError(photo.id)}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  /* Stylized Luxury Romantic Placeholder */
                  <div className={`w-full h-full bg-gradient-to-tr ${photo.placeholderBg} flex flex-col items-center justify-center p-4 text-center relative`}>
                    <div className="absolute inset-2 border border-white/40 rounded-lg pointer-events-none" />
                    
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 2 + photo.id * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="mb-2 text-[#B76E79]"
                    >
                      {photo.id % 2 === 0 ? (
                        <Sparkles className="w-8 h-8 opacity-75" />
                      ) : (
                        <Heart className="w-8 h-8 fill-pink-200/50 opacity-80" />
                      )}
                    </motion.div>
                    
                    <p className="font-serif text-[10px] tracking-widest text-[#B76E79] font-bold uppercase leading-tight">
                      MOMENT 0{photo.id}
                    </p>
                    <p className="font-sans text-[8px] text-[#A2888F] italic mt-1 font-medium">
                      Wid & Aku
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
