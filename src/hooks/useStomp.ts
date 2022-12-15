import { AUTH_HEADER } from "@/apis/api";
import { getAuth } from "firebase/auth";
import { Client } from "@stomp/stompjs";

let stompClient: Client;
const BROKER_URL = process.env.NEXT_PUBLIC_BROKER_URL;

export const useStomp = () => {
  if (!stompClient) {
    stompClient = new Client({
      brokerURL: BROKER_URL,
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
      connectionTimeout: 4000,
    });
  }
  return stompClient;
};
