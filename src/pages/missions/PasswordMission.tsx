// src/pages/missions/PasswordMission.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useSensorySettings } from '../../context/SensorySettingsContext';
import StoryModuleContainer from '../../components/missions/StoryModuleContainer';
import QuizComponent from '../../components/quiz/QuizComponent';
import { passwordStoryModules, passwordQuizQuestions } from '../../data/missions/passwordMission';
import { markMissionCompleted } from '../../features/missions/missionsSlice';

const PasswordMission: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { settings } = useSensorySettings();
  const [missionStage, setMissionStage] = useState<'intro' | 'story' | 'quiz' | 'completed'>('intro');
  const [storyIndex, setStoryIndex] = useState(0);
  
  // Start or resume mission tracking when component mounts
  useEffect(() => {
    // Initialize any local state needed
    // We'll implement the Redux portion later
  }, [dispatch]);
  
  // Update progress as user moves through the story
  useEffect(() => {
    if (missionStage === 'story') {
      const progress = Math.floor((storyIndex / passwordStoryModules.length) * 100);
      // Track progress locally
      // We'll implement the Redux portion later
    }
  }, [dispatch, missionStage, storyIndex]);
  
  const handleStartMission = () => {
    setMissionStage('story');
  };
  
  const handleStoryProgress = (index: number) => {
    setStoryIndex(index);
  };
  
  const handleStoryComplete = () => {
    setMissionStage('quiz');
  };
  
  const handleQuizComplete = (score: number, totalQuestions: number) => {
    // Mark the mission as completed in the Redux store
    dispatch(markMissionCompleted('mission-1'));
    setMissionStage('completed');
  };
  
  const handleReturnToMissions = () => {
    navigate('/missions');
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
  
  // Render the mission introduction
  if (missionStage === 'intro') {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="max-w-4xl mx-auto"
          {...getAnimationProps()}
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <img 
                src="/assets/images/missions/password-palace-banner.png" 
                alt="Mika's Password Palace" 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/1200x400/4299e1/ffffff?text=Password+Palace';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <h1 className={`absolute bottom-4 left-4 text-white font-bold ${settings.fontSize === 'large' ? 'text-3xl' : settings.fontSize === 'small' ? 'text-xl' : 'text-2xl'}`}>
                Mika's Password Palace
              </h1>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Easy</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Ages 6-10</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">African Marketplace</span>
                </div>
                
                <p className={`mb-4 ${settings.fontSize === 'large' ? 'text-lg' : settings.fontSize === 'small' ? 'text-sm' : 'text-base'}`}>
                  Join Mika, a clever young girl who helps protect her village's digital marketplace by learning about password security. Follow her adventure and help her create strong passwords to keep the marketplace safe from the Digital Trickster!
                </p>
                
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
                
                <p className={`italic text-gray-600 ${settings.fontSize === 'small' ? 'text-xs' : 'text-sm'}`}>
                  This mission takes approximately 15-20 minutes to complete and includes a story followed by a quiz.
                </p>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={handleStartMission}
                  className={`px-6 py-3 bg-blue-600 text-white rounded-lg ${settings.highContrast ? 'border-2 border-black' : ''} hover:bg-blue-700 transition-colors`}
                >
                  Start Mission
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        className="max-w-4xl mx-auto"
        {...getAnimationProps()}
      >
        {missionStage === 'story' && (
          <>
            <h1 className={`${settings.fontSize === 'large' ? 'text-3xl' : settings.fontSize === 'small' ? 'text-xl' : 'text-2xl'} font-bold text-center mb-6`}>
              Mika's Password Palace
            </h1>
            <div className={`mb-6 p-4 rounded-lg ${settings.highContrast ? 'bg-white border-2 border-black' : 'bg-blue-50 border border-blue-200'}`}>
              <p className={`${settings.fontSize === 'large' ? 'text-lg' : settings.fontSize === 'small' ? 'text-sm' : 'text-base'}`}>
                Follow Mika's story to learn about password security and how to protect digital information.
              </p>
            </div>
            
            <StoryModuleContainer 
              modules={passwordStoryModules} 
              onComplete={handleStoryComplete}
              onModuleChange={handleStoryProgress}
            />
          </>
        )}
        
        {missionStage === 'quiz' && (
          <>
            <h1 className={`${settings.fontSize === 'large' ? 'text-3xl' : settings.fontSize === 'small' ? 'text-xl' : 'text-2xl'} font-bold text-center mb-6`}>
              Password Security Quiz
            </h1>
            <div className={`mb-6 p-4 rounded-lg ${settings.highContrast ? 'bg-white border-2 border-black' : 'bg-blue-50 border border-blue-200'}`}>
              <p className={`${settings.fontSize === 'large' ? 'text-lg' : settings.fontSize === 'small' ? 'text-sm' : 'text-base'}`}>
                Now that you've learned about password security with Mika, test your knowledge with this quiz!
              </p>
            </div>
            
            <QuizComponent 
              questions={passwordQuizQuestions}
              onComplete={handleQuizComplete}
              allowRetry={true}
              showFeedback={true}
              showProgress={true}
            />
          </>
        )}
        
        {missionStage === 'completed' && (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`p-8 rounded-lg ${settings.highContrast ? 'bg-white border-2 border-black' : 'bg-green-50 border border-green-200'}`}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className={`${settings.fontSize === 'large' ? 'text-2xl' : settings.fontSize === 'small' ? 'text-lg' : 'text-xl'} font-bold text-green-800 mb-4`}>
                Mission Complete!
              </h2>
              <p className={`${settings.fontSize === 'large' ? 'text-lg' : settings.fontSize === 'small' ? 'text-sm' : 'text-base'} mb-6`}>
                Congratulations! You've helped Mika protect the Digital Marketplace by learning about password security. 
                You are now a Password Guardian!
              </p>
              
              <div className="mb-8">
                <h3 className={`${settings.fontSize === 'large' ? 'text-xl' : settings.fontSize === 'small' ? 'text-base' : 'text-lg'} font-semibold mb-2`}>
                  Key Password Skills:
                </h3>
                <ul className="text-left inline-block">
                  <li className="flex items-start mb-2">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Creating strong, complex passwords</span>
                  </li>
                  <li className="flex items-start mb-2">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Using a mix of characters (uppercase, lowercase, numbers, symbols)</span>
                  </li>
                  <li className="flex items-start mb-2">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Avoiding personal information in passwords</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Creating unique passwords for different accounts</span>
                  </li>
                </ul>
              </div>
              
              <button
                onClick={handleReturnToMissions}
                className={`px-6 py-3 bg-blue-600 text-white rounded-lg ${settings.highContrast ? 'border-2 border-black' : ''} hover:bg-blue-700 transition-colors`}
              >
                Return to Missions
              </button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PasswordMission;