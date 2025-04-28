// src/utils/imageUtils.ts
export const getMissionImage = (missionId: string): string => {
  console.log("Getting image for mission ID:", missionId); // Add this for debugging
  
  // Since we're seeing only the Mika image, let's verify the mission IDs
  switch(missionId) {
    case 'password-palace':
    case 'mission-1':
      return `${process.env.PUBLIC_URL}/assets/images/missions/MikaPassword.png`;
    case 'trickster-message':
    case 'mission-2':
      return `${process.env.PUBLIC_URL}/assets/images/missions/TricksterMessage.png`;
    case 'phishing-forest':
    case 'mission-3':
      return `${process.env.PUBLIC_URL}/assets/images/missions/PhisherForest.png`;
    case 'digital-defenders':
    case 'mission-4':
      return `${process.env.PUBLIC_URL}/assets/images/missions/DigitalDefenders.png`;
    case 'safari-secrets':
    case 'mission-5':
      return `${process.env.PUBLIC_URL}/assets/images/missions/SafariSecrets.png`;
    case 'social-village':
    case 'mission-6':
      return `${process.env.PUBLIC_URL}/assets/images/missions/SocialVillage.png`;
    default:
      console.log("Using default image for unknown mission ID:", missionId);
      return `${process.env.PUBLIC_URL}/assets/images/missions/MikaPassword.png`;
  }
};