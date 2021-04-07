import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  username: string | null;
  userId: string | null;
}

export interface UserState extends UserInfo {
  skipRewardId: string | null;
}

const initialState: UserState = {
  username: null,
  userId: null,
  skipRewardId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string | null>): void {
      state.username = action.payload;
    },
    setUserId(state, action: PayloadAction<string | null>): void {
      state.userId = action.payload;
    },
    setSkipRewardId(state, action: PayloadAction<string | null>): void {
      state.skipRewardId = action.payload;
    },
  },
});

export const { setUsername, setUserId, setSkipRewardId } = userSlice.actions;

export default userSlice.reducer;
