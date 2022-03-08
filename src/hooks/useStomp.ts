import { AUTH_HEADER } from "../apis/api";
import { getAuth } from "firebase/auth";
import { Client } from "@stomp/stompjs";

let stompClient: Client;

export const useStomp = () => {
  if (!stompClient) {
    stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      debug: function (str) {
        console.log(str);
      },
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
