// src/features/rewards/rewardsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define reward types
export type RewardType = 
  | 'digital_beads' 
  | 'community_garden'
  | 'guardian_shield'
  | 'village_rank'
  | 'certificate';

export interface Reward {
  id: string;
  type: RewardType;
  title: string;
  description: string;
  imageUrl: string;
  isNew: boolean;
  dateEarned: string;
}

interface RewardsState {
  rewards: Reward[];
  unclaimedRewards: Reward[];
}

const initialState: RewardsState = {
  rewards: [
    {
      id: 'digital-beads-1',
      type: 'digital_beads',
      title: 'Password Protection Beads',
      description: 'Earned by completing Mika\'s Password Palace mission',
      imageUrl: '/assets/images/rewards/password-beads.png',
      isNew: false,
      dateEarned: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
    }
  ],
  unclaimedRewards: []
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    addReward: (state, action: PayloadAction<Omit<Reward, 'isNew' | 'dateEarned'>>) => {
      const newReward = {
        ...action.payload,
        isNew: true,
        dateEarned: new Date().toISOString()
      };
      
      state.unclaimedRewards.push(newReward);
    },
    claimReward: (state, action: PayloadAction<string>) => {
      const rewardId = action.payload;
      const rewardIndex = state.unclaimedRewards.findIndex(r => r.id === rewardId);
      
      if (rewardIndex !== -1) {
        const reward = state.unclaimedRewards[rewardIndex];
        state.rewards.push(reward);
        state.unclaimedRewards.splice(rewardIndex, 1);
      }
    },
    markRewardSeen: (state, action: PayloadAction<string>) => {
      const rewardId = action.payload;
      const reward = state.rewards.find(r => r.id === rewardId);
      
      if (reward) {
        reward.isNew = false;
      }
    }
  }
});

export const { addReward, claimReward, markRewardSeen } = rewardsSlice.actions;
export default rewardsSlice.reducer;