import { createSlice } from '@reduxjs/toolkit';

// Basic reward type
export interface Reward {
  id: string;
  type: 'digital_beads' | 'community_garden' | 'guardian_shield' | 'village_rank' | 'certificate';
  title: string;
  description: string;
  imageUrl: string;
  isNew: boolean;
  dateEarned: string;
}

interface RewardsState {
  rewards: Reward[];
  unclaimedRewards: Reward[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RewardsState = {
  rewards: [],
  unclaimedRewards: [],
  status: 'idle',
  error: null
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    claimReward: (state, action) => {
      const rewardId = action.payload;
      const rewardIndex = state.unclaimedRewards.findIndex(r => r.id === rewardId);
      
      if (rewardIndex >= 0) {
        const reward = state.unclaimedRewards[rewardIndex];
        reward.isNew = true;
        state.rewards.push(reward);
        state.unclaimedRewards.splice(rewardIndex, 1);
      }
    }
  }
});

export const { claimReward } = rewardsSlice.actions;
export default rewardsSlice.reducer;