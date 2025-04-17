// src/components/settings/AccessibilitySettings.tsx
import React from 'react';
import { useSensorySettings, AutismSubtype } from '../../context/SensorySettingsContext';

const AccessibilitySettings: React.FC = () => {
  const { settings, updateSettings, resetToDefaults, applyProfileSettings } = useSensorySettings();

  // Helper function to create settings toggle buttons
  const ToggleButton = ({ 
    label, 
    value, 
    onChange, 
    description 
  }: { 
    label: string; 
    value: boolean; 
    onChange: (value: boolean) => void; 
    description?: string;
  }) => (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="font-medium text-gray-700">{label}</label>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
        <button
          onClick={() => onChange(!value)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full ${value ? 'bg-blue-600' : 'bg-gray-200'}`}
          role="switch"
          aria-checked={value}
        >
          <span 
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${value ? 'translate-x-6' : 'translate-x-1'}`} 
          />
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Accessibility Settings</h2>
      
      {/* Autism Subtype Profile Selection */}
      <div className="mb-6">
        <label htmlFor="autism-subtype" className="block text-sm font-medium text-gray-700 mb-1">
          Sensory Profile
        </label>
        <p className="text-sm text-gray-500 mb-2">
          Select a profile that best matches your sensory preferences
        </p>
        <select
          id="autism-subtype"
          value={settings.autismSubtype}
          onChange={(e) => applyProfileSettings(e.target.value as AutismSubtype)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 border focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="unspecified">Standard (Default)</option>
          <option value="sensory-adaptive">Sensory Balanced</option>
          <option value="taste-smell-sensitive">Visually Calm</option>
          <option value="postural-inattentive">Focus Support</option>
          <option value="generalized-sensory-difference">Minimalist Mode</option>
        </select>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Visual Settings</h3>
        
        {/* Reduced Animations Toggle */}
        <ToggleButton
          label="Reduced Animations"
          value={settings.reducedAnimations}
          onChange={(value) => updateSettings({ reducedAnimations: value })}
          description="Minimize movement and transitions on screen"
        />
        
        {/* High Contrast Toggle */}
        <ToggleButton
          label="High Contrast"
          value={settings.highContrast}
          onChange={(value) => updateSettings({ highContrast: value })}
          description="Increase text and element contrast for better visibility"
        />
        
        {/* Font Size Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Font Size
          </label>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => updateSettings({ fontSize: 'small' })}
              className={`px-4 py-2 rounded ${
                settings.fontSize === 'small' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Small
            </button>
            <button
              onClick={() => updateSettings({ fontSize: 'medium' })}
              className={`px-4 py-2 rounded ${
                settings.fontSize === 'medium' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => updateSettings({ fontSize: 'large' })}
              className={`px-4 py-2 rounded ${
                settings.fontSize === 'large' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Large
            </button>
          </div>
        </div>
        
        {/* Color Scheme Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color Scheme
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => updateSettings({ colorScheme: 'standard' })}
              className={`flex flex-col items-center p-3 rounded border ${
                settings.colorScheme === 'standard' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="w-full h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded mb-2"></div>
              <span className="text-sm">Standard</span>
            </button>
            <button
              onClick={() => updateSettings({ colorScheme: 'muted' })}
              className={`flex flex-col items-center p-3 rounded border ${
                settings.colorScheme === 'muted' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="w-full h-8 bg-gradient-to-r from-blue-300 to-green-300 rounded mb-2"></div>
              <span className="text-sm">Muted</span>
            </button>
            <button
              onClick={() => updateSettings({ colorScheme: 'monochrome' })}
              className={`flex flex-col items-center p-3 rounded border ${
                settings.colorScheme === 'monochrome' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="w-full h-8 bg-gradient-to-r from-gray-500 to-gray-700 rounded mb-2"></div>
              <span className="text-sm">Monochrome</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Audio Settings</h3>
        
        {/* Audio Enabled Toggle */}
        <ToggleButton
          label="Audio Effects"
          value={settings.audioEnabled}
          onChange={(value) => updateSettings({ audioEnabled: value })}
          description="Enable sound effects during gameplay"
        />
        
        {/* Voice Narration Toggle */}
        <ToggleButton
          label="Voice Narration"
          value={settings.voiceNarrationEnabled}
          onChange={(value) => updateSettings({ voiceNarrationEnabled: value })}
          description="Read stories and instructions aloud"
        />
        
        {/* Audio Volume Slider */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Audio Volume ({settings.audioVolume}%)
            </label>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.audioVolume}
            onChange={(e) => updateSettings({ audioVolume: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Quiet</span>
            <span>Medium</span>
            <span>Loud</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mb-4">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Interface Settings</h3>
        
        {/* Simplified UI Toggle */}
        <ToggleButton
          label="Simplified Interface"
          value={settings.useSimplifiedUI}
          onChange={(value) => updateSettings({ useSimplifiedUI: value })}
          description="Reduce on-screen elements and visual complexity"
        />
        
        {/* Game Speed Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Game Speed
          </label>
          <p className="text-sm text-gray-500 mb-2">
            Adjust how quickly the game progresses
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => updateSettings({ gameSpeed: 'slow' })}
              className={`px-4 py-2 rounded ${
                settings.gameSpeed === 'slow' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Slow
            </button>
            <button
              onClick={() => updateSettings({ gameSpeed: 'normal' })}
              className={`px-4 py-2 rounded ${
                settings.gameSpeed === 'normal' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => updateSettings({ gameSpeed: 'fast' })}
              className={`px-4 py-2 rounded ${
                settings.gameSpeed === 'fast' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Fast
            </button>
          </div>
        </div>
        
        {/* Haptics Toggle */}
        <ToggleButton
          label="Haptic Feedback"
          value={settings.hapticsEnabled}
          onChange={(value) => updateSettings({ hapticsEnabled: value })}
          description="Enable vibration for touch devices when available"
        />
      </div>
      
      {/* Reset Button */}
      <div className="flex justify-end border-t border-gray-200 pt-4">
        <button
          onClick={resetToDefaults}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default AccessibilitySettings;