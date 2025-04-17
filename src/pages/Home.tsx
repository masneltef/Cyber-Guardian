// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSensorySettings } from '../context/SensorySettingsContext';

const Home: React.FC = () => {
  const { settings } = useSensorySettings();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className={`${settings.fontSize === 'large' ? 'text-5xl' : settings.fontSize === 'small' ? 'text-3xl' : 'text-4xl'} font-extrabold tracking-tight mb-4`}>
                Cyber Guardian Africa
              </h1>
              <p className={`${settings.fontSize === 'large' ? 'text-xl' : settings.fontSize === 'small' ? 'text-base' : 'text-lg'} max-w-md mx-auto md:mx-0 mb-8`}>
                A fun and interactive cybersecurity learning platform designed specifically for autistic children in Sub-Saharan Africa.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <Link
                  to="/missions"
                  className={`px-8 py-3 rounded-full text-base font-medium bg-white text-blue-600 hover:bg-blue-50 transition-colors ${settings.highContrast ? 'border-2 border-black' : ''}`}
                >
                  Start Learning
                </Link>
                <Link
                  to="/settings"
                  className={`px-8 py-3 rounded-full text-base font-medium bg-blue-800 text-white hover:bg-blue-700 transition-colors ${settings.highContrast ? 'border-2 border-white' : ''}`}
                >
                  Accessibility Settings
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="relative mx-auto w-full max-w-md">
                {/* Placeholder for hero image - would be replaced with actual artwork */}
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-blue-400 shadow-2xl">
                  <div className="p-6 flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <p className="text-white text-lg font-medium">Cybersecurity Adventures</p>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-yellow-400"></div>
                <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-purple-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`${settings.fontSize === 'large' ? 'text-4xl' : settings.fontSize === 'small' ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900`}>
              Learning Made for African Youth
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Discover cybersecurity through culturally relevant stories and games
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-blue-50 rounded-xl p-8 shadow-lg border-t-4 border-blue-500 transform transition-transform duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-700 mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">Customizable Experience</h3>
              <p className="text-gray-600 text-center">
                Personalized settings for different autism subtypes with controls for animations, colors, text size, and audio.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-purple-50 rounded-xl p-8 shadow-lg border-t-4 border-purple-500 transform transition-transform duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 text-purple-700 mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">African Cultural Context</h3>
              <p className="text-gray-600 text-center">
                Stories and scenarios set in familiar environments with characters and cultural elements from across Sub-Saharan Africa.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-green-50 rounded-xl p-8 shadow-lg border-t-4 border-green-500 transform transition-transform duration-300 hover:-translate-y-2">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-700 mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">Essential Cybersecurity Skills</h3>
              <p className="text-gray-600 text-center">
                Learn to create strong passwords, recognize phishing attempts, protect personal information, and browse safely.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Age Groups Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`${settings.fontSize === 'large' ? 'text-4xl' : settings.fontSize === 'small' ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900`}>
              Designed for All Ages
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Younger Children */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="bg-yellow-400 h-32 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Ages 6-10</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Colorful, engaging visuals with simple interfaces</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Basic cybersecurity concepts through stories</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Audio narration and simplified text</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Older Children */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="bg-blue-500 h-32 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Ages 11-15</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>More sophisticated scenarios and problem-solving</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Advanced cybersecurity concepts and terminology</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Social media safety and digital citizenship</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`${settings.fontSize === 'large' ? 'text-4xl' : settings.fontSize === 'small' ? 'text-2xl' : 'text-3xl'} font-bold text-white mb-4`}>
            Ready to Begin Your Cybersecurity Adventure?
          </h2>
          <p className="text-blue-100 mb-8 max-w-3xl mx-auto text-lg">
            Join our community of Cyber Guardians and learn how to stay safe online through fun, interactive missions!
          </p>
          <Link
            to="/missions"
            className={`inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-blue-600 bg-white hover:bg-blue-50 ${settings.highContrast ? 'border-2 border-black' : ''}`}
          >
            Start Your First Mission
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;