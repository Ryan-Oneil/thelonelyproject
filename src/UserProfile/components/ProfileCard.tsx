import React from "react";
import { Card } from "../../components/Card";

const ProfileCard = ({ children }: { children: React.ReactNode }) => {
  const cardStyle = {
    border: "1px solid rgba(18, 17, 39, 0.12)",
    borderRadius: " 12px",
    boxShadow: "none!important",
    width: "100%",
    p: 5,
  };

  return <Card {...cardStyle}>{children}</Card>;
};
export default ProfileCard;
