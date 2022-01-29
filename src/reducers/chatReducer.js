import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "chat",
  initialState: {
    conversations: [
      { name: "Ryan L", lastMessage: "What time?", avatarUrl: "" },
      { name: "John D", lastMessage: "Great timing", avatarUrl: "" },
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
  reducers: {},
});
export default slice.reducer;
