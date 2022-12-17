import React, { useEffect } from "react";
import { useAuth } from "@/features/Auth/hooks/useAuth";
import { AuthStage } from "@/features/Auth/enums/AuthStages";
import { useRouter } from "next/router";
import { LOGIN_URL, PROFILE_SETUP_URL } from "@/utils/urls";
import LoadingPage from "@/features/Base/components/LoadingPage";
import { RegisterStatus } from "@/features/Auth/enums/RegisterStatus";

type Props = {
  children: React.ReactElement;
};
const AuthProtected = ({ children }: Props) => {
  const { authStatus, registerStatus } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authStatus === AuthStage.LOGGED_OUT) {
      router.push(`${LOGIN_URL}?redirect=${router.pathname}`);
    }
    if (
      authStatus === AuthStage.LOGGED_IN &&
      registerStatus !== RegisterStatus.REGISTERED
    ) {
      router.push(PROFILE_SETUP_URL);
    }
  }, [router, authStatus, registerStatus]);

  if (
    authStatus === AuthStage.LOGGED_IN &&
    registerStatus === RegisterStatus.REGISTERED
  ) {
    return children;
  }
  return <LoadingPage />;
};
export default AuthProtected;
