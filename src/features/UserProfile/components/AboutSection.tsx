import React from "react";
import { useAppSelector } from "../../../utils/hooks";
import EditableCard from "./EditableCard";
import { UserProfile } from "../types/Profile";
import { useUpdateProfileAbout } from "../api/updateUserProfile";

const AboutSection = ({ id, about }: UserProfile) => {
  const currentId = useAppSelector((state) => state.auth.user.uid);
  const editMode = currentId === id;
  const updateAbout = useUpdateProfileAbout();

  return (
    <EditableCard
      defaultValue={about}
      title={"About me"}
      submitAction={(nextValue: string) => updateAbout.mutate(nextValue)}
      showEditControls={editMode}
      key={about}
    />
  );
};
export default AboutSection;
