import { createSlice } from "@reduxjs/toolkit";
import { NormalizedObjects } from "../utils/NormalizedObjects";
import { nanoid } from "nanoid";
import { AppDispatch } from "../index";
import { MessageType } from "./enums/MessageType";
import { AttachmentType } from "./enums/AttachmentType";
import { normalize, schema } from "normalizr";
import { userEntity } from "../UserProfile/userProfileReducer";
import { apiGetCall } from "../apis/api";
import { CHAT_GET_CONVERSATIONS, CHAT_GET_MESSAGES } from "../apis/endpoints";
import { ConversationType } from "./enums/ConversationType";

interface Conversation {
  id: string;
  name: string;
  icon: string;
  type: ConversationType;
  messages: Array<string>;
  attachments: Array<string>;
  participants: Array<string>;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  type: MessageType;
  attachmentId: string;
}

interface Attachment {
  id: string;
  senderUid: string;
  type: AttachmentType;
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
    ids: ["1", "2"],
    entities: {
      "1": {
        id: "1",
        senderUid: "string",
        type: AttachmentType.IMAGE,
        url: "https://via.placeholder.com/1000x1000",
        size: 1000,
        name: "Image.png",
      },
      "2": {
        id: "2",
        senderUid: "",
        type: AttachmentType.VIDEO,
        url: "",
        size: 1000,
        name: "video.mp4",
      },
    },
  },
};

const message = new schema.Entity("messages");
const messageList = new schema.Array(message);

const conversation = new schema.Entity("conversation", {
  participants: [userEntity],
  messages: [message],
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
      const data = normalize(messages, messageList);

      state.messages.entities = Object.assign(
        {},
        state.messages.entities,
        data.entities.messages
      );
      state.conversations.entities[roomId].messages = data.result;
    },
  },
});
export default slice.reducer;
export const {
  messageSent,
  changedActiveConversation,
  fetchedConversations,
  fetchedMessages,
} = slice.actions;

export const sendMessage =
  (conversationId: string, content: string, senderId: string) =>
  (dispatch: AppDispatch) => {
    const randomId = nanoid();

    return dispatch(
      messageSent({ id: randomId, content, senderId, conversationId })
    );
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
