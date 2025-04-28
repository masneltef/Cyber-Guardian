// src/components/missions/MissionCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useSensorySettings } from '../../context/SensorySettingsContext';
import { getMissionImage } from '../../utils/imageUtils';

interface MissionCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  ageGroup: '6-10' | '11-15';
  thumbnailUrl: string;
  isCompleted: boolean;
  isLocked: boolean;
  completionPercentage?: number;
  onClick?: () => void;
}

const MissionCard: React.FC<MissionCardProps> = ({
  id,
  title,
  description,
  difficulty,
  ageGroup,
  thumbnailUrl,
  isCompleted,
  isLocked,
  completionPercentage = 0,
  onClick
}) => {
  const { settings } = useSensorySettings();

  // Animations
  const cardAnimations = settings.reducedAnimations
    ? {}
    : {
        whileHover: { scale: 1.03, y: -5 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.2 }
      };

  // Difficulty color mapping
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800 border-green-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    hard: 'bg-red-100 text-red-800 border-red-300'
  };

  // Age group styling
  const ageGroupStyles = {
    '6-10': 'bg-blue-100 text-blue-800 border-blue-300',
    '11-15': 'bg-purple-100 text-purple-800 border-purple-300'
  };

  const handleClick = () => {
    if (!isLocked && onClick) {
      onClick();
    }
  };

  // Fallback image handler
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/300x200/4299e1/ffffff?text=Mission';
  };

  return (
    <motion.div
      className={`rounded-lg overflow-hidden shadow-lg ${
        isLocked ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
      } ${settings.highContrast ? 'border-2 border-black' : 'border border-gray-200'}`}
      {...cardAnimations}
      onClick={handleClick}
    >
      <div className="relative group">
        {/* Mission Image - Using the utility function */}
        <img
          src={getMissionImage(id)}
          alt={title}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
        />

        {/* Status Indicators */}
        {isCompleted && (
          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {isLocked && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        )}

        {/* Progress Bar */}
        {!isCompleted && !isLocked && completionPercentage > 0 && (
          <div className="absolute bottom-0 left-0 right-0">
            <div className="bg-gray-300 h-2">
              <div
                className="bg-blue-600 h-2"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className={`font-bold ${settings.fontSize === 'large' ? 'text-xl' : settings.fontSize === 'small' ? 'text-base' : 'text-lg'} text-gray-900`}>
          {title}
        </h3>

        <p className={`mt-2 ${settings.fontSize === 'large' ? 'text-base' : settings.fontSize === 'small' ? 'text-xs' : 'text-sm'} text-gray-700`}>
          {description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className={`px-2 py-1 rounded-full text-xs ${difficultyColors[difficulty]} ${settings.highContrast ? 'border border-current' : ''}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>

          <span className={`px-2 py-1 rounded-full text-xs ${ageGroupStyles[ageGroup]} ${settings.highContrast ? 'border border-current' : ''}`}>
            {ageGroup === '6-10' ? 'Ages 6-10' : 'Ages 11-15'}
          </span>

          {isCompleted && (
            <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
              Completed
            </span>
          )}
          
          {!isCompleted && !isLocked && completionPercentage > 0 && (
            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs">
              In Progress
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MissionCard;