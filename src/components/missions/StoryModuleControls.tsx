// src/components/missions/StoryModuleControls.tsx
import React from 'react';
import { useSensorySettings } from '../../context/SensorySettingsContext';

interface StoryModuleControlsProps {
  currentModuleIndex: number;
  totalModules: number;
  onNext: () => void;
  onPrevious: () => void;
  onSkip?: () => void;
  isAudioPlaying?: boolean;
  toggleAudio?: () => void;
}

const StoryModuleControls: React.FC<StoryModuleControlsProps> = ({
  currentModuleIndex,
  totalModules,
  onNext,
  onPrevious,
  onSkip,
  isAudioPlaying,
  toggleAudio
}) => {
  const { settings } = useSensorySettings();
  
  return (
    <div className={`p-4 bg-white rounded-lg shadow-md flex items-center justify-between ${settings.highContrast ? 'border-2 border-black' : ''}`}>
      {/* Progress Indicator */}
      <div className="flex items-center">
        <div className={`${settings.fontSize === 'large' ? 'text-lg' : settings.fontSize === 'small' ? 'text-xs' : 'text-sm'} text-gray-600`}>
          Story {currentModuleIndex + 1} of {totalModules}
        </div>
        
        <div className="ml-3 h-2 w-24 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-600 rounded-full" 
            style={{ width: `${((currentModuleIndex) / (totalModules - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Audio Controls */}
      {toggleAudio && settings.audioEnabled && (
        <button
          onClick={toggleAudio}
          className={`mx-2 p-2 rounded-full ${
            isAudioPlaying ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
          }`}
          aria-label={isAudioPlaying ? 'Pause narration' : 'Play narration'}
        >
          {isAudioPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      )}
      
      {/* Navigation Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={onPrevious}
          disabled={currentModuleIndex === 0}
          className={`px-4 py-2 rounded-md ${
            currentModuleIndex === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Previous
        </button>
        
        {onSkip && (
          <button
            onClick={onSkip}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Skip
          </button>
        )}
        
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {currentModuleIndex === totalModules - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default StoryModuleControls;