import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  isConnected: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action) => { },
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    websocketConnected: (state) => {
      state.isConnected = true;
    },
    websocketDisconnected: (state) => {
      state.isConnected = false;
    },
  },
});

export const { sendMessage, receiveMessage, websocketConnected, websocketDisconnected } = chatSlice.actions;
export default chatSlice.reducer;