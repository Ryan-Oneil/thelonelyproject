import { apiGetCall } from "@/apis/api";
import { CHAT_GET_MESSAGES } from "@/apis/endpoints";
import { useQuery } from "react-query";

export const fetchChatMessages = (roomId: string) => {
  return apiGetCall(`${CHAT_GET_MESSAGES}/${roomId}`).then(
    (response) => response.data
  );
};

export const useChatConversation = (roomId: string) => {
  return useQuery(
    ["chatConversation", roomId],
    () => fetchChatMessages(roomId),
    {
      enabled: !!roomId,
      staleTime: 30000,
    }
  );
};
