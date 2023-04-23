import {
  type DetailedHTMLProps,
  type HTMLAttributes,
  forwardRef,
  useRef,
  type LabelHTMLAttributes,
} from "react";
import useOnClickOutside from "./useOnClickOutside";

type H2HTMLProps = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
type HTMLDivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
type HTMLLabelProps = DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;

/**
 *
 * useModal -- hook
 */
export const useSetupModal = (onClose: () => void) => {
  const ready = useRef(false);

  const ref = useOnClickOutside<HTMLLabelElement>(() => {
    if (ready.current) onClose();
    ready.current = true;
  });

  return { ref } as const;
};

/**
 * Modal
 */
export type ModalProps = HTMLLabelProps & { onClose: () => void };
export const Modal = (props: ModalProps) => {
  const ready = useRef(false);

  const ref = useOnClickOutside<HTMLLabelElement>(() => {
    if (ready.current) props.onClose();
    ready.current = true;
  });

  const { className, ...modalBoxProps } = props;

  return (
    <label className="modal modal-open">
      <label ref={ref} className={`modal-box relative ${className ?? ""}`} {...modalBoxProps}>
        {props.children}
      </label>
    </label>
  );
};

/**
 * Modal Title
 */
type ModalTitleProps = H2HTMLProps;
export const ModalTitle = (props: ModalTitleProps) => {
  const { className, ...modalTitleProps } = props;

  return <h2 className={`text-xl font-medium ${className ?? ""}`} {...modalTitleProps}></h2>;
};

/**
 * Modal Content
 */
type ModalContentProps = HTMLDivProps;
export const ModalContent = (props: ModalContentProps) => {
  const { className, ...modalContentProps } = props;

  return <div className={`mt-5 ${className ?? ""}`} {...modalContentProps}></div>;
};

/**
 * Modal Footer
 */
type ModalFooterProps = HTMLDivProps;
export const ModalFooter = (props: ModalFooterProps) => {
  const { className, children, ...modalFooterProps } = props;

  return (
    <div
      className={`mt-5 flex flex-wrap justify-end gap-1 ${className ?? ""}`}
      {...modalFooterProps}
    >
      {/* PUSTY PRZYCISK, ABY POZBYĆ SIĘ BŁĘDU Z AUTOMETYCZNYM FOKUSEM */}
      <button hidden></button>
      {children}
    </div>
  );
};

/**
 * Modal Scrollable
 */

type ModalScrollableListProps = HTMLDivProps;
export const ModalScrollableList = forwardRef<HTMLDivElement, ModalScrollableListProps>(
  (props, ref) => {
    const { className, ...modalScrollableListProps } = props;

    return (
      <div
        ref={ref}
        className={`max-h-[275px] overflow-y-auto  ${className ?? ""}`}
        {...modalScrollableListProps}
      ></div>
    );
  }
);

ModalScrollableList.displayName = "ModalScrollableList";
