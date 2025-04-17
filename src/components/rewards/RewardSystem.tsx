// src/components/rewards/RewardSystem.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '../../features/store';
import { useSensorySettings } from '../../context/SensorySettingsContext';
import { useAuth } from '../../context/AuthContext';
import { claimReward } from '../../features/rewards/rewardsSlice';

// Define culturally relevant reward types
export type RewardType = 
  | 'digital_beads' 
  | 'community_garden'
  | 'guardian_shield'
  | 'village_rank'
  | 'certificate';

interface Reward {
  id: string;
  type: RewardType;
  title: string;
  description: string;
  imageUrl: string;
  isNew: boolean;
  dateEarned: string;
}

const RewardSystem: React.FC = () => {
  const dispatch = useDispatch();
  const { settings } = useSensorySettings();
  const { user } = useAuth();
  const { rewards, unclaimedRewards } = useSelector((state: RootState) => state.rewards);
  const [showUnclaimedRewards, setShowUnclaimedRewards] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  
  // Show unclaimed rewards notification when component mounts
  useEffect(() => {
    if (unclaimedRewards.length > 0) {
      setShowUnclaimedRewards(true);
    }
  }, [unclaimedRewards]);
  
  const handleClaimReward = (rewardId: string) => {
    dispatch(claimReward(rewardId));
    setShowUnclaimedRewards(false);
  };
  
  const handleRewardClick = (reward: Reward) => {
    setSelectedReward(reward);
  };
  
  const closeRewardDetail = () => {
    setSelectedReward(null);
  };

  // Get culturally appropriate icon and description for each reward type
  const getRewardTypeDetails = (type: RewardType) => {
    switch (type) {
      case 'digital_beads':
        return {
          icon: '🔶',
          label: 'Digital Beads Collection',
          description: 'Inspired by traditional African beadwork, these digital beads represent your cybersecurity knowledge.'
        };
      case 'community_garden':
        return {
          icon: '🌱',
          label: 'Community Garden',
          description: 'Your digital garden grows as you learn and protect your community from cyber threats.'
        };
      case 'guardian_shield':
        return {
          icon: '🛡️',
          label: 'Guardian Shield',
          description: 'A symbol of protection, showing your ability to defend against digital dangers.'
        };
      case 'village_rank':
        return {
          icon: '👑',
          label: 'Village Recognition',
          description: 'Your status in the digital village rises as you master more cybersecurity skills.'
        };
      case 'certificate':
        return {
          icon: '📜',
          label: 'Achievement Certificate',
          description: 'A printable certificate in your local language to recognize your accomplishments.'
        };
    }
  };

  return (
    <div className="reward-system p-4">
      {/* Unclaimed Rewards Notification */}
      {showUnclaimedRewards && unclaimedRewards.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-md"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className={`${settings.fontSize === 'large' ? 'text-xl' : settings.fontSize === 'small' ? 'text-base' : 'text-lg'} font-semibold text-yellow-700`}>
                New Rewards Available!
              </h3>
              <p className={`${settings.fontSize === 'small' ? 'text-sm' : 'text-base'} text-yellow-600 mt-1`}>
                You've earned {unclaimedRewards.length} new {unclaimedRewards.length === 1 ? 'reward' : 'rewards'}!
              </p>
            </div>
            <button 
              onClick={() => handleClaimReward(unclaimedRewards[0].id)}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
            >
              Claim Reward
            </button>
          </div>
        </motion.div>
      )}
      
      {/* Rewards Grid */}
      <div className="mb-6">
        <h2 className={`${settings.fontSize === 'large' ? 'text-2xl' : settings.fontSize === 'small' ? 'text-lg' : 'text-xl'} font-bold mb-4`}>
          Your Rewards Collection
        </h2>
        
        {rewards.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {rewards.map((reward) => {
              const typeDetails = getRewardTypeDetails(reward.type);
              return (
                <motion.div
                  key={reward.id}
                  whileHover={{ scale: settings.reducedAnimations ? 1 : 1.05 }}
                  whileTap={{ scale: settings.reducedAnimations ? 1 : 0.95 }}
                  className={`cursor-pointer p-4 rounded-lg border-2 ${
                    reward.isNew ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'
                  } ${settings.highContrast ? 'border-black' : ''}`}
                  onClick={() => handleRewardClick(reward)}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{typeDetails.icon}</div>
                    <h3 className={`${settings.fontSize === 'small' ? 'text-sm' : 'text-base'} font-semibold`}>
                      {reward.title}
                    </h3>
                    <p className={`text-gray-500 text-xs mt-1`}>
                      {typeDetails.label}
                    </p>
                    {reward.isNew && (
                      <span className="inline-block bg-yellow-500 text-white text-xs px-2 py-1 rounded-full mt-2">
                        NEW
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Complete missions to earn rewards!</p>
          </div>
        )}
      </div>
      
      {/* Reward Type Categories */}
      <div className="mb-6">
        <h3 className={`${settings.fontSize === 'large' ? 'text-xl' : settings.fontSize === 'small' ? 'text-base' : 'text-lg'} font-semibold mb-3`}>
          Reward Categories
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(['digital_beads', 'community_garden', 'guardian_shield', 'village_rank', 'certificate'] as RewardType[]).map((type) => {
            const typeDetails = getRewardTypeDetails(type);
            return (
              <div key={type} className="flex items-start p-3 bg-white rounded-lg border border-gray-200">
                <div className="text-3xl mr-3">{typeDetails.icon}</div>
                <div>
                  <h4 className={`${settings.fontSize === 'small' ? 'text-sm' : 'text-base'} font-semibold`}>
                    {typeDetails.label}
                  </h4>
                  <p className={`${settings.fontSize === 'small' ? 'text-xs' : 'text-sm'} text-gray-600 mt-1`}>
                    {typeDetails.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Selected Reward Detail Modal */}
      {selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-lg w-full p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className={`${settings.fontSize === 'large' ? 'text-2xl' : settings.fontSize === 'small' ? 'text-lg' : 'text-xl'} font-bold`}>
                {selectedReward.title}
              </h3>
              <button 
                onClick={closeRewardDetail}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <img 
                src={selectedReward.imageUrl || '/assets/images/reward-placeholder.png'} 
                alt={selectedReward.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            <div className="mb-4">
              <p className={`${settings.fontSize === 'small' ? 'text-sm' : 'text-base'} text-gray-700`}>
                {selectedReward.description}
              </p>
              <p className={`text-gray-500 text-sm mt-2`}>
                Earned on: {new Date(selectedReward.dateEarned).toLocaleDateString()}
              </p>
            </div>
            
            {selectedReward.type === 'certificate' && (
              <div className="mt-4">
                <button 
                  className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                  onClick={() => {
                    // In a real app, this would generate a printable certificate
                    window.alert('Certificate download would start here in the full application');
                  }}
                >
                  Download Certificate
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RewardSystem;