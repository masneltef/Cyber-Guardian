// src/components/quiz/QuizComponent.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSensorySettings } from '../../context/SensorySettingsContext';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  visualCueUrl?: string;
  explanation?: string;
}

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (score: number, totalQuestions: number) => void;
  allowRetry?: boolean;
  showFeedback?: boolean;
  showProgress?: boolean;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  questions,
  onComplete,
  allowRetry = true,
  showFeedback = true,
  showProgress = true,
}) => {
  const { settings } = useSensorySettings();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [animationKey, setAnimationKey] = useState(0); // For retrigger animations

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Reset state when question changes
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setAttempted(false);
    setRetryCount(0);
    setAnimationKey(prev => prev + 1); // Change key to retrigger animations
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answer: string) => {
    if (attempted && !allowRetry) return;
    
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.correctAnswer;
    setIsAnswerCorrect(isCorrect);
    setAttempted(true);

    if (isCorrect) {
      // Increase score only if correct on first attempt or if retry is not allowed
      if (!attempted || !allowRetry) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed
      onComplete(score, questions.length);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setAttempted(false);
    setRetryCount(retryCount + 1);
  };

  const getAnimationProps = () => {
    // Less animation for users with sensory sensitivities
    if (settings.reducedAnimations) {
      return {
        initial: { opacity: 0.9 },
        animate: { opacity: 1 },
        exit: { opacity: 0.9 },
        transition: { duration: 0.1 }
      };
    }
    
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.3 }
    };
  };

  // Determine adaptive font sizes based on user settings
  const getFontSize = (size: 'heading' | 'question' | 'option' | 'feedback') => {
    const baseSizes = {
      heading: {
        small: 'text-lg',
        medium: 'text-xl',
        large: 'text-2xl'
      },
      question: {
        small: 'text-base',
        medium: 'text-lg',
        large: 'text-xl'
      },
      option: {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg'
      },
      feedback: {
        small: 'text-xs',
        medium: 'text-sm',
        large: 'text-base'
      }
    };
    
    return baseSizes[size][settings.fontSize];
  };

  if (!currentQuestion) {
    return <div>No questions available</div>;
  }

  return (
    <div className="quiz-container">
      {/* Progress indicator */}
      {showProgress && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className={`${getFontSize('feedback')} text-gray-600`}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className={`${getFontSize('feedback')} text-gray-600`}>
              Score: {score}/{currentQuestionIndex + (isAnswerCorrect ? 1 : 0)}
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{width: `${((currentQuestionIndex) / questions.length) * 100}%`}}
            ></div>
          </div>
        </div>
      )}
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={`question-${currentQuestionIndex}-${animationKey}`}
          {...getAnimationProps()}
          className="quiz-question"
        >
          <h3 className={`${getFontSize('question')} font-semibold mb-4`}>
            {currentQuestion.question}
          </h3>
          
          {/* Visual cue/hint */}
          {currentQuestion.visualCueUrl && (
            <div className="mb-6">
              <img 
                src={currentQuestion.visualCueUrl} 
                alt="Visual hint" 
                className="max-w-full h-auto rounded-lg border border-gray-200 mx-auto"
                style={{ maxHeight: '200px' }}
              />
            </div>
          )}
          
          {/* Answer options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              // Determine the correct styling based on state
              let optionStyle = "border-gray-300 hover:border-blue-500";
              
              if (selectedAnswer === option) {
                optionStyle = isAnswerCorrect 
                  ? "bg-green-100 border-green-500 text-green-800"
                  : "bg-red-100 border-red-500 text-red-800";
              } else if (selectedAnswer && option === currentQuestion.correctAnswer && showFeedback) {
                // Highlight the correct answer when user selects the wrong one
                optionStyle = "bg-green-50 border-green-300 text-green-800";
              }
              
              return (
                <button
                  key={`option-${index}`}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={selectedAnswer !== null && (!allowRetry || selectedAnswer === option)}
                  className={`w-full text-left p-4 rounded-lg border-2 ${optionStyle} ${
                    settings.highContrast ? 'border-black' : ''
                  } ${getFontSize('option')}`}
                  aria-selected={selectedAnswer === option}
                >
                  {option}
                </button>
              );
            })}
          </div>
          
          {/* Feedback area */}
          {showFeedback && selectedAnswer && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-lg mb-6 ${
                isAnswerCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              <p className={`font-semibold ${getFontSize('feedback')}`}>
                {isAnswerCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              
              {!isAnswerCorrect && (
                <p className={`mt-1 ${getFontSize('feedback')}`}>
                  The correct answer is: {currentQuestion.correctAnswer}
                </p>
              )}
              
              {currentQuestion.explanation && (
                <p className={`mt-2 ${getFontSize('feedback')}`}>
                  {currentQuestion.explanation}
                </p>
              )}
            </motion.div>
          )}
          
          {/* Action buttons */}
          <div className="flex justify-between">
            {/* Retry button - only show if answer is wrong and retry is allowed */}
            {selectedAnswer && !isAnswerCorrect && allowRetry && (
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
              >
                Try Again
              </button>
            )}
            
            {/* Next button - only enable if user has selected an answer */}
            <button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              className={`px-4 py-2 rounded ${
                selectedAnswer
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuizComponent;