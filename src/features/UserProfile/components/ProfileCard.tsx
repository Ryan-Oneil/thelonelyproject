import React from "react";
import { BoxProps } from "@chakra-ui/react";
import { Card } from "../../../Base/components/Card";

const ProfileCard = (props: BoxProps) => {
  const cardStyle = {
    border: "1px solid rgba(18, 17, 39, 0.12)",
    borderRadius: " 12px",
    boxShadow: "none!important",
    width: "100%",
    p: 5,
  };

  return (
    <Card {...cardStyle} {...props}>
      {props.children}
    </Card>
  );
};
export default ProfileCard;
