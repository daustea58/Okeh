import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Music, Info } from 'lucide-react';

interface MusicPlayerProps {
  autoPlay?: boolean;
}

export default function MusicPlayer({ autoPlay = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Path to local song
  const localSongSrc = '/assets/music/love-song.mp3';
  // Backup royalty-free romantic acoustic piano song so it works out of the box
  const backupSongSrc = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3';

  useEffect(() => {
    // Create audio element
    const audio = new Audio(localSongSrc);
    audio.volume = volume;
    audio.loop = true;
    audioRef.current = audio;

    if (autoPlay) {
      audio.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Local love-song.mp3 autoplay blocked or failed. Trying backup or wait for user:', err);
          audio.src = backupSongSrc;
          audio.load();
          audio.play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((e) => {
              console.warn('Backup autoplay also blocked. Will play on user click:', e);
            });
        });
    }

    // Listen to changes
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const onError = () => {
      console.warn('Local love-song.mp3 not found or loaded with errors. Falling back to romantic stream.');
      // Attempt to load backup song
      if (audioRef.current && audioRef.current.src !== backupSongSrc) {
        audioRef.current.src = backupSongSrc;
        audioRef.current.load();
        if (isPlaying) {
          audioRef.current.play().catch((err) => console.log('Audio autoplay blocked: ', err));
        }
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('error', onError);
      audioRef.current = null;
    };
  }, []);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error('Audio play failed: ', err);
          // If error occurs, let's fallback to backup stream
          if (audioRef.current) {
            audioRef.current.src = backupSongSrc;
            audioRef.current.play()
              .then(() => setIsPlaying(true))
              .catch((e) => console.error('Backup audio also failed: ', e));
          }
        });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (v > 0) setIsMuted(false);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const progress = parseFloat(e.target.value);
    audioRef.current.currentTime = progress;
    setCurrentTime(progress);
  };

  const formatTime = (timeInSecs: number) => {
    if (isNaN(timeInSecs)) return '00:00';
    const mins = Math.floor(timeInSecs / 60);
    const secs = Math.floor(timeInSecs % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full">
      {/* Custom Romantic Glass Player Box */}
      <div className="glassmorphism rounded-3xl p-6 shadow-lg border border-white/60 relative overflow-hidden">
        {/* Equalizer animation behind elements when playing */}
        {isPlaying && (
          <div className="absolute inset-x-0 bottom-0 top-1/2 flex items-end justify-center gap-1 opacity-10 pointer-events-none px-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [`${Math.random() * 20 + 5}%`, `${Math.random() * 80 + 20}%`, `${Math.random() * 20 + 5}%`] }}
                transition={{ duration: Math.random() * 1.5 + 0.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 bg-[#B76E79] rounded-t-full"
              />
            ))}
          </div>
        )}

        {/* Player Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`p-3 bg-[#FFDCE8] rounded-full text-[#B76E79] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }}>
                <Music className="w-5 h-5" />
              </div>
              {isPlaying && (
                <div className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500" />
                </div>
              )}
            </div>
            <div>
              <p className="font-serif text-sm font-bold text-[#5C3A44] leading-none mb-1">
                {isPlaying ? 'Now Playing ✨' : 'Our Romantic Song'}
              </p>
              <p className="font-sans text-[11px] text-[#A2888F] font-medium tracking-wide uppercase">
                love-song.mp3
              </p>
            </div>
          </div>

          {/* Info Button for Tutorial */}
          <button
            onClick={() => setShowTutorial(true)}
            className="p-2 text-[#A2888F] hover:text-[#B76E79] rounded-full hover:bg-pink-50/50 transition-colors cursor-pointer"
            title="Cara Mengganti Musik"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Main Control Line */}
        <div className="flex flex-col gap-2">
          {/* Seek Bar */}
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-1.5 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-[#B76E79] outline-none"
          />

          {/* Timer indicators */}
          <div className="flex justify-between text-[11px] font-mono text-[#A2888F]">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Bottom play-pause & volume layout */}
          <div className="flex items-center justify-between mt-2">
            {/* Play/Pause Circle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="px-5 py-2.5 bg-gradient-to-r from-[#B76E79] to-[#E89EAF] text-white rounded-full font-sans text-xs font-semibold tracking-wider uppercase shadow-md flex items-center gap-2 cursor-pointer transition-all duration-300"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Play Song'}</span>
            </motion.button>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-[#A2888F] hover:text-[#B76E79] p-1.5 transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-[#B76E79] outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Music Changing Tutorial Popup Modal */}
      <AnimatePresence>
        {showTutorial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glassmorphism max-w-sm w-full p-6 rounded-3xl shadow-2xl border border-white/60 relative text-[#5C3A44]"
            >
              <h3 className="font-serif text-lg font-bold text-[#4A2D34] mb-3 flex items-center gap-2 border-b border-[#FFDCE8] pb-2">
                <Music className="w-5 h-5 text-[#B76E79]" />
                Tutorial Mengganti Musik
              </h3>

              <ol className="list-decimal list-inside font-sans text-xs text-[#8A6F75] space-y-3 mb-5 leading-relaxed">
                <li>Buka folder <code className="bg-[#FFDCE8]/50 px-1.5 py-0.5 rounded font-mono text-[10px]">assets/music/</code> di workspace.</li>
                <li>Hapus file musik lama yang ada di dalamnya.</li>
                <li>Masukkan file lagu baru kesukaanmu.</li>
                <li>Beri nama file baru: <strong className="font-mono text-[#B76E79]">love-song.mp3</strong></li>
                <li>Upload ulang atau deploy ke Netlify.</li>
              </ol>

              <div className="bg-pink-50/50 p-2.5 rounded-xl border border-pink-100 text-[10px] text-[#A2888F] italic leading-normal mb-5">
                Catatan: Silakan gunakan file MP3 pilihanmu sendiri agar bernilai personal untuk Wid!
              </div>

              <button
                onClick={() => setShowTutorial(false)}
                className="w-full py-2.5 bg-[#B76E79] hover:bg-[#A15D67] text-white rounded-full font-sans text-xs font-semibold tracking-wider uppercase shadow-md cursor-pointer transition-colors"
              >
                Mengerti 🤍
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
