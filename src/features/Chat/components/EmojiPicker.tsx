import {
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FaRegSmile } from "react-icons/fa";
import React from "react";
import emojiData from "@emoji-mart/data";
// @ts-ignore
import Picker from "@emoji-mart/react";

type Props = {
  onEmojiSelected: (emoji: any) => void;
};

const EmojiPicker = ({ onEmojiSelected }: Props) => {
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <IconButton
          icon={<FaRegSmile />}
          variant="ghost"
          aria-label={"emojis"}
          sx={{ ":hover > svg": { transform: "scale(1.1)" } }}
          size={"lg"}
        />
      </PopoverTrigger>
      <PopoverContent>
        <Picker
          data={emojiData}
          showPreview={false}
          showSkinTones={false}
          native={true}
          style={{ width: "inherit" }}
          onSelect={onEmojiSelected}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
