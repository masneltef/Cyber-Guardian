// src/components/missions/StoryModule.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSensorySettings } from '../../context/SensorySettingsContext';

interface StoryModuleProps {
  id: string;
  title: string;
  content: string;
  audioUrl?: string;
  imageUrl?: string;
  culturalContext?: string;
  onComplete: () => void;
}

const StoryModule: React.FC<StoryModuleProps> = ({
  id,
  title,
  content,
  audioUrl,
  imageUrl,
  culturalContext,
  onComplete,
}) => {
  const { settings } = useSensorySettings();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isContentVisible, setIsContentVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle audio playback
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Audio playback error:', error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Update progress as audio plays
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    // Mark as complete when audio finishes
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    
    // Set volume based on user settings
    audio.volume = settings.audioVolume / 100;

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [settings.audioVolume]);

  const handleContinue = () => {
    onComplete();
  };

  // Define animations based on user settings
  const contentAnimations = settings.reducedAnimations 
    ? { initial: {}, animate: {}, exit: {} } 
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.5 }
      };

  return (
    <motion.div 
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${settings.highContrast ? 'border-2 border-black' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: settings.reducedAnimations ? 0.1 : 0.5 }}
    >
      {/* Audio element (hidden) */}
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        preload="auto"
      />

      {/* Story Header with Cultural Context Indicator */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white">
        <h2 className={`${settings.fontSize === 'large' ? 'text-2xl' : settings.fontSize === 'small' ? 'text-lg' : 'text-xl'} font-bold`}>
          {title}
        </h2>
        
        {culturalContext && (
          <div className="absolute top-2 right-2 bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-medium">
            {culturalContext}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-green-500 transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {isContentVisible && (
            <motion.div 
              key="content"
              {...contentAnimations}
              className="space-y-4"
            >
              {/* Story Image */}
              {imageUrl && (
                <div className="mb-4 flex justify-center">
                  <img 
                    src={imageUrl} 
                    alt={title} 
                    className={`rounded-lg ${settings.highContrast ? 'border-2 border-black' : 'shadow-md'}`}
                    style={{ maxHeight: '200px' }}
                  />
                </div>
              )}

              {/* Story Text */}
              <div className={`prose max-w-none ${settings.fontSize === 'large' ? 'text-lg' : settings.fontSize === 'small' ? 'text-sm' : 'text-base'}`}>
                {content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Audio Controls */}
      {audioUrl && settings.audioEnabled && (
        <div className="px-6 py-3 bg-gray-50 border-t flex items-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`mr-4 p-2 rounded-full ${
              isPlaying ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
            }`}
            aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
          
          <div className="flex-1 ml-2">
            <div className="text-xs text-gray-500 mb-1">
              {isPlaying ? 'Playing narration...' : 'Click to hear narration'}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-6 py-4 bg-gray-100 border-t flex justify-between">
        <button
          onClick={() => setIsContentVisible(!isContentVisible)}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
        >
          {isContentVisible ? 'Hide Content' : 'Show Content'}
        </button>
        
        <button
          onClick={handleContinue}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

export default StoryModule;