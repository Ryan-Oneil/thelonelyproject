import { apiGetCall } from "@/apis/api";
import { USER_PROFILE_INFO_ENDPOINT } from "@/apis/endpoints";
import { useQuery } from "react-query";

export const getUserProfile = (userId: string) => {
  return apiGetCall(`${USER_PROFILE_INFO_ENDPOINT}/${userId}`).then(
    (response) => response.data
  );
};

export const useUserProfile = (userId: string) => {
  return useQuery(["userProfile", userId], () => getUserProfile(userId), {
    enabled: !!userId,
  });
};
