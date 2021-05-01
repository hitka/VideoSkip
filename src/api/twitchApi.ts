import axios from 'axios';
import ENDPOINTS from '../constants/api.constants';
import { Redemption, RedemptionStatus } from '../models/purchase';

// eslint-disable-next-line import/prefer-default-export
export const authenticateTwitch = async (code: string): Promise<void> => {
  return axios.post(ENDPOINTS.TWITCH_AUTH, { code });
};

export const authenticateDA = async (code: string): Promise<void> => {
  return axios.post(ENDPOINTS.DA_AUTH, { code, redirectUri: `${window.location.origin}/da/redirect` });
};

export const closeTwitchRewards = async (): Promise<void> => {
  await axios.delete(ENDPOINTS.TWITCH_REWARDS);
};

export const getRedemptions = async (rewardId: string, username: string): Promise<Redemption[]> => {
  const { data } = await axios.get(ENDPOINTS.TWITCH.REDEMPTIONS, { params: { rewardId, username } });

  return data;
};

export const updateRedemptionStatus = async (
  username: string,
  redemptionId: string,
  status: RedemptionStatus,
): Promise<void> => {
  await axios.patch(ENDPOINTS.TWITCH.REDEMPTIONS, { username, redemptionId, status });
};
