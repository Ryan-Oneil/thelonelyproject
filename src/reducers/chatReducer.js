import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "chat",
  initialState: {
    conversations: [
      { name: "Ryan L", lastMessage: "What time?", avatarUrl: "" },
      { name: "John D", lastMessage: "Great timing", avatarUrl: "" },
    ],
  },
  reducers: {},
});
export default slice.reducer;
