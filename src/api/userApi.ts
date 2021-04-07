import axios from 'axios';
import { DeepPartial } from 'react-hook-form';
import ENDPOINTS from '../constants/api.constants';
import { IntegrationFields, SettingFields } from '../reducers/AucSettings/AucSettings';
import { UserInfo, UserState } from '../reducers/User/User';
import { SkipEmotes } from '../models/common.model';

export const getUsername = async (): Promise<UserInfo> => {
  const { data } = await axios.get(ENDPOINTS.USER.USERNAME);

  return data;
};

export const updateSettings = async (settings: DeepPartial<SettingFields>): Promise<void> => {
  await axios.post(ENDPOINTS.USER.SETTINGS, settings);
};

export const updateIntegration = async (integration: DeepPartial<IntegrationFields>): Promise<void> => {
  await axios.post(ENDPOINTS.USER.INTEGRATION, integration);
};

export const getUserData = async (): Promise<UserState> => {
  const { data } = await axios.get(ENDPOINTS.USER.DATA);

  return data;
};

export interface UserToken {
  access_token: string;
  channelId: string;
}

export const refreshToken = async (username: string): Promise<UserToken> => {
  const { data } = await axios.get(ENDPOINTS.TWITCH.REFRESH_TOKEN, { params: { username } });

  return data;
};

export const getSkipEmotes = async (username: string): Promise<SkipEmotes> => {
  const { data } = await axios.get(ENDPOINTS.USER.SKIP_EMOTES, { params: { username } });

  return data;
};

export const updateSkipEmotes = async (username: string, skipEmotes: SkipEmotes): Promise<void> => {
  await axios.post(ENDPOINTS.USER.SKIP_EMOTES, { username, skipEmotes });
};
