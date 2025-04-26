// src/features/quiz/quizSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizQuestion } from '../../components/quiz/QuizComponent';

interface QuizState {
  answers: Record<string, string>; // questionId -> selectedAnswer
  correctAnswers: Record<string, boolean>; // questionId -> isCorrect
  currentQuizId: string | null;
  quizHistory: Record<string, {
    score: number;
    totalQuestions: number;
    completedAt: string;
    attempts: number;
  }>;
}

const initialState: QuizState = {
  answers: {},
  correctAnswers: {},
  currentQuizId: null,
  quizHistory: {}
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    startQuiz: (state, action: PayloadAction<string>) => {
      state.currentQuizId = action.payload;
      state.answers = {};
      state.correctAnswers = {};
    },
    submitAnswer: (state, action: PayloadAction<{
      questionId: string;
      answer: string;
      isCorrect: boolean;
    }>) => {
      const { questionId, answer, isCorrect } = action.payload;
      state.answers[questionId] = answer;
      state.correctAnswers[questionId] = isCorrect;
    },
    completeQuiz: (state, action: PayloadAction<{
      quizId: string;
      score: number;
      totalQuestions: number;
    }>) => {
      const { quizId, score, totalQuestions } = action.payload;
      const previousAttempts = state.quizHistory[quizId]?.attempts || 0;
      
      state.quizHistory[quizId] = {
        score,
        totalQuestions,
        completedAt: new Date().toISOString(),
        attempts: previousAttempts + 1
      };
      
      state.currentQuizId = null;
    },
    resetQuiz: (state) => {
      state.answers = {};
      state.correctAnswers = {};
    }
  }
});

export const { startQuiz, submitAnswer, completeQuiz, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;