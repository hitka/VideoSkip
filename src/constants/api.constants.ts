const ENDPOINTS = {
  TWITCH_AUTH: '/api/twitch/auth',
  TWITCH_REWARDS: '/api/twitch/rewards',
  DA_AUTH: '/api/donationalerts/auth',
  TWITCH_CHANNEL_POINTS: '/api/twitch/channelPoints',
  TWITCH: {
    REDEMPTIONS: '/api/twitch/redemptions',
    REFRESH_TOKEN: '/api/twitch/refreshToken',
  },
  USER: {
    USERNAME: '/api/username',
    AUC_SETTINGS: '/api/aucSettings',
    SETTINGS: '/api/settings',
    DATA: '/api/user/userData',
    INTEGRATION: '/api/integration',
    TOKEN: '/api/user/token',
    SKIP_EMOTES: '/api/user/skipEmotes',
  },
};

export default ENDPOINTS;
