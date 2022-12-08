import { useAuth } from "@/features/Auth/hooks/useAuth";
import { AuthStage } from "@/features/Auth/enums/AuthStages";
import { useRouter } from "next/router";
import { LOGIN_URL } from "@/utils/urls";
import { UserInfo } from "@firebase/auth-types";

export const useRequireUser = () => {
  const { user, status } = useAuth();
  const router = useRouter();

  if (status !== AuthStage.LOGGED_IN || !user) {
    router.push(LOGIN_URL + "?redirect=" + router.pathname);
  }
  return user;
};
