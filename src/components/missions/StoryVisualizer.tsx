// src/components/missions/StoryVisualizer.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useSensorySettings } from '../../context/SensorySettingsContext';

// Define visual themes that can be used
export type VisualTheme = 
  | 'village'
  | 'marketplace'
  | 'savanna'
  | 'school'
  | 'urban'
  | 'forest';

interface StoryVisualizerProps {
  theme: VisualTheme;
  characters: string[];
  animated?: boolean;
}

const StoryVisualizer: React.FC<StoryVisualizerProps> = ({
  theme,
  characters,
  animated = true
}) => {
  const { settings } = useSensorySettings();
  
  // Disable animations if user has reduced animations setting
  const isAnimated = animated && !settings.reducedAnimations;
  
  // Map themes to background images and colors
  const themeStyles: Record<VisualTheme, { bg: string, color: string, icon: string }> = {
    village: { 
      bg: 'bg-amber-100', 
      color: 'text-amber-800',
      icon: '🏠'
    },
    marketplace: { 
      bg: 'bg-yellow-100', 
      color: 'text-yellow-800',
      icon: '🛒'
    },
    savanna: { 
      bg: 'bg-green-100', 
      color: 'text-green-800',
      icon: '🦁'
    },
    school: { 
      bg: 'bg-blue-100', 
      color: 'text-blue-800',
      icon: '🏫'
    },
    urban: { 
      bg: 'bg-gray-100', 
      color: 'text-gray-800',
      icon: '🏙️'
    },
    forest: { 
      bg: 'bg-emerald-100', 
      color: 'text-emerald-800',
      icon: '🌳'
    }
  };
  
  const { bg, color, icon } = themeStyles[theme];
  
  return (
    <div className={`relative rounded-lg overflow-hidden ${bg} ${color} p-4 h-64 ${settings.highContrast ? 'border-2 border-black' : ''}`}>
      <div className="absolute top-2 right-2 text-2xl">{icon}</div>
      
      {/* Scene Background */}
      <div className="absolute inset-0">
        {/* This would be a culturally relevant scene based on the theme */}
        {/* For now we'll use a placeholder representation */}
        <div className={`h-full w-full flex items-end justify-center ${bg}`}>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-800 to-transparent opacity-20"></div>
          
          {/* Different scene elements for each theme */}
          {theme === 'village' && (
            <div className="absolute bottom-0 w-full h-16">
              <div className="absolute bottom-0 left-1/4 w-16 h-12 rounded-t-full bg-amber-700"></div>
              <div className="absolute bottom-0 left-1/2 w-20 h-16 rounded-t-full bg-amber-800"></div>
              <div className="absolute bottom-0 right-1/4 w-16 h-12 rounded-t-full bg-amber-700"></div>
            </div>
          )}
          
          {theme === 'marketplace' && (
            <div className="absolute bottom-0 w-full h-16">
              <div className="absolute bottom-0 left-10 w-12 h-8 bg-yellow-700"></div>
              <div className="absolute bottom-0 left-24 w-14 h-10 bg-yellow-800"></div>
              <div className="absolute bottom-0 right-16 w-16 h-8 bg-yellow-700"></div>
            </div>
          )}
          
          {theme === 'savanna' && (
            <div className="absolute bottom-0 w-full h-16">
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-green-700"></div>
              <div className="absolute bottom-8 left-10 w-8 h-20 bg-green-900 rounded-t-full"></div>
              <div className="absolute bottom-8 right-20 w-10 h-24 bg-green-900 rounded-t-full"></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Characters */}
      <div className="relative h-full flex items-end justify-around pb-4">
        {characters.map((character, index) => (
          <motion.div
            key={index}
            initial={isAnimated ? { y: 20, opacity: 0 } : {}}
            animate={isAnimated ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="text-4xl"
          >
            {/* Using emoji as placeholder, in a real app these would be actual character illustrations */}
            <div>{character}</div>
            
            {/* Name Tag */}
            <div className="text-xs text-center mt-1 px-2 py-1 bg-white bg-opacity-80 rounded">
              Character {index + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoryVisualizer;