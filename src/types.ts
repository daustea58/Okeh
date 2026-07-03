export type AppState = 'loading' | 'landing' | 'letter' | 'celebration';

export interface PolaroidPhoto {
  id: number;
  src: string;
  caption: string;
  rotation: string; // Tailwind rotate class like 'rotate-3', '-rotate-2', etc.
}

export interface PlaybackState {
  isPlaying: boolean;
  progress: number;
  currentTime: string;
  duration: string;
  volume: number;
}
