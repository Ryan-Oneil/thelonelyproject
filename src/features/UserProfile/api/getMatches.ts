import { apiGetCall } from "../../../apis/api";
import {
  GET_ACCEPTED_CONNECTIONS,
  GET_POTENTIAL_MATCHES,
} from "../../../apis/endpoints";
import { useQuery } from "react-query";

export const getMatches = () => {
  return apiGetCall(GET_POTENTIAL_MATCHES).then((response) => response.data);
};

export const useMatches = () => {
  return useQuery(["matches"], getMatches);
};

export const getAcceptedMatches = () => {
  return apiGetCall(GET_ACCEPTED_CONNECTIONS).then((response) => response.data);
};

export const useAcceptedMatches = () => {
  return useQuery(["connectedMatches"], getAcceptedMatches);
};
