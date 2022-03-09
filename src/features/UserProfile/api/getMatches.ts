import { apiGetCall } from "../../../apis/api";
import { GET_POTENTIAL_MATCHES } from "../../../apis/endpoints";
import { useQuery } from "react-query";

export const getMatches = () => {
  return apiGetCall(GET_POTENTIAL_MATCHES).then((response) => response.data);
};

export const useMatches = () => {
  return useQuery(["matches"], getMatches);
};
