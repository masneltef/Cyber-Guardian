// src/pages/missions/MissionStory.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../features/store';
import { fetchMissionById } from '../../features/missions/missionsSlice';
import { useSensorySettings } from '../../context/SensorySettingsContext';
import StoryModuleContainer, { StoryModuleData } from '../../components/missions/StoryModuleContainer';

// Add VisualTheme type definition
type VisualTheme = 'village' | 'marketplace' | 'savanna' | 'school' | 'urban' | 'forest';

const MissionStory: React.FC = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { settings } = useSensorySettings();
  const missionsState = useSelector((state: RootState) => state.missions);
  
  // Extract properties with default values
  const currentMission = missionsState?.currentMission || null;
  const status = missionsState?.status || 'idle';
  const error = missionsState?.error || null;
  
  // Fetch mission data if needed
  React.useEffect(() => {
    if (missionId && (!currentMission || currentMission.id !== missionId)) {
      dispatch(fetchMissionById(missionId) as any);
    }
  }, [dispatch, missionId, currentMission]);
  
  // Transform the mission's story modules into the format expected by StoryModuleContainer
  const storyModules: StoryModuleData[] = currentMission?.storyModules.map((module, index) => {
    // Map story theme based on index for demo purposes
    const themes: VisualTheme[] = ['village', 'marketplace', 'savanna', 'school', 'urban', 'forest'];
    const theme = themes[index % themes.length];
    
    // Similarly, we're using emoji as placeholder characters
    const characters = ['👧🏾', '👦🏾', '👩🏾‍💻', '👴🏾'];
    
    return {
      ...module,
      visualTheme: theme,
      characters: characters.slice(0, index + 1),
      culturalContext: currentMission.culturalContext
    };
  }) || [];
  
  const handleComplete = () => {
    if (missionId) {
      navigate(`/missions/${missionId}/quiz`);
    }
  };

  // Loading state
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading story...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (status === 'failed' || !currentMission) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-bold">Error</p>
          <p>{error || 'Failed to load story content'}</p>
          <button
            onClick={() => navigate('/missions')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Missions
          </button>
        </div>
      </div>
    );
  }
  
  // Main render
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className={`${settings.fontSize === 'large' ? 'text-3xl' : settings.fontSize === 'small' ? 'text-xl' : 'text-2xl'} font-bold mb-6`}>
        {currentMission!.title}
      </h1>
      
      {storyModules.length > 0 ? (
        <StoryModuleContainer
          modules={storyModules}
          onComplete={handleComplete}
        />
      ) : (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
          <p>No story content is available for this mission.</p>
          <button
            onClick={() => navigate(`/missions/${missionId}/quiz`)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Skip to Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default MissionStory;
