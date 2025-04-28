// src/pages/missions/MissionStory.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSensorySettings } from '../../context/SensorySettingsContext';
import StoryModuleContainer from '../../components/missions/StoryModuleContainer';
import { getMissionImage } from '../../utils/imageUtils';

// Import mission story data
import { passwordStoryModules } from '../../data/missions/passwordMission';
// You'll add more mission imports as you develop them
// import { phishingStoryModules } from '../../data/missions/phishingMission';
// import { privacyStoryModules } from '../../data/missions/privacyMission';

const MissionStory: React.FC = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { settings } = useSensorySettings();
  const [storyModules, setStoryModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);

  // Load the appropriate story modules based on mission ID
  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      let modules;
      
      // Map mission IDs to their corresponding story modules
      switch (missionId) {
        case 'password-palace':
        case 'mission-1':
          // Enhance story modules with correct image paths
          modules = passwordStoryModules.map(module => ({
            ...module,
            imageUrl: module.imageUrl || getMissionImage('password-palace')
          }));
          break;
        case 'phishing-forest':
          // Sample placeholder for future development
          modules = [
            {
              id: 'phishing-1',
              title: 'Welcome to the Digital Forest',
              content: 'Kofi is exploring the digital forest that connects communities across Africa. But there are traps set by phishers!',
              imageUrl: getMissionImage('phishing-forest'),
              visualTheme: 'forest',
              characters: ['🧒🏾', '🦊'],
              culturalContext: 'West African Forest'
            },
            // More modules would go here
          ];
          break;
        case 'trickster-message':
          // Sample placeholder for future development
          modules = [
            {
              id: 'trickster-1',
              title: 'The Village Messaging Center',
              content: 'The village messaging center has been receiving strange messages. Can you help identify which ones are from the trickster?',
              imageUrl: getMissionImage('trickster-message'),
              visualTheme: 'village',
              characters: ['👧🏾', '🧙‍♂️'],
              culturalContext: 'African Village'
            },
            // More modules would go here
          ];
          break;
        // Add cases for other missions as they are developed
        default:
          throw new Error(`Unknown mission ID: ${missionId}`);
      }
      
      if (modules && modules.length > 0) {
        setStoryModules(modules);
      } else {
        throw new Error('No story modules found for this mission');
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error loading story modules:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
    }
  }, [missionId]);

  // Handle story module progression
  const handleModuleChange = (index: number) => {
    setCurrentModuleIndex(index);
    
    // Update progress in Redux store
    if (missionId) {
      const progress = Math.floor((index / storyModules.length) * 100);
      // Removed the updateStoryProgress dispatch to fix the missing export error
      // We'll implement this later when the Redux parts are properly set up
    }
  };

  // Handle story completion
  const handleStoryComplete = () => {
    // Navigate to the quiz
    if (missionId) {
      navigate(`/missions/${missionId}/quiz`);
    }
  };

  // Get mission title for display
  const getMissionTitle = () => {
    switch (missionId) {
      case 'password-palace':
      case 'mission-1':
        return "Mika's Password Palace";
      case 'phishing-forest':
        return "The Phisher in the Forest";
      case 'trickster-message':
        return "The Trickster's Messages";
      case 'social-village':
        return "The Social Village";
      case 'digital-defenders':
        return "Digital Defenders";
      case 'safari-secrets':
        return "Safari Secrets";
      default:
        return "Mission Story";
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading mission story...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button
            onClick={() => navigate('/missions')}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Return to Missions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className={`${settings.fontSize === 'large' ? 'text-3xl' : settings.fontSize === 'small' ? 'text-xl' : 'text-2xl'} font-bold text-center mb-6`}>
          {getMissionTitle()}
        </h1>
        
        <div className={`mb-6 p-4 rounded-lg ${settings.highContrast ? 'bg-white border-2 border-black' : 'bg-blue-50 border border-blue-200'}`}>
          <p className={`${settings.fontSize === 'large' ? 'text-lg' : settings.fontSize === 'small' ? 'text-sm' : 'text-base'}`}>
            Follow the story to learn important cybersecurity concepts. You can use the controls below to navigate through the story.
          </p>
        </div>
        
        {storyModules.length > 0 && (
          <StoryModuleContainer 
            modules={storyModules} 
            onComplete={handleStoryComplete}
            onModuleChange={handleModuleChange}
          />
        )}
      </div>
    </div>
  );
};

export default MissionStory;