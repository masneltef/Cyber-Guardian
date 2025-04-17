// src/pages/missions/MissionQuiz.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const MissionQuiz: React.FC = () => {
  const { missionId } = useParams<{ missionId: string }>();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Quiz (Under Construction)</h1>
      <p>Mission ID: {missionId}</p>
    </div>
  );
};

export default MissionQuiz;
