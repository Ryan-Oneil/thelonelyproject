import { apiGetCall } from "../../../apis/api";
import { USER_PROFILE_INTERESTS_ENDPOINT } from "../../../apis/endpoints";
import { useQuery } from "react-query";

export const getInterests = () => {
  return apiGetCall(USER_PROFILE_INTERESTS_ENDPOINT).then(
    (response) => response.data
  );
};

export const useInterests = () => {
  return useQuery(["interests"], getInterests, {
    cacheTime: 600000,
    staleTime: 600000,
  });
};
