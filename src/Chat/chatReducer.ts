import { createSlice } from "@reduxjs/toolkit";
import { NormalizedObjects } from "../utils/NormalizedObjects";
import { nanoid } from "nanoid";
import { AppDispatch } from "../index";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  avatarUrl: string;
  messages: Array<string>;
  attachments: Array<string>;
}

interface Message {
  id: string;
  senderUid: string;
  text: string;
}

interface Attachment {
  id: string;
  senderUid: string;
  type: string;
  url: string;
  size: bigint;
  name: string;
}

interface Chat {
  activeConversationId: string;
  conversations: NormalizedObjects<Conversation>;
  messages: NormalizedObjects<Message>;
  attachments: NormalizedObjects<Attachment>;
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
        attachments: [],
      },
      "2": {
        id: "2",
        name: "John D",
        lastMessage: "Great timing",
        avatarUrl: "",
        messages: ["1", "3"],
        attachments: [],
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
  attachments: {
    ids: [],
    entities: {},
  },
};

export const sendMessage =
  (conversationId: string, text: string, senderUid: string) =>
  (dispatch: AppDispatch) => {
    const randomId = nanoid();

    return dispatch(
      messageSent({ id: randomId, text, senderUid, conversationId })
    );
  };

export const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    messageSent(state, action) {
      const { id, text, senderUid, conversationId } = action.payload;

      state.messages.entities = Object.assign({}, state.messages.entities, {
        [id]: { id, text, senderUid },
      });
      state.conversations.entities[conversationId].messages.push(id);
    },
    changedActiveConversation(state, action) {
      state.activeConversationId = action.payload;
    },
  },
});
export default slice.reducer;
export const { messageSent, changedActiveConversation } = slice.actions;
