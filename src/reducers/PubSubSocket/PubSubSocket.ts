import { createSlice, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from 'redux';
import axios from 'axios';
import WebSocketService from '../../services/WebSocketService';
import { Purchase } from '../Purchases/Purchases';
import { getWebsocketUrl } from '../../utils/url.utils';
import { addAlert } from '../notifications/notifications';
import { AlertTypeEnum } from '../../models/alert.model';
import { RootState } from '../index';

interface PubSubSocketState {
  webSocket?: WebSocket;
}

const initialState: PubSubSocketState = {
  webSocket: undefined,
};

const puSubSocketSlice = createSlice({
  name: 'pubSubSocket',
  initialState,
  reducers: {
    setWebSocket(state, action: PayloadAction<WebSocket | undefined>): void {
      state.webSocket = action.payload;
    },
  },
});

export const { setWebSocket } = puSubSocketSlice.actions;

export const connectToServer = (dispatch: ThunkDispatch<RootState, {}, Action>): void => {
  let interval: NodeJS.Timeout;

  const onOpen = (ws: WebSocket): void => {
    interval = setInterval(() => {
      axios.get('api/isAlive');
    }, 1000 * 60 * 30);

    dispatch(setWebSocket(ws));
  };

  const onClose = (): void => {
    dispatch(setWebSocket(undefined));
    dispatch(
      addAlert({
        message:
          'Произошло отключение от сервера, скипы через расширение не будут работать, попробуйте обновить страницу',
        type: AlertTypeEnum.Error,
        duration: 8000,
      }),
    );
    clearInterval(interval);
  };

  const webSocketService = new WebSocketService<Purchase>(onClose, onOpen);
  webSocketService.connect(getWebsocketUrl());
};

export default puSubSocketSlice.reducer;
