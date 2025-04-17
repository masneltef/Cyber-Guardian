import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { useSensorySettings } from '../../context/SensorySettingsContext';

const Layout: React.FC = () => {
  const { settings } = useSensorySettings();
  
  return (
    <div className={`min-h-screen ${
      settings.colorScheme === 'monochrome' ? 'bg-gray-50' :
      settings.colorScheme === 'muted' ? 'bg-blue-50' : 'bg-white'
    }`}>
      <Navigation />
      <main className="py-4">
        <Outlet />
      </main>
      <footer className="bg-white py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Cyber Guardian Africa. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;