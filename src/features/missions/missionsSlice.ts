// src/features/missions/missionsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define mission types
export interface StoryModule {
  id: string;
  title: string;
  content: string;
  audioUrl?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  visualCueUrl?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  ageGroup: '6-10' | '11-15';
  difficulty: 'easy' | 'medium' | 'hard';
  thumbnailUrl: string;
  storyModules: StoryModule[];
  quizzes: QuizQuestion[];
  isCompleted: boolean;
  isLocked: boolean;
  culturalContext: string;
  cybersecurityConcept: string;
}

interface MissionsState {
  missions: Mission[];
  currentMission: Mission | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MissionsState = {
  missions: [],
  currentMission: null,
  status: 'idle',
  error: null,
};

// Sample mission data for development
const sampleMissions: Mission[] = [
  {
    id: 'mission-1',
    title: "Mika's Password Palace",
    description: "Help Mika create strong passwords to protect the digital marketplace",
    ageGroup: '6-10',
    difficulty: 'easy',
    thumbnailUrl: 'https://via.placeholder.com/300x200/4299e1/ffffff?text=Password+Palace',
    storyModules: [
      {
        id: 'story-1',
        title: 'The Marketplace Guardian',
        content: 'Mika is the guardian of the Digital Marketplace in her village...'
      }
    ],
    quizzes: [
      {
        id: 'quiz-1',
        question: 'Which password is the strongest?',
        options: ['password123', 'MikaStrong2023!', 'marketplace', 'mika'],
        correctAnswer: 'MikaStrong2023!'
      }
    ],
    isCompleted: false,
    isLocked: false,
    culturalContext: 'African marketplace traditions',
    cybersecurityConcept: 'Password Security'
  },
  {
    id: 'mission-2',
    title: "The Trickster's Messages",
    description: "Learn to identify fake messages from the village trickster",
    ageGroup: '6-10',
    difficulty: 'medium',
    thumbnailUrl: 'https://via.placeholder.com/300x200/f6ad55/ffffff?text=Trickster',
    storyModules: [],
    quizzes: [],
    isCompleted: false,
    isLocked: false,
    culturalContext: 'African folklore',
    cybersecurityConcept: 'Phishing Awareness'
  },
  {
    id: 'mission-3',
    title: "The Phisher in the Forest",
    description: "Detect phishing threats in the digital forest connecting communities",
    ageGroup: '11-15',
    difficulty: 'medium',
    thumbnailUrl: 'https://via.placeholder.com/300x200/68d391/ffffff?text=Digital+Forest',
    storyModules: [],
    quizzes: [],
    isCompleted: false,
    isLocked: true,
    culturalContext: 'African wildlife',
    cybersecurityConcept: 'Advanced Phishing'
  },
  {
    id: 'mission-4',
    title: "The Social Village",
    description: "Learn how to stay safe when connecting with others online",
    ageGroup: '11-15',
    difficulty: 'hard',
    thumbnailUrl: 'https://via.placeholder.com/300x200/f687b3/ffffff?text=Social+Village',
    storyModules: [],
    quizzes: [],
    isCompleted: false,
    isLocked: true,
    culturalContext: 'African community values',
    cybersecurityConcept: 'Social Media Safety'
  },
  {
    id: 'mission-5',
    title: "Safari Secrets",
    description: "Protect your personal information while exploring the web",
    ageGroup: '6-10',
    difficulty: 'easy',
    thumbnailUrl: 'https://via.placeholder.com/300x200/fc8181/ffffff?text=Safari+Secrets',
    storyModules: [],
    quizzes: [],
    isCompleted: true,
    isLocked: false,
    culturalContext: 'African safari adventures',
    cybersecurityConcept: 'Privacy Protection'
  },
  {
    id: 'mission-6',
    title: "Digital Defenders",
    description: "Join the village defenders to protect against cyber threats",
    ageGroup: '11-15',
    difficulty: 'hard',
    thumbnailUrl: 'https://via.placeholder.com/300x200/b794f4/ffffff?text=Digital+Defenders',
    storyModules: [],
    quizzes: [],
    isCompleted: false,
    isLocked: false,
    culturalContext: 'Traditional African defense systems',
    cybersecurityConcept: 'Comprehensive Security'
  }
];

// Async thunks
export const fetchMissions = createAsyncThunk(
  'missions/fetchMissions',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return sampleMissions;
  }
);

export const fetchMissionById = createAsyncThunk(
  'missions/fetchMissionById',
  async (missionId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const mission = sampleMissions.find(m => m.id === missionId);
    if (!mission) {
      throw new Error('Mission not found');
    }
    return mission;
  }
);

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    setCurrentMission: (state, action: PayloadAction<string>) => {
      const mission = state.missions.find(m => m.id === action.payload);
      if (mission) {
        state.currentMission = mission;
      }
    },
    markMissionCompleted: (state, action: PayloadAction<string>) => {
      const mission = state.missions.find(m => m.id === action.payload);
      if (mission) {
        mission.isCompleted = true;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.missions = action.payload;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch missions';
      })
      .addCase(fetchMissionById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMissionById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentMission = action.payload;
      })
      .addCase(fetchMissionById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch mission';
      });
  }
});

export const { setCurrentMission, markMissionCompleted } = missionsSlice.actions;
export default missionsSlice.reducer;