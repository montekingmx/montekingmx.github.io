import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { BEATS_DATA } from '@/data/beatsData';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState(BEATS_DATA);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: repeat all, 2: repeat one
  const [isPlayerMinimized, setIsPlayerMinimized] = useState(false);
  const [audioSource, setAudioSource] = useState(null); // Web Audio context if initialized

  const audioRef = useRef(null);
  const webAudioCtxRef = useRef(null);
  const analyserRef = useRef(null);

  const currentTrack = playlist[currentTrackIndex] || BEATS_DATA[0];

  // Initialize Web Audio API Analyser on first user gesture
  const initWebAudio = () => {
    if (webAudioCtxRef.current || !audioRef.current) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.68;
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);

      webAudioCtxRef.current = ctx;
      analyserRef.current = analyser;
      setAudioSource({ ctx, analyser });
    } catch (e) {
      console.warn("Web Audio Analyser init error:", e);
    }
  };

  // Synchronize volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0] / 100;
    }
  }, [volume, isMuted]);

  // Load new track when index or playlist changes
  useEffect(() => {
    if (!audioRef.current) return;
    const track = playlist[currentTrackIndex];
    if (track && track.url) {
      audioRef.current.src = track.url;
      audioRef.current.load();
      setCurrentTime(0);
      setDuration(0);
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrackIndex, playlist]);

  // Play / Pause toggle
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      initWebAudio();
      if (webAudioCtxRef.current && webAudioCtxRef.current.state === 'suspended') {
        webAudioCtxRef.current.resume();
      }
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const nextTrack = useCallback(() => {
    if (repeatMode === 2) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
      return;
    }
    if (shuffle) {
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * playlist.length);
      } while (nextIdx === currentTrackIndex && playlist.length > 1);
      setCurrentTrackIndex(nextIdx);
    } else {
      setCurrentTrackIndex(i => (i + 1) % playlist.length);
    }
    setIsPlaying(true);
  }, [repeatMode, shuffle, playlist.length, currentTrackIndex]);

  const prevTrack = useCallback(() => {
    if (currentTime > 3) {
      if (audioRef.current) audioRef.current.currentTime = 0;
      return;
    }
    setCurrentTrackIndex(i => (i === 0 ? playlist.length - 1 : i - 1));
    setIsPlaying(true);
  }, [currentTime, playlist.length]);

  const handleEnded = () => {
    nextTrack();
  };

  const playTrack = (trackOrIndex, customPlaylist = null) => {
    initWebAudio();
    if (customPlaylist) {
      setPlaylist(customPlaylist);
    }
    
    let targetIdx = 0;
    if (typeof trackOrIndex === 'number') {
      targetIdx = trackOrIndex;
    } else if (trackOrIndex && trackOrIndex.url) {
      const activeList = customPlaylist || playlist;
      const found = activeList.findIndex(t => t.url === trackOrIndex.url);
      if (found !== -1) {
        targetIdx = found;
      } else {
        // Append track
        setPlaylist(prev => [...prev, trackOrIndex]);
        targetIdx = activeList.length;
      }
    }

    if (currentTrackIndex === targetIdx && isPlaying) {
      // Toggle pause if clicking current track
      setIsPlaying(false);
    } else {
      setCurrentTrackIndex(targetIdx);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    initWebAudio();
    setIsPlaying(prev => !prev);
  };

  const seek = (targetTimeOrPercentage) => {
    if (audioRef.current && duration) {
      // If called with a direct timestamp (seconds)
      let time = Number(targetTimeOrPercentage);
      if (time > duration) {
        time = duration;
      } else if (time < 0) {
        time = 0;
      }
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <AudioContext.Provider value={{
      playlist,
      currentTrackIndex,
      currentTrack,
      isPlaying,
      volume,
      isMuted,
      currentTime,
      duration,
      shuffle,
      repeatMode,
      isPlayerMinimized,
      analyser: analyserRef.current,
      setVolume,
      setIsMuted,
      setShuffle,
      setRepeatMode,
      setIsPlayerMinimized,
      playTrack,
      togglePlayPause,
      nextTrack,
      prevTrack,
      seek,
    }}>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
        crossOrigin="anonymous"
      />
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
