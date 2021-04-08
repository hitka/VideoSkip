const ENDPOINTS = {
  TWITCH_AUTH: '/api/player/auth',
  TWITCH_REWARDS: '/api/player/rewards',
  DA_AUTH: '/api/donationalerts/auth',
  TWITCH_CHANNEL_POINTS: '/api/twitch/channelPoints',
  TWITCH: {
    REDEMPTIONS: '/api/player/redemptions',
    REFRESH_TOKEN: '/api/player/refreshToken',
  },
  USER: {
    USERNAME: '/api/username',
    AUC_SETTINGS: '/api/aucSettings',
    SETTINGS: '/api/settings',
    DATA: '/api/player/userData',
    INTEGRATION: '/api/integration',
    TOKEN: '/api/user/token',
    SKIP_EMOTES: '/api/player/skipEmotes',
  },
};

export default ENDPOINTS;
