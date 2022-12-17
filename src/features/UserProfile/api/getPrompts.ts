import { apiGetCall } from "@/apis/api";
import { USER_PROFILE_PROMPTS_ENDPOINT } from "@/apis/endpoints";
import { useQuery } from "react-query";

export const getPrompts = () => {
  return apiGetCall(USER_PROFILE_PROMPTS_ENDPOINT).then(
    (response) => response.data
  );
};

export const usePrompts = () => {
  return useQuery(["prompts"], getPrompts, {
    cacheTime: 600000,
    staleTime: 600000,
  });
};
