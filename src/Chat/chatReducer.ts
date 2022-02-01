import { createSlice } from "@reduxjs/toolkit";
import { NormalizedObjects } from "../utils/NormalizedObjects";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  avatarUrl: string;
  messages: Array<string>;
}

interface Message {
  id: string;
  senderUid: string;
  text: string;
}

interface Chat {
  activeConversationId: string;
  conversations: NormalizedObjects<Conversation>;
  messages: NormalizedObjects<Message>;
}

const initialState: Chat = {
  activeConversationId: "",
  conversations: {
    ids: ["1", "2"],
    entities: {
      "1": {
        id: "1",
        name: "Ryan L",
        lastMessage: "What time?",
        avatarUrl: "",
        messages: ["1", "2", "3"],
      },
      "2": {
        id: "2",
        name: "John D",
        lastMessage: "Great timing",
        avatarUrl: "",
        messages: ["1", "3"],
      },
    },
  },
  messages: {
    ids: ["1", "2", "3"],
    entities: {
      "1": {
        id: "1",
        senderUid: "0",
        text: "Hello",
      },
      "2": {
        id: "2",
        senderUid: "0",
        text: "How are you?",
      },
      "3": {
        id: "3",
        senderUid: "sSJjKJ8YoCQRtbpFYiXkfR95sUs2",
        text: "Hey, how is it going?",
      },
    },
  },
};

export const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    messageSent(state, action) {
      // state.messages.push(action.payload);
    },
    changedActiveConversation(state, action) {
      state.activeConversationId = action.payload;
    },
  },
});
export default slice.reducer;
export const { messageSent, changedActiveConversation } = slice.actions;
