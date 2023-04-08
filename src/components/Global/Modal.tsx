import { RefObject, forwardRef } from "react";
import { useOutsideClick } from "~/hooks/useOutsideClick";

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  boxClassName?: string;
};
const Modal = forwardRef<HTMLElement, ModalProps>((props, triggerRef) => {
  const modalBoxRef = useOutsideClick<HTMLLabelElement>(props.onClose, [
    triggerRef as RefObject<HTMLElement>,
  ]);

  return (
    <label
      htmlFor="my-modal-4"
      className={`modal cursor-pointer ${props.open ? "modal-open" : ""}`}
    >
      <label ref={modalBoxRef} className={`modal-box relative ${props.boxClassName ?? ""}`}>
        {props.children}
      </label>
    </label>
  );
});

Modal.displayName = "Modal";
export default Modal;
