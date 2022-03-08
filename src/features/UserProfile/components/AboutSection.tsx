import React from "react";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { updateProfileAbout } from "../userProfileReducer";
import EditableCard from "./EditableCard";

const AboutSection = ({
  userId,
  editMode,
}: {
  userId: string;
  editMode: boolean;
}) => {
  const { about } =
    useAppSelector((state) => state.profile.users.entities[userId]) || "";
  const dispatch = useAppDispatch();

  return (
    <EditableCard
      defaultValue={about}
      title={"About me"}
      submitAction={(nextValue: string) =>
        dispatch(updateProfileAbout(userId, nextValue))
      }
      showEditControls={editMode}
      key={about}
    />
  );
};
export default AboutSection;
