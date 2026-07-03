import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import LoadingScreen from './components/LoadingScreen';
import LandingPage from './components/LandingPage';
import LoveLetter from './components/LoveLetter';
import Celebration from './components/Celebration';
import FloatingBackground from './components/FloatingBackground';
import { AppState } from './types';

export default function App() {
  const [appState, setAppState] = useState<AppState>('loading');

  return (
    <div className="min-h-screen bg-[#FFFDFE] font-sans antialiased text-[#5C3A44] select-none selection:bg-pink-100 selection:text-[#B76E79] relative overflow-hidden">
      {/* Persistent Elegant Framer Motion Background */}
      {appState !== 'loading' && <FloatingBackground />}

      <AnimatePresence mode="wait">
        {appState === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full relative z-10"
          >
            <LoadingScreen onComplete={() => setAppState('landing')} />
          </motion.div>
        )}
        {appState === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full relative z-10"
          >
            <LandingPage onOpen={() => setAppState('letter')} />
          </motion.div>
        )}
        {appState === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full relative z-10"
          >
            <LoveLetter onAccept={() => setAppState('celebration')} />
          </motion.div>
        )}
        {appState === 'celebration' && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full relative z-10"
          >
            <Celebration />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

