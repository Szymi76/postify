import FaceSmileIcon from "@heroicons/react/24/outline/FaceSmileIcon";
import EmojiPicker, { type EmojiClickData, type Theme } from "emoji-picker-react";
import { useRef, useState } from "react";
import styled from "styled-components";
import { Box, Button } from "~/components/Shared";
import { useKeyDown, useOnClickOutside } from "~/hooks";
import { usePalette } from "~/styles/usePalette";

export type EmojiPickerButtonProps = {
  onEmojiClick: (emoji: EmojiClickData, event: MouseEvent) => void;
};
export const EmojiPickerButton = (props: EmojiPickerButtonProps) => {
  const paletteTheme = usePalette(state => state.theme);
  const [show, setShow] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const emojiPickerRef = useOnClickOutside<HTMLDivElement>(() => setShow(false), [buttonRef]);
  useKeyDown(emojiPickerRef, () => setShow(false), ["Escape"]);

  return (
    <Box style={{ position: "relative" }}>
      <Button variant="outlined" ref={buttonRef} onClick={() => setShow(show => !show)}>
        <FaceSmileIcon height={22} width={22} />
        Emotki
      </Button>
      {show && (
        <EmojiPickerWrapper ref={emojiPickerRef}>
          <EmojiPicker onEmojiClick={props.onEmojiClick} theme={paletteTheme as Theme} />
        </EmojiPickerWrapper>
      )}
    </Box>
  );
};

const EmojiPickerWrapper = styled(Box)`
  position: absolute;
  right: 0;
  top: 48px;
`;
