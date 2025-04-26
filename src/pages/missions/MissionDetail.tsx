// src/pages/missions/MissionDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../features/store';
import { motion } from 'framer-motion';
import { useSensorySettings } from '../../context/SensorySettingsContext';
import { fetchMissionById } from '../../features/missions/missionsSlice';
import { startMission } from '../../features/progress/progressSlice';

const MissionDetail: React.FC = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { settings } = useSensorySettings();
  const missionsState = useSelector((state: RootState) => state.missions);
  const progressState = useSelector((state: RootState) => state.progress);
  
  // Local state to track if we're loading mission data
  const [loading, setLoading] = useState(true);

  // Fetch mission details when component mounts
  useEffect(() => {
    if (missionId) {
      setLoading(true);
      dispatch(fetchMissionById(missionId) as any)
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [dispatch, missionId]);

  // Extract the mission and mission progress
  const mission = missionsState?.currentMission || null;
  const missionProgress = missionId ? progressState?.missions[missionId] || null : null;

  // Handle starting the mission
  const handleStartMission = () => {
    if (missionId) {
      // Record the mission start in progress tracker
      dispatch(startMission(missionId));
      
      // Navigate to story page
      navigate(`/missions/${missionId}/story`);
    }
  };

  // Handle continuing the mission
  const handleContinueMission = () => {
    if (missionId) {
      if (missionProgress && missionProgress.storyProgress >= 100) {
        // If story is complete, go to quiz
        navigate(`/missions/${missionId}/quiz`);
      } else {
        // Otherwise continue with story
        navigate(`/missions/${missionId}/story`);
      }
    }
  };

  const getAnimationProps = () => {
    if (settings.reducedAnimations) {
      return {
        initial: {},
        animate: {},
        transition: { duration: 0.1 }
      };
    }
    
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 }
    };
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading mission details...</p>
        </div>
      </div>
    );
  }

  // Error state - mission not found
  if (!mission && !loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-bold">Error</p>
          <p>Mission not found. The mission you're looking for doesn't exist or has been removed.</p>
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

  // If mission is locked
  if (mission?.isLocked) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
            <h2 className="font-bold text-lg mb-2">Mission Locked</h2>
            <p>This mission is currently locked. Complete previous missions to unlock this one.</p>
            <button
              onClick={() => navigate('/missions')}
              className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Return to Missions
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Determine mission title for display
  const getMissionTitle = () => {
    if (mission?.title) return mission.title;
    
    switch (missionId) {
      case 'password-palace':
      case 'mission-1':
        return "Mika's Password Palace";
      // Add cases for other missions
      default:
        return "Mission";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="max-w-4xl mx-auto"
        {...getAnimationProps()}
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img 
              src={mission?.thumbnailUrl || `/assets/images/missions/${missionId}-banner.png`}
              alt={getMissionTitle()} 
              className="w-full h-48 object-cover"
              onError={(e) => {
                // Fallback image if the mission image fails to load
                e.currentTarget.src = 'https://via.placeholder.com/1200x400/4299e1/ffffff?text=Mission+Banner';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            <h1 className={`absolute bottom-4 left-4 text-white font-bold ${settings.fontSize === 'large' ? 'text-3xl' : settings.fontSize === 'small' ? 'text-xl' : 'text-2xl'}`}>
              {getMissionTitle()}
            </h1>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                {mission?.difficulty && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    mission.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    mission.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {mission.difficulty.charAt(0).toUpperCase() + mission.difficulty.slice(1)}
                  </span>
                )}
                
                {mission?.ageGroup && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Ages {mission.ageGroup}
                  </span>
                )}
                
                {mission?.culturalContext && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    {mission.culturalContext}
                  </span>
                )}
                
                {mission?.isCompleted && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Completed
                  </span>
                )}
              </div>
              
              <p className={`mb-4 ${settings.fontSize === 'large' ? 'text-lg' : settings.fontSize === 'small' ? 'text-sm' : 'text-base'}`}>
                {mission?.description || missionId === 'password-palace' || missionId === 'mission-1' ? 
                  "Join Mika, a clever young girl who helps protect her village's digital marketplace by learning about password security. Follow her adventure and help her create strong passwords to keep the marketplace safe from the Digital Trickster!" 
                  : "Start this cybersecurity mission to learn important digital safety skills."}
              </p>
              
              {(missionId === 'password-palace' || missionId === 'mission-1') && (
                <div className="border-t border-b border-gray-200 py-4 my-4">
                  <h2 className={`font-semibold mb-2 ${settings.fontSize === 'large' ? 'text-xl' : settings.fontSize === 'small' ? 'text-base' : 'text-lg'}`}>
                    What You'll Learn:
                  </h2>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>How to create strong passwords</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Why passwords are important</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Common password mistakes to avoid</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Techniques for remembering strong passwords</span>
                    </li>
                  </ul>
                </div>
              )}
              
              {/* Mission Progress */}
              {missionProgress && (
                <div className="mb-4">
                  <h3 className={`font-semibold mb-2 ${settings.fontSize === 'small' ? 'text-sm' : 'text-base'}`}>
                    Your Progress:
                  </h3>
                  <div className="bg-gray-200 rounded-full h-2 mb-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{width: `${missionProgress.storyProgress || 0}%`}}
                    ></div>
                  </div>
                  <p className={`text-right text-gray-600 ${settings.fontSize === 'small' ? 'text-xs' : 'text-sm'}`}>
                    {missionProgress.storyProgress >= 100 ? 'Story completed' : `${missionProgress.storyProgress || 0}% complete`}
                  </p>
                </div>
              )}
              
              <p className={`italic text-gray-600 ${settings.fontSize === 'small' ? 'text-xs' : 'text-sm'}`}>
                This mission takes approximately 15-20 minutes to complete and includes a story followed by a quiz.
              </p>
            </div>
            
            <div className="flex justify-center">
              {missionProgress ? (
                <button
                  onClick={handleContinueMission}
                  className={`px-6 py-3 bg-blue-600 text-white rounded-lg ${settings.highContrast ? 'border-2 border-black' : ''} hover:bg-blue-700 transition-colors`}
                >
                  {missionProgress.isCompleted ? 'Replay Mission' : 'Continue Mission'}
                </button>
              ) : (
                <button
                  onClick={handleStartMission}
                  className={`px-6 py-3 bg-blue-600 text-white rounded-lg ${settings.highContrast ? 'border-2 border-black' : ''} hover:bg-blue-700 transition-colors`}
                >
                  Start Mission
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MissionDetail;