import React, { useEffect } from "react";
import { USER_PROFILE_URL } from "@/utils/urls";
import { useAuth } from "@/features/Auth/hooks/useAuth";
import { useRouter } from "next/router";
import { RegisterStatus } from "@/features/Auth/enums/RegisterStatus";
import AuthPage from "@/features/Auth/layout/AuthPage";
import SetupProfileForm from "@/features/UserProfile/components/SetupProfileForm";

const Setup = () => {
  const router = useRouter();
  const { registerStatus } = useAuth();

  useEffect(() => {
    if (registerStatus === RegisterStatus.REGISTERED) {
      router.push(USER_PROFILE_URL);
    }
  }, [registerStatus, router]);

  return (
    <AuthPage>
      <SetupProfileForm />
    </AuthPage>
  );
};
export default Setup;
