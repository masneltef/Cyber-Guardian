// src/pages/missions/MissionQuiz.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSensorySettings } from '../../context/SensorySettingsContext';
import QuizComponent from '../../components/quiz/QuizComponent';
import { markMissionCompleted } from '../../features/missions/missionsSlice';

// Import quiz data
import { passwordQuizQuestions } from '../../data/missions/passwordMission';
// Import more quiz data as you develop them
// import { phishingQuizQuestions } from '../../data/missions/phishingMission';
// import { privacyQuizQuestions } from '../../data/missions/privacyMission';

const MissionQuiz: React.FC = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { settings } = useSensorySettings();
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState({ score: 0, total: 0 });

  // Load the appropriate quiz questions based on mission ID
  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      let questions;
      
      // Map mission IDs to their corresponding quiz questions
      switch (missionId) {
        case 'password-palace':
        case 'mission-1':
          questions = passwordQuizQuestions;
          break;
        // Add cases for other missions as they are developed
        // case 'phishing-detector':
        //   questions = phishingQuizQuestions;
        //   break;
        // case 'privacy-protector':
        //   questions = privacyQuizQuestions;
        //   break;
        default:
          throw new Error(`Unknown mission ID: ${missionId}`);
      }
      
      if (questions && questions.length > 0) {
        setQuizQuestions(questions);
      } else {
        throw new Error('No quiz questions found for this mission');
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error loading quiz questions:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
    }
  }, [missionId]);

  // Handle quiz completion
  const handleQuizComplete = (score: number, totalQuestions: number) => {
    setQuizCompleted(true);
    setQuizScore({ score, total: totalQuestions });
    
    if (missionId) {
      // Mark mission as completed in the store
      dispatch(markMissionCompleted(missionId));
      
      // We'll implement the progress and reward parts later
      // when the Redux parts are properly set up
    }
  };

  const getMissionTitle = () => {
    switch (missionId) {
      case 'password-palace':
      case 'mission-1':
        return "Mika's Password Palace";
      // Add cases for other missions
      default:
        return "Mission";
    }
  };

  const handleReturnToMissions = () => {
    navigate('/missions');
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  // Handle error state
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

  // Quiz completed screen
  if (quizCompleted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className={`p-8 rounded-lg ${settings.highContrast ? 'bg-white border-2 border-black' : 'bg-green-50 border border-green-200'}`}>
              <div className="text-6xl mb-4">🎉</div>
              <h2 className={`${settings.fontSize === 'large' ? 'text-2xl' : settings.fontSize === 'small' ? 'text-lg' : 'text-xl'} font-bold text-green-800 mb-4`}>
                Quiz Completed!
              </h2>
              <p className={`${settings.fontSize === 'large' ? 'text-lg' : settings.fontSize === 'small' ? 'text-sm' : 'text-base'} mb-6`}>
                Congratulations! You've completed the {getMissionTitle()} Quiz with a score of {quizScore.score}/{quizScore.total}.
              </p>
              
              <div className="mb-8">
                <h3 className={`${settings.fontSize === 'large' ? 'text-xl' : settings.fontSize === 'small' ? 'text-base' : 'text-lg'} font-semibold mb-2`}>
                  What you've learned:
                </h3>
                {missionId === 'password-palace' || missionId === 'mission-1' ? (
                  <ul className="text-left inline-block">
                    <li className="flex items-start mb-2">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Creating strong, complex passwords</span>
                    </li>
                    <li className="flex items-start mb-2">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>Using a mix of characters in your passwords</span>
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
                ) : (
                  <p className="text-center text-gray-600">
                    You've learned important cybersecurity skills!
                  </p>
                )}
              </div>
              
              <button
                onClick={handleReturnToMissions}
                className={`px-6 py-3 bg-blue-600 text-white rounded-lg ${settings.highContrast ? 'border-2 border-black' : ''} hover:bg-blue-700 transition-colors`}
              >
                Return to Missions
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render quiz
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className={`${settings.fontSize === 'large' ? 'text-3xl' : settings.fontSize === 'small' ? 'text-xl' : 'text-2xl'} font-bold text-center mb-6`}>
          {getMissionTitle()} Quiz
        </h1>
        
        <div className={`mb-6 p-4 rounded-lg ${settings.highContrast ? 'bg-white border-2 border-black' : 'bg-blue-50 border border-blue-200'}`}>
          <p className={`${settings.fontSize === 'large' ? 'text-lg' : settings.fontSize === 'small' ? 'text-sm' : 'text-base'}`}>
            Test your knowledge about what you've learned in the mission. Answer the questions below to complete the mission!
          </p>
        </div>
        
        {quizQuestions.length > 0 && (
          <QuizComponent 
            questions={quizQuestions}
            onComplete={handleQuizComplete}
            allowRetry={true}
            showFeedback={true}
            showProgress={true}
          />
        )}
      </div>
    </div>
  );
};

export default MissionQuiz;