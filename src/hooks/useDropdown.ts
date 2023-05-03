import { type RefObject, useState } from "react";
import { useOnClickOutside } from "./useOnClickOutside";

export const useDropdown = (triggers?: RefObject<HTMLElement>[]) => {
  const [show, setShow] = useState(false);

  const close = () => setShow(false);
  const open = () => setShow(true);
  const toggle = () => setShow(!show);

  const ref = useOnClickOutside<HTMLDivElement>(() => close(), triggers);

  const dropdownProps = {
    show,
    onClose: close,
    ref,
  };

  return { show, open, close, toggle, dropdownProps, ref } as const;
};
