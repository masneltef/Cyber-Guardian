// src/pages/missions/MissionSelect.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features/store';
import { fetchMissions, Mission } from '../../features/missions/missionsSlice';
import MissionCard from '../../components/missions/MissionCard';
import { useSensorySettings } from '../../context/SensorySettingsContext';
import { motion } from 'framer-motion';

const MissionSelect: React.FC = () => {
  const dispatch = useDispatch();
  const { settings } = useSensorySettings();
  const missionsState = useSelector((state: RootState) => state.missions);
  
  // Extract properties safely with default values
  const missions = missionsState?.missions || [];
  const status = missionsState?.status || 'idle';
  const error = missionsState?.error || null;
  
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>([]);
  const [ageFilter, setAgeFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Fetch missions when component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMissions() as any);
    }
  }, [status, dispatch]);
  
  // Filter missions when filters or missions change
  useEffect(() => {
    if (missions.length > 0) {
      let result = [...missions];
      
      // Filter by age group
      if (ageFilter !== 'all') {
        result = result.filter(mission => mission.ageGroup === ageFilter);
      }
      
      // Filter by difficulty
      if (difficultyFilter !== 'all') {
        result = result.filter(mission => mission.difficulty === difficultyFilter);
      }
      
      // Filter by completion status
      if (statusFilter === 'completed') {
        result = result.filter(mission => mission.isCompleted);
      } else if (statusFilter === 'in-progress') {
        result = result.filter(mission => !mission.isCompleted && !mission.isLocked);
      } else if (statusFilter === 'locked') {
        result = result.filter(mission => mission.isLocked);
      }
      
      // Filter by search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          mission => 
            mission.title.toLowerCase().includes(query) || 
            mission.description.toLowerCase().includes(query)
        );
      }
      
      setFilteredMissions(result);
    } else {
      setFilteredMissions([]);
    }
  }, [missions, ageFilter, difficultyFilter, statusFilter, searchQuery]);

  // Loading state
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading missions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (status === 'failed') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-bold">Error</p>
          <p>{error || 'Failed to load missions'}</p>
          <button
            onClick={() => dispatch(fetchMissions() as any)}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${settings.highContrast ? 'bg-white' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: settings.reducedAnimations ? 0.1 : 0.5 }}
      >
        <h1 className={`${settings.fontSize === 'large' ? 'text-4xl' : settings.fontSize === 'small' ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900 mb-2`}>
          Cybersecurity Missions
        </h1>
        <p className="text-gray-600 mb-6">
          Choose a mission to start your cybersecurity adventure
        </p>
        
        {/* Search and Filter Controls */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search missions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-2 pl-10 border rounded-lg ${settings.highContrast ? 'border-black' : 'border-gray-300'}`}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 absolute left-3 top-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          
          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Age Group Filter */}
            <div>
              <label htmlFor="age-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Age Group
              </label>
              <select
                id="age-filter"
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                className={`block w-full px-3 py-2 border rounded-md ${settings.highContrast ? 'border-black' : 'border-gray-300'}`}
              >
                <option value="all">All Ages</option>
                <option value="6-10">Ages 6-10</option>
                <option value="11-15">Ages 11-15</option>
              </select>
            </div>
            
            {/* Difficulty Filter */}
            <div>
              <label htmlFor="difficulty-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                id="difficulty-filter"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className={`block w-full px-3 py-2 border rounded-md ${settings.highContrast ? 'border-black' : 'border-gray-300'}`}
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            
            {/* Status Filter */}
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`block w-full px-3 py-2 border rounded-md ${settings.highContrast ? 'border-black' : 'border-gray-300'}`}
              >
                <option value="all">All Missions</option>
                <option value="completed">Completed</option>
                <option value="in-progress">Available</option>
                <option value="locked">Locked</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Mission Cards Grid */}
        {filteredMissions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                id={mission.id}
                title={mission.title}
                description={mission.description}
                difficulty={mission.difficulty}
                ageGroup={mission.ageGroup}
                thumbnailUrl={mission.thumbnailUrl}
                isCompleted={mission.isCompleted}
                isLocked={mission.isLocked}
                completionPercentage={30} // Adding the missing prop with a default value
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No missions found</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try adjusting your search or filters' : 'There are no missions available with the selected filters'}
            </p>
            <button
              onClick={() => {
                setAgeFilter('all');
                setDifficultyFilter('all');
                setStatusFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MissionSelect;