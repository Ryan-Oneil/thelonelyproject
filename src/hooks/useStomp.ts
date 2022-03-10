import { AUTH_HEADER, BASE_URL } from "../apis/api";
import { getAuth } from "firebase/auth";
import { Client } from "@stomp/stompjs";

let stompClient: Client;

export const useStomp = () => {
  if (!stompClient) {
    stompClient = new Client({
      brokerURL: `ws://${BASE_URL}/ws`,
      beforeConnect: () => {
        return getAuth()
          .currentUser?.getIdToken()
          .then((authToken) => {
            stompClient.connectHeaders = {
              [AUTH_HEADER]: authToken,
            };
          });
      },
      reconnectDelay: 5000,
    });
  }
  return stompClient;
};
