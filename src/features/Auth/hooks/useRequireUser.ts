import { useAuth } from "@/features/Auth/hooks/useAuth";
import { AuthStage } from "@/features/Auth/enums/AuthStages";
import { useRouter } from "next/router";
import { LOGIN_URL, PROFILE_SETUP_URL } from "@/utils/urls";
import { RegisterStatus } from "@/features/Auth/enums/RegisterStatus";

export const useRequireUser = () => {
  const { user, authStatus, registerStatus } = useAuth();
  const router = useRouter();

  if (authStatus !== AuthStage.LOGGED_IN || !user) {
    router.push(LOGIN_URL + "?redirect=" + router.pathname);

    return {uid: ""};
  }

  if (
    authStatus === AuthStage.LOGGED_IN &&
    registerStatus !== RegisterStatus.REGISTERED
  ) {
    router.push(PROFILE_SETUP_URL);
  }

  return user;
};
