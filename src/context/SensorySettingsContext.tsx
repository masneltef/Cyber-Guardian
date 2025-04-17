import React, { createContext, useState, useContext } from 'react';

// Define types
export type AutismSubtype = 
  | 'sensory-adaptive' 
  | 'taste-smell-sensitive' 
  | 'postural-inattentive' 
  | 'generalized-sensory-difference'
  | 'unspecified';

interface SensorySettings {
  reducedAnimations: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  colorScheme: 'standard' | 'muted' | 'monochrome';
  audioVolume: number;
  audioEnabled: boolean;
  voiceNarrationEnabled: boolean;
  gameSpeed: 'slow' | 'normal' | 'fast';
  useSimplifiedUI: boolean;
  hapticsEnabled: boolean;
  autismSubtype: AutismSubtype;
}

interface SensorySettingsContextType {
  settings: SensorySettings;
  updateSettings: (newSettings: Partial<SensorySettings>) => void;
  resetToDefaults: () => void;
  applyProfileSettings: (subtype: AutismSubtype) => void;
}

// Default settings
const defaultSettings: SensorySettings = {
  reducedAnimations: false,
  highContrast: false,
  fontSize: 'medium',
  colorScheme: 'standard',
  audioVolume: 70,
  audioEnabled: true,
  voiceNarrationEnabled: true,
  gameSpeed: 'normal',
  useSimplifiedUI: false,
  hapticsEnabled: true,
  autismSubtype: 'unspecified'
};

// Create context
const SensorySettingsContext = createContext<SensorySettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
  resetToDefaults: () => {},
  applyProfileSettings: () => {},
});

// Custom hook for using the settings context
export const useSensorySettings = () => useContext(SensorySettingsContext);

// Provider component
export const SensorySettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SensorySettings>(defaultSettings);

  const updateSettings = (newSettings: Partial<SensorySettings>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
  };

  const applyProfileSettings = (subtype: AutismSubtype) => {
    let profileSettings: Partial<SensorySettings> = {
      autismSubtype: subtype
    };
    
    // Here we would apply different settings based on subtype
    // Simplified for now
    setSettings({...defaultSettings, ...profileSettings});
  };

  const value = {
    settings,
    updateSettings,
    resetToDefaults,
    applyProfileSettings,
  };

  return <SensorySettingsContext.Provider value={value}>{children}</SensorySettingsContext.Provider>;
};