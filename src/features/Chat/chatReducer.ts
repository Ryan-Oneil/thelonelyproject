import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { MessageType } from "./enums/MessageType";
import { normalize, schema } from "normalizr";
import { userEntity } from "../UserProfile/userProfileReducer";
import { ConversationType } from "./enums/ConversationType";
import {
  CHAT_GET_CONVERSATIONS,
  CHAT_GET_MESSAGES,
} from "../../apis/endpoints";
import { NormalizedObjects } from "../../utils/NormalizedObjects";
import { AppDispatch } from "../../index";
import { apiGetCall } from "../../apis/api";

export interface Conversation {
  id: string;
  name: string;
  icon: string;
  type: ConversationType;
  messages: Array<Message>;
  attachments: Array<string>;
  participants: Array<string>;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  type: MessageType;
  attachmentId: string;
  timestamp: string;
}

interface Attachment {
  id: string;
  senderUid: string;
  url: string;
  size: number;
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
    ids: [],
    entities: {},
  },
  messages: {
    ids: [],
    entities: {},
  },
  attachments: {
    ids: [],
    entities: {},
  },
};

const conversation = new schema.Entity("conversation", {
  participants: [userEntity],
});

const conversationList = new schema.Array(conversation);

export const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    messageSent(state, action) {
      const { id, content, senderId, conversationId } = action.payload;

      state.messages.entities = Object.assign({}, state.messages.entities, {
        [id]: { id, content, senderId },
      });
      state.conversations.entities[conversationId].messages.push(id);
    },
    changedActiveConversation(state, action) {
      state.activeConversationId = action.payload;
    },
    fetchedConversations(state, action) {
      const data = normalize(action.payload, conversationList);
      state.conversations = {
        ids: data.result,
        entities: { ...data.entities.conversation },
      };
    },
    fetchedMessages(state, action) {
      const { roomId, messages } = action.payload;

      state.conversations.entities[roomId].messages = messages;
    },
    sentMessage(state, action) {
      const { roomId, message } = action.payload;

      state.conversations.entities[roomId].messages.push(...message);
    },
  },
});
export default slice.reducer;
export const {
  messageSent,
  changedActiveConversation,
  fetchedConversations,
  fetchedMessages,
  sentMessage,
} = slice.actions;

export const sendMessage =
  (conversationId: string, content: string) => (dispatch: AppDispatch) => {
    const randomId = nanoid();

    return dispatch(messageSent({ id: randomId, content, conversationId }));
  };

export const fetchConversations = () => (dispatch: AppDispatch) => {
  return apiGetCall(CHAT_GET_CONVERSATIONS).then((response) =>
    dispatch(fetchedConversations(response.data))
  );
};

export const fetchChatMessages =
  (roomId: string) => (dispatch: AppDispatch) => {
    return apiGetCall(`${CHAT_GET_MESSAGES}/${roomId}`).then((response) =>
      dispatch(fetchedMessages({ roomId, messages: response.data }))
    );
  };
