// src/pages/Settings.tsx
import React from 'react';
import { useSensorySettings } from '../context/SensorySettingsContext';

const Settings: React.FC = () => {
  const { settings, updateSettings, resetToDefaults } = useSensorySettings();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow sm:rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Accessibility Settings</h2>
          <p className="mt-1 text-sm text-gray-500">
            Customize your experience to suit your preferences
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="space-y-6">
            {/* Visual Settings */}
            <div>
              <h3 className="text-base font-medium text-gray-900">Visual Settings</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Reduced Animations</span>
                  <button
                    onClick={() => updateSettings({ reducedAnimations: !settings.reducedAnimations })}
                    className={`${
                      settings.reducedAnimations ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                  >
                    <span
                      className={`${
                        settings.reducedAnimations ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">High Contrast</span>
                  <button
                    onClick={() => updateSettings({ highContrast: !settings.highContrast })}
                    className={`${
                      settings.highContrast ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                  >
                    <span
                      className={`${
                        settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </button>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-700">Font Size</span>
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => updateSettings({ fontSize: 'small' })}
                      className={`px-3 py-2 border rounded-md ${
                        settings.fontSize === 'small'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Small
                    </button>
                    <button
                      onClick={() => updateSettings({ fontSize: 'medium' })}
                      className={`px-3 py-2 border rounded-md ${
                        settings.fontSize === 'medium'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => updateSettings({ fontSize: 'large' })}
                      className={`px-3 py-2 border rounded-md ${
                        settings.fontSize === 'large'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Large
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-5 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  onClick={resetToDefaults}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;