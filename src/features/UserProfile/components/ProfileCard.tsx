import React from "react";
import { BoxProps, Skeleton } from "@chakra-ui/react";
import { Card } from "../../Base/components/Card";

interface Props extends BoxProps {
  isLoading?: boolean;
  header?: React.ReactNode;
  loadingHeader?: React.ReactNode;
}

const ProfileCard = (props: Props) => {
  const showLoadingHeader = props.loadingHeader && props.isLoading;

  const cardStyle = {
    border: "1px solid rgba(18, 17, 39, 0.12)",
    borderRadius: " 12px",
    boxShadow: "none!important",
    width: "100%",
    p: 5,
  };

  return (
    <Card {...cardStyle} {...props}>
      {showLoadingHeader && props.loadingHeader}
      {!showLoadingHeader && props.header}
      <Skeleton isLoaded={!props.isLoading} h={"80%"}>
        {props.children}
      </Skeleton>
    </Card>
  );
};
export default ProfileCard;
