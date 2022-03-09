import { MessageType } from "../enums/MessageType";

export type Message = {
  id: string;
  senderId: string;
  content: string;
  type: MessageType;
  attachmentId: string;
  timestamp: string;
};
