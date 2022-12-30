import React, { useState } from "react";
import { Avatar, Tag, TagLabel, TagProps } from "@chakra-ui/react";

interface AvatarProps extends TagProps {
  description: string;
  icon?: string;
}

interface SelectAbleProps extends AvatarProps {
  onSelected: Function;
  onDeselected: Function;
  defaultSelected?: boolean;
}

const AvatarTag = (props: AvatarProps) => {
  return (
    <Tag
      size="lg"
      borderRadius="full"
      backgroundColor={"rgba(97, 94, 240, 0.1)"}
      {...props}
    >
      {props.icon && (
        <Avatar
          src={props.icon}
          size="sm"
          name={props.description}
          ml={-3}
          mr={1}
        />
      )}
      <TagLabel m={"auto"} title={props.description}>
        {props.description}
      </TagLabel>
    </Tag>
  );
};

export const SelectAbleAvatarTag = ({
  description,
  onSelected,
  onDeselected,
  defaultSelected,
  icon,
}: SelectAbleProps) => {
  const [isActive, setActive] = useState(defaultSelected);
  const style = {
    border: "1px solid rgb(5 0 255 / 32%)",
    cursor: "pointer",
  };

  const onClick = () => {
    if (isActive) {
      onDeselected();
    } else {
      onSelected();
    }
    setActive((prevState) => !prevState);
  };

  return (
    <AvatarTag
      description={description}
      _hover={style}
      style={
        isActive ? { ...style, backgroundColor: "rgb(97 94 240 / 16%)" } : {}
      }
      onClick={onClick}
      icon={icon}
    />
  );
};

export default AvatarTag;
