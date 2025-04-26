// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './features/store';
import { AuthProvider } from './context/AuthContext';
import { SensorySettingsProvider } from './context/SensorySettingsContext';

// Navigation
import Navigation from './components/layout/Navigation';

// Pages
import Home from './pages/Home';
import MissionSelect from './pages/missions/MissionSelect';
import MissionStory from './pages/missions/MissionStory';
import Settings from './pages/Settings';

// Mission Pages
import MissionDetail from './pages/missions/MissionDetail';
import MissionQuiz from './pages/missions/MissionQuiz';

// Password Mission Components
import PasswordMission from './pages/missions/PasswordMission';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <SensorySettingsProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <main className="py-4">
                <Routes>
                  {/* Home and basic pages */}
                  <Route path="/" element={<Home />} />
                  <Route path="/settings" element={<Settings />} />
                  
                  {/* Mission Routes */}
                  <Route path="/missions" element={<MissionSelect />} />
                  
                  {/* Mission Detail and related pages */}
                  <Route path="/missions/:missionId" element={<MissionDetail />} />
                  
                  {/* Story and Quiz Routes */}
                  <Route path="/missions/:missionId/story" element={<MissionStory />} />
                  <Route path="/missions/:missionId/quiz" element={<MissionQuiz />} />
                  
                  {/* Specific Mission Routes */}
                  <Route path="/missions/password-palace" element={<PasswordMission />} />
                  
                  {/* Add more routes as needed */}
                </Routes>
              </main>
              <footer className="bg-white py-6 border-t">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <p className="text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Cyber Guardian Africa. All rights reserved.
                  </p>
                </div>
              </footer>
            </div>
          </Router>
        </SensorySettingsProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;