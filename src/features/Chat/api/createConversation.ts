import { apiPostCall } from "@/apis/api";
import { CHAT_CREATE } from "@/apis/endpoints";
import { useMutation } from "react-query";

export const createChatRoomWithUser = (targetId: string) => {
  return apiPostCall(`${CHAT_CREATE}/${targetId}`).then(
    (response) => response.data
  );
};

export const useCreateChat = () => {
  return useMutation(createChatRoomWithUser);
};
