import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "chat",
  initialState: {
    activeConversationId: 0,
    conversations: [
      { id: 1, name: "Ryan L", lastMessage: "What time?", avatarUrl: "" },
      { id: 2, name: "John D", lastMessage: "Great timing", avatarUrl: "" },
    ],
    messages: [
      {
        id: 1,
        senderUid: "0",
        text: "Hello",
      },
      {
        id: 2,
        senderUid: "0",
        text: "How are you?",
      },
      {
        id: 3,
        senderUid: "sSJjKJ8YoCQRtbpFYiXkfR95sUs2",
        text: "Hey, how is it going?",
      },
    ],
  },
  reducers: {
    messageSent(state, action) {
      state.messages.push(action.payload);
    },
    changedActiveConversation(state, action) {
      state.activeConversationId = action.payload;
    },
  },
});
export default slice.reducer;
export const { messageSent, changedActiveConversation } = slice.actions;
