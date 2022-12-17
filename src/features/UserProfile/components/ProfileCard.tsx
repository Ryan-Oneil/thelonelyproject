import React from "react";
import { BoxProps, Skeleton } from "@chakra-ui/react";
import { Card } from "../../Base/components/Card";

interface Props extends BoxProps {
  isLoading?: boolean;
  header?: React.ReactNode;
  loadingHeader?: React.ReactNode;
}

const ProfileCard = ({
  loadingHeader,
  isLoading,
  header,
  children,
  ...rest
}: Props) => {
  const showLoadingHeader = loadingHeader && isLoading;

  const cardStyle = {
    border: "1px solid rgba(18, 17, 39, 0.12)",
    borderRadius: " 12px",
    boxShadow: "none!important",
    width: "100%",
    p: 5,
  };

  return (
    <Card {...cardStyle} {...rest}>
      {showLoadingHeader && loadingHeader}
      {!showLoadingHeader && header}
      <Skeleton isLoaded={!isLoading} h={"80%"}>
        {children}
      </Skeleton>
    </Card>
  );
};
export default ProfileCard;
