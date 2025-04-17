// src/pages/missions/MissionDetail.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import { fetchMissionById, markMissionCompleted } from '../../features/missions/missionsSlice';
import { useSensorySettings } from '../../context/SensorySettingsContext';
import { motion, AnimatePresence } from 'framer-motion';

enum MissionStage {
  LOADING,
  STORY,
  QUIZ,
  COMPLETE
}

const MissionDetail: React.FC = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { settings } = useSensorySettings();
  const { currentMission, status, error } = useSelector((state: RootState) => state.missions);
  
  const [stage, setStage] = useState<MissionStage>(MissionStage.LOADING);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch mission data when component mounts
  useEffect(() => {
    if (missionId) {
      dispatch(fetchMissionById(missionId) as any);
    }
  }, [dispatch, missionId]);

  // Set stage when mission data is loaded
  useEffect(() => {
    if (status === 'succeeded' && currentMission) {
      setStage(MissionStage.STORY);
    }
  }, [status, currentMission]);

  // Play audio narration if available
  useEffect(() => {
    if (
      stage === MissionStage.STORY && 
      currentMission?.storyModules[currentStoryIndex]?.audioUrl && 
      settings.audioEnabled && 
      settings.voiceNarrationEnabled
    ) {
      if (audioRef.current) {
        audioRef.current.src = currentMission.storyModules[currentStoryIndex].audioUrl || '';
        audioRef.current.volume = settings.audioVolume / 100;
        audioRef.current.play().catch(e => console.error('Error playing audio:', e));
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentStoryIndex, stage, currentMission, settings]);

  const handleNextStory = () => {
    if (currentMission && currentStoryIndex < currentMission.storyModules.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      // Move to quiz section after completing all story modules
      setStage(MissionStage.QUIZ);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    
    if (currentMission && currentMission.quizzes[currentQuizIndex]) {
      const isCorrect = answer === currentMission.quizzes[currentQuizIndex].correctAnswer;
      setIsAnswerCorrect(isCorrect);
      
      if (isCorrect) {
        setQuizScore(quizScore + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    
    if (currentMission && currentQuizIndex < currentMission.quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      // Complete the mission
      setStage(MissionStage.COMPLETE);
      if (missionId) {
        dispatch(markMissionCompleted(missionId));
      }
    }
  };

  if (status === 'loading' || stage === MissionStage.LOADING) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading mission...</p>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Failed to load mission: {error}</p>
          <button 
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate('/missions')}
          >
            Back to Missions
          </button>
        </div>
      </div>
    );
  }

  if (!currentMission) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Mission not found.</p>
          <button 
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate('/missions')}
          >
            Back to Missions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${settings.highContrast ? 'bg-white text-black' : ''}`}>
      {/* Hidden audio element for narration */}
      <audio ref={audioRef} />
      
      {/* Mission Header */}
      <div className="mb-6">
        <h1 className={`${settings.fontSize === 'large' ? 'text-3xl' : settings.fontSize === 'small' ? 'text-xl' : 'text-2xl'} font-bold`}>
          {currentMission.title}
        </h1>
        <p className="text-gray-600 mt-2">{currentMission.description}</p>
        
        {/* Progress Indicator */}
        <div className="mt-4 bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ 
              width: `${stage === MissionStage.STORY 
                ? (currentStoryIndex / Math.max(currentMission.storyModules.length, 1)) * 50 
                : stage === MissionStage.QUIZ 
                  ? 50 + (currentQuizIndex / Math.max(currentMission.quizzes.length, 1)) * 50
                  : stage === MissionStage.COMPLETE ? '100%' : '0%'
              }%` 
            }}
          ></div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <AnimatePresence mode="wait">
          {/* Story Stage */}
          {stage === MissionStage.STORY && currentMission.storyModules.length > 0 && (
            <motion.div
              key="story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: settings.reducedAnimations ? 0.1 : 0.5 }}
            >
              <div className="mb-6">
                <h2 className={`${settings.fontSize === 'large' ? 'text-2xl' : settings.fontSize === 'small' ? 'text-lg' : 'text-xl'} font-semibold mb-4`}>
                  {currentMission.storyModules[currentStoryIndex].title}
                </h2>
                
                <p className={`${settings.fontSize === 'large' ? 'text-lg' : settings.fontSize === 'small' ? 'text-sm' : 'text-base'}`}>
                  {currentMission.storyModules[currentStoryIndex].content}
                </p>
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  className={`px-4 py-2 rounded ${
                    currentStoryIndex > 0 
                      ? 'bg-gray-500 hover:bg-gray-600 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={() => currentStoryIndex > 0 && setCurrentStoryIndex(currentStoryIndex - 1)}
                  disabled={currentStoryIndex === 0}
                >
                  Previous
                </button>
                
                <button
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  onClick={handleNextStory}
                >
                  {currentStoryIndex < currentMission.storyModules.length - 1 ? 'Next' : 'Start Quiz'}
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Quiz Stage */}
          {stage === MissionStage.QUIZ && currentMission.quizzes.length > 0 && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: settings.reducedAnimations ? 0.1 : 0.5 }}
            >
              <div className="mb-6">
                <h2 className={`${settings.fontSize === 'large' ? 'text-2xl' : settings.fontSize === 'small' ? 'text-lg' : 'text-xl'} font-semibold mb-4`}>
                  Question {currentQuizIndex + 1} of {currentMission.quizzes.length}
                </h2>
                
                <p className={`${settings.fontSize === 'large' ? 'text-lg' : settings.fontSize === 'small' ? 'text-sm' : 'text-base'} mb-6`}>
                  {currentMission.quizzes[currentQuizIndex].question}
                </p>
                
                {/* Visual cue/hint if available */}
                {currentMission.quizzes[currentQuizIndex].visualCueUrl && (
                  <div className="mb-4">
                    <img 
                      src={currentMission.quizzes[currentQuizIndex].visualCueUrl} 
                      alt="Visual hint" 
                      className="max-w-full h-auto rounded-lg mx-auto"
                      style={{ maxHeight: '200px' }}
                    />
                  </div>
                )}
                
                {/* Answer Options */}
                <div className="space-y-3">
                  {currentMission.quizzes[currentQuizIndex].options.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full text-left p-4 rounded-lg border-2 ${
                        selectedAnswer === option
                          ? isAnswerCorrect 
                            ? 'bg-green-100 border-green-500'
                            : 'bg-red-100 border-red-500'
                          : 'border-gray-300 hover:border-blue-500'
                      } ${settings.highContrast ? 'border-black' : ''}`}
                      onClick={() => !selectedAnswer && handleAnswerSelect(option)}
                      disabled={selectedAnswer !== null}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                {/* Feedback on answer */}
                {selectedAnswer && (
                  <div className={`mt-4 p-4 rounded-lg ${isAnswerCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                    <p className={`font-semibold ${isAnswerCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isAnswerCorrect 
                        ? 'Correct! Well done!' 
                        : `Incorrect. The correct answer is: ${currentMission.quizzes[currentQuizIndex].correctAnswer}`
                      }
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between mt-8">
                {selectedAnswer ? (
                  <button
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    onClick={handleNextQuestion}
                  >
                    {currentQuizIndex < currentMission.quizzes.length - 1 ? 'Next Question' : 'Complete Mission'}
                  </button>
                ) : (
                  <div></div> // Empty div to maintain spacing with flex justify-between
                )}
              </div>
            </motion.div>
          )}
          
          {/* Completion Stage */}
          {stage === MissionStage.COMPLETE && (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: settings.reducedAnimations ? 0.1 : 0.5 }}
              className="text-center py-8"
            >
              <div className="mb-6">
                <h2 className={`${settings.fontSize === 'large' ? 'text-3xl' : settings.fontSize === 'small' ? 'text-xl' : 'text-2xl'} font-bold mb-4`}>
                  Mission Complete!
                </h2>
                
                <div className="inline-block bg-green-100 rounded-full p-4 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <p className={`${settings.fontSize === 'large' ? 'text-xl' : settings.fontSize === 'small' ? 'text-base' : 'text-lg'} mb-4`}>
                  Congratulations! You have completed the "{currentMission.title}" mission.
                </p>
                
                <p className={`${settings.fontSize === 'large' ? 'text-lg' : settings.fontSize === 'small' ? 'text-sm' : 'text-base'} text-gray-600 mb-6`}>
                  You answered {quizScore} out of {currentMission.quizzes.length} questions correctly.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    onClick={() => navigate('/missions')}
                  >
                    Back to All Missions
                  </button>
                  
                  <button
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                    onClick={() => navigate('/dashboard')}
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MissionDetail;