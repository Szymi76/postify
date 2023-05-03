import { type RefObject, useState } from "react";
import { useOnClickOutside } from "./useOnClickOutside";

export const useModal = (triggers?: RefObject<HTMLElement>[], onClose?: () => void) => {
  const [show, setShow] = useState(false);

  const close = () => setShow(false);
  const open = () => setShow(true);
  const toggle = () => setShow(!show);

  const ref = useOnClickOutside<HTMLLabelElement>(() => (onClose ? onClose() : close()), triggers);

  const modalProps = {
    show,
    onClose: onClose ?? close,
    ref,
  };

  return { show, open, close, toggle, modalProps, ref } as const;
};
