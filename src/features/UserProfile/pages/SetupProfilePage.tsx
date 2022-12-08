import React, { useEffect } from "react";
import SetupProfileForm from "../components/SetupProfileForm";
import AuthPage from "../../Auth/layout/AuthPage";
import { useNavigate } from "react-router-dom";
import { RegisterStatus } from "../../Auth/enums/RegisterStatus";
import { USER_PROFILE_URL } from "@/utils/urls";
import { useAppSelector } from "../../../utils/hooks";

const SetupProfilePage = () => {
  const registeredStatus = useAppSelector(
    (state) => state.auth.registeredStatus
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (registeredStatus === RegisterStatus.REGISTERED) {
      navigate(USER_PROFILE_URL);
    }
  }, [registeredStatus, navigate]);

  return (
    <AuthPage>
      <SetupProfileForm />
    </AuthPage>
  );
};
export default SetupProfilePage;
