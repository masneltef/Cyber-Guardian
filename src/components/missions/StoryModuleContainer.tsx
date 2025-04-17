// src/components/missions/StoryModuleContainer.tsx
import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSensorySettings } from '../../context/SensorySettingsContext';
import StoryModule from './StoryModule';
import StoryVisualizer from './StoryVisualizer';
import StoryModuleControls from './StoryModuleControls';
import { VisualTheme } from './StoryVisualizer';

export interface StoryModuleData {
  id: string;
  title: string;
  content: string;
  audioUrl?: string;
  imageUrl?: string;
  culturalContext?: string;
  visualTheme?: VisualTheme;
  characters?: string[];
}

interface StoryModuleContainerProps {
  modules: StoryModuleData[];
  onComplete: () => void;
}

const StoryModuleContainer: React.FC<StoryModuleContainerProps> = ({
  modules,
  onComplete
}) => {
  const { settings } = useSensorySettings();
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const currentModule = modules[currentModuleIndex];
  
  const handleNext = () => {
    if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setIsAudioPlaying(false);
    } else {
      onComplete();
    }
  };
  
  const handlePrevious = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
      setIsAudioPlaying(false);
    }
  };
  
  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };
  
  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentModule.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: settings.reducedAnimations ? 0.1 : 0.5 }}
        >
          {/* Visualization Area */}
          {currentModule.visualTheme && (
            <StoryVisualizer
              theme={currentModule.visualTheme}
              characters={currentModule.characters || []}
              animated={!settings.reducedAnimations}
            />
          )}
          
          {/* Story Content */}
          <StoryModule
            id={currentModule.id}
            title={currentModule.title}
            content={currentModule.content}
            audioUrl={currentModule.audioUrl}
            imageUrl={currentModule.imageUrl}
            culturalContext={currentModule.culturalContext}
            onComplete={handleNext}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Controls */}
      <StoryModuleControls
        currentModuleIndex={currentModuleIndex}
        totalModules={modules.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isAudioPlaying={isAudioPlaying}
        toggleAudio={currentModule.audioUrl ? toggleAudio : undefined}
      />
    </div>
  );
};

export default StoryModuleContainer;