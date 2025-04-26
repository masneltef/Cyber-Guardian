// src/features/store.ts
import { configureStore } from '@reduxjs/toolkit';
import missionsReducer from './missions/missionsSlice';
import quizReducer from './quiz/quizSlice';
import progressReducer from './progress/progressSlice';
import rewardsReducer from './rewards/rewardsSlice';

export const store = configureStore({
  reducer: {
    missions: missionsReducer,
    quiz: quizReducer,
    progress: progressReducer,
    rewards: rewardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;