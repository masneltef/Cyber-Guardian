// src/features/progress/progressSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MissionProgress {
  missionId: string;
  storyProgress: number; // percentage complete (0-100)
  quizScore: number | null;
  isCompleted: boolean;
  startedAt: string | null;
  completedAt: string | null;
  lastAccessedAt: string;
}

interface ProgressState {
  missions: Record<string, MissionProgress>;
  currentMissionId: string | null;
  unlockedMissions: string[];
  achievements: Record<string, {
    achievedAt: string;
    isViewed: boolean;
  }>;
}

const initialState: ProgressState = {
  missions: {},
  currentMissionId: null,
  unlockedMissions: ['mission-1'], // Start with the password mission unlocked
  achievements: {}
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    startMission: (state, action: PayloadAction<string>) => {
      const missionId = action.payload;
      state.currentMissionId = missionId;
      
      // Initialize mission progress if it doesn't exist
      if (!state.missions[missionId]) {
        state.missions[missionId] = {
          missionId,
          storyProgress: 0,
          quizScore: null,
          isCompleted: false,
          startedAt: new Date().toISOString(),
          completedAt: null,
          lastAccessedAt: new Date().toISOString()
        };
      } else {
        // Update last accessed timestamp
        state.missions[missionId].lastAccessedAt = new Date().toISOString();
      }
    },
    updateStoryProgress: (state, action: PayloadAction<{
      missionId: string;
      progress: number;
    }>) => {
      const { missionId, progress } = action.payload;
      
      if (state.missions[missionId]) {
        state.missions[missionId].storyProgress = progress;
        state.missions[missionId].lastAccessedAt = new Date().toISOString();
      }
    },
    completeMission: (state, action: PayloadAction<{
      missionId: string;
      quizScore: number;
    }>) => {
      const { missionId, quizScore } = action.payload;
      
      if (state.missions[missionId]) {
        state.missions[missionId].quizScore = quizScore;
        state.missions[missionId].storyProgress = 100;
        state.missions[missionId].isCompleted = true;
        state.missions[missionId].completedAt = new Date().toISOString();
        state.missions[missionId].lastAccessedAt = new Date().toISOString();
      }
      
      // Unlock the next mission(s) if applicable
      // This is where you would implement the mission unlock logic
      if (missionId === 'mission-1' && !state.unlockedMissions.includes('mission-2')) {
        state.unlockedMissions.push('mission-2');
      }
    },
    unlockMission: (state, action: PayloadAction<string>) => {
      const missionId = action.payload;
      if (!state.unlockedMissions.includes(missionId)) {
        state.unlockedMissions.push(missionId);
      }
    },
    awardAchievement: (state, action: PayloadAction<string>) => {
      const achievementId = action.payload;
      
      if (!state.achievements[achievementId]) {
        state.achievements[achievementId] = {
          achievedAt: new Date().toISOString(),
          isViewed: false
        };
      }
    },
    markAchievementViewed: (state, action: PayloadAction<string>) => {
      const achievementId = action.payload;
      
      if (state.achievements[achievementId]) {
        state.achievements[achievementId].isViewed = true;
      }
    }
  }
});

export const {
  startMission,
  updateStoryProgress,
  completeMission,
  unlockMission,
  awardAchievement,
  markAchievementViewed
} = progressSlice.actions;

export default progressSlice.reducer;