import { apiGetCall } from "@/apis/api";
import { CHAT_GET_CONVERSATIONS } from "@/apis/endpoints";
import { useQuery } from "react-query";

export const getConversations = () => {
  return apiGetCall(CHAT_GET_CONVERSATIONS).then((response) => response.data);
};

export const useConversations = () => {
  return useQuery("conversations", getConversations);
};
