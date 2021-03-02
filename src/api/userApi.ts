import axios from 'axios';
import { DeepPartial } from 'react-hook-form';
import ENDPOINTS from '../constants/api.constants';
import { IntegrationFields, SettingFields } from '../reducers/AucSettings/AucSettings';
import { UserData } from '../models/user.model';
import { UserInfo } from '../reducers/User/User';

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

export const getUserData = async (): Promise<UserData> => {
  const { data } = await axios.get(ENDPOINTS.USER.DATA);

  return data;
};

export interface UserToken {
  refresh_token: string;
  channelId: string;
}

export const getUserToken = async (username: string): Promise<UserToken> => {
  const { data } = await axios.get(ENDPOINTS.USER.TOKEN, { params: { username } });

  return data;
};

export const updateUserToken = async (username: string, twitchToken: any): Promise<void> => {
  const { data } = await axios.put(ENDPOINTS.USER.TOKEN, { username, twitchToken });

  return data;
};
