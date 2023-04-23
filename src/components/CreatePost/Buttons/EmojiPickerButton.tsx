import FaceSmileIcon from "@heroicons/react/24/outline/FaceSmileIcon";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { useRef, useState } from "react";
import { useKeyDown } from "~/hooks/useKeyDown";
import { useOutsideClick } from "~/hooks/useOutsideClick";

export type EmojiPickerButtonProps = {
  onEmojiClick: (emoji: EmojiClickData, event: MouseEvent) => void;
};
export const EmojiPickerButton = (props: EmojiPickerButtonProps) => {
  const [show, setShow] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const emojiPickerRef = useOutsideClick<HTMLDivElement>(() => setShow(false), [buttonRef]);
  useKeyDown(emojiPickerRef, () => setShow(false), ["Escape"]);

  return (
    <div className="relative">
      <button
        className="btn-action btn-primary"
        ref={buttonRef}
        onClick={() => setShow((show) => !show)}
      >
        <FaceSmileIcon className="h-6" />
        Emotki
      </button>
      {show && (
        <div ref={emojiPickerRef} className="absolute right-0 top-12">
          <EmojiPicker onEmojiClick={props.onEmojiClick} />
        </div>
      )}
    </div>
  );
};
