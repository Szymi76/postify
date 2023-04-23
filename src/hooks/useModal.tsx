import {
  type DetailedHTMLProps,
  type HTMLAttributes,
  type RefObject,
  type UIEvent,
  forwardRef,
  useState,
} from "react";
import { useOutsideClick } from "./useOutsideClick";

export const useModal = (triggers?: RefObject<HTMLElement>[], onClose?: () => void) => {
  const [show, setShow] = useState(false);

  const close = () => setShow(false);
  const open = () => setShow(true);
  const toggle = () => setShow(!show);

  const ref = useOutsideClick<HTMLLabelElement>(() => (onClose ? onClose() : close()), triggers);

  const modalProps = {
    show,
    onClose: onClose ?? close,
    ref,
  };

  return { show, open, close, toggle, modalProps, ref } as const;
};

export type ModalProps = {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  className?: string;
  onScroll?: (e: UIEvent<HTMLLabelElement, globalThis.UIEvent>) => void;
};

export const Modal = forwardRef<HTMLLabelElement, ModalProps>((props, ref) => {
  if (!props.show) return <></>;

  const className = props.className ?? "";

  return (
    <label className={`modal ${props.show ? "modal-open" : ""}`}>
      <label onScroll={props.onScroll} ref={ref} className={`modal-box relative ${className}`}>
        {props.children}
      </label>
    </label>
  );
});

Modal.displayName = "Modal";

type H2HTMLProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
type HTMLDivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type ModalTitleProps = H2HTMLProps;
export const ModalTitle = (props: ModalTitleProps) => {
  const { className, ...modalTitleProps } = props;

  return <h2 className={`text-xl font-medium ${className ?? ""}`} {...modalTitleProps}></h2>;
};

type ModalContentProps = HTMLDivProps;
export const ModalContent = (props: ModalContentProps) => {
  const { className, ...modalContentProps } = props;

  return <div className={`mt-5 ${className ?? ""}`} {...modalContentProps}></div>;
};

type ModalFooterProps = HTMLDivProps;
export const ModalFooter = (props: ModalFooterProps) => {
  const { className, children, ...modalFooterProps } = props;

  return (
    <div
      className={`mt-5 flex flex-wrap justify-end gap-1 ${className ?? ""}`}
      {...modalFooterProps}
    >
      {/* PUSTY PRZYCISK, ABY POZBYĆ SIĘ BŁĘDU Z AUTOMETYCZNYM FOKUSEM */}
      <button></button>
      {children}
    </div>
  );
};
