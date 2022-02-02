import { createSlice } from "@reduxjs/toolkit";
import { NormalizedObjects } from "../utils/NormalizedObjects";
import { nanoid } from "nanoid";
import { AppDispatch } from "../index";
import { MessageType } from "./enums/MessageType";
import { AttachmentType } from "./enums/AttachmentType";

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
    ids: ["1", "2"],
    entities: {
      "1": {
        id: "1",
        name: "Ryan L",
        lastMessage: "What time?",
        avatarUrl: "",
        messages: ["1", "2", "3", "4", "5"],
        attachments: ["1", "2"],
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
    ids: ["1", "2", "3", "4"],
    entities: {
      "1": {
        id: "1",
        senderUid: "0",
        text: "Hello",
        type: MessageType.TEXT,
        attachmentId: "",
      },
      "2": {
        id: "2",
        senderUid: "0",
        text: "How are you?",
        type: MessageType.TEXT,
        attachmentId: "",
      },
      "3": {
        id: "3",
        senderUid: "sSJjKJ8YoCQRtbpFYiXkfR95sUs2",
        text: "Hey, how is it going?",
        type: MessageType.TEXT,
        attachmentId: "",
      },
      "4": {
        id: "4",
        senderUid: "sSJjKJ8YoCQRtbpFYiXkfR95sUs2",
        text: "",
        type: MessageType.ATTACHMENT,
        attachmentId: "1",
      },
      "5": {
        id: "5",
        senderUid: "",
        text: "",
        type: MessageType.ATTACHMENT,
        attachmentId: "2",
      },
    },
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
