import { ConversationType } from "../enums/ConversationType";
import { Message } from "../chatReducer";

export type conversation = {
  id: string;
  name: string;
  icon: string;
  type: ConversationType;
  messages: Array<Message>;
  attachments: Array<string>;
  participants: Array<string>;
};
