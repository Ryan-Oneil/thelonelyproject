import { apiPostCall } from "../../../apis/api";
import { CHAT_SEND_ATTACHMENT } from "../../../apis/endpoints";
import { useMutation } from "react-query";
import { queryClient } from "../../../pages/_app";
import { conversation } from "../type/conversation";

export const sendChatAttachment = ({
  chatId,
  attachment,
}: {
  chatId: string;
  attachment: File;
}) => {
  let postData = new FormData();
  postData.append("file", attachment, attachment.name);

  return apiPostCall(CHAT_SEND_ATTACHMENT.replace("%s", chatId), postData);
};

export const useSendAttachment = () => {
  return useMutation(sendChatAttachment, {
    onSuccess: (response, variables) => {
      const roomId = variables.chatId;
      const previousRoom = queryClient.getQueryData<conversation>([
        "messages",
        roomId,
      ]) || { messages: [] };

      queryClient.setQueryData(["messages", roomId], {
        ...previousRoom,
        messages: [...previousRoom.messages, response.data],
      });
    },
  });
};
